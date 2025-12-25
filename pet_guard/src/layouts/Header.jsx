// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaRegUser, FaMagnifyingGlass, FaRegHeart, FaRegBell } from "react-icons/fa6";
// import AuthModal from "../components/auth/authModall";

// export default function Header() {
//   const [authType, setAuthType] = useState(null);
//   const [user, setUser] = useState(null);
//   const [activeIcon, setActiveIcon] = useState(""); // Track clicked icon
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) setUser(storedUser);
//   }, []);

//   const handleLoginSuccess = (userData) => {
//     setAuthType(null);
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));

//     if (userData.role === "shelter") {
//       navigate("/shelter-dashboard");
//     }
//   };

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setActiveIcon("");
//   };

//   const handleIconClick = (iconName, route) => {
//     setActiveIcon(iconName);
//     navigate(route);
//   };

//   return (
//     <>
//       <nav className="w-full flex justify-between items-center py-2 px-6 bg-white shadow-md fixed top-0 left-0 z-50 h-16">
//         {/* Logo */}
//         <div
//           className="flex items-center gap-3 cursor-pointer"
//           onClick={() => handleIconClick("logo", "/")}
//         >
//           <img src="/images/logo.png" alt="PetGuard Logo" className="w-14 h-auto object-contain" />
//         </div>

//         {/* Navigation + Icons */}
//         <div className="flex items-center gap-6 font-medium text-sm">
//           {/* Browse All */}
//           <span
//             className={`cursor-pointer hover:text-gray-700 ${
//               activeIcon === "browse" ? "text-black" : "text-[#183D8B]"
//             }`}
//             onClick={() => handleIconClick("browse", "/browseshelter")}
//           >
//             Browse All
//           </span>

//           {/* Search Shelters */}
//           <div
//             className={`flex items-center gap-1 cursor-pointer hover:text-gray-700 ${
//               activeIcon === "search" ? "text-black" : "text-[#183D8B]"
//             }`}
//             onClick={() => handleIconClick("search", "/searchshelters")}
//           >
//             <FaMagnifyingGlass size={17} />
//             <span>Search Shelters</span>
//           </div>

//           {/* Heart Icon */}
//           <div
//             className={`cursor-pointer hover:text-gray-700 ${
//               activeIcon === "heart" ? "text-black" : "text-[#183D8B]"
//             }`}
//             onClick={() => handleIconClick("heart", "/")}
//           >
//             <FaRegHeart size={20} />
//           </div>

//           {/* Bell Icon */}
//           <div
//             className={`cursor-pointer hover:text-gray-700 ${
//               activeIcon === "bell" ? "text-black" : "text-[#183D8B]"
//             }`}
//             onClick={() => handleIconClick("bell", "/")}
//           >
//             <FaRegBell size={20} />
//           </div>

//           {/* Profile Icon - always visible */}
//           <div className="flex items-center gap-2 cursor-pointer relative">
//             <FaRegUser
//               size={18}
//               className={`cursor-pointer hover:text-gray-700 ${
//                 activeIcon === "profile" ? "text-black" : "text-[#183D8B]"
//               }`}
//               onClick={() => handleIconClick("profile", "/petprofile")}
//             />

//             {user ? (
//               <>
//                 <span className={`text-sm font-medium ${activeIcon === "profile" ? "text-black" : "text-[#183D8B]"}`}>
//                   Hi, {user.name}
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   className="ml-2 text-red-500 text-xs underline"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <span
//                 className={`text-sm font-medium hover:text-gray-700 ${
//                   activeIcon === "profile" ? "text-black" : "text-[#183D8B]"
//                 }`}
//                 onClick={() => setAuthType("login")}
//               >
//                 Login / Register
//               </span>
//             )}
//           </div>
//         </div>
//       </nav>

//       {authType && (
//         <AuthModal
//           type={authType}
//           onClose={() => setAuthType(null)}
//           onLoginSuccess={handleLoginSuccess}
//         />
//       )}
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaRegUser, FaMagnifyingGlass, FaRegHeart, FaRegBell } from "react-icons/fa6";
// import AuthModal from "../components/auth/authModall";

