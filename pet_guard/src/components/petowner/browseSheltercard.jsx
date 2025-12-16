import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../services/petowner/browseService";
import { FaHeart } from "react-icons/fa";

export default function ShelterCard({ shelter }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md p-3 relative">
      {/* Image */}
      <img
        src={`${IMAGE_URL}/${shelter.photos[0]}`}
        alt={shelter.name}
        className="h-44 w-full object-cover rounded-lg"
      />

      {/* Favorite icon */}
      <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow">
        <FaHeart className="text-gray-400" />
      </button>

      {/* Content */}
      <h3 className="font-semibold mt-3 text-lg">{shelter.name}</h3>
      <p className="text-sm text-gray-500">{shelter.location}</p>

      <p className="text-sm mt-1">
        Status:{" "}
        <span
          className={`font-medium ${
            shelter.status === "available" ? "text-green-600" : "text-red-600"
          }`}
        >
          {shelter.status}
        </span>
      </p>

      <button
        disabled={shelter.status !== "available"}
        onClick={() => navigate(`/shelters/${shelter._id}`)}
        className={`w-full mt-3 py-2 rounded-lg text-white
    ${
      shelter.status === "available"
        ? "bg-[#183D8B]"
        : "bg-gray-400 cursor-not-allowed"
    }
  `}
      >
        {shelter.status === "available" ? "Book Now" : "Unavailable"}
      </button>
    </div>
  );
}
