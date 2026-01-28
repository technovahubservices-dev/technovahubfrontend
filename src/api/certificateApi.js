import apiClient from "./apiClient";

//get all gallary images

export const getCertificateData = async () => {
    const res = await apiClient.get("/certificate")
    return res.data;
}


// Add new certificate
export const addCertificateApi = async (certificate) => {
  const res = await apiClient.post("/certificate", certificate);
  return res.data;
};

// Update certificate by ID
export const updateCertificateApi = async (id, certificate) => {
  const res = await apiClient.put(`/certificate/${id}`, certificate);
  return res.data;
};

// Delete certificate by ID
export const deleteCertificateApi = async (id) => {
  const res = await apiClient.delete(`/certificate/${id}`);
  return res.data;
};