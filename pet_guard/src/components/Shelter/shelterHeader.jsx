import { FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function ShelterHeader({ saved = false }) {
  const { user, loading } = useAuth();
  if (loading) return null; 
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white border-b px-6 py-2 flex items-center justify-between">
      
      {/* Left Side: Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/shelter-dashboard")}
      >
        <img
          src="/images/logo.png"
          alt="PetGuard Logo"
          className="w-12 h-auto object-contain"
        />
      </div>

      {/* Right Side: User Profile & Status */}
      <div className="flex items-center gap-4">
        {saved && (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm animate-in fade-in duration-300">
            <FaCheckCircle />
            <span className="hidden xs:inline">Saved Changes</span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <span
            className="font-medium text-[#183D8B]  transition-colors duration-200"
          >
            Hi, {user?.name || "Shelter"}
          </span>
          
          
        </div>
      </div>

    </header>
  );
}
