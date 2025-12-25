// import { useNavigate } from "react-router-dom";
// import { IMAGE_URL } from "../../services/petowner/browseService";
// import { FaHeart,FaMapMarkerAlt } from "react-icons/fa";

// export default function ShelterCard({ shelter }) {
//   const navigate = useNavigate();

//   // Open details page when card is clicked
//   const openDetails = () => {
//     navigate(`/shelters/${shelter._id}`);
//   };

//   // Open booking page when Book Now is clicked
//   const openBooking = (e) => {
//     e.stopPropagation(); // prevent card click
//     navigate(`/booking/${shelter._id}`);
//   };

//   return (
//    <div
//       onClick={openDetails}
//       className="
//         cursor-pointer
//         bg-white rounded-2xl shadow-sm p-4 relative
//         border border-gray-100
//         transition-all duration-300 ease-out
//         hover:-translate-y-2 hover:shadow-2xl
//         group
//       "
//     >
//       {/* Image Container */}
//       <div className="relative overflow-hidden rounded-xl bg-gray-100">
//         <img
//           src={`${IMAGE_URL}/${shelter.photos[0]}`}
//           alt={shelter.name}
//           className="
//             h-48 w-full object-cover
//             transition-transform duration-500
//             group-hover:scale-110
//           "
//         />

//         {/* Favorite icon */}
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             // Handle favorite logic here
//           }}
//           className="
//             absolute top-3 right-3
//             bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg
//             hover:bg-white hover:scale-110 transition-all active:scale-95
//           "
//         >
//           <FaHeart className="text-gray-300 hover:text-red-500 transition-colors" />
//         </button>
//       </div>

//       {/* Content */}
//       <div className="space-y-1 mt-4">
//         <h3 className="font-bold text-[#183D8B] text-xl tracking-tight">
//           {shelter.name}
//         </h3>
        
//         <div className="flex items-center gap-1.5 text-[#183D8B]/80">
//           <FaMapMarkerAlt className="text-sm" />
//           <p className="text-sm font-medium">{shelter.location}</p>
//         </div>

//         {/* Status */}
//         <p className="text-sm font-semibold text-[#183D8B]">
//           Status:{" "}
//           <span
//             className={`px-2 py-0.5 rounded-md text-xs uppercase tracking-wider ${
//               shelter.status === "available"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-700"
//             }`}
//           >
//             {shelter.status}
//           </span>
//         </p>
//       </div>

//       {/* Hover Hint */}
//       <div
//         className="
//           text-[10px] font-bold text-[#183D8B]/50 uppercase mt-3
//           opacity-0 translate-x-[-10px]
//           transition-all duration-300
//           group-hover:opacity-100 group-hover:translate-x-0
//         "
//       >
//         Click for full details →
//       </div>

//       {/* Book Now Button */}
//       <button
//         disabled={shelter.status !== "available"}
//         onClick={(e) => {
//           e.stopPropagation(); // Prevents opening the details modal
//           openBooking();
//         }}
//         className={`w-full mt-4 py-3 rounded-xl text-white font-bold shadow-md transition-all active:scale-95
//           ${
//             shelter.status === "available"
//               ? "bg-[#183D8B] hover:bg-[#122e6b] hover:shadow-lg"
//               : "bg-gray-300 cursor-not-allowed shadow-none"
//           }
//         `}
//       >
//         {shelter.status === "available" ? "Book Now" : "Unavailable"}
//       </button>
//     </div>
//   );
// }

// src/components/ShelterCard.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../services/petowner/browseService";
import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { useFavorites } from "../../components/petowner/favoritescontext";
import { toast } from "react-toastify";

export default function ShelterCard({ shelter }) {
  const navigate = useNavigate();
  const { isFavorite, handleToggleFavorite } = useFavorites();
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  // Check if this shelter is favorited
  const isFavorited = isFavorite(shelter._id);

  // Open details page when card is clicked
  const openDetails = () => {
    navigate(`/shelters/${shelter._id}`);
  };

  // Open booking page when Book Now is clicked
  const openBooking = (e) => {
    e.stopPropagation(); // prevent card click
    navigate(`/booking/${shelter._id}`);
  };

  // Handle favorite toggle
  const onToggleFavorite = async (e) => {
    e.stopPropagation(); // prevent card click

    if (isTogglingFavorite) return; // Prevent multiple clicks

    try {
      setIsTogglingFavorite(true);
      const response = await handleToggleFavorite(shelter._id);

      // Show success notification
      if (response.isFavorite) {
        toast.success("Added to favorites!", { autoClose: 2000 });
      } else {
        toast.info("Removed from favorites", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  return (
    <div
      onClick={openDetails}
      className="
        cursor-pointer
        bg-white rounded-2xl shadow-sm p-4 relative
        border border-gray-100
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-2xl
        group
      "
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-xl bg-gray-100">
        <img
          src={`${IMAGE_URL}/${shelter.photos[0]}`}
          alt={shelter.name}
          className="
            h-48 w-full object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />

        {/* Favorite icon */}
        <button
          onClick={onToggleFavorite}
          disabled={isTogglingFavorite}
          className="
            absolute top-3 right-3
            bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg
            hover:bg-white hover:scale-110 transition-all active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <FaHeart
            className={`transition-all duration-300 ${
              isFavorited
                ? "text-red-500 fill-red-500 scale-110"
                : "text-gray-300 hover:text-red-400"
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-1 mt-4">
        <h3 className="font-bold text-[#183D8B] text-xl tracking-tight">
          {shelter.name}
        </h3>

        <div className="flex items-center gap-1.5 text-[#183D8B]/80">
          <FaMapMarkerAlt className="text-sm" />
          <p className="text-sm font-medium">{shelter.location}</p>
        </div>

        {/* Status */}
        <p className="text-sm font-semibold text-[#183D8B]">
          Status:{" "}
          <span
            className={`px-2 py-0.5 rounded-md text-xs uppercase tracking-wider ${
              shelter.status === "available"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {shelter.status}
          </span>
        </p>
      </div>

      {/* Hover Hint */}
      <div
        className="
          text-[10px] font-bold text-[#183D8B]/50 uppercase mt-3
          opacity-0 translate-x-[-10px]
          transition-all duration-300
          group-hover:opacity-100 group-hover:translate-x-0
        "
      >
        Click for full details →
      </div>

      {/* Book Now Button */}
      <button
        disabled={shelter.status !== "available"}
        onClick={(e) => {
          e.stopPropagation(); // Prevents opening the details modal
          openBooking(e);
        }}
        className={`w-full mt-4 py-3 rounded-xl text-white font-bold shadow-md transition-all active:scale-95
          ${
            shelter.status === "available"
              ? "bg-[#183D8B] hover:bg-[#122e6b] hover:shadow-lg"
              : "bg-gray-300 cursor-not-allowed shadow-none"
          }
        `}
      >
        {shelter.status === "available" ? "Book Now" : "Unavailable"}
      </button>
    </div>
  );
}