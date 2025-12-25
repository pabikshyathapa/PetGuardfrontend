import { useEffect, useState } from "react";
import { getMyShelter, saveShelter } from "../../services/Shelter/shelterService";

const emptyShelter = {
  name: "",
  location: "",
  description: "",
  services: [],
  status: "available",
  pricePerDay: "",
};

export default function useShelterProfile() {
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyShelter()
      .then((res) => {
        if (res.data) {
          setData(res.data);
        } else {
          //  FIRST TIME SHELTER OWNER
          setData(emptyShelter);
          setEditMode(true); // auto open edit mode
        }
      })
      .catch(() => {
        setData(emptyShelter);
        setEditMode(true);
      })
      .finally(() => setLoading(false));
  }, []);

 const handleSave = async (formData) => {
  const res = await saveShelter(formData); // saveShelter returns the updated shelter
  if (res.data) {
    setData(res.data); // ✅ update state immediately
  }
};

  return {
    data,
    setData,
    editMode,
    setEditMode,
    handleSave,
    loading,
  };
}
