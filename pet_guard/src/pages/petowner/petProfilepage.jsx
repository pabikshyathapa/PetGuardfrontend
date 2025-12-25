// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { FaEdit, FaSave } from "react-icons/fa";
// import { usePets } from "../../hooks/petowner/usePetprofile";
// import { updateUser } from "../../services/authService";

// export default function PetProfilePage() {
//   const { pets, loading, addPet, editPet } = usePets();

//   const [selectedPet, setSelectedPet] = useState(null);
//   const [editMode, setEditMode] = useState(false);

//   const initialForm = {
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
//   };

//   const [formData, setFormData] = useState(initialForm);
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [ownerEditMode, setOwnerEditMode] = useState(false);
//   const [ownerForm, setOwnerForm] = useState({ name: "", email: "", phone: "" });
//   const [originalOwner, setOriginalOwner] = useState(null);

//   // Load user from localStorage
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       setLoggedInUser(user);
//       setOwnerForm({ name: user.name, email: user.email, phone: user.phone });
//       setOriginalOwner({ name: user.name, email: user.email, phone: user.phone });
//     }
//   }, []);

//   // Set first pet as selected initially
//   useEffect(() => {
//     if (pets.length > 0 && !selectedPet) {
//       handleSelectPet(pets[0]);
//     }
//   }, [pets]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
//   };

//   // Select pet to view or edit
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
//     setFormData(initialForm);
//   };

//   const handleCancel = () => {
//     if (selectedPet) {
//       handleSelectPet(selectedPet);
//       setEditMode(false);
//     } else {
//       setFormData(initialForm);
//       setEditMode(false);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       if (!formData.petName.trim() || !formData.location.trim()) {
//         return alert("Pet Name and Location are required!");
//       }

//       const data = new FormData();
//       Object.keys(formData).forEach((key) => {
//         if (key === "characteristics") {
//           data.append(key, formData[key].split(",").map((c) => c.trim()));
//         } else if (key === "photo" && formData[key]) {
//           data.append(key, formData[key]);
//         } else if (key !== "emergencyContactName" && key !== "emergencyContactPhone") {
//           data.append(key, formData[key]);
//         }
//       });

//       // Add emergency contact as JSON
//       data.append(
//         "emergencyContact",
//         JSON.stringify({
//           name: formData.emergencyContactName,
//           phone: formData.emergencyContactPhone,
//         })
//       );

//       let newPet;
//       if (selectedPet) {
//         await editPet(selectedPet._id, data);
//         alert("Pet updated successfully!");
//         newPet = { ...selectedPet, ...formData, characteristics: formData.characteristics.split(",").map(c => c.trim()), emergencyContact: { name: formData.emergencyContactName, phone: formData.emergencyContactPhone } };
//       } else {
//         const response = await addPet(data);
//         newPet = response.pet;
//         alert("Pet added successfully!");
//       }

//       setSelectedPet(newPet);
//       setEditMode(false);
//       setFormData(initialForm);
//     } catch (err) {
//       console.error("Pet save failed:", err.response?.data?.message || err.message);
//     }
//   };

//   const handleOwnerChange = (e) => {
//     const { name, value } = e.target;
//     setOwnerForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleOwnerSave = async () => {
//     const noChanges =
//       ownerForm.name === originalOwner.name &&
//       ownerForm.email === originalOwner.email &&
//       ownerForm.phone === originalOwner.phone;

//     if (noChanges) return setOwnerEditMode(false);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await updateUser(ownerForm, token);
//       setLoggedInUser(response.data);
//       setOriginalOwner(response.data);
//       localStorage.setItem("user", JSON.stringify(response.data));
//       setOwnerEditMode(false);
//     } catch (err) {
//       console.error("Update failed:", err.response?.data?.message || err.message);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   const renderFormInput = (label, name) => (
//     <div style={{ marginBottom: "10px" }}>
//       <label style={{ fontWeight: "bold", color: "#183D8B" }}>{label}</label>
//       <input
//         type="text"
//         name={name}
//         value={formData[name]}
//         onChange={handleChange}
//         style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
//       />
//     </div>
//   );

//   return (
//     <div style={{ background: "#F3F1EE", minHeight: "100vh", padding: "20px" }}>
//       <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
//         <button onClick={handleAdd} style={{ background: "#183D8B", color: "#fff", padding: "8px 16px", borderRadius: "6px", border: "none", cursor: "pointer" }}>Add Pet</button>
//       </div>

//       <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} spaceBetween={20} slidesPerView={1} style={{ paddingBottom: 40 }}>
//         {(editMode && !selectedPet ? [{ _id: "new" }] : pets).map((pet) => (
//           <SwiperSlide key={pet._id}>
//             <div style={{ maxWidth: "600px", margin: "0 auto", background: "#fff", borderRadius: "10px", padding: "20px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
//               <div style={{ textAlign: "center", marginBottom: "10px" }}>
//                 <img
//                   src={editMode && !selectedPet ? "https://via.placeholder.com/150" : pet.photo ? `http://localhost:5050/uploads/${pet.photo}` : "https://via.placeholder.com/150"}
//                   alt="Pet"
//                   style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", marginBottom: 10 }}
//                 />
//                 {editMode && <input type="file" onChange={handleFileChange} />}
//                 <h2 style={{ color: "#183D8B", margin: "10px 0" }}>
//                   {editMode && selectedPet && selectedPet._id === pet._id ? (
//                     <input
//                       name="petName"
//                       placeholder="Enter Pet Name"
//                       value={formData.petName}
//                       onChange={handleChange}
//                       style={{ border: "none", textAlign: "center", fontSize: "18px", fontWeight: "bold" }}
//                     />
//                   ) : (
//                     pet.petName
//                   )}
//                 </h2>
//               </div>

