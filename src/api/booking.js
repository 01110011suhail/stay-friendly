// ../api/booking.js

import axios from "./axios";

export const bookProperty = async (request) => {
  const res = await axios.post("/user/book", request);
  return res.data.data;
};

export const getUserBookings = async () => {
  const res = await axios.get("/user/bookings");
  return res.data.data;
};

// NEW: Get bookings for properties owned by the current owner
export const getOwnerBookings = async () => {
  const res = await axios.get("/owner/bookings"); // adjust endpoint as per your backend
  return res.data.data;
};