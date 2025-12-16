import { useEffect, useState } from "react";
import { getAllShelters } from "../../services/petowner/browseService";
import ShelterCard from "../../components/petowner/browseSheltercard";

export default function BrowseShelters() {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    getAllShelters().then(setShelters);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Browse Shelters</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {shelters.map((shelter) => (
          <ShelterCard key={shelter._id} shelter={shelter} />
        ))}
      </div>
    </div>
  );
}
