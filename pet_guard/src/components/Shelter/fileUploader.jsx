
// export default function FileUploader({ editMode, photos = [], documents = [], onPhotosChange, onDocumentsChange }) {
//   if (!editMode) return null;

//   return (
//     <div className="mt-6 grid grid-cols-2 gap-4">
//       <div>
//         <label className="block text-sm font-medium mb-1">Photos</label>
//         <input
//           type="file"
//           multiple
//           onChange={(e) => onPhotosChange([...photos, ...e.target.files])} // append new files
//         />
//         {photos.length > 0 && (
//           <div className="mt-2 flex flex-wrap gap-2">
//             {photos.map((file, idx) => (
//               <span key={idx} className="bg-gray-200 px-2 py-1 rounded text-sm">
//                 {file.name || file}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>

//       <div>
//         <label className="block text-sm font-medium mb-1">Documents</label>
//         <input
//           type="file"
//           multiple
//           onChange={(e) => onDocumentsChange([...documents, ...e.target.files])}
//         />
//         {documents.length > 0 && (
//           <div className="mt-2 flex flex-wrap gap-2">
//             {documents.map((file, idx) => (
//               <span key={idx} className="bg-gray-200 px-2 py-1 rounded text-sm">
//                 {file.name || file}
//               </span>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

export default function FileUploader({
  editMode,
  photos = [],
  documents = [],
  onPhotosChange,
  onDocumentsChange,
  onRemovePhoto,
  onRemoveDocument,
}) {
  if (!editMode) return null;

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      <div>
        <label>Photos</label>
        <input type="file" multiple onChange={(e) => onPhotosChange([...photos, ...e.target.files])} />
        <div className="flex flex-wrap gap-2 mt-2">
          {photos.map((file, idx) => (
            <div key={idx} className="relative bg-gray-200 px-2 py-1 rounded">
              {file.name || file}
              <button
                type="button"
                className="absolute -top-2 -right-2 text-red-600"
                onClick={() => onRemovePhoto(file)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label>Documents</label>
        <input type="file" multiple onChange={(e) => onDocumentsChange([...documents, ...e.target.files])} />
        <div className="flex flex-wrap gap-2 mt-2">
          {documents.map((file, idx) => (
            <div key={idx} className="relative bg-gray-200 px-2 py-1 rounded">
              {file.name || file}
              <button
                type="button"
                className="absolute -top-2 -right-2 text-red-600"
                onClick={() => onRemoveDocument(file)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

