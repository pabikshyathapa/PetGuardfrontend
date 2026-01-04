// import { useEffect, useState } from "react";
// import { getAllShelters } from "../../services/petowner/browseService";
// import ShelterCard from "../../components/petowner/browseSheltercard";
// import Header from "../../layouts/Header";

// export default function BrowseShelters() {
//   const [shelters, setShelters] = useState([]);

//   useEffect(() => {
//     getAllShelters().then(setShelters);
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />

     
//       <main className="flex-grow bg-[#F3F1EE] px-6 py-24 w-full">
//         <div className="max-w-[1400px] mx-auto"> 
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {shelters.map((shelter) => (
//               <ShelterCard key={shelter._id} shelter={shelter} />
//             ))}
//           </div>

//           {shelters.length === 0 && (
//             <div className="text-center py-20 text-gray-500">
//               No shelters found.
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getAllShelters } from "../../services/petowner/browseService";
import ShelterCard from "../../components/petowner/browseSheltercard";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";

export default function BrowseShelters() {
  const [shelters, setShelters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const sheltersPerPage = 12; // 3 rows x 4 columns

  useEffect(() => {
    getAllShelters().then(setShelters);
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(shelters.length / sheltersPerPage);
  const startIndex = (currentPage - 1) * sheltersPerPage;
  const endIndex = startIndex + sheltersPerPage;
  const currentShelters = shelters.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-[#F3F1EE] px-6 py-24 w-full">
        <div className="max-w-[1400px] mx-auto">
          {/* Shelter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentShelters.map((shelter) => (
              <ShelterCard key={shelter._id} shelter={shelter} />
            ))}
          </div>

          {/* Empty State */}
          {shelters.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              No shelters found.
            </div>
          )}

          {/* Pagination Controls */}
          {shelters.length > sheltersPerPage && (
            <div className="flex justify-center items-center gap-6 mt-16">
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className="px-6 py-2 rounded-lg border bg-white text-gray-700 disabled:opacity-40"
              >
                &lt;&lt; Prev
              </button>

              <span className="text-gray-600 font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
                className="px-6 py-2 rounded-lg border bg-white text-gray-700 disabled:opacity-40"
              >
                Next &gt;&gt;
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