//               {editMode && (!selectedPet || (selectedPet && selectedPet._id === pet._id)) ? (
//                 <>
//                   {renderFormInput("Pet Name", "petName")}
//                   {renderFormInput("Location", "location")}
//                   {renderFormInput("Type", "type")}
//                   {renderFormInput("Breed", "breed")}
//                   {renderFormInput("Gender", "gender")}
//                   {renderFormInput("Age", "age")}
//                   {renderFormInput("Weight", "weight")}
//                   {renderFormInput("Health", "health")}
//                   {renderFormInput("Characteristics", "characteristics")}
//                   {renderFormInput("Emergency Contact Name", "emergencyContactName")}
//                   {renderFormInput("Emergency Contact Phone", "emergencyContactPhone")}
//                   <div style={{ display: "flex", gap: "10px" }}>
//                     <button
//                       onClick={handleSubmit}
//                       style={{
//                         background: "#183D8B",
//                         color: "#fff",
//                         padding: "10px 20px",
//                         borderRadius: "6px",
//                         border: "none",
//                         cursor: "pointer",
//                         flex: 1,
//                         marginTop: "10px",
//                       }}
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       style={{
//                         background: "#ccc",
//                         color: "#000",
//                         padding: "10px 20px",
//                         borderRadius: "6px",
//                         border: "none",
//                         cursor: "pointer",
//                         flex: 1,
//                         marginTop: "10px",
//                       }}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <p><strong>Type:</strong> {pet.type}</p>
//                   <p><strong>Breed:</strong> {pet.breed}</p>
//                   <p><strong>Gender:</strong> {pet.gender}</p>
//                   <p><strong>Age:</strong> {pet.age} years</p>
//                   <p><strong>Weight:</strong> {pet.weight} kg</p>
//                   <p><strong>Health:</strong> {pet.health}</p>
//                   <p><strong>Characteristics:</strong> {pet.characteristics?.join(", ")}</p>
//                   <p><strong>Emergency Contact Name:</strong> {pet.emergencyContact?.name}</p>
//                   <p><strong>Emergency Contact Phone:</strong> {pet.emergencyContact?.phone}</p>
//                 </>
//               )}

//               {loggedInUser && (
//                 <div style={{ background: "#f8f8f8", padding: 10, borderRadius: 6, marginTop: 10 }}>
//                   <h3 style={{ display: "flex", justifyContent: "space-between" }}>
//                     Owner Info
//                     {ownerEditMode ? <FaSave onClick={handleOwnerSave} style={{ cursor: "pointer" }} /> : <FaEdit onClick={() => setOwnerEditMode(true)} style={{ cursor: "pointer" }} />}
//                   </h3>
//                   <p><strong>Name:</strong> {ownerEditMode ? <input name="name" value={ownerForm.name} onChange={handleOwnerChange} /> : loggedInUser.name}</p>
//                   <p><strong>Email:</strong> {ownerEditMode ? <input name="email" value={ownerForm.email} onChange={handleOwnerChange} /> : loggedInUser.email}</p>
//                   <p><strong>Phone:</strong> {ownerEditMode ? <input name="phone" value={ownerForm.phone} onChange={handleOwnerChange} /> : loggedInUser.phone}</p>
//                 </div>
//               )}

//               {!editMode && (
//                 <button onClick={() => { handleSelectPet(pet); setEditMode(true); }} style={{ background: "#183D8B", color: "#fff", padding: "10px 20px", borderRadius: "6px", border: "none", cursor: "pointer", marginTop: "10px", width: "100%" }}>
//                   Edit Pet
//                 </button>
//               )}
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import Header from "../../layouts/Header"; // Header imported
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { FaEdit, FaSave } from "react-icons/fa";
// import { usePets } from "../../hooks/petowner/usePetprofile";
// import { updateUser } from "../../services/authService";

// export default function PetProfilePage() {
//   const { pets, loading, addPet, editPet } = usePets();

//   const [selectedPet, setSelectedPet] = useState(null);
//   const [editMode, setEditMode] = useState(false);

//   const initialForm = {
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
//   };

//   const [formData, setFormData] = useState(initialForm);
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [ownerEditMode, setOwnerEditMode] = useState(false);
//   const [ownerForm, setOwnerForm] = useState({ name: "", email: "", phone: "" });
//   const [originalOwner, setOriginalOwner] = useState(null);

//   // Load user from localStorage
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       setLoggedInUser(user);
//       setOwnerForm({ name: user.name, email: user.email, phone: user.phone });
//       setOriginalOwner({ name: user.name, email: user.email, phone: user.phone });
//     }
//   }, []);

//   // Set first pet as selected initially
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
//     setFormData(initialForm);
//   };

//   const handleCancel = () => {
//     if (selectedPet) {
//       handleSelectPet(selectedPet);
//       setEditMode(false);
//     } else {
//       setFormData(initialForm);
//       setEditMode(false);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       if (!formData.petName.trim() || !formData.location.trim()) {
//         return alert("Pet Name and Location are required!");
//       }

//       const data = new FormData();
//       Object.keys(formData).forEach((key) => {
//         if (key === "characteristics") {
//           data.append(key, formData[key].split(",").map((c) => c.trim()));
//         } else if (key === "photo" && formData[key]) {
//           data.append(key, formData[key]);
//         } else if (key !== "emergencyContactName" && key !== "emergencyContactPhone") {
//           data.append(key, formData[key]);
//         }
//       });

//       data.append(
//         "emergencyContact",
//         JSON.stringify({
//           name: formData.emergencyContactName,
//           phone: formData.emergencyContactPhone,
//         })
//       );

//       let newPet;
//       if (selectedPet) {
//         await editPet(selectedPet._id, data);
//         alert("Pet updated successfully!");
//         newPet = {
//           ...selectedPet,
//           ...formData,
//           characteristics: formData.characteristics.split(",").map((c) => c.trim()),
//           emergencyContact: {
//             name: formData.emergencyContactName,
//             phone: formData.emergencyContactPhone,
//           },
//         };
//       } else {
//         const response = await addPet(data);
//         newPet = response.pet;
//         alert("Pet added successfully!");
//       }

//       setSelectedPet(newPet);
//       setEditMode(false);
//       setFormData(initialForm);
//     } catch (err) {
//       console.error("Pet save failed:", err.response?.data?.message || err.message);
//     }
//   };

//   const handleOwnerChange = (e) => {
//     const { name, value } = e.target;
//     setOwnerForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleOwnerSave = async () => {
//     const noChanges =
//       ownerForm.name === originalOwner.name &&
//       ownerForm.email === originalOwner.email &&
//       ownerForm.phone === originalOwner.phone;

//     if (noChanges) return setOwnerEditMode(false);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await updateUser(ownerForm, token);
//       setLoggedInUser(response.data);
//       setOriginalOwner(response.data);
//       localStorage.setItem("user", JSON.stringify(response.data));
//       setOwnerEditMode(false);
//     } catch (err) {
//       console.error("Update failed:", err.response?.data?.message || err.message);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   const renderFormInput = (label, name) => (
//     <div style={{ marginBottom: "10px" }}>
//       <label style={{ fontWeight: "bold", color: "#183D8B" }}>{label}</label>
//       <input
//         type="text"
//         name={name}
//         value={formData[name]}
//         onChange={handleChange}
//         style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
//       />
//     </div>
//   );

//   return (
//     <>
//       {/* Header always on top */}
//       <Header />

//       <div style={{ background: "#F3F1EE", minHeight: "100vh", padding: "100px 20px 20px" }}>
//         {/* Add Pet button */}
//         <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
//           <button
//             onClick={handleAdd}
//             style={{
//               background: "#183D8B",
//               color: "#fff",
//               padding: "8px 16px",
//               borderRadius: "6px",
//               border: "none",
//               cursor: "pointer",
//             }}
//           >
//             Add Pet
//           </button>
//         </div>

//         {/* Swiper for pet cards */}
//         <Swiper
//           modules={[Navigation, Pagination]}
//           navigation
//           pagination={{ clickable: true }}
//           spaceBetween={20}
//           slidesPerView={1}
//           style={{ paddingBottom: 40 }}
//         >
//           {(editMode && !selectedPet ? [{ _id: "new" }] : pets).map((pet) => (
//             <SwiperSlide key={pet._id}>
//               <div
//                 style={{
//                   maxWidth: "600px",
//                   margin: "0 auto",
//                   background: "#fff",
//                   borderRadius: "10px",
//                   padding: "20px",
//                   boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 {/* Pet Image */}
//                 <div style={{ textAlign: "center", marginBottom: "10px" }}>
//                   <img
//                     src={
//                       editMode && !selectedPet
//                         ? "https://via.placeholder.com/150"
//                         : pet.photo
//                         ? `http://localhost:5050/uploads/${pet.photo}`
//                         : "https://via.placeholder.com/150"
//                     }
//                     alt="Pet"
//                     style={{
//                       width: 120,
//                       height: 120,
//                       borderRadius: "50%",
//                       objectFit: "cover",
//                       marginBottom: 10,
//                     }}
//                   />
//                   {editMode && <input type="file" onChange={handleFileChange} />}
//                   <h2 style={{ color: "#183D8B", margin: "10px 0" }}>
//                     {editMode && selectedPet && selectedPet._id === pet._id ? (
//                       <input
//                         name="petName"
//                         placeholder="Enter Pet Name"
//                         value={formData.petName}
//                         onChange={handleChange}
//                         style={{ border: "none", textAlign: "center", fontSize: "18px", fontWeight: "bold" }}
//                       />
//                     ) : (
//                       pet.petName
//                     )}
//                   </h2>
//                 </div>

//                 {/* Pet Details */}
//                 {editMode && (!selectedPet || (selectedPet && selectedPet._id === pet._id)) ? (
//                   <>
//                     {renderFormInput("Pet Name", "petName")}
//                     {renderFormInput("Location", "location")}
//                     {renderFormInput("Type", "type")}
//                     {renderFormInput("Breed", "breed")}
//                     {renderFormInput("Gender", "gender")}
//                     {renderFormInput("Age", "age")}
//                     {renderFormInput("Weight", "weight")}
//                     {renderFormInput("Health", "health")}
//                     {renderFormInput("Characteristics", "characteristics")}
//                     {renderFormInput("Emergency Contact Name", "emergencyContactName")}
//                     {renderFormInput("Emergency Contact Phone", "emergencyContactPhone")}
//                     <div style={{ display: "flex", gap: "10px" }}>
//                       <button
//                         onClick={handleSubmit}
//                         style={{
//                           background: "#183D8B",
//                           color: "#fff",
//                           padding: "10px 20px",
//                           borderRadius: "6px",
//                           border: "none",
//                           cursor: "pointer",
//                           flex: 1,
//                           marginTop: "10px",
//                         }}
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={handleCancel}
//                         style={{
//                           background: "#ccc",
//                           color: "#000",
//                           padding: "10px 20px",
//                           borderRadius: "6px",
//                           border: "none",
//                           cursor: "pointer",
//                           flex: 1,
//                           marginTop: "10px",
//                         }}
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <p><strong>Type:</strong> {pet.type}</p>
//                     <p><strong>Breed:</strong> {pet.breed}</p>
//                     <p><strong>Gender:</strong> {pet.gender}</p>
//                     <p><strong>Age:</strong> {pet.age} years</p>
//                     <p><strong>Weight:</strong> {pet.weight} kg</p>
//                     <p><strong>Health:</strong> {pet.health}</p>
//                     <p><strong>Characteristics:</strong> {pet.characteristics?.join(", ")}</p>
//                     <p><strong>Emergency Contact Name:</strong> {pet.emergencyContact?.name}</p>
//                     <p><strong>Emergency Contact Phone:</strong> {pet.emergencyContact?.phone}</p>
//                   </>
//                 )}

//                 {/* Owner Info */}
//                 {loggedInUser && (
//                   <div style={{ background: "#f8f8f8", padding: 10, borderRadius: 6, marginTop: 10 }}>
//                     <h3 style={{ display: "flex", justifyContent: "space-between" }}>
//                       Owner Info
//                       {ownerEditMode ? (
//                         <FaSave onClick={handleOwnerSave} style={{ cursor: "pointer" }} />
//                       ) : (
//                         <FaEdit onClick={() => setOwnerEditMode(true)} style={{ cursor: "pointer" }} />
//                       )}
//                     </h3>
//                     <p><strong>Name:</strong> {ownerEditMode ? <input name="name" value={ownerForm.name} onChange={handleOwnerChange} /> : loggedInUser.name}</p>
//                     <p><strong>Email:</strong> {ownerEditMode ? <input name="email" value={ownerForm.email} onChange={handleOwnerChange} /> : loggedInUser.email}</p>
//                     <p><strong>Phone:</strong> {ownerEditMode ? <input name="phone" value={ownerForm.phone} onChange={handleOwnerChange} /> : loggedInUser.phone}</p>
//                   </div>
//                 )}

//                 {/* Edit Pet Button */}
//                 {!editMode && (
//                   <button
//                     onClick={() => { handleSelectPet(pet); setEditMode(true); }}
//                     style={{
//                       background: "#183D8B",
//                       color: "#fff",
//                       padding: "10px 20px",
//                       borderRadius: "6px",
//                       border: "none",
//                       cursor: "pointer",
//                       marginTop: "10px",
//                       width: "100%",
//                     }}
//                   >
//                     Edit Pet
//                   </button>
//                 )}
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </>
//   );
// }


// import React, { useState, useEffect } from "react";
// import Header from "../../layouts/Header";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { FaEdit, FaPlus, FaMapMarkerAlt, FaUserEdit, FaSave, FaTimes } from "react-icons/fa";
// import { usePets } from "../../hooks/petowner/usePetprofile";
// import { updateUser } from "../../services/authService"; // Ensure this service exists

// export default function PetProfilePage() {
//   const { pets, loading, addPet, editPet } = usePets();
//   const [selectedPet, setSelectedPet] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   // Owner specific state
//   const [ownerEditMode, setOwnerEditMode] = useState(false);
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [ownerForm, setOwnerForm] = useState({ name: "", email: "", phone: "" });

//   const initialForm = {
//     petName: "",
//     location: "",
//     type: "",
//     breed: "",
//     gender: "F",
//     age: "",
//     weight: "",
//     health: "",
//     characteristics: "",
//     emergencyContactName: "",
//     emergencyContactPhone: "",
//     photo: null,
//   };

//   const [formData, setFormData] = useState(initialForm);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       setLoggedInUser(user);
//       setOwnerForm({ name: user.name, email: user.email, phone: user.phone });
//     }
//   }, []);

//   useEffect(() => {
//     if (pets.length > 0 && !selectedPet && !editMode) {
//       handleSelectPet(pets[0]);
//     }
//   }, [pets, selectedPet, editMode]);

//   const handleSelectPet = (pet) => {
//     setSelectedPet(pet);
//     setEditMode(false);
//     setPreviewUrl(null);
//     setFormData({
//       petName: pet.petName || "",
//       location: pet.location || "",
//       type: pet.type || "",
//       breed: pet.breed || "",
//       gender: pet.gender || "F",
//       age: pet.age || "",
//       weight: pet.weight || "",
//       health: pet.health || "",
//       characteristics: Array.isArray(pet.characteristics) ? pet.characteristics.join(", ") : pet.characteristics || "",
//       emergencyContactName: pet.emergencyContact?.name || "",
//       emergencyContactPhone: pet.emergencyContact?.phone || "",
//       photo: null,
//     });
//   };

//   const handleOwnerUpdate = async () => {
//     try {
//       const updatedUser = await updateUser(loggedInUser._id, ownerForm);
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       setLoggedInUser(updatedUser);
//       setOwnerEditMode(false);
//       alert("Owner profile updated!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update owner details");
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const data = new FormData();
//       data.append("petName", formData.petName);
//       data.append("location", formData.location);
//       data.append("type", formData.type);
//       data.append("breed", formData.breed);
//       data.append("gender", formData.gender);
//       data.append("age", formData.age);
//       data.append("weight", formData.weight);
//       data.append("health", formData.health);
      
//       const charArray = formData.characteristics.split(",").map(item => item.trim()).filter(i => i !== "");
//       charArray.forEach(char => data.append("characteristics[]", char));

//       if (formData.photo) data.append("photo", formData.photo);

//       data.append("emergencyContact", JSON.stringify({
//         name: formData.emergencyContactName,
//         phone: formData.emergencyContactPhone,
//       }));

//       if (selectedPet && selectedPet._id !== "new") {
//         await editPet(selectedPet._id, data);
//         alert("Pet updated!");
//       } else {
//         await addPet(data);
//         alert("Pet added successfully!");
//       }
//       setEditMode(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <div style={{ padding: "120px", textAlign: "center" }}>Loading Profile...</div>;

//   const displayPets = (editMode && !selectedPet) ? [{ _id: "new", petName: "New Pet" }] : pets;

//   return (
//     <div style={{ backgroundColor: "#F3F1EE", minHeight: "100vh", paddingBottom: "60px" }}>
//       <Header />
//       <main style={{ maxWidth: "1150px", margin: "0 auto", padding: "120px 20px 40px" }}>
        
//         {/* Action Bar */}
//         <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginBottom: "30px" }}>
//           <button onClick={() => { setSelectedPet(null); setEditMode(true); setFormData(initialForm); }} style={styles.primaryBtn}>
//             <FaPlus /> Add Pet
//           </button>
//           {!editMode && pets.length > 0 && (
//             <button onClick={() => setEditMode(true)} style={styles.secondaryBtn}>
//               <FaEdit /> Edit Pet Profile
//             </button>
//           )}
//         </div>

//         <Swiper
//           modules={[Navigation, Pagination]}
//           navigation
//           pagination={{ clickable: true }}
//           style={{ paddingBottom: "50px" }}
//           onSlideChange={(s) => !editMode && handleSelectPet(pets[s.activeIndex])}
//         >
//           {displayPets.map((pet) => (
//             <SwiperSlide key={pet._id}>
//               <div style={styles.card}>
                
//                 {/* 1. Profile Header */}
//                 <div style={{ textAlign: "center", marginBottom: "40px" }}>
//                   <div style={styles.imageWrapper}>
//                     <img src={previewUrl || (pet.photo ? `http://localhost:5050/uploads/${pet.photo}` : "https://via.placeholder.com/150")} style={styles.profileImg} alt="pet" />
//                     {editMode && (
//                       <div style={styles.fileUploadOverlay}>
//                         <input type="file" onChange={(e) => {
//                           const file = e.target.files[0];
//                           setFormData({...formData, photo: file});
//                           setPreviewUrl(URL.createObjectURL(file));
//                         }} style={styles.hiddenFileInput} />
//                         <span style={{fontSize: '11px', color: '#fff', fontWeight: 'bold'}}>UPLOAD</span>
//                       </div>
//                     )}
//                   </div>
//                   {editMode ? (
//                     <input name="petName" value={formData.petName} onChange={(e) => setFormData({...formData, petName: e.target.value})} style={styles.nameInput} />
//                   ) : <h1 style={styles.petName}>{pet.petName}</h1>}
//                   <div style={styles.locationBadge}><FaMapMarkerAlt /> {editMode ? <input name="location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} style={styles.inlineInput} /> : pet.location}</div>
//                 </div>

//                 {/* 2. Attributes Grid */}
//                 <div style={styles.infoGrid}>
//                   <InfoBox label="Type" name="type" value={editMode ? formData.type : pet.type} editMode={editMode} onChange={(e) => setFormData({...formData, type: e.target.value})} />
//                   <InfoBox label="Breed" name="breed" value={editMode ? formData.breed : pet.breed} editMode={editMode} onChange={(e) => setFormData({...formData, breed: e.target.value})} />
//                   <InfoBox label="Gender" name="gender" value={editMode ? formData.gender : pet.gender} editMode={editMode} isSelect options={['M', 'F']} onChange={(e) => setFormData({...formData, gender: e.target.value})} />
//                   <InfoBox label="Age" name="age" value={editMode ? formData.age : pet.age} suffix=" Years" editMode={editMode} onChange={(e) => setFormData({...formData, age: e.target.value})} />
//                   <InfoBox label="Weight" name="weight" value={editMode ? formData.weight : pet.weight} suffix=" kg" editMode={editMode} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
//                 </div>

//                 {/* 3. Health & Characteristics */}
//                 <div style={styles.sectionGrid}>
//                   <div style={styles.sectionBox}>
//                     <h3 style={styles.sectionTitle}>Health & History</h3>
//                     <div style={styles.sectionContent}>
//                       {editMode ? <textarea value={formData.health} onChange={(e) => setFormData({...formData, health: e.target.value})} style={styles.textarea} /> : <p>{pet.health}</p>}
//                     </div>
//                   </div>
//                   <div style={styles.sectionBox}>
//                     <h3 style={styles.sectionTitle}>Characteristics</h3>
//                     <div style={styles.sectionContent}>
//                       {editMode ? <textarea value={formData.characteristics} onChange={(e) => setFormData({...formData, characteristics: e.target.value})} style={styles.textarea} /> : <p>{Array.isArray(pet.characteristics) ? pet.characteristics.join(", ") : pet.characteristics}</p>}
//                     </div>
//                   </div>
//                 </div>

//                 {/* 4. Owner Details Section */}
//                 <div style={{ marginTop: "50px", borderTop: "2px solid #F3F1EE", paddingTop: "30px" }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
//                     <h3 style={{ ...styles.sectionTitle, marginBottom: 0 }}>Owner Profile</h3>
//                     {!ownerEditMode ? (
//                       <FaUserEdit style={styles.editIcon} onClick={() => setOwnerEditMode(true)} title="Edit Owner Details" />
//                     ) : (
//                       <div style={{ display: "flex", gap: "10px" }}>
//                         <FaSave style={{ ...styles.editIcon, color: "#38A169" }} onClick={handleOwnerUpdate} />
//                         <FaTimes style={{ ...styles.editIcon, color: "#E53E3E" }} onClick={() => setOwnerEditMode(false)} />
//                       </div>
//                     )}
//                   </div>
//                   <div style={styles.ownerGrid}>
//                     <OwnerField label="Full Name" value={ownerForm.name} editMode={ownerEditMode} onChange={(v) => setOwnerForm({...ownerForm, name: v})} />
//                     <OwnerField label="Email Address" value={ownerForm.email} editMode={ownerEditMode} onChange={(v) => setOwnerForm({...ownerForm, email: v})} />
//                     <OwnerField label="Primary Phone" value={ownerForm.phone} editMode={ownerEditMode} onChange={(v) => setOwnerForm({...ownerForm, phone: v})} />
//                   </div>
//                 </div>

//                 {/* 5. Emergency Contact Section */}
//                 <div style={{ marginTop: "40px", backgroundColor: "#FFF5F5", padding: "25px", borderRadius: "15px", border: "1px solid #FED7D7" }}>
//                   <h3 style={{ ...styles.sectionTitle, color: "#C53030", border: "none" }}>Emergency Contact (Pet Specific)</h3>
//                   <div style={styles.ownerGrid}>
//                     <OwnerField label="Contact Name" value={formData.emergencyContactName} editMode={editMode} onChange={(v) => setFormData({...formData, emergencyContactName: v})} />
//                     <OwnerField label="Emergency Phone" value={formData.emergencyContactPhone} editMode={editMode} onChange={(v) => setFormData({...formData, emergencyContactPhone: v})} />
//                   </div>
//                 </div>

//                 {editMode && (
//                   <div style={styles.buttonGroup}>
//                     <button onClick={handleSubmit} style={styles.saveBtn}>Save Pet Changes</button>
//                     <button onClick={() => setEditMode(false)} style={styles.cancelBtn}>Cancel</button>
//                   </div>
//                 )}
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </main>
//     </div>
//   );
// }

// const InfoBox = ({ label, value, editMode, onChange, isSelect, options, suffix = "" }) => (
//   <div style={styles.infoBox}>
//     <label style={styles.infoLabel}>{label}</label>
//     {editMode ? (
//       isSelect ? (
//         <select value={value} onChange={onChange} style={styles.infoInput}>
//           {options.map(o => <option key={o} value={o}>{o}</option>)}
//         </select>
//       ) : <input value={value} onChange={onChange} style={styles.infoInput} />
//     ) : <div style={styles.infoValue}>{value ? `${value}${suffix}` : "-"}</div>}
//   </div>
// );

// const OwnerField = ({ label, value, editMode, onChange }) => (
//   <div>
//     <label style={styles.smallLabel}>{label}</label>
//     {editMode ? (
//       <input value={value} onChange={(e) => onChange(e.target.value)} style={styles.emergencyInputEdit} />
//     ) : <div style={styles.staticBox}>{value || "Not provided"}</div>}
//   </div>
// );

// const styles = {
//   card: { background: "#fff", borderRadius: "20px", padding: "50px", boxShadow: "0 12px 40px rgba(0,0,0,0.06)", border: "1px solid #E2E8F0" },
//   imageWrapper: { position: "relative", width: "160px", height: "160px", margin: "0 auto 20px", borderRadius: "50%", overflow: "hidden", border: "6px solid #fff", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" },
//   profileImg: { width: "100%", height: "100%", objectFit: "cover" },
//   fileUploadOverlay: { position: "absolute", bottom: 0, width: "100%", background: "rgba(24, 61, 139, 0.8)", padding: "8px 0", cursor: "pointer", textAlign: 'center' },
//   hiddenFileInput: { position: "absolute", opacity: 0, width: "100%", height: "100%", top: 0, left: 0, cursor: "pointer" },
//   petName: { fontSize: "36px", color: "#183D8B", margin: "0 0 10px", fontWeight: "800" },
//   nameInput: { fontSize: "24px", fontWeight: "bold", textAlign: "center", color: "#183D8B", border: "none", borderBottom: "2px solid #183D8B", outline: "none", width: "280px" },
//   locationBadge: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#183D8B", fontSize: "15px", fontWeight: "700", background: "#EDF2F7", padding: "8px 25px", borderRadius: "30px", width: "fit-content", margin: "0 auto" },
//   inlineInput: { background: "transparent", border: "none", textAlign: "center", outline: "none", width: "120px" },
//   infoGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px", marginTop: "45px" },
//   infoBox: { textAlign: "center" },
//   infoLabel: { display: "block", fontSize: "14px", color: "#183D8B", fontWeight: "800", marginBottom: "12px", textTransform: 'uppercase' },
//   infoValue: { background: "#fff", border: "1px solid #E2E8F0", padding: "14px", borderRadius: "12px", fontSize: "16px", minHeight: "50px", display: "flex", alignItems: "center", justifyContent: "center" },
//   infoInput: { width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #183D8B", textAlign: "center", fontSize: "15px" },
//   sectionGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "35px", marginTop: "45px" },
//   sectionTitle: { fontSize: "20px", color: "#183D8B", fontWeight: "800", marginBottom: "18px" },
//   sectionContent: { border: "1px solid #E2E8F0", borderRadius: "15px", padding: "20px", minHeight: "140px" },
//   ownerGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" },
//   smallLabel: { fontSize: '11px', color: '#718096', fontWeight: 'bold', marginBottom: '6px', display: 'block', textTransform: 'uppercase'},
//   staticBox: { width: "100%", padding: "15px", borderRadius: "10px", border: "1px solid #E2E8F0", background: "#F8FAFC", fontSize: "14px", color: '#4A5568' },
//   emergencyInputEdit: { width: "100%", padding: "15px", borderRadius: "10px", border: "2px solid #183D8B", background: "#fff", fontSize: "14px", outline: 'none' },
//   editIcon: { cursor: "pointer", color: "#183D8B", fontSize: "20px", transition: "0.2s hover", ":hover": { opacity: 0.7 } },
//   primaryBtn: { background: "#183D8B", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700" },
//   secondaryBtn: { background: "#fff", color: "#183D8B", border: "2px solid #183D8B", padding: "10px 28px", borderRadius: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700" },
//   saveBtn: { flex: 1, background: "#183D8B", color: "#fff", border: "none", padding: "18px", borderRadius: "12px", cursor: "pointer", fontWeight: "800" },
//   cancelBtn: { flex: 1, background: "#EDF2F7", color: "#4A5568", border: "none", padding: "18px", borderRadius: "12px", cursor: "pointer", fontWeight: "800" },
//   buttonGroup: { display: "flex", gap: "20px", marginTop: "45px" },
//   textarea: { width: "100%", height: "110px", border: "none", outline: "none", resize: "none", fontSize: "15px" }
// };


// import React, { useState, useEffect } from "react";
// import Header from "../../layouts/Header";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { FaEdit, FaPlus, FaMapMarkerAlt, FaUserEdit, FaSave, FaTimes } from "react-icons/fa";
// import { usePets } from "../../hooks/petowner/usePetprofile";
// import { updateUser } from "../../services/authService";

// export default function PetProfilePage() {
//   const { pets, loading, addPet, editPet } = usePets();
//   const [selectedPet, setSelectedPet] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   // Owner specific state
//   const [ownerEditMode, setOwnerEditMode] = useState(false);
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [ownerForm, setOwnerForm] = useState({ name: "", email: "", phone: "" });
//   const [originalOwner, setOriginalOwner] = useState(null);

//   const initialForm = {
//     petName: "", location: "", type: "", breed: "", gender: "F",
//     age: "", weight: "", health: "", characteristics: "",
//     emergencyContactName: "", emergencyContactPhone: "", photo: null,
//   };

//   const [formData, setFormData] = useState(initialForm);

//   // Load user from localStorage - LOGIC FROM YOUR PROVIDED CODE
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       setLoggedInUser(user);
//       setOwnerForm({ name: user.name, email: user.email, phone: user.phone });
//       setOriginalOwner({ name: user.name, email: user.email, phone: user.phone });
//     }
//   }, []);

//   useEffect(() => {
//     if (pets.length > 0 && !selectedPet && !editMode) {
//       handleSelectPet(pets[0]);
//     }
//   }, [pets, selectedPet, editMode]);

//   const handleSelectPet = (pet) => {
//     setSelectedPet(pet);
//     setEditMode(false);
//     setPreviewUrl(null);
//     setFormData({
//       petName: pet.petName || "",
//       location: pet.location || "",
//       type: pet.type || "",
//       breed: pet.breed || "",
//       gender: pet.gender || "F",
//       age: pet.age || "",
//       weight: pet.weight || "",
//       health: pet.health || "",
//       characteristics: Array.isArray(pet.characteristics) ? pet.characteristics.join(", ") : pet.characteristics || "",
//       emergencyContactName: pet.emergencyContact?.name || "",
//       emergencyContactPhone: pet.emergencyContact?.phone || "",
//       photo: null,
//     });
//   };

//   // Owner Update - LOGIC FROM YOUR PROVIDED CODE
//   const handleOwnerSave = async () => {
//     // Check if anything actually changed
//     const noChanges =
//       ownerForm.name === originalOwner.name &&
//       ownerForm.email === originalOwner.email &&
//       ownerForm.phone === originalOwner.phone;

//     if (noChanges) return setOwnerEditMode(false);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await updateUser(ownerForm, token);
      
//       // Handle response structure (some backends return {data: user}, others return just user)
//       const updatedUser = response.data.data || response.data;

//       setLoggedInUser(updatedUser);
//       setOriginalOwner(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       setOwnerEditMode(false);
//       alert("Owner information updated!");
//     } catch (err) {
//       console.error("Update failed:", err.response?.data?.message || err.message);
//       alert("Failed to update: " + (err.response?.data?.message || "Check your connection"));
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const data = new FormData();
//       Object.keys(formData).forEach(key => {
//         if (key === 'characteristics') {
//             const charArray = formData.characteristics.split(",").map(i => i.trim()).filter(i => i !== "");
//             charArray.forEach(char => data.append("characteristics[]", char));
//         } else if (key === 'photo' && formData[key]) {
//             data.append("photo", formData[key]);
//         } else if (key !== 'emergencyContactName' && key !== 'emergencyContactPhone' && key !== 'characteristics') {
//             data.append(key, formData[key]);
//         }
//       });

//       data.append("emergencyContact", JSON.stringify({
//         name: formData.emergencyContactName,
//         phone: formData.emergencyContactPhone,
//       }));

//       if (selectedPet && selectedPet._id !== "new") {
//         await editPet(selectedPet._id, data);
//         alert("Pet updated!");
//       } else {
//         await addPet(data);
//         alert("Pet added!");
//       }
//       setEditMode(false);
//     } catch (err) { console.error(err); }
//   };

//   if (loading) return <div style={{ padding: "120px", textAlign: "center" }}>Loading Profile...</div>;

//   return (
//     <div style={{ backgroundColor: "#F3F1EE", minHeight: "100vh", paddingBottom: "60px" }}>
//       <Header />
//       <main style={{ maxWidth: "1150px", margin: "0 auto", padding: "120px 20px 40px" }}>
        
//         <div style={styles.actionBar}>
//           <button onClick={() => { setSelectedPet(null); setEditMode(true); setFormData(initialForm); }} style={styles.primaryBtn}>
//             <FaPlus /> Add Pet
//           </button>
//           {!editMode && pets.length > 0 && (
//             <button onClick={() => setEditMode(true)} style={styles.secondaryBtn}>
//               <FaEdit /> Edit Profile
//             </button>
//           )}
//         </div>

//         <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} onSlideChange={(s) => !editMode && handleSelectPet(pets[s.activeIndex])}>
//           {(editMode && !selectedPet ? [{ _id: "new", petName: "New Pet" }] : pets).map((pet) => (
//             <SwiperSlide key={pet._id}>
//               <div style={styles.card}>
                
//                 {/* 1. Header */}
//                 <div style={{ textAlign: "center", marginBottom: "40px" }}>
//                   <div style={styles.imageWrapper}>
//                     <img src={previewUrl || (pet.photo ? `http://localhost:5050/uploads/${pet.photo}` : "https://via.placeholder.com/150")} style={styles.profileImg} alt="pet" />
//                     {editMode && (
//                       <div style={styles.fileUploadOverlay}>
//                         <input type="file" onChange={(e) => {
//                           const file = e.target.files[0];
//                           setFormData({...formData, photo: file});
//                           setPreviewUrl(URL.createObjectURL(file));
//                         }} style={styles.hiddenFileInput} />
//                         <span style={{fontSize: '11px', color: '#fff', fontWeight: 'bold'}}>UPLOAD</span>
//                       </div>
//                     )}
//                   </div>
//                   {editMode ? (
//                     <input name="petName" value={formData.petName} onChange={(e) => setFormData({...formData, petName: e.target.value})} style={styles.nameInput} />
//                   ) : <h1 style={styles.petName}>{pet.petName}</h1>}
//                   <div style={styles.locationBadge}><FaMapMarkerAlt /> {editMode ? <input name="location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} style={styles.inlineInput} /> : (pet.location || "Not Set")}</div>
//                 </div>

//                 {/* 2. Attributes */}
//                 <div style={styles.infoGrid}>
//                   <InfoBox label="Type" value={editMode ? formData.type : pet.type} editMode={editMode} onChange={(e) => setFormData({...formData, type: e.target.value})} />
//                   <InfoBox label="Breed" value={editMode ? formData.breed : pet.breed} editMode={editMode} onChange={(e) => setFormData({...formData, breed: e.target.value})} />
//                   <InfoBox label="Gender" value={editMode ? formData.gender : pet.gender} editMode={editMode} onChange={(e) => setFormData({...formData, gender: e.target.value})} />
//                   <InfoBox label="Age" value={editMode ? formData.age : pet.age} suffix=" Years" editMode={editMode} onChange={(e) => setFormData({...formData, age: e.target.value})} />
//                   <InfoBox label="Weight" value={editMode ? formData.weight : pet.weight} suffix=" kg" editMode={editMode} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
//                 </div>

//                 {/* 3. Details */}
//                 <div style={styles.sectionGrid}>
//                   <div style={styles.sectionBox}>
//                     <h3 style={styles.sectionTitle}>Health & History</h3>
//                     <div style={styles.sectionContent}>
//                       {editMode ? <textarea value={formData.health} onChange={(e) => setFormData({...formData, health: e.target.value})} style={styles.textarea} /> : <p style={{whiteSpace: 'pre-wrap'}}>{pet.health || "No history."}</p>}
//                     </div>
//                   </div>
//                   <div style={styles.sectionBox}>
//                     <h3 style={styles.sectionTitle}>Characteristics</h3>
//                     <div style={styles.sectionContent}>
//                       {editMode ? <textarea value={formData.characteristics} onChange={(e) => setFormData({...formData, characteristics: e.target.value})} style={styles.textarea} /> : <p>{Array.isArray(pet.characteristics) ? pet.characteristics.join(", ") : pet.characteristics || "None."}</p>}
//                     </div>
//                   </div>
//                 </div>

//                 {/* 4. Owner Details - SEPARATED SECTION */}
//                 <div style={styles.ownerSection}>
//                   <div style={styles.sectionHeader}>
//                     <h3 style={{ ...styles.sectionTitle, marginBottom: 0 }}>Owner Details</h3>
//                     {!ownerEditMode ? (
//                       <FaUserEdit style={styles.editIcon} onClick={() => setOwnerEditMode(true)} />
//                     ) : (
//                       <div style={{ display: "flex", gap: "10px" }}>
//                         <FaSave style={{ ...styles.editIcon, color: "#38A169" }} onClick={handleOwnerSave} />
//                         <FaTimes style={{ ...styles.editIcon, color: "#E53E3E" }} onClick={() => setOwnerEditMode(false)} />
//                       </div>
//                     )}
//                   </div>
//                   <div style={styles.ownerGrid}>
//                     <OwnerField label="Full Name" name="name" value={ownerForm.name} editMode={ownerEditMode} onChange={(e) => setOwnerForm({...ownerForm, name: e.target.value})} />
//                     <OwnerField label="Email Address" name="email" value={ownerForm.email} editMode={ownerEditMode} onChange={(e) => setOwnerForm({...ownerForm, email: e.target.value})} />
//                     <OwnerField label="Phone Number" name="phone" value={ownerForm.phone} editMode={ownerEditMode} onChange={(e) => setOwnerForm({...ownerForm, phone: e.target.value})} />
//                   </div>
//                 </div>

//                 {/* 5. Emergency Contact - SEPARATED SECTION */}
//                 <div style={styles.emergencySection}>
//                   <h3 style={{ ...styles.sectionTitle, color: "#C53030" }}>Emergency Contact</h3>
//                   <div style={styles.ownerGrid}>
//                     <OwnerField label="Contact Name" value={formData.emergencyContactName} editMode={editMode} onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})} />
//                     <OwnerField label="Emergency Phone" value={formData.emergencyContactPhone} editMode={editMode} onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})} />
//                   </div>
//                 </div>

//                 {editMode && (
//                   <div style={styles.buttonGroup}>
//                     <button onClick={handleSubmit} style={styles.saveBtn}>Save Profile</button>
//                     <button onClick={() => setEditMode(false)} style={styles.cancelBtn}>Cancel</button>
//                   </div>
//                 )}
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </main>
//     </div>
//   );
// }

// // Sub-components for cleaner code
// const InfoBox = ({ label, value, editMode, onChange, isSelect, options, suffix = "" }) => (
//   <div style={styles.infoBox}>
//     <label style={styles.infoLabel}>{label}</label>
//     {editMode ? (
//       isSelect ? (
//         <select value={value} onChange={onChange} style={styles.infoInput}>
//           {options.map(o => <option key={o} value={o}>{o}</option>)}
//         </select>
//       ) : <input value={value} onChange={onChange} style={styles.infoInput} />
//     ) : <div style={styles.infoValue}>{value ? `${value}${suffix}` : "-"}</div>}
//   </div>
// );

// const OwnerField = ({ label, name, value, editMode, onChange }) => (
//   <div>
//     <label style={styles.smallLabel}>{label}</label>
//     {editMode ? (
//       <input name={name} value={value} onChange={onChange} style={styles.ownerInputEdit} />
//     ) : <div style={styles.staticBox}>{value || "—"}</div>}
//   </div>
// );

// const styles = {
//   actionBar: { display: "flex", justifyContent: "flex-end", gap: "15px", marginBottom: "30px" },
//   card: { background: "#fff", borderRadius: "20px", padding: "50px", boxShadow: "0 12px 40px rgba(0,0,0,0.06)", border: "1px solid #E2E8F0" },
//   imageWrapper: { position: "relative", width: "160px", height: "160px", margin: "0 auto 20px", borderRadius: "50%", overflow: "hidden", border: "6px solid #fff", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" },
//   profileImg: { width: "100%", height: "100%", objectFit: "cover" },
//   fileUploadOverlay: { position: "absolute", bottom: 0, width: "100%", background: "rgba(24, 61, 139, 0.8)", padding: "8px 0", cursor: "pointer", textAlign: 'center' },
//   hiddenFileInput: { position: "absolute", opacity: 0, width: "100%", height: "100%", top: 0, left: 0, cursor: "pointer" },
//   petName: { fontSize: "36px", color: "#183D8B", margin: "0 0 10px", fontWeight: "800" },
//   nameInput: { fontSize: "24px", fontWeight: "bold", textAlign: "center", color: "#183D8B", border: "none", borderBottom: "2px solid #183D8B", outline: "none", width: "280px", marginBottom: "15px" },
//   locationBadge: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#183D8B", fontSize: "15px", fontWeight: "700", background: "#EDF2F7", padding: "8px 25px", borderRadius: "30px", width: "fit-content", margin: "0 auto" },
//   inlineInput: { background: "transparent", border: "none", textAlign: "center", outline: "none", width: "120px" },
//   infoGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px", marginTop: "45px" },
//   infoBox: { textAlign: "center" },
//   infoLabel: { display: "block", fontSize: "14px", color: "#183D8B", fontWeight: "800", marginBottom: "12px", textTransform: 'uppercase' },
//   infoValue: { background: "#fff", border: "1px solid #E2E8F0", padding: "14px", borderRadius: "12px", fontSize: "16px", minHeight: "50px", display: "flex", alignItems: "center", justifyContent: "center" },
//   infoInput: { width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #183D8B", textAlign: "center", fontSize: "15px" },
//   sectionGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "35px", marginTop: "45px" },
//   sectionTitle: { fontSize: "20px", color: "#183D8B", fontWeight: "800", marginBottom: "18px" },
//   sectionContent: { border: "1px solid #E2E8F0", borderRadius: "15px", padding: "20px", minHeight: "140px" },
//   ownerSection: { marginTop: "50px", borderTop: "2px solid #F3F1EE", paddingTop: "30px" },
//   sectionHeader: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" },
//   ownerGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" },
//   emergencySection: { marginTop: "40px", backgroundColor: "#FFF5F5", padding: "25px", borderRadius: "15px", border: "1px solid #FED7D7" },
//   smallLabel: { fontSize: '11px', color: '#718096', fontWeight: 'bold', marginBottom: '6px', display: 'block', textTransform: 'uppercase'},
//   staticBox: { width: "100%", padding: "15px", borderRadius: "10px", border: "1px solid #E2E8F0", background: "#F8FAFC", fontSize: "14px", color: '#4A5568' },
//   ownerInputEdit: { width: "100%", padding: "15px", borderRadius: "10px", border: "2px solid #183D8B", background: "#fff", fontSize: "14px", outline: 'none' },
//   editIcon: { cursor: "pointer", color: "#183D8B", fontSize: "20px" },
//   primaryBtn: { background: "#183D8B", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700" },
//   secondaryBtn: { background: "#fff", color: "#183D8B", border: "2px solid #183D8B", padding: "10px 28px", borderRadius: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700" },
//   saveBtn: { flex: 1, background: "#183D8B", color: "#fff", border: "none", padding: "18px", borderRadius: "12px", cursor: "pointer", fontWeight: "800" },
//   cancelBtn: { flex: 1, background: "#EDF2F7", color: "#4A5568", border: "none", padding: "18px", borderRadius: "12px", cursor: "pointer", fontWeight: "800" },
//   buttonGroup: { display: "flex", gap: "20px", marginTop: "45px" },
//   textarea: { width: "100%", height: "110px", border: "none", outline: "none", resize: "none", fontSize: "15px" }
// };

import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { FaEdit, FaPlus, FaMapMarkerAlt, FaUserEdit, FaSave, FaTimes } from "react-icons/fa";
import { usePets } from "../../hooks/petowner/usePetprofile";
import { updateUser } from "../../services/authService";
import { toast } from "react-toastify";

// Sub-components defined outside for cleaner rendering
const InfoBox = ({ label, value, editMode, onChange, suffix = "" }) => (
  <div style={styles.infoBox}>
    <label style={styles.infoLabel}>{label}</label>
    {editMode ? (
      <input 
        value={value} 
        onChange={onChange} 
        style={styles.infoInput} 
        placeholder={`Enter ${label}...`}
      />
    ) : (
      <div style={styles.infoValue}>{value ? `${value}${suffix}` : "-"}</div>
    )}
  </div>
);

const OwnerField = ({ label, name, value, editMode, onChange }) => (
  <div>
    <label style={styles.smallLabel}>{label}</label>
    {editMode ? (
      <input name={name} value={value} onChange={onChange} style={styles.ownerInputEdit} />
    ) : (
      <div style={styles.staticBox}>{value || "—"}</div>
    )}
  </div>
);

export default function PetProfilePage() {
  const { pets, loading, addPet, editPet } = usePets();
  const [selectedPet, setSelectedPet] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Owner specific state
  const [ownerEditMode, setOwnerEditMode] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [ownerForm, setOwnerForm] = useState({ name: "", email: "", phone: "" });
  const [originalOwner, setOriginalOwner] = useState(null);

  const initialForm = {
    petName: "", location: "", type: "", breed: "", gender: "", // Empty default
    age: "", weight: "", health: "", characteristics: "",
    emergencyContactName: "", emergencyContactPhone: "", photo: null,
  };

  const [formData, setFormData] = useState(initialForm);

  // Load user from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUser(user);
      setOwnerForm({ name: user.name, email: user.email, phone: user.phone });
      setOriginalOwner({ name: user.name, email: user.email, phone: user.phone });
    }
  }, []);

  // AUTO-OPEN ADD PAGE LOGIC: If no pets exist, open the add form immediately
  useEffect(() => {
    if (!loading && pets.length === 0) {
      setEditMode(true);
      setSelectedPet(null);
      setFormData(initialForm);
    } else if (pets.length > 0 && !selectedPet && !editMode) {
      handleSelectPet(pets[0]);
    }
  }, [pets, loading]);

  const handleSelectPet = (pet) => {
    setSelectedPet(pet);
    setEditMode(false);
    setPreviewUrl(null);
    setFormData({
      petName: pet.petName || "",
      location: pet.location || "",
      type: pet.type || "",
      breed: pet.breed || "",
      gender: pet.gender || "",
      age: pet.age || "",
      weight: pet.weight || "",
      health: pet.health || "",
      characteristics: Array.isArray(pet.characteristics) ? pet.characteristics.join(", ") : pet.characteristics || "",
      emergencyContactName: pet.emergencyContact?.name || "",
      emergencyContactPhone: pet.emergencyContact?.phone || "",
      photo: null,
    });
  };

  const handleOwnerSave = async () => {
    const noChanges =
      ownerForm.name === originalOwner.name &&
      ownerForm.email === originalOwner.email &&
      ownerForm.phone === originalOwner.phone;

    if (noChanges) return setOwnerEditMode(false);

    try {
      const token = localStorage.getItem("token");
      const response = await updateUser(ownerForm, token);
      const updatedUser = response.data.data || response.data;

      setLoggedInUser(updatedUser);
      setOriginalOwner(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setOwnerEditMode(false);
      toast.success("Owner information updated!");
    } catch (err) {
      toast.error("Failed to update: " + (err.response?.data?.message || "Check your connection"));
    }
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'characteristics') {
          const charArray = formData.characteristics.split(",").map(i => i.trim()).filter(i => i !== "");
          charArray.forEach(char => data.append("characteristics[]", char));
        } else if (key === 'photo' && formData[key]) {
          data.append("photo", formData[key]);
        } else if (key !== 'emergencyContactName' && key !== 'emergencyContactPhone' && key !== 'characteristics') {
          data.append(key, formData[key]);
        }
      });

      data.append("emergencyContact", JSON.stringify({
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone,
      }));

      if (selectedPet && selectedPet._id !== "new") {
        await editPet(selectedPet._id, data);
        toast.success("Pet profile updated successfully!");
      } else {
        await addPet(data);
        toast.success("New pet added to profile!");
      }
      setEditMode(false);
    } catch (err) {
      toast.error("Error saving pet profile");
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: "120px", textAlign: "center" }}>Loading Profile...</div>;

  return (
    <div style={{ backgroundColor: "#F3F1EE", minHeight: "100vh", paddingBottom: "60px" }}>
      <Header />
      <main style={{ maxWidth: "1150px", margin: "0 auto", padding: "120px 20px 40px" }}>
        
        <div style={styles.actionBar}>
          <button onClick={() => { setSelectedPet(null); setEditMode(true); setFormData(initialForm); }} style={styles.primaryBtn}>
            <FaPlus /> Add Pet
          </button>
          {!editMode && pets.length > 0 && (
            <button onClick={() => setEditMode(true)} style={styles.secondaryBtn}>
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>

        <Swiper 
          modules={[Navigation, Pagination]} 
          navigation 
          pagination={{ clickable: true }} 
          onSlideChange={(s) => !editMode && pets[s.activeIndex] && handleSelectPet(pets[s.activeIndex])}
        >
          {(editMode && !selectedPet ? [{ _id: "new", petName: "New Pet" }] : (pets.length > 0 ? pets : [{_id: "empty", petName: "Add your first pet"}])).map((pet) => (
            <SwiperSlide key={pet._id}>
              <div style={styles.card}>
                
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <div style={styles.imageWrapper}>
                    <img 
                      src={previewUrl || (pet.photo ? `http://localhost:5050/uploads/${pet.photo}` : "https://via.placeholder.com/150")} 
                      style={styles.profileImg} 
                      alt="" 
                    />
                    {editMode && (
                      <div style={styles.fileUploadOverlay}>
                        <input type="file" onChange={(e) => {
                          const file = e.target.files[0];
                          if(file) {
                            setFormData({...formData, photo: file});
                            setPreviewUrl(URL.createObjectURL(file));
                          }
                        }} style={styles.hiddenFileInput} />
                        <span style={{fontSize: '11px', color: '#fff', fontWeight: 'bold'}}>UPLOAD</span>
                      </div>
                    )}
                  </div>
                  {editMode ? (
                    <input 
                      placeholder="Pet's Name" 
                      name="petName" 
                      value={formData.petName} 
                      onChange={(e) => setFormData({...formData, petName: e.target.value})} 
                      style={styles.nameInput} 
                    />
                  ) : <h1 style={styles.petName}>{pet.petName}</h1>}
                  
                  <div style={styles.locationBadge}>
                    <FaMapMarkerAlt /> 
                    {editMode ? (
                      <input 
                        placeholder="Location" 
                        name="location" 
                        value={formData.location} 
                        onChange={(e) => setFormData({...formData, location: e.target.value})} 
                        style={styles.inlineInput} 
                      />
                    ) : (pet.location || "Not Set")}
                  </div>
                </div>

                {/* 2. Attributes */}
                <div style={styles.infoGrid}>
                  <InfoBox label="Type" value={editMode ? formData.type : pet.type} editMode={editMode} onChange={(e) => setFormData({...formData, type: e.target.value})} />
                  <InfoBox label="Breed" value={editMode ? formData.breed : pet.breed} editMode={editMode} onChange={(e) => setFormData({...formData, breed: e.target.value})} />
                  <InfoBox label="Gender" value={editMode ? formData.gender : pet.gender} editMode={editMode} onChange={(e) => setFormData({...formData, gender: e.target.value})} />
                  <InfoBox label="Age" value={editMode ? formData.age : pet.age} suffix=" Years" editMode={editMode} onChange={(e) => setFormData({...formData, age: e.target.value})} />
                  <InfoBox label="Weight" value={editMode ? formData.weight : pet.weight} suffix=" kg" editMode={editMode} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
                </div>

                {/* 3. Details */}
                <div style={styles.sectionGrid}>
                  <div style={styles.sectionBox}>
                    <h3 style={styles.sectionTitle}>Health & History</h3>
                    <div style={styles.sectionContent}>
                      {editMode ? (
                        <textarea 
                          placeholder="Medical history, vaccinations..." 
                          value={formData.health} 
                          onChange={(e) => setFormData({...formData, health: e.target.value})} 
                          style={styles.textarea} 
                        />
                      ) : (
                        <p style={{whiteSpace: 'pre-wrap'}}>{pet.health || "No history provided."}</p>
                      )}
                    </div>
                  </div>
                  <div style={styles.sectionBox}>
                    <h3 style={styles.sectionTitle}>Characteristics</h3>
                    <div style={styles.sectionContent}>
                      {editMode ? (
                        <textarea 
                          placeholder="Playful, shy, likes treats (comma separated)..." 
                          value={formData.characteristics} 
                          onChange={(e) => setFormData({...formData, characteristics: e.target.value})} 
                          style={styles.textarea} 
                        />
                      ) : (
                        <p>{Array.isArray(pet.characteristics) ? pet.characteristics.join(", ") : pet.characteristics || "None listed."}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 4. Owner Details */}
                <div style={styles.ownerSection}>
                  <div style={styles.sectionHeader}>
                    <h3 style={{ ...styles.sectionTitle, marginBottom: 0 }}>Owner Details</h3>
                    {!ownerEditMode ? (
                      <FaUserEdit style={styles.editIcon} onClick={() => setOwnerEditMode(true)} />
                    ) : (
                      <div style={{ display: "flex", gap: "10px" }}>
                        <FaSave style={{ ...styles.editIcon, color: "#38A169" }} onClick={handleOwnerSave} />
                        <FaTimes style={{ ...styles.editIcon, color: "#E53E3E" }} onClick={() => setOwnerEditMode(false)} />
                      </div>
                    )}
                  </div>
                  <div style={styles.ownerGrid}>
                    <OwnerField label="Full Name" name="name" value={ownerForm.name} editMode={ownerEditMode} onChange={(e) => setOwnerForm({...ownerForm, name: e.target.value})} />
                    <OwnerField label="Email Address" name="email" value={ownerForm.email} editMode={ownerEditMode} onChange={(e) => setOwnerForm({...ownerForm, email: e.target.value})} />
                    <OwnerField label="Phone Number" name="phone" value={ownerForm.phone} editMode={ownerEditMode} onChange={(e) => setOwnerForm({...ownerForm, phone: e.target.value})} />
                  </div>
                </div>

                {/* 5. Emergency Contact */}
                <div style={styles.emergencySection}>
                  <h3 style={{ ...styles.sectionTitle, color: "#C53030" }}>Emergency Contact</h3>
                  <div style={styles.ownerGrid}>
                    <OwnerField label="Contact Name" value={formData.emergencyContactName} editMode={editMode} onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})} />
                    <OwnerField label="Emergency Phone" value={formData.emergencyContactPhone} editMode={editMode} onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})} />
                  </div>
                </div>

                {editMode && (
                  <div style={styles.buttonGroup}>
                    <button onClick={handleSubmit} style={styles.saveBtn}>Save Profile</button>
                    <button onClick={() => {
                      setEditMode(false);
                      if (pets.length > 0) handleSelectPet(pets[0]);
                    }} style={styles.cancelBtn}>Cancel</button>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </main>
    </div>
  );
}

const styles = {
  actionBar: { display: "flex", justifyContent: "flex-end", gap: "15px", marginBottom: "30px" },
  card: { background: "#fff", borderRadius: "20px", padding: "50px", boxShadow: "0 12px 40px rgba(0,0,0,0.06)", border: "1px solid #E2E8F0" },
  imageWrapper: { position: "relative", width: "160px", height: "160px", margin: "0 auto 20px", borderRadius: "50%", overflow: "hidden", border: "6px solid #fff", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" },
  profileImg: { width: "100%", height: "100%", objectFit: "cover" },
  fileUploadOverlay: { position: "absolute", bottom: 0, width: "100%", background: "rgba(24, 61, 139, 0.8)", padding: "8px 0", cursor: "pointer", textAlign: 'center' },
  hiddenFileInput: { position: "absolute", opacity: 0, width: "100%", height: "100%", top: 0, left: 0, cursor: "pointer" },
  petName: { fontSize: "36px", color: "#183D8B", margin: "0 0 10px", fontWeight: "800" },
  nameInput: { fontSize: "24px", fontWeight: "bold", textAlign: "center", color: "#183D8B", border: "none", borderBottom: "2px solid #183D8B", outline: "none", width: "280px", marginBottom: "15px", background: "transparent" },
  locationBadge: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#183D8B", fontSize: "15px", fontWeight: "700", background: "#EDF2F7", padding: "8px 25px", borderRadius: "30px", width: "fit-content", margin: "0 auto" },
  inlineInput: { background: "transparent", border: "none", textAlign: "center", outline: "none", width: "120px", color: "#183D8B", fontWeight: "bold" },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px", marginTop: "45px" },
  infoBox: { textAlign: "center" },
  infoLabel: { display: "block", fontSize: "14px", color: "#183D8B", fontWeight: "800", marginBottom: "12px", textTransform: 'uppercase' },
  infoValue: { background: "#fff", border: "1px solid #E2E8F0", padding: "14px", borderRadius: "12px", fontSize: "16px", minHeight: "50px", display: "flex", alignItems: "center", justifyContent: "center" },
  infoInput: { width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #183D8B", textAlign: "center", fontSize: "15px", background: "#fff" },
  sectionGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "35px", marginTop: "45px" },
  sectionTitle: { fontSize: "20px", color: "#183D8B", fontWeight: "800", marginBottom: "18px" },
  sectionContent: { border: "1px solid #E2E8F0", borderRadius: "15px", padding: "20px", minHeight: "140px" },
  ownerSection: { marginTop: "50px", borderTop: "2px solid #F3F1EE", paddingTop: "30px" },
  sectionHeader: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" },
  ownerGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" },
  emergencySection: { marginTop: "40px", backgroundColor: "#FFF5F5", padding: "25px", borderRadius: "15px", border: "1px solid #FED7D7" },
  smallLabel: { fontSize: '11px', color: '#718096', fontWeight: 'bold', marginBottom: '6px', display: 'block', textTransform: 'uppercase'},
  staticBox: { width: "100%", padding: "15px", borderRadius: "10px", border: "1px solid #E2E8F0", background: "#F8FAFC", fontSize: "14px", color: '#4A5568' },
  ownerInputEdit: { width: "100%", padding: "15px", borderRadius: "10px", border: "2px solid #183D8B", background: "#fff", fontSize: "14px", outline: 'none' },
  editIcon: { cursor: "pointer", color: "#183D8B", fontSize: "20px" },
  primaryBtn: { background: "#183D8B", color: "#fff", border: "none", padding: "12px 28px", borderRadius: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700" },
  secondaryBtn: { background: "#fff", color: "#183D8B", border: "2px solid #183D8B", padding: "10px 28px", borderRadius: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700" },
  saveBtn: { flex: 1, background: "#183D8B", color: "#fff", border: "none", padding: "18px", borderRadius: "12px", cursor: "pointer", fontWeight: "800" },
  cancelBtn: { flex: 1, background: "#EDF2F7", color: "#4A5568", border: "none", padding: "18px", borderRadius: "12px", cursor: "pointer", fontWeight: "800" },
  buttonGroup: { display: "flex", gap: "20px", marginTop: "45px" },
  textarea: { width: "100%", height: "110px", border: "none", outline: "none", resize: "none", fontSize: "15px", background: "transparent" }
};