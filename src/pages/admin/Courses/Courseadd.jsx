import React, { useState, useEffect } from "react";
import { addCourseApi, updateCourseApi } from "../../../api/CourseApi";
import toast from "react-hot-toast";

const Courseadd = ({ editingCourse, onDone }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingCourse) {
      setTitle(editingCourse.title);
      setDescription(editingCourse.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingCourse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      if (editingCourse) {
        await updateCourseApi(editingCourse._id, { title, description });
        toast.success("Course updated successfully!");
      } else {
        await addCourseApi({ title, description });
        toast.success("Course added successfully!");
      }
      if (onDone) onDone();
    } catch (err) {
      toast.error("Operation failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        {editingCourse ? "Update Course" : "Add New Course"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Course title"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Course description"
          rows={5}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <div className="flex gap-4 justify-end">
          {editingCourse && (
            <button
              type="button"
              onClick={onDone}
              className="px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md transition ${
              editingCourse
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? (editingCourse ? "Updating..." : "Adding...") : editingCourse ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Courseadd;
