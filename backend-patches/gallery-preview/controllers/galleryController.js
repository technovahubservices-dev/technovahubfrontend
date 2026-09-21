import { Readable } from "stream";
import { pipeline } from "node:stream/promises";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import { getDriveClient } from "../config/googleDrive.js";
import Gallery from "../models/GalleryModels.js";

const contentUrl = (id) => `/api/gallery/${id}/content`;
const galleryResponse = (document) => {
  const image = document.toObject();
  // Older uploads also use the authenticated server download, without a migration.
  if (image.driveFileId) image.imageUrl = contentUrl(image._id);
  return image;
};

const uploadToGoogleDrive = async (file) => {
  const drive = await getDriveClient();
  const fileName = `${Date.now()}-${file.originalname || "image"}`;
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  const createResponse = await drive.files.create({
    requestBody: {
      name: fileName,
      ...(folderId ? { parents: [folderId] } : {}),
    },
    media: {
      mimeType: file.mimetype,
      body: Readable.from(file.buffer),
    },
    fields: "id,webViewLink",
    supportsAllDrives: true,
  });

  const driveFileId = createResponse.data.id;

  return {
    driveFileId,
  };
};

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images are required" });
    }

    const results = await Promise.all(
      req.files.map((file) => uploadToGoogleDrive(file))
    );

    const galleryItems = results.map((result) => {
      const _id = new mongoose.Types.ObjectId();
      return { _id, imageUrl: contentUrl(_id), driveFileId: result.driveFileId,
        storageProvider: "google-drive" };
    });

    const savedImages = await Gallery.insertMany(galleryItems);
    res.status(201).json(savedImages.map(galleryResponse));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images.map(galleryResponse));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.json(galleryResponse(image));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Public website images are limited to gallery records. Google credentials stay on the server.
export const getImageContent = async (req, res) => {
  let stream;
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: "Image not found" });
    }
    const image = await Gallery.findById(req.params.id);
    if (!image?.driveFileId) return res.status(404).json({ message: "Image not found" });

    const drive = await getDriveClient();
    const response = await drive.files.get({
      fileId: image.driveFileId, alt: "media", supportsAllDrives: true,
    }, { responseType: "stream", timeout: 60000 });
    stream = response.data;
    const mimeType = (response.headers?.get?.("content-type") || response.headers?.["content-type"] || "")
      .split(";")[0].trim().toLowerCase();
    if (!["image/jpeg", "image/png", "image/gif", "image/webp", "image/avif"].includes(mimeType)) {
      stream.destroy();
      return res.status(415).json({ message: "This gallery file is not a supported image" });
    }
    res.set({
      "Content-Type": mimeType,
      "Content-Disposition": "inline",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=300",
    });
    await pipeline(stream, res);
  } catch (error) {
    stream?.destroy();
    if (res.headersSent || res.destroyed) return;
    const status = Number(error.response?.status || error.code || error.statusCode);
    res.status(status === 404 ? 404 : 502).json({
      message: status === 404 ? "Image not found in Google Drive" : "Unable to load image from Google Drive",
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    if (image.driveFileId) {
      const drive = await getDriveClient();
      await drive.files.delete({
        fileId: image.driveFileId,
        supportsAllDrives: true,
      });
    } else if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
