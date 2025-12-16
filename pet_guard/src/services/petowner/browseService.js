import api from "../api";

const BASE = "http://localhost:5050/api/shelters";
export const IMAGE_URL = "http://localhost:5050/uploads";

export const getAllShelters = async () => {
  const res = await api.get(`${BASE}`);
  return res.data;
};

export const getShelterById = async (id) => {
  const res = await api.get(`${BASE}/${id}`);
  return res.data;
};
