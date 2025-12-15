// import axios from "axios";

// const API_URL = "http://localhost:5050/api/auth";

// export const registerUser = async (data) => {
//   return axios.post(`${API_URL}/register`, data);
// };

// export const loginUser = async (data) => {
//   return axios.post(`${API_URL}/login`, data);
// };

import api from "./api";

export const registerUser = (data) => {
  return api.post("/register", data);
};

export const loginUser = (data) => {
  return api.post("/login", data);
};
