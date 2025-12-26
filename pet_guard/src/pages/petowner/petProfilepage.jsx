// import React, { useState, useEffect } from "react";
// import Header from "../../layouts/Header";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper";
// import { FaEdit, FaPlus, FaMapMarkerAlt, FaUserEdit, FaSave, FaTimes } from "react-icons/fa";
// import { usePets } from "../../hooks/petowner/usePetprofile";
// import { updateUser } from "../../services/authService";
// import { toast } from "react-toastify";

// // Sub-components defined outside for cleaner rendering
// const InfoBox = ({ label, value, editMode, onChange, suffix = "" }) => (
//   <div style={styles.infoBox}>
//     <label style={styles.infoLabel}>{label}</label>
//     {editMode ? (
//       <input 
//         value={value} 
//         onChange={onChange} 
//         style={styles.infoInput} 
//         placeholder={`Enter ${label}...`}
//       />
//     ) : (
//       <div style={styles.infoValue}>{value ? `${value}${suffix}` : "-"}</div>
//     )}
//   </div>
// );

// const OwnerField = ({ label, name, value, editMode, onChange }) => (
//   <div>
//     <label style={styles.smallLabel}>{label}</label>
//     {editMode ? (
//       <input name={name} value={value} onChange={onChange} style={styles.ownerInputEdit} />
//     ) : (
//       <div style={styles.staticBox}>{value || "—"}</div>
//     )}
//   </div>
// );

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
//     petName: "", location: "", type: "", breed: "", gender: "", // Empty default
//     age: "", weight: "", health: "", characteristics: "",
//     emergencyContactName: "", emergencyContactPhone: "", photo: null,
//   };

//   const [formData, setFormData] = useState(initialForm);

//   // Load user from localStorage
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       setLoggedInUser(user);
//       setOwnerForm({ name: user.name, email: user.email, phone: user.phone });
//       setOriginalOwner({ name: user.name, email: user.email, phone: user.phone });
//     }
//   }, []);

//   // AUTO-OPEN ADD PAGE LOGIC: If no pets exist, open the add form immediately
//   useEffect(() => {
//     if (!loading && pets.length === 0) {
//       setEditMode(true);
//       setSelectedPet(null);
//       setFormData(initialForm);
//     } else if (pets.length > 0 && !selectedPet && !editMode) {
//       handleSelectPet(pets[0]);
//     }
//   }, [pets, loading]);

//   const handleSelectPet = (pet) => {
//     setSelectedPet(pet);
//     setEditMode(false);
//     setPreviewUrl(null);
//     setFormData({
//       petName: pet.petName || "",
//       location: pet.location || "",
//       type: pet.type || "",
//       breed: pet.breed || "",
//       gender: pet.gender || "",
//       age: pet.age || "",
//       weight: pet.weight || "",
//       health: pet.health || "",
//       characteristics: Array.isArray(pet.characteristics) ? pet.characteristics.join(", ") : pet.characteristics || "",
//       emergencyContactName: pet.emergencyContact?.name || "",
//       emergencyContactPhone: pet.emergencyContact?.phone || "",
//       photo: null,
//     });
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
//       const updatedUser = response.data.data || response.data;

//       setLoggedInUser(updatedUser);
//       setOriginalOwner(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       setOwnerEditMode(false);
//       toast.success("Owner information updated!");
//     } catch (err) {
//       toast.error("Failed to update: " + (err.response?.data?.message || "Check your connection"));
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const data = new FormData();
//       Object.keys(formData).forEach(key => {
//         if (key === 'characteristics') {
//           const charArray = formData.characteristics.split(",").map(i => i.trim()).filter(i => i !== "");
//           charArray.forEach(char => data.append("characteristics[]", char));
//         } else if (key === 'photo' && formData[key]) {
//           data.append("photo", formData[key]);
//         } else if (key !== 'emergencyContactName' && key !== 'emergencyContactPhone' && key !== 'characteristics') {
//           data.append(key, formData[key]);
//         }
//       });

//       data.append("emergencyContact", JSON.stringify({
//         name: formData.emergencyContactName,
//         phone: formData.emergencyContactPhone,
//       }));

