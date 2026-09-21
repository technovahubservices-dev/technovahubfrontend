import apiClient from "./apiClient";




export const addSalarySlipApi = async (slip) => {
  const res = await apiClient.post("/salary", slip);
  return res.data;
};
