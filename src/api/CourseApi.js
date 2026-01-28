import apiClient from "./apiClient";

//get all gallary images

export const getCourseApi = async () => {
    const res = await apiClient.get("/courses")
    return res.data;
}

// Add a new course
export const addCourseApi = async (course) => {
  const res = await apiClient.post("/courses", course);
  return res.data;
};


// Delete a course by ID
export const deleteCourseApi = async (id) => {
  const res = await apiClient.delete(`/courses/${id}`);
  return res.data;
};


// Update a course by ID
export const updateCourseApi = async (id, course) => {
  const res = await apiClient.put(`/courses/${id}`, course);
  return res.data;
};