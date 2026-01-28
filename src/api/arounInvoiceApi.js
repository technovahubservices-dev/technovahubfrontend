import apiClient from "./apiClient";

//get Invoice

export const getAInvoice = async () => {
    const res = await apiClient.get("/arouninvoice")
    return res.data;
}


// Add new Invoice
export const addAInvoice = async (ainvoice) => {
  const res = await apiClient.post("/arouninvoice", ainvoice);
  return res.data;
};

// UpdateInvoice by ID
export const updateAInvoice = async (id, ainvoice) => {
  const res = await apiClient.put(`/arouninvoice/${id}`, ainvoice);
  return res.data;
};

// Delete Invoice by ID
export const deleteAInvoice= async (id) => {
  const res = await apiClient.delete(`/arouninvoice/${id}`);
  return res.data;
};