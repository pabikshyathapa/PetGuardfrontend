import axios from "axios";

const API_URL = "http://localhost:5050/api/notifications";

// Internal helper to get the token directly from storage
const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export const notificationService = {
  getNotifications: async () => {
    const response = await axios.get(API_URL, getHeaders());
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await axios.put(`${API_URL}/${id}/read`, {}, getHeaders());
    return response.data;
  }
};