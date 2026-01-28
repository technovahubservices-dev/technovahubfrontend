import apiClient from "./apiClient";

//get Invoice

export const getInvoice = async () => {
    const res = await apiClient.get("/invoice")
    return res.data;
}


// Add new Invoice
export const addInvoice = async (invoice) => {
  const res = await apiClient.post("/invoice", invoice);
  return res.data;
};

// UpdateInvoice by ID
export const updateInvoice = async (id, invoice) => {
  const res = await apiClient.put(`/invoice/${id}`, invoice);
  return res.data;
};

// Delete Invoice by ID
export const deleteInvoice= async (id) => {
  const res = await apiClient.delete(`/invoice/${id}`);
  return res.data;
};