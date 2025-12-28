import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export default function ShelterSearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    name: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    service: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    // Build query string, ignore empty fields
    const query = new URLSearchParams(
      Object.entries(filters).filter(([_, v]) => v !== "")
    ).toString();

    // Navigate to search result page with query
    navigate(`/searchshelters?${query}`);

    // Close modal
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative shadow-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-[#183D8B] mb-4">
          Search Shelters
        </h2>

        <div className="space-y-3">
          <input
            name="name"
            placeholder="Shelter name"
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2"
          />
          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2"
          />

          <div className="flex gap-3">
            <input
              name="minPrice"
              type="number"
              placeholder="Min price"
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2"
            />
            <input
              name="maxPrice"
              type="number"
              placeholder="Max price"
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-2"
            />
          </div>

          <select
            name="service"
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-2"
          >
            <option value="">All services</option>
            <option value="Boarding">Boarding</option>
            <option value="Daycare">Daycare</option>
            <option value="Training">Training</option>
          </select>

          <button
            onClick={handleSearch}
            className="w-full mt-4 py-3 rounded-xl bg-[#183D8B] text-white font-bold hover:bg-[#122e6b]"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
