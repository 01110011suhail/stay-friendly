import axiosClient from "./axiosClient";

export const bookProperty = (data) => {
  return axiosClient.post("/user/book", data);
};

export const getUserBookings = () => {
  return axiosClient.get("/user/bookings");
};

export const cancelBooking = (bookingId) => {
  return axiosClient.post(`/user/cancel/${bookingId}`);
};

export const getOwnerBookings = () => {
  return axiosClient.get("/owner/bookings");
};