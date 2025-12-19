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

//   const [photos, setPhotos] = useState([]); // can be strings (existing) or File objects
//   const [documents, setDocuments] = useState([]);

//   const [removedPhotos, setRemovedPhotos] = useState([]);
//   const [removedDocuments, setRemovedDocuments] = useState([]);

//   // Prepopulate uploaded files when data is loaded
//   useEffect(() => {
//     if (data) {
//       setPhotos(data.photos || []);
//       setDocuments(data.documents || []);
//     }
//   }, [data]);

//   // Handlers to remove existing files
//   const handleRemovePhoto = (file) => {
//     if (typeof file === "string") setRemovedPhotos([...removedPhotos, file]);
//     setPhotos(photos.filter((p) => p !== file));
//   };

//   const handleRemoveDocument = (file) => {
//     if (typeof file === "string")
//       setRemovedDocuments([...removedDocuments, file]);
//     setDocuments(documents.filter((d) => d !== file));
//   };

//   const handleSubmit = async () => {
//     const fd = new FormData();

//     // Text fields
//     fd.append("name", data.name || "");
//     fd.append("location", data.location || "");
//     fd.append("description", data.description || "");
//     fd.append("pricePerDay", data.pricePerDay || "");
//     fd.append("status", data.status || "");
//     fd.append(
//       "services",
//       Array.isArray(data.services) ? data.services.join(",") : ""
//     );

//     // Removed files
//     fd.append("removedPhotos", JSON.stringify(removedPhotos));
//     fd.append("removedDocuments", JSON.stringify(removedDocuments));

//     // Append only new File objects
//     photos.forEach((file) => {
//       if (file instanceof File) fd.append("photos", file);
//     });
//     documents.forEach((file) => {
//       if (file instanceof File) fd.append("documents", file);
//     });

//     try {
//       await handleSave(fd);
//       setRemovedPhotos([]);
//       setRemovedDocuments([]);
//       setEditMode(false);

//       // Show toast
//       toast.success("changes saved successfully!", {
//         className: "custom-toast",
//         bodyClassName: "custom-toast-body",
//       });
//     } catch (error) {
//       console.error("Failed to save shelter:", error);
//       toast.error("⚠️ Failed to save changes.", {
//         className: "custom-toast",
//         bodyClassName: "custom-toast-body",
//       });
//     }
//   };

//   const handleCancel = () => {
//     setEditMode(false);
//     // Reset to last saved data
//     setPhotos(data.photos || []);
//     setDocuments(data.documents || []);
//     setRemovedPhotos([]);
//     setRemovedDocuments([]);
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <ShelterLayout>
//       <div className="bg-white p-6 rounded shadow relative max-w-3xl">
//         {/* Edit / Cancel */}
//         <button
//           className="absolute top-4 right-4 text-blue-600 font-medium"
//           onClick={() => (editMode ? handleCancel() : setEditMode(true))}
//         >
//           {editMode ? "Cancel" : "Edit"}
//         </button>

//         <h2 className="text-xl font-bold mb-6">Shelter Profile</h2>

//         {/* Name */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Shelter Name</label>
//           <input
//             disabled={!editMode}
//             value={data.name || ""}
//             onChange={(e) =>
//               setData((prev) => ({ ...prev, name: e.target.value }))
//             }
//             className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
//           />
//         </div>

//         {/* Location */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Location</label>
//           <input
//             disabled={!editMode}
//             value={data.location || ""}
//             onChange={(e) =>
//               setData((prev) => ({ ...prev, location: e.target.value }))
//             }
//             className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">
//             About this shelter
//           </label>
//           <textarea
//             disabled={!editMode}
//             value={data.description || ""}
//             onChange={(e) =>
//               setData((prev) => ({ ...prev, description: e.target.value }))
//             }
//             className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
//             rows={4}
//           />
//         </div>

//         {/* Price */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">
//             Price Per Day
//           </label>
//           <input
//             type="number"
//             disabled={!editMode}
//             value={data.pricePerDay || ""}
//             onChange={(e) =>
//               setData((prev) => ({ ...prev, pricePerDay: e.target.value }))
//             }
//             className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
//           />
//         </div>

//         {/* Services */}
//         <ServicesSelector
//           editMode={editMode}
//           services={data.services || []}
//           setData={setData}
//         />

//         {/* Status */}
//         <StatusSelector
//           editMode={editMode}
//           status={data.status}
//           setData={setData}
//         />

//         {/* File Upload */}
//         <FileUploader
//           editMode={editMode}
//           photos={photos}
//           documents={documents}
//           onPhotosChange={setPhotos}
//           onDocumentsChange={setDocuments}
//           onRemovePhoto={handleRemovePhoto}
//           onRemoveDocument={handleRemoveDocument}
//         />

//         {/* Save Button */}
//         {editMode && (
//           <button
//             onClick={handleSubmit}
//             className="mt-6 bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
//           >
//             Save Changes
//           </button>
//         )}

//         {/* Display already uploaded files */}
//         {!editMode && (
//           <div className="mt-6">
//             {/* Photos */}
//             <h4 className="font-semibold mb-2">Uploaded Photos</h4>
//             <div className="flex flex-wrap gap-2">
//               {photos.map((photo, idx) => (
//                 <img
//                   key={idx}
//                   src={`http://localhost:5050/uploads/${photo}`}
//                   alt={`photo-${idx}`}
//                   className="w-24 h-24 object-cover rounded border"
//                 />
//               ))}
//             </div>

