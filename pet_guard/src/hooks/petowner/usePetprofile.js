import { useState, useEffect } from "react";
import { getPets, createPet, updatePet, deletePet } from "../../services/petowner/petProfile";

export const usePets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const data = await getPets();
      setPets(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const addPet = async (formData) => {
    await createPet(formData);
    await fetchPets();
  };

  const editPet = async (id, formData) => {
    await updatePet(id, formData);
    await fetchPets();
  };

  const removePet = async (id) => {
    await deletePet(id);
    await fetchPets();
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return { pets, loading, fetchPets, addPet, editPet, removePet };
};
