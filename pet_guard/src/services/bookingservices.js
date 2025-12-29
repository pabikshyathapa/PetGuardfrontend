import axios from "../api/api";

export const createBooking = (data) =>
  axios.post("/bookings", data);

export const getMyBookings = () =>
  axios.get("/bookings/my-bookings");

export const getShelterBookings = () =>
  axios.get("/bookings/shelter");

export const cancelBooking = (id) =>
  axios.put(`/bookings/${id}/cancel`);

