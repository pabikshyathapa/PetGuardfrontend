// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { usePets } from "../../hooks/petowner/usePetprofile";

// export default function PetProfilePage() {
//   const { pets, loading, addPet, editPet } = usePets();
//   const [selectedPet, setSelectedPet] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     petName: "",
//     location: "",
//     type: "",
//     breed: "",
//     gender: "",
//     age: "",
//     weight: "",
//     health: "",
//     characteristics: "",
//     emergencyContactName: "",
//     emergencyContactPhone: "",
//     photo: null,
//   });

//   // Select first pet on load
//   useEffect(() => {
//     if (pets.length > 0 && !selectedPet) {
//       handleSelectPet(pets[0]);
//     }
//   }, [pets]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
//   };

//   const handleSelectPet = (pet) => {
//     setSelectedPet(pet);
//     setEditMode(false);
//     setFormData({
//       petName: pet.petName || "",
//       location: pet.location || "",
//       type: pet.type || "",
//       breed: pet.breed || "",
//       gender: pet.gender || "",
//       age: pet.age || "",
//       weight: pet.weight || "",
//       health: pet.health || "",
//       characteristics: pet.characteristics?.join(", ") || "",
//       emergencyContactName: pet.emergencyContact?.name || "",
//       emergencyContactPhone: pet.emergencyContact?.phone || "",
//       photo: null,
//     });
//   };

//   const handleAdd = () => {
//     setSelectedPet(null);
//     setEditMode(true);
//     setFormData({
//       petName: "",
//       location: "",
//       type: "",
//       breed: "",
//       gender: "",
//       age: "",
//       weight: "",
//       health: "",
//       characteristics: "",
//       emergencyContactName: "",
//       emergencyContactPhone: "",
//       photo: null,
//     });
//   };

//   const handleSubmit = async () => {
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (formData[key] !== null) data.append(key, formData[key]);
//     });

//     if (selectedPet) {
//       await editPet(selectedPet._id, data);
//     } else {
//       await addPet(data);
//     }

//     setEditMode(false);
//     setSelectedPet(null);
//   };

//   const renderForm = () => (
//     <div style={{ marginTop: 20, textAlign: "left" }}>
//       {[
//         "petName",
//         "type",
//         "breed",
//         "gender",
//         "age",
//         "weight",
//         "health",
//         "characteristics",
//         "location",
//         "emergencyContactName",
//         "emergencyContactPhone",
//       ].map((f) => (
//         <input
//           key={f}
//           name={f}
//           placeholder={f}
//           value={formData[f]}
//           onChange={handleChange}
//           style={{
//             marginBottom: 10,
//             width: "100%",
//             padding: 8,
//             borderRadius: 6,
//             border: "1px solid #ccc",
//           }}
//         />
//       ))}
//       <input
//         type="file"
//         onChange={handleFileChange}
//         style={{ marginBottom: 10, width: "100%" }}
//       />
//       <button
//         onClick={handleSubmit}
//         style={{
//           background: "#183D8B",
//           color: "#fff",
//           padding: "10px 20px",
//           borderRadius: 6,
//           border: "none",
//           cursor: "pointer",
//           width: "100%",
//         }}
//       >
//         Save
//       </button>
//     </div>
//   );

//   if (loading) return <div>Loading...</div>;

//   const slideStyle = {
//     background: "#fff",
//     padding: 20,
//     borderRadius: 8,
//     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//     textAlign: "center",
//   };

//   const imgStyle = {
//     width: 120,
//     height: 120,
//     borderRadius: "50%",
//     objectFit: "cover",
//     marginBottom: 10,
//     border: "3px solid #183D8B",
//   };

//   const btnStyle = {
//     background: "#183D8B",
//     color: "#fff",
//     padding: "6px 12px",
//     borderRadius: 6,
//     border: "none",
//     cursor: "pointer",
//     marginTop: 10,
//   };

