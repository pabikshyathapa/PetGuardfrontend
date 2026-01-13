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
import PetOwnerNotificationModal from "../components/petowner/notificationmodal";
import { notificationService } from "../services/Shelter/notifiservice";

export default function Header() {
  const [authType, setAuthType] = useState(null);
  const [user, setUser] = useState(null);
  const [activeIcon, setActiveIcon] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // New state for logout modal
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  /* Always sync user */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location.pathname]);

  /* Fetch unread notification count */
  const fetchUnreadCount = async () => {
    if (!user) {
      setUnreadCount(0);
      return;
    }

    try {
      const notifications = await notificationService.getNotifications();
      const unread = notifications.filter((n) => !n.read).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error("Failed to fetch unread count:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUnreadCount();
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  /* Active icon logic */
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
    window.dispatchEvent(new Event("userChanged"));
    navigate(userData.role === "shelter" ? "/shelter-dashboard" : "/");
  };

  // Opens the confirmation modal
  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  // Final logout logic
  const confirmLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setActiveIcon("");
    setUnreadCount(0);
    setIsLogoutModalOpen(false); // Close modal

    window.dispatchEvent(new Event("userChanged"));
    navigate("/");
  };

  const handleIconClick = (icon, route) => {
    setActiveIcon(icon);
    navigate(route);
  };

  const handleBellClick = () => {
    if (!user) {
      setAuthType("login");
      return;
    }
    setActiveIcon("bell");
    setIsNotificationOpen(true);
  };

  const handleNotificationClose = () => {
    setIsNotificationOpen(false);
    setActiveIcon("");
    fetchUnreadCount();
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

          {/* Favorites */}
          <FaRegHeart
            size={20}
            className={`cursor-pointer ${hoverClass} ${
              activeIcon === "heart" ? "text-black" : "text-[#183D8B]"
            }`}
            onClick={() => handleIconClick("heart", "/favorites")}
          />

          {/* Bell */}
          <div className="relative">
            <FaRegBell
              size={20}
              className={`cursor-pointer ${hoverClass} ${
                activeIcon === "bell" ? "text-black" : "text-[#183D8B]"
              }`}
              onClick={handleBellClick}
            />
            {user && unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </div>

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
                <span
                  className="cursor-pointer font-medium text-[#183D8B] hover:text-black hover:underline"
                  onClick={() => handleIconClick("profile", "/profile")}
                >
                  Hi, {user.name}
                </span>
                <button
                  onClick={handleLogoutClick}
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

      {/* Search Modal */}
      {isSearchOpen && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      )}

      {/* Notification Modal */}
      <PetOwnerNotificationModal
        isOpen={isNotificationOpen}
        onClose={handleNotificationClose}
      />

      {/* --- LOGOUT CONFIRMATION MODAL --- */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-80 shadow-xl text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                Stay
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}