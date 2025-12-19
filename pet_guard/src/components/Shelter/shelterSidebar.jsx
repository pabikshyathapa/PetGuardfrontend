// export default function ShelterSidebar() {
// return (
// <aside className="w-64 bg-blue-900 text-white p-5">
// <h2 className="text-xl font-bold mb-6">Shelters Panel</h2>
// <ul className="space-y-4">
// <li className="font-semibold">Profile</li>
// <li>Requests</li>
// <li>Notifications</li>
// <li>Settings</li>
// </ul>
// <button className="mt-10 bg-white text-blue-900 px-4 py-2 rounded">
// Logout
// </button>
// </aside>
// );
// }

// import {
//   UserCircleIcon,
//   BellIcon,
//   Cog6ToothIcon,
//   ArrowRightStartOnRectangleIcon,
//   ClipboardDocumentListIcon,
// } from '@heroicons/react/24/outline';
// import React from 'react';

// // NOTE: You'll need to install the Heroicons library for the icons used:
// // npm install @heroicons/react

// export default function ShelterSidebar() {
//   // A hypothetical way to determine the current active link
//   const activeLink = 'Profile';

//   const navItems = [
//     { name: 'Profile', icon: UserCircleIcon, current: activeLink === 'Profile' },
//     { name: 'Requests', icon: ClipboardDocumentListIcon, current: activeLink === 'Requests' },
//     { name: 'Notifications', icon: BellIcon, current: activeLink === 'Notifications' },
//     { name: 'Settings', icon: Cog6ToothIcon, current: activeLink === 'Settings' },
//   ];

//   return (
//     <aside className="w-64 bg-gradient-to-b from-blue-950 to-blue-800 text-white p-4 h-screen flex flex-col">
//       {/* Panel Title */}
//       <h2 className="text-2xl font-semibold mb-8 pl-1">Shelters Panel</h2>

//       {/* Navigation List */}
//       <ul className="space-y-1 flex-grow">
//         {navItems.map((item) => (
//           <li key={item.name}>
//             <a
//               href="#" // Replace with actual routing logic
//               className={`
//                 flex items-center p-3 rounded-lg transition-colors
//                 ${item.current
//                   ? 'bg-white text-blue-900 font-bold shadow-md' // Active style
//                   : 'hover:bg-blue-700 text-gray-200' // Inactive hover style
//                 }
//               `}
//             >
//               <item.icon className="w-6 h-6 mr-3" />
//               <span>{item.name}</span>
//               {/* REMOVED: The code block for the exclamation mark badge has been deleted here. */}
//             </a>
//           </li>
//         ))}
//       </ul>

//       {/* Logout Button (Fixed at the bottom) */}
//       <div className="mt-auto pt-4">
//         <button
//           className="w-full flex items-center justify-center bg-white text-blue-900 font-semibold px-4 py-3 rounded-lg shadow-lg transition-colors hover:bg-gray-200"
//           onClick={() => console.log('Logging out...')} // Replace with actual logout logic
//         >
//           Logout
//           <ArrowRightStartOnRectangleIcon className="w-5 h-5 ml-2" />
//         </button>
//       </div>
//     </aside>
//   );
// }

import {
  UserCircleIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import React from "react";
import { FaTachometerAlt } from "react-icons/fa";

export default function ShelterSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ use AuthProvider

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: FaTachometerAlt },
    { name: "Profile", path: "/shelter-dashboard", icon: UserCircleIcon },
    { name: "Requests", path: "/shelter/requests", icon: ClipboardDocumentListIcon },
    { name: "Notifications", path: "/shelter/notifications", icon: BellIcon },
    { name: "Settings", path: "/shelter/settings", icon: Cog6ToothIcon },
  ];

  const handleLogout = () => {
    logout();          //  clears token + user
    navigate("/");     // redirect to home/login
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-950 to-blue-800 text-white h-screen flex flex-col">
      
      {/* Panel Title */}
      <div className="p-4">
        <h2 className="text-2xl font-semibold pl-1">
          Shelters Panel
        </h2>
      </div>

      {/* Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto px-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex items-center p-3 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-white text-blue-900 font-semibold shadow-md"
                      : "text-gray-200 hover:bg-blue-700"
                  }
                  `
                }
              >
                <item.icon className="w-6 h-6 mr-3" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center bg-white text-blue-900 font-semibold px-4 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition"
        >
          Logout
          <ArrowRightStartOnRectangleIcon className="w-5 h-5 ml-2" />
        </button>
      </div>
    </aside>
  );
}