//             {/* Documents */}
//             <h4 className="font-semibold mt-4 mb-2">Uploaded Documents</h4>
//             <div className="flex flex-wrap gap-2">
//               {documents.map((doc, idx) => {
//                 const ext = doc.split(".").pop().toLowerCase();
//                 const fileUrl = `http://localhost:5050/uploads/${doc}`;

//                 if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
//                   return (
//                     <img
//                       key={idx}
//                       src={fileUrl}
//                       alt={`doc-${idx}`}
//                       className="w-24 h-24 object-cover rounded border"
//                     />
//                   );
//                 } else {
//                   return (
//                     <a
//                       key={idx}
//                       href={fileUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="block bg-gray-100 px-2 py-1 rounded border hover:bg-gray-200"
//                     >
//                       {doc}
//                     </a>
//                   );
//                 }
//               })}
//             </div>
//           </div>
//         )}
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

  useEffect(() => {
    if (data) {
      setPhotos(data.photos || []);
      setDocuments(data.documents || []);
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

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("name", data.name || "");
    fd.append("location", data.location || "");
    fd.append("description", data.description || "");
    fd.append("pricePerDay", data.pricePerDay || "");
    fd.append("status", data.status || "");
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
      toast.error(" Failed to save changes.", {
        className: "custom-toast",
        bodyClassName: "custom-toast-body",
      });
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setPhotos(data.photos || []);
    setDocuments(data.documents || []);
    setRemovedPhotos([]);
    setRemovedDocuments([]);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <ShelterLayout>
      <div className=" min-h-screen p-6">
        <ToastContainer />
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="relative mb-6">
            <button
              className="absolute top-0 right-0 text-blue-600 font-medium"
              onClick={() => (editMode ? handleCancel() : setEditMode(true))}
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
            <h2 className="text-3xl font-bold mb-6">Shelter Profile</h2>
          </div>

          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">Shelter Name</label>
            <input
              disabled={!editMode}
              value={data.name || ""}
              onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full border rounded px-4 py-3 shadow-inner disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Location */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              disabled={!editMode}
              value={data.location || ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, location: e.target.value }))
              }
              className="w-full border rounded px-4 py-3 shadow-inner disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">About this shelter</label>
            <textarea
              disabled={!editMode}
              value={data.description || ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, description: e.target.value }))
              }
              className="w-full border rounded px-4 py-3 shadow-inner disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
              rows={5}
            />
          </div>

          {/* Price */}
          <div className="mb-5">
            <label className="block text-sm font-medium mb-2">Price Per Day</label>
            <input
              type="number"
              disabled={!editMode}
              value={data.pricePerDay || ""}
              onChange={(e) =>
                setData((prev) => ({ ...prev, pricePerDay: e.target.value }))
              }
              className="w-full border rounded px-4 py-3 shadow-inner disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Services */}
          <ServicesSelector
            editMode={editMode}
            services={data.services || []}
            setData={setData}
          />

          {/* Status */}
          <StatusSelector
            editMode={editMode}
            status={data.status}
            setData={setData}
          />

          {/* File Upload */}
          <FileUploader
            editMode={editMode}
            photos={photos}
            documents={documents}
            onPhotosChange={setPhotos}
            onDocumentsChange={setDocuments}
            onRemovePhoto={handleRemovePhoto}
            onRemoveDocument={handleRemoveDocument}
          />

          {/* Save Button */}
          {editMode && (
            <button
              onClick={handleSubmit}
              className="mt-6 bg-blue-700 text-white px-6 py-3 rounded shadow hover:bg-blue-800 transition"
            >
              Save Changes
            </button>
          )}

          {/* Display already uploaded files */}
          {!editMode && (
            <div className="mt-8">
              {/* Photos */}
              <h4 className="font-semibold mb-3 text-lg">Uploaded Photos</h4>
              <div className="flex flex-wrap gap-3">
                {photos.map((photo, idx) => (
                  <a
                    key={idx}
                    href={`http://localhost:5050/uploads/${photo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`http://localhost:5050/uploads/${photo}`}
                      alt={`photo-${idx}`}
                      className="w-28 h-28 object-cover rounded border hover:scale-105 transition-transform"
                    />
                  </a>
                ))}
              </div>

              {/* Documents */}
              <h4 className="font-semibold mt-6 mb-3 text-lg">Uploaded Documents</h4>
              <div className="flex flex-wrap gap-3">
                {documents.map((doc, idx) => {
                  const ext = doc.split(".").pop().toLowerCase();
                  const fileUrl = `http://localhost:5050/uploads/${doc}`;
                  if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
                    return (
                      <a
                        key={idx}
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={fileUrl}
                          alt={`doc-${idx}`}
                          className="w-28 h-28 object-cover rounded border hover:scale-105 transition-transform"
                        />
                      </a>
                    );
                  } else {
                    return (
                      <a
                        key={idx}
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-gray-100 px-3 py-2 rounded border hover:bg-gray-200"
                      >
                        {doc}
                      </a>
                    );
                  }
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </ShelterLayout>
  );
}
