import axios from "./axios";

export const getAllProperties = async (page = 0, size = 10) => {
  const res = await axios.get(`/user/search?keyword=&page=${page}&size=${size}`);
  return res.data.data; // matches ApiResponse wrapper
};

export const getPropertyById = async (id) => {
  const res = await axios.get(`/property/${id}`);
  return res.data.data;
};

export const filterProperties = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const res = await axios.get(`/user/filter?${params}`);
  return res.data.data;
};