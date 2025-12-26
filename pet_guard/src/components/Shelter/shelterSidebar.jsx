import React, { useState, useEffect } from "react";
import {
  UserCircleIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { FaTachometerAlt } from "react-icons/fa";
import { notificationService } from "../../services/Shelter/notifiservice";

export default function ShelterSidebar() {
  const navigate = useNavigate();
  const { logout,user} = useAuth(); // ✅ use AuthProvider
  const [unreadCount, setUnreadCount] = useState(0);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: FaTachometerAlt },
    { name: "Profile", path: "/shelter-dashboard", icon: UserCircleIcon },
    { name: "Requests", path: "/shelter/requests", icon: ClipboardDocumentListIcon },
    { name: "Notifications", path: "/shelter-notifications", icon: BellIcon },
    { name: "Settings", path: "/shelter/settings", icon: Cog6ToothIcon },
  ];

  const handleLogout = () => {
    logout();          //  clears token + user
    navigate("/");     // redirect to home/login
  };

  useEffect(() => {
    const fetchCount = async () => {
      // Check if a user is logged in before fetching
      if (!user) return; 

      try {
        const data = await notificationService.getNotifications();
        const unread = data.filter(n => !n.read).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error("Badge fetch failed:", err);
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [user]); // Re-run if the user object changes

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
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-white text-blue-900 font-semibold shadow-md"
                      : "text-gray-200 hover:bg-blue-700/50"
                  }`
                }
              >
                {/* Left side: Icon and Text */}
                <div className="flex items-center">
                  <item.icon className="w-6 h-6 mr-3 shrink-0" />
                  <span>{item.name}</span>
                </div>

                {/* Right side: Badge (only for Notifications) */}
                {item.name === "Notifications" && unreadCount > 0 && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-[11px] font-bold text-white shadow-sm ring-1 ring-white/20">
                    {unreadCount}
                  </span>
                )}
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

