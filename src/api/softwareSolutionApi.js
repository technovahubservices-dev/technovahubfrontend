import apiClient from "./apiClient";

//get all gallary images

export const getSoftwareSolutionApi = async () => {
    const res = await apiClient.get("/softwareSolution")
    return res.data;
}
export const addSoftwareSolutionApi = async (solution) => {
  const res = await apiClient.post("/softwareSolution", solution);
  return res.data;
};
