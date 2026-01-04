import api from "./api";

export const registerUser = (data) => {
  return api.post("/register", data);
};

export const loginUser = (data) => {
  return api.post("/login", data);
};

// New: Update logged-in user
export const updateUser = (data, token) => {
  return api.put("/update", data, {
    headers: {
      Authorization: `Bearer ${token}`, // send token for authentication
    },
  });
};

export const getProfile = (token) => {
  return api.get("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const changePassword = (data, token) => {
  return api.put("/change-password", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const forgotPassword = (data) => {
  return api.post("/forgot-password", data);
};

export const resetPassword = (data) => {
  return api.post("/reset-password", data);
};