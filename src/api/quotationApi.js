import apiClient from "./apiClient";

//get quatation

export const getQuotation = async () => {
    const res = await apiClient.get("/quatation")
    return res.data;
}


// Add new quatation
export const addQuotation = async (quatation) => {
  const res = await apiClient.post("/quatation", quatation);
  return res.data;
};

// Update quatation by ID
export const updateQuotation = async (id, quatation) => {
  const res = await apiClient.put(`/quatation/${id}`, quatation);
  return res.data;
};

// Delete quatation by ID
export const deleteQuotation = async (id) => {
  const res = await apiClient.delete(`/quatation/${id}`);
  return res.data;
};