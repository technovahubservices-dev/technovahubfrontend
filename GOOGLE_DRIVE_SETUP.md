# Google Drive gallery storage

The frontend works with the matching backend changes in `D:/Technovahub-solution_backend`.
Deploy both repositories to enable Drive uploads. Existing Cloudinary records continue to work;
new uploads require an admin Google Drive connection. No existing images are migrated.

## Backend configuration

Use Node.js 22 or later. Enable the Google Drive API in your Google Cloud project,
configure the OAuth consent screen, and create an OAuth client of type **Web application**.
Add the exact backend callback URL below to its authorized redirect URIs.

Set these variables in your backend hosting environment (locally, `.env.local`):

```dotenv
GOOGLE_CLIENT_ID=your-web-client-id
GOOGLE_CLIENT_SECRET=your-web-client-secret
GOOGLE_DRIVE_REDIRECT_URI=https://technovahub-solution-backend.onrender.com/api/auth/google-drive/callback
FRONTEND_URL=https://technovahub.in
GOOGLE_DRIVE_TOKEN_KEY=your-64-character-hex-key
```

Generate the encryption key once using:

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Keep the key stable and secret: stored refresh tokens cannot be decrypted after replacing it.
Keep all Google secrets on the backend; do not use `VITE_` variables for them.
Existing MongoDB, JWT, and Cloudinary configuration remains necessary for the application
and older images. No additional npm dependencies are required.

For local development, use `http://localhost:9000/api/auth/google-drive/callback`
and `FRONTEND_URL=http://localhost:5173`, and set the frontend `VITE_API_BASE_URL=http://localhost:9000`.

If the Google consent app is in Testing, add the connecting Google account as a test user.
Google may expire test-mode refresh tokens after seven days; configure production publishing
as appropriate before relying on persistent gallery access.

## Use

1. Deploy the updated backend and frontend.
2. Sign in as admin and open **Gallery**.
3. Click **Connect Google Drive**, select your Google account, and allow file access.
4. The app creates a **TechnovaHub Gallery** folder in that account.
5. Click **+ Image**, select up to 10 images (5 MB each), then **Upload to Google Drive**.

The app requests only `drive.file` access. Refresh tokens are encrypted in MongoDB.
OAuth completion requires the initiating admin's authentication, a matching browser session
state, and an unexpired, single-use server state record.
Files remain private in Drive. The public gallery API serves image bytes to website visitors;
uploading to this gallery therefore makes the image visible on the website.
Deleting a gallery entry also deletes its Drive file. Cloudinary entries still use Cloudinary deletion.
Reconnect creates a new folder/connection; old entries retain their original connection.
Revoking the old Google grant can prevent older images from loading.

## Validation

Run `node --experimental-vm-modules --test tests/googleDrive*.test.js` in the backend and `npm run build` in the frontend.
The tests mock Google and database calls. A live account check is still required:
connect, upload an image, verify the Drive folder and website thumbnail, and delete the test image.

References: [Google server OAuth](https://developers.google.com/identity/protocols/oauth2/web-server),
[Drive uploads](https://developers.google.com/workspace/drive/api/guides/manage-uploads),
[Drive downloads](https://developers.google.com/workspace/drive/api/guides/manage-downloads).
