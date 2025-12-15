import { FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../auth/AuthProvider";

export default function ShelterHeader({ saved = false }) {
  const { user, loading } = useAuth();

  if (loading) return null; // prevent flicker

  return (
    <header className="w-full bg-white border-b px-6 py-4 flex items-center justify-between">
      {/* Page Title */}
      <h1 className="text-lg font-semibold text-gray-800">
        Shelter Profile
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <span className="text-gray-600">
          Hi, <span className="font-medium">{user?.name || "Shelter"}</span>
        </span>

        {saved && (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            <FaCheckCircle />
            Saved Changes
          </div>
        )}
      </div>
    </header>
  );
}
