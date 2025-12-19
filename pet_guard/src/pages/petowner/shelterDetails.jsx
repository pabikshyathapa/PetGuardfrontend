import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMAGE_URL, getShelterById } from "../../services/petowner/browseService";

export default function ShelterDetails() {
  const { id } = useParams();
  const [shelter, setShelter] = useState(null);

  useEffect(() => {
    getShelterById(id).then(setShelter);
  }, [id]);

  if (!shelter) return <p>Loading...</p>;
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Images */}
      <div className="grid grid-cols-2 gap-4">
        {shelter.photos.map((img) => (
          <img
            key={img}
            src={`${IMAGE_URL}/${img}`}
            className="rounded-lg h-52 w-full object-cover"
          />
        ))}
      </div>

      {/* Details */}
      <h1 className="text-3xl font-bold mt-6">{shelter.name}</h1>
      <p className="text-gray-600">{shelter.location}</p>

      <p className="mt-4">{shelter.description}</p>

      <p className="mt-3 font-medium">
        Services: {shelter.services.join(", ")}
      </p>

      <p className="mt-2 font-semibold">
        Price per day: Rs. {shelter.pricePerDay}
      </p>

      <button className="mt-6 bg-[#183D8B] text-white px-6 py-3 rounded-lg">
        Proceed to Booking
      </button>
    </div>
  );
}
