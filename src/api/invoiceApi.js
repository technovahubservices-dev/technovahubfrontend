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

// Reuse the existing database delete endpoint, limiting concurrent requests.
export const deleteSelectedQuotations = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0 ||
      ids.some((id) => typeof id !== "string" || !/^[a-f\d]{24}$/i.test(id))) {
    throw new Error("Select valid quotation IDs before deleting.");
  }

  const uniqueIds = [...new Set(ids)];
  const deletedIds = [];
  const failedIds = [];
  for (let index = 0; index < uniqueIds.length; index += 5) {
    const batch = uniqueIds.slice(index, index + 5);
    const results = await Promise.allSettled(batch.map((id) => deleteInvoice(id)));
    results.forEach((result, batchIndex) => {
      (result.status === "fulfilled" ? deletedIds : failedIds).push(batch[batchIndex]);
    });
  }
  return { deletedIds, failedIds, deletedCount: deletedIds.length };
};
