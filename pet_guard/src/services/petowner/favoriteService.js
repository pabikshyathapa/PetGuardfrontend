const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050/api";

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Add shelter to favorites
export const addToFavorites = async (shelterId) => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/favorites/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ shelterId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add to favorites");
  }

  return response.json();
};

// Remove shelter from favorites
export const removeFromFavorites = async (shelterId) => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/favorites/remove/${shelterId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to remove from favorites");
  }

  return response.json();
};

// Toggle favorite (add or remove)
export const toggleFavorite = async (shelterId) => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/favorites/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ shelterId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to toggle favorite");
  }

  return response.json();
};

// Get all favorite shelters
export const getFavorites = async () => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch favorites");
  }

  return response.json();
};

// Check if shelter is in favorites
export const checkFavorite = async (shelterId) => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/favorites/check/${shelterId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to check favorite status");
  }

  return response.json();
};