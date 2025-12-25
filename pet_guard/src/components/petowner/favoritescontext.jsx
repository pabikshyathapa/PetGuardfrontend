// src/context/FavoritesContext.jsx
// CREATE THIS NEW FILE

import { createContext, useContext, useState, useEffect } from "react";
import {
  toggleFavorite,
  getFavorites,
} from "../../services/petowner/favoriteService";

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all favorites on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  // Load favorites from backend
  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getFavorites();
      console.log("Loaded favorites:", response.favorites); // DEBUG
      setFavorites(response.favorites || []);
      
      // Create a Set of favorite IDs for quick lookup
      const ids = new Set(response.favorites?.map((shelter) => shelter._id) || []);
      setFavoriteIds(ids);
    } catch (err) {
      setError(err.message);
      console.error("Error loading favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle favorite status
  const handleToggleFavorite = async (shelterId) => {
    try {
      console.log("Toggling favorite for:", shelterId); // DEBUG
      const response = await toggleFavorite(shelterId);
      console.log("Toggle response:", response); // DEBUG
      
      if (response.isFavorite) {
        // Added to favorites
        console.log("Adding to favorites"); // DEBUG
        setFavoriteIds((prev) => new Set([...prev, shelterId]));
      } else {
        // Removed from favorites - THIS IS THE CRITICAL PART
        console.log("Removing from favorites"); // DEBUG
        
        // 1. Remove from favoriteIds Set
        setFavoriteIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(shelterId);
          return newSet;
        });
        
        // 2. Remove from favorites array IMMEDIATELY (this makes it disappear)
        setFavorites((prev) => {
          const updated = prev.filter((shelter) => shelter._id !== shelterId);
          console.log("Updated favorites array:", updated); // DEBUG
          return updated;
        });
      }
      
      return response;
    } catch (err) {
      setError(err.message);
      console.error("Error toggling favorite:", err);
      throw err;
    }
  };

  // Check if a shelter is favorited
  const isFavorite = (shelterId) => {
    return favoriteIds.has(shelterId);
  };

  // Get favorite count
  const getFavoriteCount = () => {
    return favoriteIds.size;
  };

  const value = {
    favorites,
    favoriteIds,
    loading,
    error,
    isFavorite,
    handleToggleFavorite,
    loadFavorites,
    getFavoriteCount,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the favorites context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};