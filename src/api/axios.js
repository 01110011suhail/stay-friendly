import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: attach token automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // JWT saved after login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;