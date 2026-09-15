import React, { useState } from "react";
import { uploadGalleryImages } from "../../api/gallaryApi"; 
import toast from "react-hot-toast";

const AddGalleryImage = ({ driveConnected = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10 || files.some((file) => file.size > 5 * 1024 * 1024)) {
      toast.error('Select up to 10 images, each 5 MB or smaller.');
      e.target.value = '';
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
    if (files.some((file) => !allowedTypes.includes(file.type))) {
      toast.error('Use JPG, PNG, GIF, WebP, or AVIF images.');
      e.target.value = '';
      return;
    }
    selectedImages.forEach((image) => URL.revokeObjectURL(image.preview));
    const images = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedImages(images);
  };

  // Remove single image from preview
  const removeImage = (index) => {
    const newImages = [...selectedImages];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  // Handle submit
  const handleSubmit = async () => {
    if (selectedImages.length === 0 || loading || !driveConnected) return;

    setLoading(true);
    try {
      await uploadGalleryImages(selectedImages);
     toast.success(`${selectedImages.length} image(s) saved to Google Drive!`);
      selectedImages.forEach((image) => URL.revokeObjectURL(image.preview));
      setSelectedImages([]);
      setIsModalOpen(false);
      // Optional: refresh gallery list after upload
      window.location.reload(); 
    } catch (err) {
      console.error("Upload failed:", err);
        toast.error(err.response?.data?.message || "Failed to upload images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end  md:p-6">
      {/* Add Image Button */}
      <button
        className="bg-blue-500 text-white md:px-4 md:py-2 p-2 text-sm border-2 border-white rounded hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!driveConnected}
        onClick={() => setIsModalOpen(true)}
      >
        + Image
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-30">
          <div className="bg-white w-11/12 max-w-lg rounded-lg p-6 relative shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              disabled={loading}
              onClick={() => {
                selectedImages.forEach((image) => URL.revokeObjectURL(image.preview));
                setSelectedImages([]);
                setIsModalOpen(false);
              }}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
            <p className="text-sm text-gray-600 mb-4">Save to Google Drive. Up to 10 images, 5 MB each. Uploaded images are visible in the website gallery.</p>

            {/* File Input */}
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
              disabled={loading}
              multiple
              onChange={handleFileChange}
              className="mb-4"
            />

            {/* Preview */}
            {selectedImages.length > 0 && (
              <div className="mb-4 grid grid-cols-2 gap-4 max-h-64 overflow-y-auto">
                {selectedImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img.preview}
                      alt={`preview-${index}`}
                      className="w-full h-32 object-contain border rounded"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      disabled={loading}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <button
              className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={selectedImages.length === 0 || loading || !driveConnected}
            >
              {loading ? "Uploading to Google Drive..." : "Upload to Google Drive"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddGalleryImage;
