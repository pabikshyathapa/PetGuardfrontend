import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaSearch, FaMapMarkerAlt, FaTag, FaConciergeBell } from "react-icons/fa";

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
    const query = new URLSearchParams(
      Object.entries(filters).filter(([_, v]) => v !== "")
    ).toString();
    navigate(`/searchshelters?${query}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Animated Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Container */}
      <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden relative shadow-2xl transform transition-all">
        
        {/* Header */}
        <div className="bg-[#183D8B] p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <FaTimes className="text-white" />
          </button>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaSearch className="text-xl" /> Search Shelters
          </h2>
          <p className="text-blue-100 text-sm mt-1">Find the perfect place for your pet based on one or more of these criteria</p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          
          {/* Shelter Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Shelter Name (Optional)</label>
            <div className="relative">
              <input
                name="name"
                placeholder="Search by name..."
                onChange={handleChange}
                className="w-full border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#183D8B] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Preffered Location</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="location"
                placeholder="City"
                onChange={handleChange}
                className="w-full border-gray-200 border rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-[#183D8B] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Min Price (Rs)</label>
              <input
                name="minPrice"
                type="number"
                placeholder="0"
                onChange={handleChange}
                className="w-full border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#183D8B] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Max Price (Rs)</label>
              <input
                name="maxPrice"
                type="number"
                placeholder="Any"
                onChange={handleChange}
                className="w-full border-gray-200 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#183D8B] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Service Type */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Required Service</label>
            <div className="relative">
              <FaConciergeBell className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                name="service"
                onChange={handleChange}
                className="w-full border-gray-200 border rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-[#183D8B] focus:border-transparent outline-none appearance-none bg-white transition-all cursor-pointer"
              >
                <option value="">Services</option>
                <option value="Boarding">Boarding</option>
                <option value="Daycare">Daycare</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full mt-4 py-4 rounded-xl bg-[#183D8B] text-white font-bold text-lg hover:bg-[#122e6b] shadow-lg shadow-blue-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <FaSearch className="text-sm" /> Search Now
          </button>
        </div>
      </div>
    </div>
  );
}