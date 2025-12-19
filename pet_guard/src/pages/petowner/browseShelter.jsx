// import { useEffect, useState } from "react";
// import { getAllShelters } from "../../services/petowner/browseService";
// import ShelterCard from "../../components/petowner/browseSheltercard";

// export default function BrowseShelters() {
//   const [shelters, setShelters] = useState([]);

//   useEffect(() => {
//     getAllShelters().then(setShelters);
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-6">Browse Shelters</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {shelters.map((shelter) => (
//           <ShelterCard key={shelter._id} shelter={shelter} />
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getAllShelters } from "../../services/petowner/browseService";
import ShelterCard from "../../components/petowner/browseSheltercard";

export default function BrowseShelters() {
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    getAllShelters().then(setShelters);
  }, []);

  return (
    <div className="px-6 py-6 w-full">
      <h2 className="text-2xl font-semibold mb-6">Browse Shelters</h2>

      {/* Full-width spread grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {shelters.map((shelter) => (
          <ShelterCard key={shelter._id} shelter={shelter} />
        ))}
      </div>
    </div>
  );
}
