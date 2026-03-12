import axiosClient from "./axiosClient";

// Login user
export const login = (data) => axiosClient.post("/auth/login", data);

// Register user
export const register = (data) => axiosClient.post("/auth/register", data);

// Refresh token
export const refreshToken = (data) => axiosClient.post("/auth/refresh", data);