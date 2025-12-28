import { useState, useEffect } from "react";
import { getPets, createPet, updatePet, deletePet } from "../../services/petowner/petProfile";
import { useAuth } from "../../auth/AuthProvider";

export const usePets = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await getPets();
      setPets(data);
    } catch {
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setPets([]);
      setLoading(false);
      return;
    }
    fetchPets();
  }, [user]);

  return {
    pets,
    loading,
    fetchPets,
    addPet: async (data) => {
      await createPet(data);
      fetchPets();
    },
    // editPet: async (id, data) => {
    //   await updatePet(id, data);
    //   fetchPets();
    // },
    editPet: async (id, formData) => {
  try {
    const res = await updatePet(id, formData);
    console.log("Pet updated:", res.pet);
    await fetchPets();
  } catch (error) {
    console.error("EDIT PET ERROR:", error.response?.data || error.message);
    throw error;
  }
},
addPet: async (data) => {
  try {
    const res = await createPet(data);
    console.log("Pet added:", res.pet);
    await fetchPets();
  } catch (error) {
    console.error("ADD PET ERROR:", error.response?.data || error.message);
    throw error;
  }
},
    removePet: async (id) => {
  if (!id) return;

  try {
    await deletePet(id);

    setPets((prev) => prev.filter((pet) => pet._id !== id));
  } catch (error) {
    console.error("Failed to delete pet");
  }
},
  };
};
