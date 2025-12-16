import ShelterSidebar from "../../components/Shelter/shelterSidebar";
import ShelterHeader from "../../components/Shelter/shelterHeader";

export default function ShelterLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Sidebar – fixed height */}
      <ShelterSidebar />

      {/* Right side container */}
      <div className="flex-1 flex flex-col bg-gray-50">

        {/* Header – fixed */}
        <ShelterHeader />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