//   return (
//     <div style={{ background: "#F3F1EE", minHeight: "100vh", padding: 20 }}>
//       <div
//         style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}
//       >
//         <h2 style={{ color: "#183D8B" }}>My Pets</h2>
//         <button onClick={handleAdd} style={btnStyle}>
//           Add
//         </button>
//       </div>

//       <Swiper
//         modules={[Navigation, Pagination]}
//         navigation
//         pagination={{ clickable: true }}
//         spaceBetween={20}
//         slidesPerView={1}
//         style={{ paddingBottom: 40 }}
//       >
//         {/* Blank slide for adding a new pet */}
//         {editMode && !selectedPet && (
//           <SwiperSlide key="new">
//             <div style={slideStyle}>
//               <h3 style={{ color: "#183D8B", marginBottom: 10 }}>Add New Pet</h3>
//               {renderForm()}
//             </div>
//           </SwiperSlide>
//         )}

//         {pets.map((pet) => (
//           <SwiperSlide key={pet._id}>
//             <div style={slideStyle}>
//               <img
//                 src={pet.photo ? `http://localhost:5050/uploads/${pet.photo}` : ""}
//                 alt={pet.petName}
//                 style={imgStyle}
//               />
//               <h3 style={{ color: "#183D8B" }}>{pet.petName}</h3>
//               <p>
//                 <strong>Type:</strong> {pet.type} | <strong>Breed:</strong> {pet.breed}
//               </p>
//               <p>
//                 <strong>Gender:</strong> {pet.gender}
//               </p>
//               <p>
//                 <strong>Age:</strong> {pet.age} | <strong>Weight:</strong> {pet.weight}kg
//               </p>
//               <p>
//                 <strong>Health:</strong> {pet.health}
//               </p>
//               <p>
//                 <strong>Characteristics:</strong> {pet.characteristics?.join(", ")}
//               </p>
//               <p>
//                 <strong>Emergency Contact:</strong> {pet.emergencyContact?.name} (
//                 {pet.emergencyContact?.phone})
//               </p>

//               <button onClick={() => handleSelectPet(pet) || setEditMode(true)} style={btnStyle}>
//                 Edit
//               </button>

//               {/* Editable form for this pet */}
//               {selectedPet && selectedPet._id === pet._id && editMode && renderForm()}
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { usePets } from "../../hooks/petowner/usePetprofile";

