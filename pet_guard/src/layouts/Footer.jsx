// import React from "react";

// export default function Footer() {
//   return (
// <footer className="text-black py-6 px-8 mt-0 bg-blue-50">
//       <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">

//         <div>
//           <h3 className="font-bold text-lg mb-2" style={{ color: "#183D8B" }}>Quick Links</h3>
//           <ul className="space-y-1 font-semibold text-lg">
//             <li>Home</li>
//             <li>Services</li>
//             <li>About us</li>
//             <li>Find Shelters</li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="font-bold text-lg mb-2" style={{ color: "#183D8B" }}>Support</h3>
//           <ul className="space-y-1 font-semibold text-lg">
//             <li>FAQS</li>
//             <li>Privacy</li>
//             <li>Help Center</li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="font-bold text-lg mb-2" style={{ color: "#183D8B" }}>Follow us</h3>
//           <ul className="space-y-1 font-semibold text-lg">
//             <li>Facebook</li>
//             <li>Instagram</li>
//           </ul>
//         </div>

//         <div>
//           <h3 className="font-bold text-lg mb-2" style={{ color: "#183D8B" }}>Contact us</h3>
//           <ul className="space-y-1 font-semibold text-lg">
//             <li>Kathmandu, Nepal</li>
//             <li>petguard@gmail.com</li>
//             <li>9825944718</li>
//           </ul>
//         </div>

//       </div>

//       <p className="text-center text-gray-700 mt-6 text-sm">
//         © 2025 PetGuard. All rights reserved.
//       </p>
//     </footer>
//   );
// }

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFacebook, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import ShelterSearchModal from "../components/petowner/searchModal"; 

export default function Footer() {
  const brandBlue = "#485a80ff";
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      // If already on landing page, scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Otherwise navigate to landing page
      navigate("/");
    }
  };

  return (
    <footer className="py-6 px-8" style={{ backgroundColor: brandBlue }}>
      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        
        {/* QUICK LINKS */}
        <div>
          <h3 className="font-bold text-sm mb-2 text-white uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-1 font-medium text-blue-100 text-xs">
            <li 
              className="cursor-pointer hover:text-white transition-colors"
              onClick={handleHomeClick}
            >
              Home
            </li>
            <li className="cursor-default hover:text-white transition-colors">Services</li>
            <li 
              className="cursor-pointer hover:text-white transition-colors"
              onClick={() => navigate("/aboutuspage")}
            >
              About Us
            </li>
            <li 
              className="cursor-pointer hover:text-white transition-colors"
              onClick={() => setIsSearchModalOpen(true)}
            >
              Find Shelters
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-bold text-sm mb-2 text-white uppercase tracking-wider">Support</h3>
          <ul className="space-y-1 font-medium text-blue-100 text-xs">
            <li className="cursor-default hover:text-white transition-colors">FAQs</li>
            <li className="cursor-default hover:text-white transition-colors">Privacy Policy</li>
            <li className="cursor-default hover:text-white transition-colors">Help Center</li>
          </ul>
        </div>

        {/* FOLLOW US */}
        <div>
          <h3 className="font-bold text-sm mb-2 text-white uppercase tracking-wider">Follow Us</h3>
          <div className="flex gap-3">
            <div className="bg-white/10 p-2 rounded-full cursor-pointer hover:bg-white/20 transition-all">
              <FaFacebook size={14} className="text-white" />
            </div>
            <div className="bg-white/10 p-2 rounded-full cursor-pointer hover:bg-white/20 transition-all">
              <FaInstagram size={14} className="text-white" />
            </div>
          </div>
        </div>

        {/* CONTACT US */}
        <div>
          <h3 className="font-bold text-sm mb-2 text-white uppercase tracking-wider">Contact Us</h3>
          <ul className="space-y-1 font-medium text-blue-100 text-xs">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt size={10} className="text-blue-300" /> 
              <span>Kathmandu, Nepal</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope size={10} className="text-blue-300" /> 
              <span>petguard@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt size={10} className="text-blue-300" /> 
              <span>9825944718</span>
            </li>
          </ul>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 mt-6 pt-4 text-center">
        <p className="text-blue-200" style={{ fontSize: '10px' }}>
          © 2025 <span className="font-bold text-white uppercase">PetGuard</span>. All rights reserved.
        </p>
      </div>

      {/* SEARCH MODAL */}
      <ShelterSearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </footer>
  );
}