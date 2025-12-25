import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [searchType, setSearchType] = useState("boarding");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [petType, setPetType] = useState("");
  const [petCount, setPetCount] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSubmit = () => {
    if (searchType === "boarding" && (!startDate || !endDate)) {
      alert("Please select From and To dates");
      return;
    }
    if (searchType === "daycare" && !startDate) {
      alert("Please select a date");
      return;
    }

    // Build query params
    const params = new URLSearchParams();
    params.append("searchType", searchType);
    if (name) params.append("name", name);
    if (location) params.append("location", location);
    if (petType) params.append("petType", petType);
    if (petCount) params.append("petCount", petCount);
    if (startDate) params.append("startDate", startDate.toISOString());
    if (endDate) params.append("endDate", endDate?.toISOString());

    onClose(); // close modal
    navigate(`/searchshelters?${params.toString()}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">Search Shelters</h2>

        {/* Toggle Boarding / Daycare */}
        <div className="flex gap-4 mb-4">
          <button
            className={`px-3 py-1 rounded ${
              searchType === "boarding" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSearchType("boarding")}
          >
            Boarding
          </button>
          <button
            className={`px-3 py-1 rounded ${
              searchType === "daycare" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSearchType("daycare")}
          >
            Daycare
          </button>
        </div>

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full mb-3 border px-3 py-2 rounded"
        />
        {/* Location */}
        <input
          type="text"
          placeholder="Shelter Name(optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 border px-3 py-2 rounded"
        />

        {/* Pet Type */}
        <input
          type="text"
          placeholder="Pet Type"
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
          className="w-full mb-3 border px-3 py-2 rounded"
        />

        {/* Pet Count */}
        <input
          type="number"
          min={1}
          value={petCount}
          onChange={(e) => setPetCount(e.target.value)}
          className="w-full mb-3 border px-3 py-2 rounded"
          placeholder="Number of Pets"
        />

        {/* Date Picker */}
        {searchType === "boarding" ? (
          <div className="flex gap-2 mb-3">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="From"
              className="border px-3 py-2 rounded w-full"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="To"
              className="border px-3 py-2 rounded w-full"
            />
          </div>
        ) : (
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Select Date"
            className="w-full mb-3 border px-3 py-2 rounded"
          />
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
