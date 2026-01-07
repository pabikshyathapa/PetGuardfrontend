// import { useEffect, useState } from "react";
// import { getMyShelter, saveShelter } from "../../services/Shelter/shelterService";

// const emptyShelter = {
//   name: "",
//   location: "",
//   description: "",
//   services: [],
//   status: "available",
//   pricePerDay: "",
// };

// export default function useShelterProfile() {
//   const [data, setData] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getMyShelter()
//       .then((res) => {
//         if (res.data) {
//           setData(res.data);
//         } else {
//           //  FIRST TIME SHELTER OWNER
//           setData(emptyShelter);
//           setEditMode(true); // auto open edit mode
//         }
//       })
//       .catch(() => {
//         setData(emptyShelter);
//         setEditMode(true);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//  const handleSave = async (formData) => {
//   const res = await saveShelter(formData); // saveShelter returns the updated shelter
//   if (res.data) {
//     setData(res.data); // ✅ update state immediately
//   }
// };

//   return {
//     data,
//     setData,
//     editMode,
//     setEditMode,
//     handleSave,
//     loading,
//   };
// }

import { useEffect, useState } from "react";
import { getMyShelter, saveShelter } from "../../services/Shelter/shelterService";

const emptyShelter = {
  name: "",
  location: "",
  contact: "",
  description: "",
  services: [],
  status: "available",
  pricePerDay: "",
  photos: [],
  documents: [],
  rooms: [],
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
          // FIRST TIME SHELTER OWNER
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
    try {
      const res = await saveShelter(formData);
      
      // Backend returns { success: true, message: "...", shelter: {...} }
      if (res.data && res.data.shelter) {
        console.log("Updated shelter data:", res.data.shelter);
        setData(res.data.shelter); // ✅ update state immediately with the shelter object
      } else if (res.data) {
        // In case backend returns the shelter directly
        setData(res.data);
      }
    } catch (error) {
      console.error("Error saving shelter:", error);
      throw error;
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
