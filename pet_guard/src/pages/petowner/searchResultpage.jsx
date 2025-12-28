import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchShelters } from "../../services/Shelter/shelterService";
import ShelterCard from "../../components/petowner/browseSheltercard";

export default function ShelterSearchResultPage() {
  const location = useLocation();
  const [shelters, setShelters] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // Parse query params
    const params = Object.fromEntries(new URLSearchParams(location.search));

    // Decode and clean filters
    const cleanedFilters = {
      name: params.name ? decodeURIComponent(params.name) : "",
      location: params.location ? decodeURIComponent(params.location) : "",
      minPrice: params.minPrice ? Number(params.minPrice) : "",
      maxPrice: params.maxPrice ? Number(params.maxPrice) : "",
      service: params.service ? decodeURIComponent(params.service) : "",
    };

    setFilters(cleanedFilters);

    // Fetch shelters
    searchShelters(cleanedFilters)
      .then((res) => setShelters(res))
      .catch((err) => console.error("Search failed:", err));
  }, [location.search]);

  return (
    <div className="px-6 py-8">
      {/* Search Summary */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#183D8B]">Search Results</h2>
        <p className="text-sm text-gray-500 mt-1">
          Showing results for{" "}
          {Object.entries(filters)
            .filter(([_, v]) => v)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ")}
        </p>
      </div>

      {/* Results */}
      {shelters.length === 0 ? (
        <p className="text-gray-500">No shelters found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shelters.map((shelter) => (
            <ShelterCard key={shelter._id} shelter={shelter} />
          ))}
        </div>
      )}
    </div>
  );
}
