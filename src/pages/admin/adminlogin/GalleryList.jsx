import React, { useEffect, useState } from "react";
import { getGalleryImages, deleteGalleryImage } from "../../../api/gallaryApi";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";



const GalleryList = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGalleryImages();
        setGalleryData(data || []);
      } catch (err) {
     toast.error("Error fetching gallery images:", err);
        setError("Failed to load gallery images.");
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this image?");
    if (!confirm) return;

    try {
      await deleteGalleryImage(id);
     
      setGalleryData(galleryData.filter((item) => item._id !== id));
      toast.success("Gallery deleted ")
    } catch (err) {
     
      toast.error("Failed to delete image. Please try again.");
    }
  };

  if (loading) return (
<div className="flex items-center justify-center h-[50vh] ">
      <div className="loader"></div>
    </div>
  ) 
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = galleryData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(galleryData.length / itemsPerPage);

  return (
    <div className="md:p-6   ">
      <h2 className="text-xl md:text-3xl  mb-6 text-blue-600">Gallery List</h2>
      <p className="text-sm  mb-3 text-blue-600" > <em>Number of images: {galleryData.length}</em> </p>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-indigo-100 text-blue-800 ">
            <tr>
              <th className="py-2 px-2 text-center font-medium">Sl. No</th>
              <th className="py-3 px-4 text-center font-medium">Image</th>
              <th className="py-3 px-4 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-indigo-50 transition-colors duration-200 border-b border-gray-100"
              >
                <td className="py-2 px-4">{indexOfFirstItem + index + 1}</td>
                <td className="py-2 px-4">
                  <img
                    src={item.imageUrl}
                    alt={`Gallery ${index + 1}`}
                    className="w-[50px] h-[50px] md:w-32 md:h-20 object-cover rounded shadow-sm"
                  />
                </td>
                <td className="py-2 px-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 p-3 text-white cursor-pointer  px-2 mt-5 py-1 rounded hover:bg-red-600 transition text-sm flex items-center gap-1"
                  >
                 Delete
                  </button>
                </td>
              </tr>
            ))}
            {galleryData.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No images found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border transition ${
                currentPage === i + 1
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "bg-white text-indigo-600 border-indigo-300 hover:bg-indigo-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryList;
