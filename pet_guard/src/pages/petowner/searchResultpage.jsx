import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function SearchResultsPage() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Parse query params
  const queryParams = new URLSearchParams(location.search);
  const searchType = queryParams.get("searchType") || "";
  const name = queryParams.get("Name") || "";
  const locationParam = queryParams.get("location") || "";
  const petType = queryParams.get("petType") || "";
  const petCount = queryParams.get("petCount") || "";
  const startDate = queryParams.get("startDate") || "";
  const endDate = queryParams.get("endDate") || "";

  useEffect(() => {
    const fetchShelters = async () => {
      setLoading(true);
      setError("");

      try {
        // Replace with your backend API base URL
        const res = await axios.get("http://localhost:5050/api/shelters/search", {
          params: {
            searchType,
            name,
            location: locationParam,
            petType,
            petCount,
            startDate,
            endDate,
          },
        });

        setResults(res.data.shelters || []);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to fetch shelters. Please try again.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
  }, [searchType, name, locationParam, petType, petCount, startDate, endDate]);

  return (
    <div className="p-6 mt-16">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>

      {loading && <p>Loading shelters...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && results?.length === 0 && <p>No shelters found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results?.map((shelter) => (
          <div key={shelter._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-1">{shelter.name}</h2>
            <p className="text-sm text-gray-600 mb-1">Location: {shelter.location}</p>
            <p className="text-sm text-gray-600 mb-1">Contact: {shelter.contact}</p>
            <p className="text-sm text-gray-600 mb-1">Services: {shelter.services.join(", ")}</p>
            <p className="text-sm text-gray-600 mb-1">Price per day: ${shelter.pricePerDay}</p>
            {shelter.photos?.[0] && (
              <img
                src={shelter.photos[0]}
                alt={shelter.name}
                className="w-full h-48 object-cover rounded mt-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
