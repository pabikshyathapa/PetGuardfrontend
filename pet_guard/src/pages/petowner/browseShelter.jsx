import { useEffect, useState } from "react";
import { getAllShelters } from "../../services/petowner/browseService";
import ShelterCard from "../../components/petowner/browseSheltercard";
import Header from "../../layouts/Header";

export default function BrowseShelters() {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    getAllShelters().then(setShelters);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

     
      <main className="flex-grow bg-[#F3F1EE] px-6 py-24 w-full">
        <div className="max-w-[1400px] mx-auto"> 
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {shelters.map((shelter) => (
              <ShelterCard key={shelter._id} shelter={shelter} />
            ))}
          </div>

          {shelters.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No shelters found.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
