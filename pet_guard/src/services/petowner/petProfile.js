import axios from "axios";

const API_URL = "http://localhost:5050/api/pets";

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getPets = async () => {
  const res = await axios.get(API_URL, authConfig());
  return res.data;
};

// export const createPet = async (formData) => {
//   const res = await axios.post(API_URL, formData, authConfig());
//   return res.data;
// };

// export const updatePet = async (id, formData) => {
//   const res = await axios.put(`${API_URL}/${id}`, formData, authConfig());
//   return res.data;
// };
export const createPet = async (formData) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updatePet = async (id, formData) => {
  const res = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deletePet = async (id) => {
  try {
    if (!id) throw new Error("Pet ID missing");

    const res = await axios.delete(`${API_URL}/${id}`, authConfig());
    return res.data;
  } catch (error) {
    console.error(
      "DELETE PET ERROR:",
      error.response?.data || error.message
    );
    throw error;
  }
};
