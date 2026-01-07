// import { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ShelterLayout from "../../layouts/Shelter/shelterLayout";
// import useShelterProfile from "../../hooks/Shelter/useShelterProfile";
// import ServicesSelector from "../../components/Shelter/serviceSelector";
// import StatusSelector from "../../components/Shelter/statusSelector";
// import FileUploader from "../../components/Shelter/fileUploader";

// export default function ShelterDashboard() {
//   const { data, setData, editMode, setEditMode, handleSave, loading } =
//     useShelterProfile();

//   const [photos, setPhotos] = useState([]);
//   const [documents, setDocuments] = useState([]);
//   const [removedPhotos, setRemovedPhotos] = useState([]);
//   const [removedDocuments, setRemovedDocuments] = useState([]);

//   useEffect(() => {
//     if (data) {
//       setPhotos(data.photos || []);
//       setDocuments(data.documents || []);
//     }
//   }, [data]);

//   const handleRemovePhoto = (file) => {
//     if (typeof file === "string") setRemovedPhotos([...removedPhotos, file]);
//     setPhotos(photos.filter((p) => p !== file));
//   };

//   const handleRemoveDocument = (file) => {
//     if (typeof file === "string")
//       setRemovedDocuments([...removedDocuments, file]);
//     setDocuments(documents.filter((d) => d !== file));
//   };

//   const validateFields = () => {
//     // Check all required text fields
//     if (!data.name || data.name.trim() === "") {
//       toast.error("Please fill in Shelter Name", {
//         className: "custom-toast",
//         bodyClassName: "custom-toast-body",
//       });
//       return false;
//     }

//     if (!data.location || data.location.trim() === "") {
//       toast.error("Please fill in Location", {
//         className: "custom-toast",
//         bodyClassName: "custom-toast-body",
//       });
//       return false;
//     }

//     if (!data.contact || data.contact.trim() === "") {
//       toast.error("Please fill in Contact", {
//         className: "custom-toast",
//         bodyClassName: "custom-toast-body",
//       });
//       return false;
//     }

//     if (!data.description || data.description.trim() === "") {
//       toast.error("Please fill in About this shelter", {
//         className: "custom-toast",
//         bodyClassName: "custom-toast-body",
//       });
//       return false;
//     }

//     if (!data.pricePerDay || data.pricePerDay === "") {
//       toast.error("Please fill in Price Per Day", {
//         className: "custom-toast",
//         bodyClassName: "custom-toast-body",
//       });
//       return false;
//     }

//     // Check services
//     if (!data.services || data.services.length === 0) {
//       toast.error("Please select at least one Service", {
//         className: "custom-toast",
//         bodyClassName: "custom-toast-body",
//       });
//       return false;
//     }

//     // Check status
//     if (!data.status || data.status === "") {
//       toast.error("Please select a Status", {
//         className: "custom-toast",
//         bodyClassName: "custom-toast-body",
//       });
//       return false;
//     }

//     // Check photos
//     if (!photos || photos.length === 0) {
//       toast.error("Please upload at least one Photo", {
//         className: "custom-toast",
//         bodyClassName: "custom-toast-body",
//       });
//       return false;
//     }

