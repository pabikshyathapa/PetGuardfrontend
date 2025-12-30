import ShelterSidebar from "../../components/Shelter/shelterSidebar";
import ShelterHeader from "../../components/Shelter/shelterHeader";

export default function ShelterLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      
      <ShelterSidebar />

      <div className="flex-1 flex flex-col bg-gray-100 "> 

        <ShelterHeader />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
//bg-gray-50