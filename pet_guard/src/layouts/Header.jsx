// import React from "react";
// import {
//   FaRegUser,
//   FaMagnifyingGlass,
//   FaRegHeart,
//   FaRegBell,
// } from "react-icons/fa6";

// export default function Header() {
//   return (
//     <nav className="w-full flex justify-between items-center py-2 px-6 bg-white shadow-md fixed top-0 left-0 z-50 h-16">
//       {/* Logo */}
//       <div className="flex items-center gap-3">
//         <img
//           src="/images/logo.png"
//           alt="PetGuard Logo"
//           className="w-14 h-auto object-contain"
//         />
//       </div>

//       {/* Navigation + Icons */}
//       <div
//         className="flex items-center gap-6 font-medium text-sm"
//         style={{ color: "#183D8B" }}
//       >
//         {/* Browse */}
//         <a href="#" style={{ color: "#183D8B" }} className="hover:opacity-80">
//           Browse All
//         </a>

//         {/* Search with icon */}
//         <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
//           <FaMagnifyingGlass size={17} />
//           <a href="#" style={{ color: "#183D8B" }}>
//             Search Shelters
//           </a>
//         </div>

//         {/* Heart */}
//         <FaRegHeart size={20} className="cursor-pointer hover:opacity-80" />

//         {/* Notification */}
//         <FaRegBell size={20} className="cursor-pointer hover:opacity-80" />

//          {/* Profile */}
//         <FaRegUser size={17} className="cursor-pointer hover:opacity-80" />

//         {/*  Login/Register */}
//         <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
//           <a href="/login" style={{ color: "#183D8B" }}>
//             Login/Register
//           </a>
//         </div>
//       </div>
//     </nav>
//   );
// }
import React, { useState } from "react";
import { FaRegUser, FaMagnifyingGlass, FaRegHeart, FaRegBell } from "react-icons/fa6";
import AuthModal from "../components/auth/authModall"; // import the modal

export default function Header() {
  const [authType, setAuthType] = useState(null); // null, 'login', 'register'

  return (
    <>
      <nav className="w-full flex justify-between items-center py-2 px-6 bg-white shadow-md fixed top-0 left-0 z-50 h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="PetGuard Logo"
            className="w-14 h-auto object-contain"
          />
        </div>

        {/* Navigation + Icons */}
        <div
          className="flex items-center gap-6 font-medium text-sm"
          style={{ color: "#183D8B" }}
        >
          <a href="#" style={{ color: "#183D8B" }} className="hover:opacity-80">
            Browse All
          </a>

          <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
            <FaMagnifyingGlass size={17} />
            <a href="#" style={{ color: "#183D8B" }}>
              Search Shelters
            </a>
          </div>

          <FaRegHeart size={20} className="cursor-pointer hover:opacity-80" />
          <FaRegBell size={20} className="cursor-pointer hover:opacity-80" />
          <FaRegUser size={17} className="cursor-pointer hover:opacity-80" />

          {/* Login/Register */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80"
            onClick={() => setAuthType("login")} // open login modal
          >
            <span style={{ color: "#183D8B" }}>Login/Register</span>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {authType && (
        <AuthModal
          type={authType}
          onClose={(newType) => setAuthType(newType || null)}
          onLoginSuccess={() => setAuthType(null)}
        />
      )}
    </>
  );
}