//     // Check documents
//     if (!documents || documents.length === 0) {
//       toast.error("Please upload at least one Verification Document", {
//         className: "custom-toast",
//         bodyClassName: "custom-toast-body",
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async () => {
//     // Validate all fields before submitting
//     if (!validateFields()) {
//       return;
//     }

//     const fd = new FormData();
//     fd.append("name", data.name || "");
//     fd.append("location", data.location || "");
//     fd.append("contact", data.contact || "");
//     fd.append("description", data.description || "");
//     fd.append("pricePerDay", data.pricePerDay || "");
//     fd.append("status", data.status || "");
//     fd.append(
//       "services",
//       Array.isArray(data.services) ? data.services.join(",") : ""
//     );
//     fd.append("removedPhotos", JSON.stringify(removedPhotos));
//     fd.append("removedDocuments", JSON.stringify(removedDocuments));
//     photos.forEach((file) => {
//       if (file instanceof File) fd.append("photos", file);
//     });
//     documents.forEach((file) => {
//       if (file instanceof File) fd.append("documents", file);
//     });

//     try {
//       await handleSave(fd); // state already updated inside
//       setPhotos(data.photos || []);
//       setDocuments(data.documents || []);
//       setRemovedPhotos([]);
//       setRemovedDocuments([]);
//       setEditMode(false);
//       toast.success("Changes saved successfully!", {
//         className: "custom-toast",
//         bodyClassName: "custom-toast-body",
//       });
//     } catch (error) {
//       console.error("Failed to save shelter:", error);
//       toast.error(" Failed to save changes.", {
//         className: "custom-toast",
//         bodyClassName: "custom-toast-body",
//       });
//     }
//   };

//   const handleCancel = () => {
//     setEditMode(false);
//     setPhotos(data?.photos || []);
//     setDocuments(data.documents || []);
//     setRemovedPhotos([]);
//     setRemovedDocuments([]);
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//     </div>
//   );

//   return (
//     <ShelterLayout>
//       <div className="bg-[#f9fafb] min-h-screen py-10 px-4">
//         <ToastContainer />
//         <div className="max-w-4xl mx-auto">
          
//           {/* Header */}
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h1 className="text-3xl font-extrabold text-[#183D8B] tracking-tight">Shelter Profile</h1>
//               <p className="text-gray-500 mt-1">Manage your shelter details and public visibility.</p>
//             </div>
//             <button
//               className={`px-6 py-2 rounded-lg font-semibold transition-all shadow-sm ${
//                 editMode 
//                 ? "bg-white border border-red-200 text-red-600 hover:bg-red-50" 
//                 : "bg-[#183D8B] text-white hover:bg-blue-700 shadow-blue-200"
//               }`}
//               onClick={() => (editMode ? handleCancel() : setEditMode(true))}
//             >
//               {editMode ? "Cancel" : "Edit Profile"}
//             </button>
//           </div>

//           <div className="space-y-6">
//             {/* General Info Card */}
//             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
//               <h3 className="text-lg font-bold text-gray-600 mb-6 border-b pb-2">General Information</h3>
//               <div className="space-y-5">
//                 <div>
//                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Shelter Name</label>
//                   <input
//                     disabled={!editMode}
//                     value={data.name || ""}
//                     onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
//                     className="w-full bg-gray-100 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-transparent disabled:px-0 disabled:text-2xl disabled:font-semibold disabled:text-gray-700"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Location</label>
//                     <input
//                       disabled={!editMode}
//                       value={data.location || ""}
//                       onChange={(e) => setData((prev) => ({ ...prev, location: e.target.value }))}
//                       className="w-full bg-gray-100 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-transparent disabled:px-0 disabled:text-gray-700"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Contact</label>
//                     <input
//                       disabled={!editMode}
//                       value={data.contact || ""}
//                       onChange={(e) => {
//                         const value = e.target.value;
//                         const contactRegex = /^\+?\d*$/;
//                         if (value === "" || contactRegex.test(value)) {
//                           setData((prev) => ({ ...prev, contact: value }));
//                         } else {
//                           toast.warn("Numbers and '+' sign only", { autoClose: 1000 });
//                         }
//                       }}
//                       className="w-full bg-gray-100 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-transparent disabled:px-0 disabled:text-gray-700"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">About this shelter</label>
//                   <textarea
//                     disabled={!editMode}
//                     value={data.description || ""}
//                     onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
//                     className="w-full bg-gray-100 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-transparent disabled:px-0 disabled:text-gray-600 resize-none"
//                     rows={5}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Pricing & Status Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
//                 <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Price per day (Rs.)</label>
//                 <div className="relative">
//                   {editMode && <span className="absolute left-4 top-3.5 text-gray-400 font-medium"></span>}
//                   <input
//                     disabled={!editMode}
//                     value={data.pricePerDay || ""}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (value === "" || /^\d+$/.test(value)) {
//                         setData((prev) => ({ ...prev, pricePerDay: value }));
//                       } else {
//                         toast.warn("Please enter numbers only", { autoClose: 1000 });
//                       }
//                     }}
//                     className={`w-full bg-gray-100 border-gray-200 rounded-xl py-3.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all ${editMode ? 'pl-8' : 'pl-0 bg-transparent border-transparent text-3xl font-black text-gray-600'}`}
//                     placeholder="0"
//                   />
//                 </div>
//               </div>

//               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
//                 <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Shelter Status</label>
//                 <StatusSelector editMode={editMode} status={data.status} setData={setData} />
//               </div>
//             </div>

//             {/* Services Card */}
//             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
//               <h3 className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-2">Available Services</h3>
//               <ServicesSelector editMode={editMode} services={data.services || []} setData={setData} />
//             </div>

//             {/* Files & Media Card */}
//             <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
//               <h3 className="text-lg font-bold text-gray-500 mb-6 border-b pb-2">Media & Documents</h3>
//               <FileUploader
//                 editMode={editMode}
//                 photos={photos}
//                 documents={documents}
//                 onPhotosChange={setPhotos}
//                 onDocumentsChange={setDocuments}
//                 onRemovePhoto={handleRemovePhoto}
//                 onRemoveDocument={handleRemoveDocument}
//               />

//               {/* View Mode: Files Display */}
//               {!editMode && (
//                 <div className="mt-10 space-y-8">
//                   <div>
//                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Photo Gallery</h4>
//                     <div className="flex flex-wrap gap-4">
//                       {photos.map((photo, idx) => (
//                         <a key={idx} href={`http://localhost:5050/uploads/${photo}`} target="_blank" rel="noopener noreferrer" className="group">
//                           <img
//                             src={`http://localhost:5050/uploads/${photo}`}
//                             alt={`photo-${idx}`}
//                             className="w-32 h-32 object-cover rounded-xl border border-gray-100 shadow-sm group-hover:scale-105 transition-transform"
//                           />
//                         </a>
//                       ))}
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Documents</h4>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                       {documents.map((doc, idx) => {
//                         const ext = doc.split(".").pop().toLowerCase();
//                         const isImg = ["jpg", "jpeg", "png", "gif"].includes(ext);
//                         return (
//                           <a 
//                             key={idx} 
//                             href={`http://localhost:5050/uploads/${doc}`} 
//                             target="_blank" 
//                             rel="noopener noreferrer"
//                             className="flex items-center p-3 bg-gray-100 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors"
//                           >
//                             <span className="text-blue-600 mr-2">{isImg ? "📄" : "📄"}</span>
//                             <span className="text-sm font-medium text-gray-700 truncate">{doc}</span>
//                           </a>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Save Button Container */}
//             {editMode && (
//               <div className="flex justify-end pt-4">
//                 <button
//                   onClick={handleSubmit}
//                   className="w-full md:w-auto bg-[#183D8B] text-white px-12 py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-800 transform hover:-translate-y-1 transition-all"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </ShelterLayout>
//   );
// }

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShelterLayout from "../../layouts/Shelter/shelterLayout";
import useShelterProfile from "../../hooks/Shelter/useShelterProfile";
import ServicesSelector from "../../components/Shelter/serviceSelector";
import StatusSelector from "../../components/Shelter/statusSelector";
import FileUploader from "../../components/Shelter/fileUploader";

export default function ShelterDashboard() {
  const { data, setData, editMode, setEditMode, handleSave, loading } =
    useShelterProfile();

  const [photos, setPhotos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [removedPhotos, setRemovedPhotos] = useState([]);
  const [removedDocuments, setRemovedDocuments] = useState([]);
  const [totalRooms, setTotalRooms] = useState(0);

  useEffect(() => {
    if (data) {
      console.log(" Shelter data loaded:", data);
      setPhotos(data.photos || []);
      setDocuments(data.documents || []);
      const roomCount = data.rooms?.length || 0;
      console.log(" Setting room count to:", roomCount);
      setTotalRooms(roomCount);
    }
  }, [data]);

  const handleRemovePhoto = (file) => {
    if (typeof file === "string") setRemovedPhotos([...removedPhotos, file]);
    setPhotos(photos.filter((p) => p !== file));
  };

  const handleRemoveDocument = (file) => {
    if (typeof file === "string")
      setRemovedDocuments([...removedDocuments, file]);
    setDocuments(documents.filter((d) => d !== file));
  };

  const validateFields = () => {
    const toastConfig = {
    className: "custom-toast",
    bodyClassName: "custom-toast-body",
  };
    if (!data.name || data.name.trim() === "") {
      toast.error("Please fill in Shelter Name",toastConfig);
      return false;
    }

    if (!data.location || data.location.trim() === "") {
      toast.error("Please fill in Location",toastConfig);
      return false;
    }

    if (!data.contact || data.contact.trim() === "") {
      toast.error("Please fill in Contact",toastConfig);
      return false;
    }

    if (!data.description || data.description.trim() === "") {
      toast.error("Please fill in About this shelter",toastConfig);
      return false;
    }

    if (!data.pricePerDay || data.pricePerDay === "") {
      toast.error("Please fill in Price Per Day",toastConfig);
      return false;
    }

    if (!data.services || data.services.length === 0) {
      toast.error("Please select at least one Service",toastConfig);
      return false;
    }

    if (!data.status || data.status === "") {
      toast.error("Please select a Status",toastConfig);
      return false;
    }

    if (!photos || photos.length === 0) {
      toast.error("Please upload at least one Photo",toastConfig);
      return false;
    }

    if (!documents || documents.length === 0) {
      toast.error("Please upload at least one Verification Document",toastConfig);
      return false;
    }

    if (!totalRooms || totalRooms <= 0) {
      toast.error("Please enter at least 1 room",toastConfig);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

    const fd = new FormData();
    fd.append("name", data.name || "");
    fd.append("location", data.location || "");
    fd.append("contact", data.contact || "");
    fd.append("description", data.description || "");
    fd.append("pricePerDay", data.pricePerDay || "");
    fd.append("status", data.status || "");
    fd.append("totalRooms", String(totalRooms)); // Convert to string
    fd.append(
      "services",
      Array.isArray(data.services) ? data.services.join(",") : ""
    );
    fd.append("removedPhotos", JSON.stringify(removedPhotos));
    fd.append("removedDocuments", JSON.stringify(removedDocuments));
    
    photos.forEach((file) => {
      if (file instanceof File) fd.append("photos", file);
    });
    documents.forEach((file) => {
      if (file instanceof File) fd.append("documents", file);
    });

    console.log("Submitting with totalRooms:", totalRooms);

    try {
      await handleSave(fd);
      setRemovedPhotos([]);
      setRemovedDocuments([]);
      setEditMode(false);
toast.success("Changes saved successfully!", {
    className: "custom-toast",
    bodyClassName: "custom-toast-body",
  });
    } catch (error) {
      console.error("Failed to save shelter:", error);
toast.error("Failed to save changes.", {
    className: "custom-toast",
    bodyClassName: "custom-toast-body",
  });    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setPhotos(data?.photos || []);
    setDocuments(data?.documents || []);
    setRemovedPhotos([]);
    setRemovedDocuments([]);
    setTotalRooms(data?.rooms?.length || 0);
  };

  const getAvailableRoomsCount = () => {
    if (!data?.rooms) return 0;
    return data.rooms.filter(room => room.status === "available").length;
  };

  const getBookedRoomsCount = () => {
    if (!data?.rooms) return 0;
    return data.rooms.filter(room => room.status === "booked").length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ShelterLayout>
      <div className="bg-[#f9fafb] min-h-screen py-10 px-4">
        <ToastContainer />
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-[#183D8B] tracking-tight">
                Shelter Profile
              </h1>
              <p className="text-gray-500 mt-1">
                Manage your shelter details and public visibility.
              </p>
            </div>
            <button
              className={`px-6 py-2 rounded-lg font-semibold transition-all shadow-sm ${
                editMode 
                  ? "bg-white border border-red-200 text-red-600 hover:bg-red-50" 
                  : "bg-[#183D8B] text-white hover:bg-blue-700 shadow-blue-200"
              }`}
              onClick={() => (editMode ? handleCancel() : setEditMode(true))}
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <div className="space-y-6">
            {/* General Info Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-600 mb-6 border-b pb-2">
                General Information
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Shelter Name
                  </label>
                  <input
                    disabled={!editMode}
                    value={data?.name || ""}
                    onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-gray-100 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-transparent disabled:px-0 disabled:text-2xl disabled:font-semibold disabled:text-gray-700"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Location
                    </label>
                    <input
                      disabled={!editMode}
                      value={data?.location || ""}
                      onChange={(e) => setData((prev) => ({ ...prev, location: e.target.value }))}
                      className="w-full bg-gray-100 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-transparent disabled:px-0 disabled:text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Contact
                    </label>
                    <input
                      disabled={!editMode}
                      value={data?.contact || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        const contactRegex = /^\+?\d*$/;
                        if (value === "" || contactRegex.test(value)) {
                          setData((prev) => ({ ...prev, contact: value }));
                        } else {
                          toast.warn("Numbers and '+' sign only", { autoClose: 1000 });
                        }
                      }}
                      className="w-full bg-gray-100 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-transparent disabled:px-0 disabled:text-gray-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    About this shelter
                  </label>
                  <textarea
                    disabled={!editMode}
                    value={data?.description || ""}
                    onChange={(e) => setData((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-gray-100 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:bg-transparent disabled:px-0 disabled:text-gray-600 resize-none"
                    rows={5}
                  />
                </div>
              </div>
            </div>

            {/* Pricing, Status & Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Price per day (Rs.)
                </label>
                <div className="relative">
                  {editMode && <span className="absolute left-4 top-3.5 text-gray-400 font-medium">₹</span>}
                  <input
                    disabled={!editMode}
                    value={data?.pricePerDay || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^\d+$/.test(value)) {
                        setData((prev) => ({ ...prev, pricePerDay: value }));
                      } else {
                        toast.warn("Please enter numbers only", { autoClose: 1000 });
                      }
                    }}
                    className={`w-full bg-gray-100 border-gray-200 rounded-xl py-3.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                      editMode ? 'pl-8' : 'pl-0 bg-transparent border-transparent text-3xl font-black text-gray-600'
                    }`}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Total Rooms
                </label>
                <input
                  disabled={!editMode}
                  type="number"
                  min="0"
                  value={totalRooms}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "" || /^\d+$/.test(value)) {
                      const numValue = value === "" ? 0 : Number(value);
                      console.log(" Room count changed to:", numValue);
                      setTotalRooms(numValue);
                    }
                  }}
                  className={`w-full bg-gray-100 border-gray-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
                    !editMode ? 'bg-transparent border-transparent text-3xl font-black text-gray-600 px-0' : ''
                  }`}
                />
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Shelter Status
                </label>
                <StatusSelector editMode={editMode} status={data?.status} setData={setData} />
              </div>
            </div>

            {/* Room Details Card
            {!editMode && data?.rooms && data.rooms.length > 0 && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-600 mb-6 border-b pb-2">
                  Room Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Total Rooms
                    </p>
                    <p className="text-3xl font-black text-blue-600">{data.rooms.length}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Available
                    </p>
                    <p className="text-3xl font-black text-green-600">{getAvailableRoomsCount()}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                      Booked
                    </p>
                    <p className="text-3xl font-black text-orange-600">{getBookedRoomsCount()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {data.rooms.map((room, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        room.status === "available"
                          ? "bg-green-50 border-green-200"
                          : "bg-orange-50 border-orange-200"
                      }`}
                    >
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                        Room
                      </p>
                      <p className="text-2xl font-black text-gray-700">{room.roomNumber}</p>
                      <p className={`text-xs font-semibold mt-2 ${
                        room.status === "available" ? "text-green-600" : "text-orange-600"
                      }`}>
                        {room.status === "available" ? "Available" : "Booked"}
                      </p>
                      {room.status === "booked" && room.bookedPet && (
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {room.bookedPet.petName}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Services Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-2">
                Available Services
              </h3>
              <ServicesSelector editMode={editMode} services={data?.services || []} setData={setData} />
            </div>

            {/* Files & Media Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-500 mb-6 border-b pb-2">
                Media & Documents
              </h3>
              <FileUploader
                editMode={editMode}
                photos={photos}
                documents={documents}
                onPhotosChange={setPhotos}
                onDocumentsChange={setDocuments}
                onRemovePhoto={handleRemovePhoto}
                onRemoveDocument={handleRemoveDocument}
              />

              {/* View Mode: Files Display */}
              {!editMode && (
                <div className="mt-10 space-y-8">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                      Photo Gallery
                    </h4>
                    <div className="flex flex-wrap gap-4">
                      {photos.map((photo, idx) => (
                        <a 
                          key={idx} 
                          href={`http://localhost:5050/uploads/${photo}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="group"
                        >
                          <img
                            src={`http://localhost:5050/uploads/${photo}`}
                            alt={`photo-${idx}`}
                            className="w-32 h-32 object-cover rounded-xl border border-gray-100 shadow-sm group-hover:scale-105 transition-transform"
                          />
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                      Documents
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {documents.map((doc, idx) => {
                        const ext = doc.split(".").pop().toLowerCase();
                        const isImg = ["jpg", "jpeg", "png", "gif"].includes(ext);
                        return (
                          <a 
                            key={idx} 
                            href={`http://localhost:5050/uploads/${doc}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center p-3 bg-gray-100 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-colors"
                          >
                            <span className="text-blue-600 mr-2">{isImg ? "📄" : "📄"}</span>
                            <span className="text-sm font-medium text-gray-700 truncate">{doc}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Save Button Container */}
            {editMode && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSubmit}
                  className="w-full md:w-auto bg-[#183D8B] text-white px-12 py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-800 transform hover:-translate-y-1 transition-all"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ShelterLayout>
  );
}