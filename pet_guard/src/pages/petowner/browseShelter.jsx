// import { useEffect, useState } from "react";
// import { getAllShelters } from "../../services/petowner/browseService";
// import ShelterCard from "../../components/petowner/browseSheltercard";
// import Header from "../../layouts/Header";
// import Footer from "../../layouts/Footer";

// export default function BrowseShelters() {
//   const [shelters, setShelters] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const sheltersPerPage = 12; // 3 rows x 4 columns

//   useEffect(() => {
//     getAllShelters().then(setShelters);
//   }, []);

//   // Pagination calculations
//   const totalPages = Math.ceil(shelters.length / sheltersPerPage);
//   const startIndex = (currentPage - 1) * sheltersPerPage;
//   const endIndex = startIndex + sheltersPerPage;
//   const currentShelters = shelters.slice(startIndex, endIndex);

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />

//       <main className="flex-grow bg-[#F3F1EE] px-6 py-24 w-full">
//         <div className="max-w-[1400px] mx-auto">
//           {/* Shelter Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//             {currentShelters.map((shelter) => (
//               <ShelterCard key={shelter._id} shelter={shelter} />
//             ))}
//           </div>

//           {/* Empty State */}
//           {shelters.length === 0 && (
//             <div className="text-center py-20 text-gray-500">
//               No shelters found.
//             </div>
//           )}

//           {/* Pagination Controls */}
//           {shelters.length > sheltersPerPage && (
//             <div className="flex justify-center items-center gap-6 mt-16">
//               <button
//                 onClick={() => setCurrentPage((p) => p - 1)}
//                 disabled={currentPage === 1}
//                 className="px-6 py-2 rounded-lg border bg-white text-gray-700 disabled:opacity-40"
//               >
//                 &lt;&lt; Prev
//               </button>

//               <span className="text-gray-600 font-medium">
//                 Page {currentPage} of {totalPages}
//               </span>

//               <button
//                 onClick={() => setCurrentPage((p) => p + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-6 py-2 rounded-lg border bg-white text-gray-700 disabled:opacity-40"
//               >
//                 Next &gt;&gt;
//               </button>
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
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

          {/* Dot Pagination Controls */}
          {shelters.length > sheltersPerPage && (
            <div className="flex justify-center items-center gap-5 mt-16">
              {/* Small Prev Button */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-gray-200 bg-white text-[#183D8B] hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dots Container */}
              <div className="flex items-center gap-3">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNum = index + 1;
                  const isActive = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`transition-all duration-300 rounded-full ${
                        isActive
                          ? "w-3 h-3 bg-[#183D8B]" // Active Dot: Filled with #183D8B
                          : "w-2 h-2 bg-gray-300 hover:bg-gray-400" // Inactive Dot
                      }`}
                      aria-label={`Go to page ${pageNum}`}
                    />
                  );
                })}
              </div>

              {/* Small Next Button */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full border border-gray-200 bg-white text-[#183D8B] hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}