export default function PetProfilePage() {
  const { pets, loading, addPet, editPet } = usePets();

  // Assuming you have logged-in user info
  const loggedInUser = {
    name: "Pabikshya Thapa",
    email: "pabikshya@gmail.com",
    phone: "9825944718",
  };

  const [selectedPet, setSelectedPet] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    petName: "",
    location: "",
    type: "",
    breed: "",
    gender: "",
    age: "",
    weight: "",
    health: "",
    characteristics: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    photo: null,
  });

  useEffect(() => {
    if (pets.length > 0 && !selectedPet) {
      handleSelectPet(pets[0]);
    }
  }, [pets]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    setEditMode(false);
    setFormData({
      petName: pet.petName || "",
      location: pet.location || "",
      type: pet.type || "",
      breed: pet.breed || "",
      gender: pet.gender || "",
      age: pet.age || "",
      weight: pet.weight || "",
      health: pet.health || "",
      characteristics: pet.characteristics?.join(", ") || "",
      emergencyContactName: pet.emergencyContact?.name || "",
      emergencyContactPhone: pet.emergencyContact?.phone || "",
      photo: null,
    });
  };

  const handleAdd = () => {
    setSelectedPet(null);
    setEditMode(true);
    setFormData({
      petName: "",
      location: "",
      type: "",
      breed: "",
      gender: "",
      age: "",
      weight: "",
      health: "",
      characteristics: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      photo: null,
    });
  };

  const handleSubmit = async () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });

    if (selectedPet) {
      await editPet(selectedPet._id, data);
    } else {
      await addPet(data);
    }

    setEditMode(false);
    setSelectedPet(null);
  };

  if (loading) return <div>Loading...</div>;

  const renderFormInput = (label, name) => (
    <div style={{ marginBottom: "10px" }}>
      <label style={{ display: "block", fontWeight: "bold", color: "#183D8B" }}>{label}</label>
      <input
        type="text"
        name={name}
        value={formData[name]}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );

  return (
    <div style={{ background: "#F3F1EE", minHeight: "100vh", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <button
          onClick={handleAdd}
          style={{
            background: "#183D8B",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Add Pet
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        style={{ paddingBottom: 40 }}
      >
        {(editMode && !selectedPet ? [{ _id: "new" }] : pets).map((pet) => (
          <SwiperSlide key={pet._id}>
            <div
              style={{
                maxWidth: "600px",
                margin: "0 auto",
                background: "#fff",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              {/* Pet Image */}
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                <img
                  src={
                    editMode && selectedPet === null
                      ? "https://via.placeholder.com/150"
                      : pet.photo
                      ? `http://localhost:5050/uploads/${pet.photo}`
                      : "https://via.placeholder.com/150"
                  }
                  alt="Pet"
                  style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", marginBottom: 10 }}
                />
                {editMode && <input type="file" onChange={handleFileChange} />}
                <h2 style={{ color: "#183D8B", margin: "10px 0" }}>
                  {editMode
                    ? <input name="petName" value={formData.petName} onChange={handleChange} style={{ border: "none", textAlign: "center", fontSize: "18px", fontWeight: "bold" }} />
                    : pet.petName || "Pet Name"}
                </h2>
                <p>{editMode
                  ? <input name="location" value={formData.location} onChange={handleChange} style={{ border: "none", textAlign: "center" }} />
                  : pet.location || "Location"}
                </p>
              </div>

              {/* Pet Details */}
              {editMode ? (
                <>
                  {renderFormInput("Type", "type")}
                  {renderFormInput("Breed", "breed")}
                  {renderFormInput("Gender", "gender")}
                  {renderFormInput("Age", "age")}
                  {renderFormInput("Weight", "weight")}
                  {renderFormInput("Health", "health")}
                  {renderFormInput("Characteristics", "characteristics")}
                  {renderFormInput("Emergency Contact", "emergencyContactPhone")}

                  <button
                    onClick={handleSubmit}
                    style={{
                      background: "#183D8B",
                      color: "#fff",
                      padding: "10px 20px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p><strong>Type:</strong> {pet.type}</p>
                  <p><strong>Breed:</strong> {pet.breed}</p>
                  <p><strong>Gender:</strong> {pet.gender}</p>
                  <p><strong>Age:</strong> {pet.age}</p>
                  <p><strong>Weight:</strong> {pet.weight}kg</p>
                  <p><strong>Health:</strong> {pet.health}</p>
                  <p><strong>Characteristics:</strong> {pet.characteristics?.join(", ")}</p>
                  <p><strong>Emergency Contact:</strong> {pet.emergencyContact?.phone}</p>
                </>
              )}

              {/* Logged-in User Info */}
              <div style={{ background: "#f8f8f8", padding: "10px", marginTop: "20px", borderRadius: "6px" }}>
                <h3 style={{ color: "#183D8B" }}>Owner Info</h3>
                <p><strong>Name:</strong> {loggedInUser.name}</p>
                <p><strong>Email:</strong> {loggedInUser.email}</p>
                <p><strong>Phone:</strong> {loggedInUser.phone}</p>
              </div>

              {/* Edit Button */}
              {!editMode && (
                <button
                  onClick={() => handleSelectPet(pet) || setEditMode(true)}
                  style={{
                    background: "#183D8B",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    marginTop: "10px",
                    width: "100%",
                  }}
                >
                  Edit Pet
                </button>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
