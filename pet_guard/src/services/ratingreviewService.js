import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5050";

export const addOrUpdateReview = (shelterId, data, token) => {
  return axios.post(`${API}/api/reviews/${shelterId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getShelterReviews = (shelterId) => {
  return axios.get(`${API}/api/reviews/${shelterId}`);
};
