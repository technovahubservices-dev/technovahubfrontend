import React, { useEffect, useState } from "react";
import { getCourseApi, deleteCourseApi } from "../../../api/CourseApi";
import toast from "react-hot-toast";


const CourseList = ({ onEdit, refresh }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await getCourseApi();
      setCourses(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this course?")) return;
    try {
      await deleteCourseApi(id);
      setCourses(courses.filter((c) => c._id !== id));
      toast.success("Course deleted");
    } catch (err) {
      toast.error("Failed to delete course");
    }
  };

  if (loading) return (
<div className="flex items-center justify-center h-[50vh] ">
      <div className="loader"></div>
    </div>
  ) 

  // Pagination logic
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="p-3 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-600">
        Course List
      </h2>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto w-full rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-200 table-auto md:table-fixed">
          <thead className="bg-indigo-100 text-indigo-800 font-bold">
            <tr>
              <th className="md:py-3 md:px-4 py-2 px-2 text-left">Sl. No</th>
              <th className="py-3 px-2 text-left">Title</th>
              <th className="py-3 px-2 text-left">Description</th>
              <th className="py-3 px-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((course, index) => (
              <tr
                key={course._id}
                className="hover:bg-indigo-50 transition-colors duration-200 border-b border-gray-100"
              >
                <td className="py-2 px-2 md:px-4 text-sm md:text-base">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="py-2 px-2 md:px-4 font-medium text-gray-800 text-sm md:text-base">
                  {course.title}
                </td>
                <td className="py-2 px-2 md:px-4 text-gray-600 text-xs md:text-sm break-words max-w-[200px] md:max-w-full">
                  {course.description}
                </td>
                <td className="py-2 px-2 md:px-4 flex gap-2 flex-wrap">
                  <button
                    className="bg-indigo-500 text-white px-2 py-1 md:px-3 md:py-1 rounded hover:bg-indigo-600 transition text-xs md:text-sm"
                    onClick={() => onEdit(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 md:px-3 md:py-1 rounded hover:bg-red-600 transition text-xs md:text-sm"
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded border text-sm transition ${
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

export default CourseList;
