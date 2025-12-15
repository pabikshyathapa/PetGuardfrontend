// import React, { useState } from "react";
// import { FaRegUser, FaMagnifyingGlass, FaRegHeart, FaRegBell } from "react-icons/fa6";
// import AuthModal from "../components/auth/authModall"; // import the modal

// export default function Header() {
//   const [authType, setAuthType] = useState(null); // null, 'login', 'register'

//   return (
//     <>
//       <nav className="w-full flex justify-between items-center py-2 px-6 bg-white shadow-md fixed top-0 left-0 z-50 h-16">
//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <img
//             src="/images/logo.png"
//             alt="PetGuard Logo"
//             className="w-14 h-auto object-contain"
//           />
//         </div>

//         {/* Navigation + Icons */}
//         <div className="flex items-center gap-6 font-medium text-sm" style={{ color: "#183D8B" }}>
//           <a href="#" className="hover:opacity-80">Browse All</a>

//           <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
//             <FaMagnifyingGlass size={17} />
//             <a href="#" className="hover:opacity-80">Search Shelters</a>
//           </div>

//           <FaRegHeart size={20} className="cursor-pointer hover:opacity-80" />
//           <FaRegBell size={20} className="cursor-pointer hover:opacity-80" />
//           <FaRegUser size={17} className="cursor-pointer hover:opacity-80" />

//           {/* REGISTER / LOGIN */}
//           <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
//             <span
//               className="text-sm font-medium"
//               style={{ color: "#183D8B" }}
//               onClick={() => setAuthType("login")}
//             >
//               Login
//             </span>
//             <span className="text-sm font-medium text-[#183D8B]">/</span>
//             <span
//               className="text-sm font-medium"
//               style={{ color: "#183D8B" }}
//               onClick={() => setAuthType("register")}
//             >
//               Register
//             </span>
//           </div>
//         </div>
//       </nav>

//       {/* Auth Modal */}
//       {authType && (
//         <AuthModal
//           type={authType}
//           onClose={() => setAuthType(null)}
//           onLoginSuccess={() => setAuthType(null)}
//         />
//       )}
//     </>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRegUser,
  FaMagnifyingGlass,
  FaRegHeart,
  FaRegBell,
} from "react-icons/fa6";
import AuthModal from "../components/auth/authModall";

export default function Header() {
  const [authType, setAuthType] = useState(null);
  const navigate = useNavigate();

  // ✅ ROLE-BASED REDIRECT HANDLER
  const handleLoginSuccess = (role) => {
    setAuthType(null); // close modal first

    if (role === "petowner") {
      navigate("/pet-owner-dashboard");
    } else if (role === "shelter") {
      navigate("/shelter-dashboard");
    }
  };

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
        <div className="flex items-center gap-6 font-medium text-sm">
          <a
            href="#"
            className="hover:opacity-80"
            style={{ color: "#183D8B" }} // <-- set color explicitly
          >
            Browse All
          </a>

          <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
            <FaMagnifyingGlass size={17} color="#183D8B" /> {/* icon color */}
            <a
              href="#"
              className="hover:opacity-80"
              style={{ color: "#183D8B" }} // <-- set color explicitly
            >
              Search Shelters
            </a>
          </div>

          <FaRegHeart size={20} color="#183D8B" className="cursor-pointer hover:opacity-80" />
          <FaRegBell size={20} color="#183D8B" className="cursor-pointer hover:opacity-80" />
          <FaRegUser size={17} color="#183D8B" className="cursor-pointer hover:opacity-80" />

          {/* LOGIN / REGISTER */}
          <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
            <span
              className="text-sm font-medium"
              style={{ color: "#183D8B" }}
              onClick={() => setAuthType("login")}
            >
              Login
            </span>
            <span className="text-sm font-medium text-[#183D8B]">/</span>
            <span
              className="text-sm font-medium"
              style={{ color: "#183D8B" }}
              onClick={() => setAuthType("register")}
            >
              Register
            </span>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {authType && (
        <AuthModal
          type={authType}
          onClose={() => setAuthType(null)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}
