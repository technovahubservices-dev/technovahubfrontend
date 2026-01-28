import React, { useState } from "react";
import Courseadd from "./Courseadd";
import CourseList from "./CourseList";

const CourseAdmin = () => {
  const [editingCourse, setEditingCourse] = useState(null); 
  const [refreshList, setRefreshList] = useState(false); 
  const [showModal, setShowModal] = useState(false); // modal visibility

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingCourse(null);
    setShowModal(true);
  };

  const handleDone = () => {
    setEditingCourse(null);
    setShowModal(false);
    setRefreshList(!refreshList); 
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Course Management</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition"
        >
          Add New Course
        </button>
      </div>

      <CourseList onEdit={handleEdit} refresh={refreshList} />

      {/* Modal */}
      {showModal && (
  <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-md  flex justify-center items-center z-50">
    <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
        onClick={() => setShowModal(false)}
      >
        &times;
      </button>
      <Courseadd editingCourse={editingCourse} onDone={handleDone} />
    </div>
  </div>
)}

    </div>
  );
};

export default CourseAdmin;
