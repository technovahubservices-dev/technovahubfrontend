import apiClient from "./apiClient";

//get all gallary images

export const getSoftwareSolutionApi = async () => {
    const res = await apiClient.get("/softwareSolution")
    return res.data;
}