//       if (selectedPet && selectedPet._id !== "new") {
//         await editPet(selectedPet._id, data);
//         toast.success("Pet profile updated successfully!");
//       } else {
//         await addPet(data);
//         toast.success("New pet added to profile!");
//       }
//       setEditMode(false);
//     } catch (err) {
//       toast.error("Error saving pet profile");
//       console.error(err);
//     }
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

//         <Swiper 
//           modules={[Navigation, Pagination]} 
//           navigation 
//           pagination={{ clickable: true }} 
//           onSlideChange={(s) => !editMode && pets[s.activeIndex] && handleSelectPet(pets[s.activeIndex])}
//         >
//           {(editMode && !selectedPet ? [{ _id: "new", petName: "New Pet" }] : (pets.length > 0 ? pets : [{_id: "empty", petName: "Add your first pet"}])).map((pet) => (
//             <SwiperSlide key={pet._id}>
//               <div style={styles.card}>
                
//                 {/* Header */}
//                 <div style={{ textAlign: "center", marginBottom: "40px" }}>
//                   <div style={styles.imageWrapper}>
//                     <img 
//                       src={previewUrl || (pet.photo ? `http://localhost:5050/uploads/${pet.photo}` : "https://via.placeholder.com/150")} 
//                       style={styles.profileImg} 
//                       alt="" 
//                     />
//                     {editMode && (
//                       <div style={styles.fileUploadOverlay}>
//                         <input type="file" onChange={(e) => {
//                           const file = e.target.files[0];
//                           if(file) {
//                             setFormData({...formData, photo: file});
//                             setPreviewUrl(URL.createObjectURL(file));
//                           }
//                         }} style={styles.hiddenFileInput} />
//                         <span style={{fontSize: '11px', color: '#fff', fontWeight: 'bold'}}>UPLOAD</span>
//                       </div>
//                     )}
//                   </div>
//                   {editMode ? (
//                     <input 
//                       placeholder="Pet's Name" 
//                       name="petName" 
//                       value={formData.petName} 
//                       onChange={(e) => setFormData({...formData, petName: e.target.value})} 
//                       style={styles.nameInput} 
//                     />
//                   ) : <h1 style={styles.petName}>{pet.petName}</h1>}
                  
//                   <div style={styles.locationBadge}>
//                     <FaMapMarkerAlt /> 
//                     {editMode ? (
//                       <input 
//                         placeholder="Location" 
//                         name="location" 
//                         value={formData.location} 
//                         onChange={(e) => setFormData({...formData, location: e.target.value})} 
//                         style={styles.inlineInput} 
//                       />
//                     ) : (pet.location || "Not Set")}
//                   </div>
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
//                       {editMode ? (
//                         <textarea 
//                           placeholder="Medical history, vaccinations..." 
//                           value={formData.health} 
//                           onChange={(e) => setFormData({...formData, health: e.target.value})} 
//                           style={styles.textarea} 
//                         />
//                       ) : (
//                         <p style={{whiteSpace: 'pre-wrap'}}>{pet.health || "No history provided."}</p>
//                       )}
//                     </div>
//                   </div>
//                   <div style={styles.sectionBox}>
//                     <h3 style={styles.sectionTitle}>Characteristics</h3>
//                     <div style={styles.sectionContent}>
//                       {editMode ? (
//                         <textarea 
//                           placeholder="Playful, shy, likes treats (comma separated)..." 
//                           value={formData.characteristics} 
//                           onChange={(e) => setFormData({...formData, characteristics: e.target.value})} 
//                           style={styles.textarea} 
//                         />
//                       ) : (
//                         <p>{Array.isArray(pet.characteristics) ? pet.characteristics.join(", ") : pet.characteristics || "None listed."}</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* 4. Owner Details */}
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

//                 {/* 5. Emergency Contact */}
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
//                     <button onClick={() => {
//                       setEditMode(false);
//                       if (pets.length > 0) handleSelectPet(pets[0]);
//                     }} style={styles.cancelBtn}>Cancel</button>
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

