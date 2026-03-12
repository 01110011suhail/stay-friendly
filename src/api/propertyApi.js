import axiosClient from "./axiosClient";

export const searchProperties = (keyword, page = 0) => {
  return axiosClient.get(`/user/search?keyword=${keyword}&page=${page}&size=10`);
};

export const filterProperties = (filters) => {
  return axiosClient.get("/user/filter", { params: filters });
};

export const getPropertyAvailability = (id) => {
  return axiosClient.get(`/user/property/${id}/availability`);
};