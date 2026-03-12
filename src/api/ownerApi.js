import axiosClient from "./axiosClient";

export const addProperty = (data) => {
  return axiosClient.post("/owner/property", data);
};

export const updateProperty = (id, data) => {
  return axiosClient.put(`/owner/property/${id}`, data);
};

export const deleteProperty = (id) => {
  return axiosClient.delete(`/owner/property/${id}`);
};

export const getOwnerProperties = () => {
  return axiosClient.get("/owner/properties");
};  