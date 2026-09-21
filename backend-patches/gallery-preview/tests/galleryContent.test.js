import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { runInNewContext } from "node:vm";
import { test } from "node:test";
import express from "express";

// Load the real handlers with isolated database/Google dependencies; no credentials or network calls to Google.
const controllerSource = (await readFile(new URL("../controllers/galleryController.js", import.meta.url), "utf8"))
  .replace(/^import[\s\S]*?;\r?\n/gm, "").replace(/export const /g, "const ");
const routerSource = (await readFile(new URL("../routers/galleryRoutes.js", import.meta.url), "utf8"))
  .replace(/^import[\s\S]*?;\r?\n/gm, "").replace("export default router;", "router;");
const id = "6aa92291373d18184483f89b";
const document = (data) => ({ ...data, toObject: () => ({ ...data }) });

async function fixture(t, { mime = "image/png", driveStatus, record = true } = {}) {
  const bytes = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const driveImage = document({ _id: id, driveFileId: "existing-drive-file", imageUrl: "https://drive.google.com/uc?export=view&id=existing-drive-file" });
  const oldImage = document({ _id: "old", driveFileId: null, storageProvider: "google-drive", imageUrl: "https://res.cloudinary.com/example/image.jpg" });
  const calls = [];
  const handlers = runInNewContext(`${controllerSource}\n({uploadImages, getImages, getImage, getImageContent, deleteImage});`, {
    Readable, pipeline, mongoose: { isValidObjectId: value => /^[a-f0-9]{24}$/.test(value), Types: { ObjectId: class { toString() { return id; } } } },
    cloudinary: {},
    Gallery: {
      find: () => ({ sort: async () => [driveImage, oldImage] }),
      findById: async () => record ? driveImage : null,
      insertMany: async items => items.map(document),
    },
    getDriveClient: async () => ({ files: {
      get: async (params, options) => {
        calls.push({params, options});
        if (driveStatus) throw { response: { status: driveStatus }, message: "sensitive upstream details" };
        return { headers: {"content-type": mime}, data: Readable.from(bytes) };
      },
      create: async () => ({ data: { id: "new-drive-file" } }),
    } }),
  });
  const router = runInNewContext(routerSource, { express, ...handlers,
    protect: (req, res, next) => req.headers.authorization === "Bearer test-only" ? next() : res.sendStatus(401),
    upload: { array: () => (req, res, next) => {
      req.files = [{ originalname: "test.png", mimetype: "image/png", buffer: bytes }]; next();
    } },
  });
  const app = express();
  app.use("/api/gallery", router);
  const server = await new Promise(resolve => {
    const listener = app.listen(0, "127.0.0.1", () => resolve(listener));
  });
  t.after(() => new Promise(resolve => server.close(resolve)));
  return { base: `http://127.0.0.1:${server.address().port}/api/gallery`, bytes, calls };
}

test("existing Drive records return content URLs; legacy Cloudinary URLs remain intact", async t => {
  const {base} = await fixture(t);
  const list = await (await fetch(base)).json();
  assert.equal(list[0].imageUrl, `/api/gallery/${id}/content`);
  assert.equal(list[1].imageUrl, "https://res.cloudinary.com/example/image.jpg");
  assert.equal((await (await fetch(`${base}/${id}`)).json()).imageUrl, list[0].imageUrl);
});

test("public content route serves image bytes through Google without requiring visitor login", async t => {
  const {base, bytes, calls} = await fixture(t);
  const response = await fetch(`${base}/${id}/content`);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "image/png");
  assert.equal(response.headers.get("content-disposition"), "inline");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), bytes);
  assert.equal(calls[0].params.fileId, "existing-drive-file");
  assert.equal(calls[0].params.alt, "media");
  assert.equal(calls[0].options.responseType, "stream");
});

test("upload and delete remain protected; new upload returns backend content URL", async t => {
  const {base} = await fixture(t);
  assert.equal((await fetch(base, {method: "POST"})).status, 401);
  assert.equal((await fetch(`${base}/${id}`, {method: "DELETE"})).status, 401);
  const response = await fetch(base, {method: "POST", headers: {Authorization: "Bearer test-only"}});
  assert.equal(response.status, 201);
  assert.equal((await response.json())[0].imageUrl, `/api/gallery/${id}/content`);
});

test("invalid and missing gallery IDs cannot download arbitrary Drive files", async t => {
  const {base, calls} = await fixture(t, {record: false});
  assert.equal((await fetch(`${base}/arbitrary-drive-file/content`)).status, 404);
  assert.equal((await fetch(`${base}/${id}/content`)).status, 404);
  assert.equal(calls.length, 0);
});

test("non-image responses are rejected", async t => {
  const {base} = await fixture(t, {mime: "text/html"});
  assert.equal((await fetch(`${base}/${id}/content`)).status, 415);
});

for (const upstream of [403, 404, 500]) {
  test(`Google ${upstream} produces a safe error response`, async t => {
    const {base} = await fixture(t, {driveStatus: upstream});
    const response = await fetch(`${base}/${id}/content`);
    assert.equal(response.status, upstream === 404 ? 404 : 502);
    assert.ok(!(await response.text()).includes("sensitive upstream details"));
  });
}