// export default function Header() {
//   const [authType, setAuthType] = useState(null);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation(); // to detect current path
//   const [activeIcon, setActiveIcon] = useState("");

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) setUser(storedUser);
//   }, []);

//   // Update active icon based on current path
//   useEffect(() => {
//     switch (location.pathname) {
//       case "/browseshelter":
//         setActiveIcon("browse");
//         break;
//       case "/searchshelters":
//         setActiveIcon("search");
//         break;
//       case "/petprofile":
//         setActiveIcon("profile");
//         break;
//       case "/":
//         setActiveIcon(""); // default home
//         break;
//       default:
//         setActiveIcon("");
//     }
//   }, [location.pathname]);

//   const handleLoginSuccess = (userData) => {
//     setAuthType(null);
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));

//     if (userData.role === "shelter") {
//       navigate("/shelter-dashboard");
//     }
//   };

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setActiveIcon("");
//   };

//   const handleIconClick = (iconName, route) => {
//     setActiveIcon(iconName);
//     navigate(route);
//   };

//   return (
//     <>
//       <nav className="w-full flex justify-between items-center py-2 px-6 bg-white shadow-md fixed top-0 left-0 z-50 h-16">
//         {/* Logo */}
//         <div
//           className="flex items-center gap-3 cursor-pointer"
//           onClick={() => handleIconClick("logo", "/")}
//         >
//           <img src="/images/logo.png" alt="PetGuard Logo" className="w-14 h-auto object-contain" />
//         </div>

//         {/* Navigation + Icons */}
//         <div className="flex items-center gap-6 font-medium text-sm">
//           {/* Browse All */}
//           <span
//             className={`cursor-pointer hover:text-gray-700 ${
//               activeIcon === "browse" ? "text-black" : "text-[#183D8B]"
//             }`}
//             onClick={() => handleIconClick("browse", "/browseshelter")}
//           >
//             Browse All
//           </span>

//           {/* Search Shelters */}
//           <div
//             className={`flex items-center gap-1 cursor-pointer hover:text-gray-700 ${
//               activeIcon === "search" ? "text-black" : "text-[#183D8B]"
//             }`}
//             onClick={() => handleIconClick("search", "/searchshelters")}
//           >
//             <FaMagnifyingGlass size={17} />
//             <span>Search Shelters</span>
//           </div>

//           {/* Heart Icon */}
//           <div
//             className={`cursor-pointer hover:text-gray-700 ${
//               activeIcon === "heart" ? "text-black" : "text-[#183D8B]"
//             }`}
//             onClick={() => handleIconClick("heart", "/")}
//           >
//             <FaRegHeart size={20} />
//           </div>

//           {/* Bell Icon */}
//           <div
//             className={`cursor-pointer hover:text-gray-700 ${
//               activeIcon === "bell" ? "text-black" : "text-[#183D8B]"
//             }`}
//             onClick={() => handleIconClick("bell", "/")}
//           >
//             <FaRegBell size={20} />
//           </div>

//           {/* Profile Icon - always visible */}
//           <div className="flex items-center gap-2 cursor-pointer relative">
//             <FaRegUser
//               size={18}
//               className={`cursor-pointer hover:text-gray-700 ${
//                 activeIcon === "profile" ? "text-black" : "text-[#183D8B]"
//               }`}
//               onClick={() => handleIconClick("profile", "/petprofile")}
//             />

//             {user ? (
//               <>
//                 <span className={`text-sm font-medium ${activeIcon === "profile" ? "text-black" : "text-[#183D8B]"}`}>
//                   Hi, {user.name}
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   className="ml-2 text-red-500 text-xs underline"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <span
//                 className={`text-sm font-medium hover:text-gray-700 ${
//                   activeIcon === "profile" ? "text-black" : "text-[#183D8B]"
//                 }`}
//                 onClick={() => setAuthType("login")}
//               >
//                 Login / Register
//               </span>
//             )}
//           </div>
//         </div>
//       </nav>

