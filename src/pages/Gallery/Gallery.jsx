
import React, { useEffect, useState } from "react";
import Title from "../../Components/Title";
import AOS from "aos";
import "aos/dist/aos.css";
import { getGalleryImages } from "../../api/gallaryApi";

const Gallery = () => {
  const getGalleryImageUrl = (img) => {
    if (img.driveFileId) {
      return `https://lh3.googleusercontent.com/d/${img.driveFileId}=w500`;
    }

    return img.imageUrl;
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [failedImages, setFailedImages] = useState(new Set());

  useEffect(() => {
    let active = true;

    const fetchImages = async () => {
      try {
        const data = await getGalleryImages();

        if (active) {
          setImages(data || []);
        }
      } catch (err) {
        if (active) {
          setError(
            err.response?.data?.message ||
              "Unable to load gallery images. Please try again later."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchImages();

    AOS.init({
      duration: 800,
      once: true,
    });

    return () => {
      active = false;
    };
  }, []);

  const handleImageClick = (img) => {
    const hasImage = img.driveFileId || img.imageUrl;

    if (hasImage && !failedImages.has(img._id)) {
      setSelectedImage(getGalleryImageUrl(img));
    }
  };

  const handleImageError = (id) => {
    setFailedImages((previous) => {
      const updated = new Set(previous);
      updated.add(id);
      return updated;
    });
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title text="Gallery" />

        <div
          className="mt-6 text-center text-blue-900"
          role="status"
        >
          {loading
            ? "Loading gallery..."
            : error
            ? error
            : images.length === 0
            ? "No gallery images yet."
            : ""}
        </div>

        {/* Gallery Grid */}
        {!loading && !error && images.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, index) => {
              const imageUrl = getGalleryImageUrl(img);

              const unavailable =
                (!img.driveFileId && !img.imageUrl) ||
                failedImages.has(img._id);

              return (
                <div
                  key={img._id || index}
                  className="h-56 overflow-hidden rounded-lg cursor-pointer"
                  data-aos="zoom-in"
                  onClick={() => handleImageClick(img)}
                >
                  {unavailable ? (
                    <div
                      className="h-full flex items-center justify-center bg-blue-50 text-blue-900"
                      role="status"
                    >
                      Image unavailable
                    </div>
                  ) : (
                    <img
                      src={imageUrl}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(img._id)}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Lightbox Popup */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Zoomed gallery"
              referrerPolicy="no-referrer"
              className="max-w-[95vw] max-h-[95vh] rounded-xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 text-white text-4xl font-light"
              aria-label="Close image"
            >
              &times;
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
