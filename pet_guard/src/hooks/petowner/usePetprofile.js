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
    editPet: async (id, data) => {
      await updatePet(id, data);
      fetchPets();
    },
    removePet: async (id) => {
      await deletePet(id);
      fetchPets();
    },
  };
};
