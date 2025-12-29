import axios from "axios";

const API = "http://localhost:5050/api/bookings";

const getToken = () => localStorage.getItem("token");

export const getShelterBookings = async () => {
  return axios.get(`${API}/shelter`, {
    headers: { Authorization: `Bearer ${getToken()}` }, // ✅ FIXED
  });
};

export const getBookingDetails = async (id) => {
  return axios.get(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }, 
  });
};

// Mark payment as paid (cash or eSewa)
export const markCashPaid = async (id) => {
  const token = getToken(); // correctly get token
  return axios.put(
    `${API}/${id}/mark-paid`,
    {}, // PUT body
    { headers: { Authorization: `Bearer ${token}` } } // use token
  );
};

export const completeBooking = async (id) => {
  return axios.put(
    `${API}/${id}/complete`,
    {},
    {
      headers: { Authorization: `Bearer ${getToken()}` }, 
    }
  );
};
