import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
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
      {/* Changed md:grid-cols-4 to md:grid-cols-3 for equal distribution */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto text-center md:text-left">
        {/* QUICK LINKS */}
        <div>
          <h3 className="font-bold text-sm mb-2 text-white uppercase tracking-wider">
            Quick Links
          </h3>
          <ul className="space-y-1 font-medium text-blue-100 text-xs">
            <li
              className="cursor-pointer hover:text-white transition-colors"
              onClick={handleHomeClick}
            >
              Home
            </li>
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
            <li className="cursor-pointer hover:text-white transition-colors">
              <a
                href="https://youtu.be/0AlaqwzDo40"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-blue-100 hover:text-white"
              >
                How PetGuard Works
              </a>
            </li>
          </ul>
        </div>

        {/* FOLLOW US */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-bold text-sm mb-2 text-white uppercase tracking-wider">
            Follow Us
          </h3>
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
          <h3 className="font-bold text-sm mb-2 text-white uppercase tracking-wider">
            Contact Us
          </h3>
          <ul className="space-y-1 font-medium text-blue-100 text-xs">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaMapMarkerAlt size={10} className="text-blue-300" />
              <span>Kathmandu, Nepal</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope size={10} className="text-blue-300" />
              <span>petguard@gmail.com</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaPhoneAlt size={10} className="text-blue-300" />
              <span>9825944718</span>
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 mt-6 pt-4 text-center">
        <p className="text-blue-200" style={{ fontSize: "10px" }}>
          © 2025 <span>PetGuard</span>. All rights reserved.
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
