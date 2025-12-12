import React from "react";

export default function Footer() {
  return (
<footer className="text-black py-6 px-8 mt-0" style={{  backgroundColor: "#F3F1EE" }}>
      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">

        <div>
          <h3 className="font-bold text-lg mb-2" style={{ color: "#183D8B" }}>Quick Links</h3>
          <ul className="space-y-1 font-semibold text-lg">
            <li>Home</li>
            <li>Services</li>
            <li>About us</li>
            <li>Find Shelters</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2" style={{ color: "#183D8B" }}>Support</h3>
          <ul className="space-y-1 font-semibold text-lg">
            <li>FAQS</li>
            <li>Privacy</li>
            <li>Help Center</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2" style={{ color: "#183D8B" }}>Follow us</h3>
          <ul className="space-y-1 font-semibold text-lg">
            <li>Facebook</li>
            <li>Instagram</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2" style={{ color: "#183D8B" }}>Contact us</h3>
          <ul className="space-y-1 font-semibold text-lg">
            <li>Kathmandu, Nepal</li>
            <li>petguard@gmail.com</li>
            <li>9825944718</li>
          </ul>
        </div>

      </div>

      <p className="text-center text-gray-700 mt-6 text-sm">
        © 2025 PetGuard. All rights reserved.
      </p>
    </footer>
  );
}