// const styles = {
//   actionBar: { display: "flex", justifyContent: "flex-end", gap: "15px", marginBottom: "30px" },
//   card: { background: "#fff", borderRadius: "20px", padding: "50px", boxShadow: "0 12px 40px rgba(0,0,0,0.06)", border: "1px solid #E2E8F0" },
//   imageWrapper: { position: "relative", width: "160px", height: "160px", margin: "0 auto 20px", borderRadius: "50%", overflow: "hidden", border: "6px solid #fff", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" },
//   profileImg: { width: "100%", height: "100%", objectFit: "cover" },
//   fileUploadOverlay: { position: "absolute", bottom: 0, width: "100%", background: "rgba(24, 61, 139, 0.8)", padding: "8px 0", cursor: "pointer", textAlign: 'center' },
//   hiddenFileInput: { position: "absolute", opacity: 0, width: "100%", height: "100%", top: 0, left: 0, cursor: "pointer" },
//   petName: { fontSize: "36px", color: "#183D8B", margin: "0 0 10px", fontWeight: "800" },
//   nameInput: { fontSize: "24px", fontWeight: "bold", textAlign: "center", color: "#183D8B", border: "none", borderBottom: "2px solid #183D8B", outline: "none", width: "280px", marginBottom: "15px", background: "transparent" },
//   locationBadge: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#183D8B", fontSize: "15px", fontWeight: "700", background: "#EDF2F7", padding: "8px 25px", borderRadius: "30px", width: "fit-content", margin: "0 auto" },
//   inlineInput: { background: "transparent", border: "none", textAlign: "center", outline: "none", width: "120px", color: "#183D8B", fontWeight: "bold" },
//   infoGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px", marginTop: "45px" },
//   infoBox: { textAlign: "center" },
//   infoLabel: { display: "block", fontSize: "14px", color: "#183D8B", fontWeight: "800", marginBottom: "12px", textTransform: 'uppercase' },
//   infoValue: { background: "#fff", border: "1px solid #E2E8F0", padding: "14px", borderRadius: "12px", fontSize: "16px", minHeight: "50px", display: "flex", alignItems: "center", justifyContent: "center" },
//   infoInput: { width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #183D8B", textAlign: "center", fontSize: "15px", background: "#fff" },
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
//   textarea: { width: "100%", height: "110px", border: "none", outline: "none", resize: "none", fontSize: "15px", background: "transparent" }
// };
import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { FaEdit, FaPlus, FaMapMarkerAlt, FaUserEdit, FaSave, FaTimes } from "react-icons/fa";
import { usePets } from "../../hooks/petowner/usePetprofile";
import { updateUser } from "../../services/authService";
import { toast } from "react-toastify";

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

  const [ownerEditMode, setOwnerEditMode] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [ownerForm, setOwnerForm] = useState({ name: "", email: "", phone: "" });
  const [originalOwner, setOriginalOwner] = useState(null);

  const initialForm = {
    petName: "", location: "", type: "", breed: "", gender: "", 
    age: "", weight: "", health: "", characteristics: "",
    emergencyContactName: "", emergencyContactPhone: "", photo: null,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedInUser(user);
      setOwnerForm({ name: user.name, email: user.email, phone: user.phone });
      setOriginalOwner({ name: user.name, email: user.email, phone: user.phone });
    }
  }, []);

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
    const noChanges = ownerForm.name === originalOwner.name && ownerForm.email === originalOwner.email && ownerForm.phone === originalOwner.phone;
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
      toast.error("Failed to update.");
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
        toast.success("Pet profile updated!");
      } else {
        await addPet(data);
        toast.success("New pet added!");
      }
      setEditMode(false);
    } catch (err) {
      toast.error("Error saving pet profile");
    }
  };

  if (loading) return <div style={{ padding: "100px", textAlign: "center" }}>Loading Profile...</div>;

  return (
    <div style={{ backgroundColor: "#F3F1EE", minHeight: "100vh", paddingBottom: "40px" }}>
      <Header />
      {/* FIXED: Reduced top padding from 120px to 80px */}
      <main style={{ maxWidth: "1150px", margin: "0 auto", padding: "80px 20px 20px" }}>
        
        {/* FIXED: Reduced marginBottom from 30px to 15px */}
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

        <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} onSlideChange={(s) => !editMode && pets[s.activeIndex] && handleSelectPet(pets[s.activeIndex])}>
          {(editMode && !selectedPet ? [{ _id: "new", petName: "New Pet" }] : (pets.length > 0 ? pets : [{_id: "empty", petName: "Add your first pet"}])).map((pet) => (
            <SwiperSlide key={pet._id}>
              <div style={styles.card}>
                {/* FIXED: Reduced marginBottom from 40px to 20px */}
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
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
                    <input name="petName" value={formData.petName} onChange={(e) => setFormData({...formData, petName: e.target.value})} style={styles.nameInput} placeholder="Pet's Name" />
                  ) : <h1 style={styles.petName}>{pet.petName}</h1>}
                  
                  <div style={styles.locationBadge}>
                    <FaMapMarkerAlt /> 
                    {editMode ? (
                      <input name="location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} style={styles.inlineInput} placeholder="Location" />
                    ) : (pet.location || "Not Set")}
                  </div>
                </div>

                {/* FIXED: Reduced marginTop from 45px to 25px */}
                <div style={styles.infoGrid}>
                  <InfoBox label="Type" value={editMode ? formData.type : pet.type} editMode={editMode} onChange={(e) => setFormData({...formData, type: e.target.value})} />
                  <InfoBox label="Breed" value={editMode ? formData.breed : pet.breed} editMode={editMode} onChange={(e) => setFormData({...formData, breed: e.target.value})} />
                  <InfoBox label="Gender" value={editMode ? formData.gender : pet.gender} editMode={editMode} onChange={(e) => setFormData({...formData, gender: e.target.value})} />
                  <InfoBox label="Age" value={editMode ? formData.age : pet.age} suffix=" Years" editMode={editMode} onChange={(e) => setFormData({...formData, age: e.target.value})} />
                  <InfoBox label="Weight" value={editMode ? formData.weight : pet.weight} suffix=" kg" editMode={editMode} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
                </div>

                {/* FIXED: Reduced marginTop from 45px to 25px */}
                <div style={styles.sectionGrid}>
                  <div style={styles.sectionBox}>
                    <h3 style={styles.sectionTitle}>Health & History</h3>
                    <div style={styles.sectionContentEdit}>
                      {editMode ? (
                        <textarea value={formData.health} onChange={(e) => setFormData({...formData, health: e.target.value})} style={styles.textarea} placeholder="Medical history..." />
                      ) : (
                        <p style={{whiteSpace: 'pre-wrap'}}>{pet.health || "No history provided."}</p>
                      )}
                    </div>
                  </div>
                  <div style={styles.sectionBox}>
                    <h3 style={styles.sectionTitle}>Characteristics</h3>
                    <div style={styles.sectionContentEdit}>
                      {editMode ? (
                        <textarea value={formData.characteristics} onChange={(e) => setFormData({...formData, characteristics: e.target.value})} style={styles.textarea} placeholder="Playful, shy..." />
                      ) : (
                        <p>{Array.isArray(pet.characteristics) ? pet.characteristics.join(", ") : pet.characteristics || "None listed."}</p>
                      )}
                    </div>
                  </div>
                </div>

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
                    <OwnerField label="Email" name="email" value={ownerForm.email} editMode={ownerEditMode} onChange={(e) => setOwnerForm({...ownerForm, email: e.target.value})} />
                    <OwnerField label="Phone" name="phone" value={ownerForm.phone} editMode={ownerEditMode} onChange={(e) => setOwnerForm({...ownerForm, phone: e.target.value})} />
                  </div>
                </div>

                <div style={styles.emergencySection}>
                  <h3 style={{ ...styles.sectionTitle, color: "#C53030", marginBottom: "12px" }}>Emergency Contact</h3>
                  <div style={styles.ownerGrid}>
                    <OwnerField label="Name" value={formData.emergencyContactName} editMode={editMode} onChange={(e) => setFormData({...formData, emergencyContactName: e.target.value})} />
                    <OwnerField label="Phone" value={formData.emergencyContactPhone} editMode={editMode} onChange={(e) => setFormData({...formData, emergencyContactPhone: e.target.value})} />
                  </div>
                </div>

                {editMode && (
                  <div style={styles.buttonGroup}>
                    <button onClick={handleSubmit} style={styles.saveBtn}>Save Profile</button>
                    <button onClick={() => { setEditMode(false); if (pets.length > 0) handleSelectPet(pets[0]); }} style={styles.cancelBtn}>Cancel</button>
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
  actionBar: { display: "flex", justifyContent: "flex-end", gap: "15px", marginBottom: "15px" },
  card: { background: "#fff", borderRadius: "20px", padding: "30px 50px", boxShadow: "0 12px 40px rgba(0,0,0,0.06)", border: "1px solid #CBD5E0" },
  imageWrapper: { position: "relative", width: "140px", height: "140px", margin: "0 auto 15px", borderRadius: "50%", overflow: "hidden", border: "5px solid #fff", boxShadow: "0 6px 20px rgba(0,0,0,0.1)" },
  profileImg: { width: "100%", height: "100%", objectFit: "cover" },
  fileUploadOverlay: { position: "absolute", bottom: 0, width: "100%", background: "rgba(24, 61, 139, 0.8)", padding: "8px 0", cursor: "pointer", textAlign: 'center' },
  hiddenFileInput: { position: "absolute", opacity: 0, width: "100%", height: "100%", top: 0, left: 0, cursor: "pointer" },
  petName: { fontSize: "32px", color: "#183D8B", margin: "0 0 5px", fontWeight: "800" },
  nameInput: { fontSize: "24px", fontWeight: "bold", textAlign: "center", color: "#183D8B", border: "none", borderBottom: "3px solid #183D8B", outline: "none", width: "240px", marginBottom: "10px", background: "transparent" },
  locationBadge: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#183D8B", fontSize: "14px", fontWeight: "700", background: "#EDF2F7", padding: "6px 20px", borderRadius: "30px", width: "fit-content", margin: "0 auto", border: "1px solid #CBD5E0" },
  inlineInput: { background: "transparent", border: "none", textAlign: "center", outline: "none", width: "110px", color: "#183D8B", fontWeight: "bold" },
  infoGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "15px", marginTop: "25px" },
  infoBox: { textAlign: "center" },
  infoLabel: { display: "block", fontSize: "11px", color: "#183D8B", fontWeight: "800", marginBottom: "8px", textTransform: 'uppercase' },
  infoValue: { background: "#fff", border: "1.5px solid #CBD5E0", padding: "10px", borderRadius: "10px", fontSize: "15px", minHeight: "45px", display: "flex", alignItems: "center", justifyContent: "center", color: "#2D3748" },
  infoInput: { width: "100%", padding: "10px", borderRadius: "10px", border: "2px solid #183D8B", textAlign: "center", fontSize: "14px", background: "#fff", fontWeight: "600", color: "#183D8B" },
  sectionGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginTop: "25px" },
  sectionTitle: { fontSize: "18px", color: "#183D8B", fontWeight: "800", marginBottom: "12px" },
  sectionContentEdit: { border: "2.5px solid #CBD5E0", borderRadius: "12px", padding: "15px", minHeight: "120px", background: "#fff" },
  ownerSection: { marginTop: "35px", borderTop: "2px solid #E2E8F0", paddingTop: "25px" },
  sectionHeader: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" },
  ownerGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" },
  emergencySection: { marginTop: "30px", backgroundColor: "#FFF5F5", padding: "20px", borderRadius: "12px", border: "2px solid #FEB2B2" },
  smallLabel: { fontSize: '10px', color: '#4A5568', fontWeight: 'bold', marginBottom: '4px', display: 'block', textTransform: 'uppercase'},
  staticBox: { width: "100%", padding: "12px", borderRadius: "10px", border: "1.5px solid #CBD5E0", background: "#F8FAFC", fontSize: "13px", color: '#2D3748', fontWeight: "500" },
  ownerInputEdit: { width: "100%", padding: "12px", borderRadius: "10px", border: "2px solid #183D8B", background: "#fff", fontSize: "13px", outline: 'none', fontWeight: "600" },
  editIcon: { cursor: "pointer", color: "#183D8B", fontSize: "18px" },
  primaryBtn: { background: "#183D8B", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700", fontSize: "14px" },
  secondaryBtn: { background: "#fff", color: "#183D8B", border: "2px solid #183D8B", padding: "8px 24px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700", fontSize: "14px" },
  saveBtn: { flex: 1, background: "#183D8B", color: "#fff", border: "none", padding: "15px", borderRadius: "10px", cursor: "pointer", fontWeight: "800" },
  cancelBtn: { flex: 1, background: "#E2E8F0", color: "#4A5568", border: "none", padding: "15px", borderRadius: "10px", cursor: "pointer", fontWeight: "800" },
  buttonGroup: { display: "flex", gap: "15px", marginTop: "30px" },
  textarea: { width: "100%", height: "90px", border: "none", outline: "none", resize: "none", fontSize: "14px", background: "transparent", color: "#2D3748", fontWeight: "500" }
};