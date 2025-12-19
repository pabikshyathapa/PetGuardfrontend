import axios from "axios";

const API_URL = "http://localhost:5050/api/pets";
const token = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getPets = async () => {
  const res = await axios.get(API_URL, config);
  return res.data;
};

export const createPet = async (formData) => {
  const res = await axios.post(API_URL, formData, config);
  return res.data;
};

export const updatePet = async (id, formData) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, config);
  return res.data;
};

export const deletePet = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, config);
  return res.data;
};
