import apiClient from "./apiClient";
import { API_URL } from "../data/constants";

// Get all gallery images
export const getGalleryImages = async () => {
  const res = await apiClient.get("/gallery");
  return res.data.map((item) => ({
    ...item,
    imageUrl: item.imageUrl ? new URL(item.imageUrl, `${API_URL}/`).href : "",
  }));
};

export const getGoogleDriveStatus = async () => {
  const res = await apiClient.get("/auth/google-drive/status");
  return res.data;
};

export const completeGoogleDrive = async (code, state) => {
  const res = await apiClient.post("/auth/google-drive/complete", { code, state });
  return res.data;
};

// Start Google Drive connection for admin gallery
export const connectGoogleDrive = async () => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("Admin not logged in");

  const res = await apiClient.get("/auth/google-drive/connect", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

// Delete a gallery image
export const deleteGalleryImage = async (id) => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("Admin not logged in");

  const res = await apiClient.delete(`/gallery/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Upload multiple gallery images
export const uploadGalleryImages = async (images) => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("Admin not logged in");

  const formData = new FormData();
  images.forEach((img) => formData.append("images", img.file));

  const res = await apiClient.post("/gallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
