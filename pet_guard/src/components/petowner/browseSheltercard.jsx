// import { useNavigate } from "react-router-dom";
// import { IMAGE_URL } from "../../services/petowner/browseService";
// import { FaHeart } from "react-icons/fa";

// export default function ShelterCard({ shelter }) {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="
//         bg-white rounded-2xl shadow-md p-3 relative
//         transition-all duration-300 ease-in-out
//         hover:-translate-y-2 hover:shadow-xl
//         group
//       "
//     >
//       {/* Image */}
//       <div className="relative overflow-hidden rounded-xl">
//         <img
//           src={`${IMAGE_URL}/${shelter.photos[0]}`}
//           alt={shelter.name}
//           className="
//             h-44 w-full object-cover
//             transition-transform duration-300
//             group-hover:scale-105
//           "
//         />

//         {/* Favorite icon */}
//         <button
//           className="
//             absolute top-3 right-3
//             bg-white p-2 rounded-full shadow
//             hover:scale-110 transition
//           "
//         >
//           <FaHeart className="text-gray-400 hover:text-red-500" />
//         </button>
//       </div>

//       {/* Content */}
//       <h3 className="font-semibold mt-3 text-lg">{shelter.name}</h3>
//       <p className="text-sm text-gray-500">{shelter.location}</p>

//       {/* Status */}
//       <p className="text-sm mt-1">
//         Status:{" "}
//         <span
//           className={`font-medium ${
//             shelter.status === "available"
//               ? "text-green-600"
//               : "text-red-600"
//           }`}
//         >
//           {shelter.status.charAt(0).toUpperCase() + shelter.status.slice(1)}
//         </span>
//       </p>

//       {/* Extra info on hover */}
//       <div
//         className="
//           text-xs text-gray-500 mt-2
//           opacity-0 translate-y-2
//           transition-all duration-300
//           group-hover:opacity-100 group-hover:translate-y-0
//         "
//       >
//         Click to view shelter details and booking options
//       </div>

//       {/* Button */}
//       <button
//         disabled={shelter.status !== "available"}
//         onClick={() => navigate(`/shelters/${shelter._id}`)}
//         className={`w-full mt-3 py-2 rounded-lg text-white transition
//           ${
//             shelter.status === "available"
//               ? "bg-[#183D8B] hover:bg-[#122e6b]"
//               : "bg-gray-400 cursor-not-allowed"
//           }
//         `}
//       >
//         {shelter.status === "available" ? "Book Now" : "Unavailable"}
//       </button>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../services/petowner/browseService";
import { FaHeart } from "react-icons/fa";

export default function ShelterCard({ shelter }) {
  const navigate = useNavigate();

  // Open details page when card is clicked
  const openDetails = () => {
    navigate(`/shelters/${shelter._id}`);
  };

  // Open booking page when Book Now is clicked
  const openBooking = (e) => {
    e.stopPropagation(); // prevent card click
    navigate(`/booking/${shelter._id}`);
  };

  return (
    <div
      onClick={openDetails}
      className="
        cursor-pointer
        bg-white rounded-2xl shadow-md p-3 relative
        transition-all duration-300 ease-in-out
        hover:-translate-y-2 hover:shadow-xl
        group
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={`${IMAGE_URL}/${shelter.photos[0]}`}
          alt={shelter.name}
          className="
            h-44 w-full object-cover
            transition-transform duration-300
            group-hover:scale-105
          "
        />

        {/* Favorite icon */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="
            absolute top-3 right-3
            bg-white p-2 rounded-full shadow
            hover:scale-110 transition
          "
        >
          <FaHeart className="text-gray-400 hover:text-red-500" />
        </button>
      </div>

      {/* Content */}
      <h3 className="font-semibold mt-3 text-lg">{shelter.name}</h3>
      <p className="text-sm text-gray-500">{shelter.location}</p>

      {/* Status */}
      <p className="text-sm mt-1">
        Status:{" "}
        <span
          className={`font-medium ${
            shelter.status === "available"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {shelter.status.charAt(0).toUpperCase() + shelter.status.slice(1)}
        </span>
      </p>

      {/* Hover text */}
      <div
        className="
          text-xs text-gray-500 mt-2
          opacity-0 translate-y-2
          transition-all duration-300
          group-hover:opacity-100 group-hover:translate-y-0
        "
      >
        Tap to view details
      </div>

      {/* Book Now Button */}
      <button
        disabled={shelter.status !== "available"}
        onClick={openBooking}
        className={`w-full mt-3 py-2 rounded-lg text-white transition
          ${
            shelter.status === "available"
              ? "bg-[#183D8B] hover:bg-[#122e6b]"
              : "bg-gray-400 cursor-not-allowed"
          }
        `}
      >
        {shelter.status === "available" ? "Book Now" : "Unavailable"}
      </button>
    </div>
  );
}

