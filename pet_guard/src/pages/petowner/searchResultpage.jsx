import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchShelters } from "../../services/Shelter/shelterService";
import ShelterCard from "../../components/petowner/browseSheltercard";
import Header from "../../layouts/Header";
import { FaSearch, FaMapMarkerAlt, FaRegFrownOpen } from "react-icons/fa";

export default function ShelterSearchResultPage() {
  const location = useLocation();
  const [shelters, setShelters] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = Object.fromEntries(new URLSearchParams(location.search));

    const cleanedFilters = {
      name: params.name ? decodeURIComponent(params.name) : "",
      location: params.location ? decodeURIComponent(params.location) : "",
      minPrice: params.minPrice ? Number(params.minPrice) : "",
      maxPrice: params.maxPrice ? Number(params.maxPrice) : "",
      service: params.service ? decodeURIComponent(params.service) : "",
    };

    setFilters(cleanedFilters);

    searchShelters(cleanedFilters)
      .then((res) => {
        setShelters(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Search failed:", err);
        setLoading(false);
      });
  }, [location.search]);

  return (
    <div className="min-h-screen bg-[#F3F1EE]">
      {/* Header outside the main content area */}
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 py-20">
        {/* Search Header & Summary */}
        <div className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-[#183D8B] tracking-tight">
                Search Results
              </h2>
              <p className="text-gray-500 mt-1">
                Found {shelters.length} shelter{shelters.length !== 1 ? 's' : ''} matching your criteria
              </p>
            </div>
            
            {/* Filter Badges */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters)
                .filter(([_, v]) => v)
                .map(([k, v]) => (
                  <span 
                    key={k} 
                    className="px-3 py-1.5 bg-blue-50 text-[#183D8B] text-xs font-semibold rounded-full border border-blue-100 flex items-center gap-2"
                  >
                    <span className="capitalize text-blue-400">{k}:</span> {v}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#183D8B]"></div>
            <p className="mt-4 text-gray-500 font-medium">Finding the best shelters...</p>
          </div>
        ) : shelters.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <FaRegFrownOpen className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700">No shelters found</h3>
            <p className="text-gray-500 max-w-xs text-center mt-2">
              Try adjusting your filters or searching in a different location.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
            {shelters.map((shelter) => (
              <div key={shelter._id} className="transition-transform duration-300 hover:-translate-y-2">
                <ShelterCard shelter={shelter} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}