//       {authType && (
//         <AuthModal
//           type={authType}
//           onClose={() => setAuthType(null)}
//           onLoginSuccess={handleLoginSuccess}
//         />
//       )}
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaRegUser,
  FaMagnifyingGlass,
  FaRegHeart,
  FaRegBell,
} from "react-icons/fa6";
import AuthModal from "../components/auth/authModall";
import SearchModal from "../components/petowner/searchModal";

export default function Header() {
  const [authType, setAuthType] = useState(null);
  const [user, setUser] = useState(null);
  const [activeIcon, setActiveIcon] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /*  Always sync user */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location.pathname]);

  /*  Active icon logic */
  useEffect(() => {
    switch (location.pathname) {
      case "/browseshelter":
        setActiveIcon("browse");
        break;
      case "/petprofile":
        setActiveIcon("profile");
        break;
      default:
        setActiveIcon("");
    }
  }, [location.pathname]);

  const handleLoginSuccess = (userData, token) => {
    setAuthType(null);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (token) localStorage.setItem("token", token);

    navigate(userData.role === "shelter" ? "/shelter-dashboard" : "/");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setActiveIcon("");
    navigate("/");
  };

  const handleIconClick = (icon, route) => {
    setActiveIcon(icon);
    navigate(route);
  };

  const hoverClass = "hover:text-gray-700 transition-colors";

  return (
    <>
      <nav className="w-full flex justify-between items-center py-2 px-6 bg-white shadow-md fixed top-0 left-0 z-50 h-16">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleIconClick("", "/")}
        >
          <img
            src="/images/logo.png"
            alt="PetGuard Logo"
            className="w-14 h-auto object-contain"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6 font-medium text-sm">
          {/* Browse */}
          <span
            className={`cursor-pointer ${hoverClass} ${
              activeIcon === "browse" ? "text-black" : "text-[#183D8B]"
            }`}
            onClick={() => handleIconClick("browse", "/browseshelter")}
          >
            Browse All
          </span>

          {/* Search */}
          <div
            className={`flex items-center gap-1 cursor-pointer ${hoverClass} ${
              activeIcon === "search" ? "text-black" : "text-[#183D8B]"
            }`}
            onClick={() => setIsSearchOpen(true)}
          >
            <FaMagnifyingGlass size={17} />
            <span>Search Shelters</span>
          </div>

          {isSearchOpen && (
            <SearchModal
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
            />
          )}

          {/* Heart */}
          <FaRegHeart
            size={20}
            className={`cursor-pointer ${hoverClass} ${
              activeIcon === "heart" ? "text-black" : "text-[#183D8B]"
            }`}
            onClick={() => handleIconClick("heart", "/favorites")}
          />

          {/* Bell */}
          <FaRegBell
            size={20}
            className={`cursor-pointer ${hoverClass} ${
              activeIcon === "bell" ? "text-black" : "text-[#183D8B]"
            }`}
            onClick={() => handleIconClick("bell", "/")}
          />

          {/* Profile + Auth */}
          <div className="flex items-center gap-2">
            <FaRegUser
              size={18}
              className={`cursor-pointer ${hoverClass} ${
                activeIcon === "profile" ? "text-black" : "text-[#183D8B]"
              }`}
              onClick={() => handleIconClick("profile", "/petprofile")}
            />

            {user ? (
              <>
                <span className="text-[#183D8B]">Hi, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="ml-2 text-red-500 text-xs underline hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-1 text-sm font-medium">
                <span
                  className={`cursor-pointer ${hoverClass} text-[#183D8B]`}
                  onClick={() => setAuthType("login")}
                >
                  Login
                </span>
                <span className="text-gray-400">/</span>
                <span
                  className={`cursor-pointer ${hoverClass} text-[#183D8B]`}
                  onClick={() => setAuthType("register")}
                >
                  Register
                </span>
              </div>
            )}
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
