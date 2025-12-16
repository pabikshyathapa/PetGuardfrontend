// export default function FileUploader({
//   editMode,
//   photos = [],
//   documents = [],
//   onPhotosChange,
//   onDocumentsChange,
//   onRemovePhoto,
//   onRemoveDocument,
// }) {
//   if (!editMode) return null;

//   const handleNewPhotos = (e) => {
//     onPhotosChange([...photos, ...Array.from(e.target.files)]);
//   };

//   const handleNewDocuments = (e) => {
//     onDocumentsChange([...documents, ...Array.from(e.target.files)]);
//   };

//   return (
//     <div className="mt-6 grid grid-cols-2 gap-4">
//       {/* Photos */}
//       <div>
//         <label className="block text-sm font-medium mb-1">Photos</label>
//         <input type="file" multiple onChange={handleNewPhotos} />

//         {photos.length > 0 && (
//           <div className="mt-2 flex flex-wrap gap-2">
//             {photos.map((file, idx) => (
//               <div
//                 key={idx}
//                 className="relative w-24 h-24 rounded border overflow-hidden"
//               >
//                 <img
//                   src={file instanceof File ? URL.createObjectURL(file) : `http://localhost:5050/uploads/${file}`}
//                   alt={`photo-${idx}`}
//                   className="w-full h-full object-cover"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => onRemovePhoto(file)}
//                   className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
//                 >
//                   ✖️
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Documents */}
//       <div>
//         <label className="block text-sm font-medium mb-1">Documents</label>
//         <input type="file" multiple onChange={handleNewDocuments} />

//         {documents.length > 0 && (
//           <div className="mt-2 flex flex-wrap gap-2">
//             {documents.map((file, idx) => {
//               const fileName = file instanceof File ? file.name : file;
//               const ext = fileName.split(".").pop().toLowerCase();
//               const fileUrl =
//                 file instanceof File
//                   ? URL.createObjectURL(file)
//                   : `http://localhost:5050/uploads/${fileName}`;

//               if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
//                 return (
//                   <div
//                     key={idx}
//                     className="relative w-24 h-24 rounded border overflow-hidden"
//                   >
//                     <img
//                       src={fileUrl}
//                       alt={`doc-${idx}`}
//                       className="w-full h-full object-cover"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => onRemoveDocument(file)}
//                       className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
//                     >
//                       ✖️
//                     </button>
//                   </div>
//                 );
//               } else {
//                 return (
//                   <div key={idx} className="relative">
//                     <a
//                       href={fileUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="block bg-gray-100 px-2 py-1 rounded border hover:bg-gray-200"
//                     >
//                       {fileName}
//                     </a>
//                     <button
//                       type="button"
//                       onClick={() => onRemoveDocument(file)}
//                       className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
//                     >
//                       ✖️
//                     </button>
//                   </div>
//                 );
//               }
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { LuImagePlus, LuFileText, LuX } from "react-icons/lu";

export default function FileUploader({
  editMode,
  photos = [],
  documents = [],
  onPhotosChange,
  onDocumentsChange,
  onRemovePhoto,
  onRemoveDocument,
}) {
  const handleNewPhotos = (e) => {
    onPhotosChange([...photos, ...Array.from(e.target.files)]);
  };

  const handleNewDocuments = (e) => {
    onDocumentsChange([...documents, ...Array.from(e.target.files)]);
  };

  // Logic to view full image/file in a new tab when clicked
  const handleViewFile = (file) => {
    const url = file instanceof File 
      ? URL.createObjectURL(file) 
      : `http://localhost:5050/uploads/${file}`;
    window.open(url, "_blank");
  };

  if (!editMode) return null;

  const isImage = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
  };

  return (
    <div className="mt-4 grid grid-cols-2 gap-6">
      {/* Photos Section */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 font-semibold">Photos</label>
        <div className="relative">
          {/* Small Upload Trigger with Navy Blue Icon */}
          <label className="flex flex-col items-center justify-center w-full h-24 bg-white border border-gray-200 rounded-xl shadow-sm cursor-pointer hover:bg-gray-50 transition-all">
            <LuImagePlus className="w-8 h-8 text-[#183D8B] opacity-90" />
            <input type="file" multiple className="hidden" onChange={handleNewPhotos} />
          </label>

          {/* Large Viewable Previews */}
          <div className="mt-3 flex flex-wrap gap-3">
            {photos.map((file, idx) => (
              <div key={idx} className="relative w-24 h-24 rounded-xl border border-gray-200 overflow-hidden shadow-sm group cursor-zoom-in">
                <img
                  src={file instanceof File ? URL.createObjectURL(file) : `http://localhost:5050/uploads/${file}`}
                  alt="preview"
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  onClick={() => handleViewFile(file)}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemovePhoto(file);
                  }}
                  className="absolute top-1 right-1 bg-[#183D8B] text-white rounded-full p-1 shadow-md hover:opacity-90 transition-all z-10"
                >
                  <LuX className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verification Documents Section */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700 font-semibold">Verification Documents</label>
        <div className="relative">
          {/* Small Upload Trigger with Navy Blue Icon */}
          <label className="flex flex-col items-center justify-center w-full h-24 bg-white border border-gray-200 rounded-xl shadow-sm cursor-pointer hover:bg-gray-50 transition-all">
            <LuFileText className="w-8 h-8 text-[#183D8B] opacity-90" />
            <input type="file" multiple className="hidden" onChange={handleNewDocuments} />
          </label>

          {/* Large Viewable Previews */}
          <div className="mt-3 flex flex-wrap gap-3">
            {documents.map((file, idx) => {
              const fileName = file instanceof File ? file.name : file;
              
              return (
                <div 
                  key={idx} 
                  className="relative w-24 h-24 rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center group cursor-zoom-in"
                >
                  {isImage(fileName) ? (
                    <img
                      src={file instanceof File ? URL.createObjectURL(file) : `http://localhost:5050/uploads/${fileName}`}
                      alt="doc-preview"
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                      onClick={() => handleViewFile(file)}
                    />
                  ) : (
                    <div 
                      className="flex flex-col items-center p-2 w-full"
                      onClick={() => handleViewFile(file)}
                    >
                      <LuFileText className="w-8 h-8 text-[#183D8B] opacity-60" />
                      <span className="text-[10px] text-gray-500 uppercase font-bold mt-1 truncate max-w-full px-1">
                        {fileName.split('.').pop()}
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveDocument(file);
                    }}
                    className="absolute top-1 right-1 bg-[#183D8B] text-white rounded-full p-1 shadow-md hover:opacity-90 transition-all z-10"
                  >
                    <LuX className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}