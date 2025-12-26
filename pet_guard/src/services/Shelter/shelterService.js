import axios from "axios";
const API = axios.create({
baseURL: "http://localhost:5050/api",
});

API.interceptors.request.use((req) => {
const token = localStorage.getItem("token");
if (token) req.headers.Authorization = `Bearer ${token}`;
return req;
});

export const getMyShelter = () => API.get("/shelters/me");

export const saveShelter = async (formData) => {
  const res = await API.post("/shelters", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data; 
};