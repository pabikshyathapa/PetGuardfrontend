import React from "react";

const ChooseRole = ({ IMAGE_PATH, onSelect }) => {
  return (
    <div className="flex w-full">
      {/* Left Image */}
      <div className="w-1/2 flex items-center justify-center p-4">
        <img
          src={IMAGE_PATH}
          alt="Pets"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Right Options */}
      <div className="w-1/2 p-8 flex flex-col justify-center gap-6">
        <h3 className="text-xl text-gray-700 font-medium">Register as:</h3>

        <button
          onClick={() => onSelect("petowner")}
          className="bg-[#183D8B] text-white p-4 rounded-lg shadow-md hover:bg-blue-900 text-left"
        >
          <h4 className="font-bold text-xl">Pet Owner</h4>
          <p className="text-sm opacity-90 mt-1">
            Find trusted shelter and services
          </p>
        </button>

        <button
          onClick={() => onSelect("shelter")}
          className="bg-gray-200 text-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-300 text-left"
        >
          <h4 className="font-bold text-xl">Shelter Home</h4>
          <p className="text-sm mt-1">Connect with pet owners</p>
        </button>
      </div>
    </div>
  );
};

export default ChooseRole;
