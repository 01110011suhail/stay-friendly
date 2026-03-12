import axiosClient from "./axiosClient";

export const getUserDashboard = () => {
  return axiosClient.get("/dashboard/user");
};

export const getOwnerDashboard = () => {
  return axiosClient.get("/dashboard/owner");
};