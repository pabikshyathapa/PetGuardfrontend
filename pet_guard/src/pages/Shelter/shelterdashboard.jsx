// // import { useEffect, useState, useMemo } from "react";
// // import { getShelterBookings } from "../../services/Shelter/shelterbooking";
// // import { useAuth } from "../../auth/AuthProvider";
// // import ShelterLayout from "../../layouts/Shelter/shelterLayout";
// // import {
// //   Calendar,
// //   Users,
// //   PawPrint,
// //   TrendingUp,
// //   DollarSign,
// //   Clock,
// //   CheckCircle,
// //   XCircle,
// //   AlertCircle,
// //   ChevronDown,
// //   Search,
// //   X
// // } from "lucide-react";

// // export default function ShelterDashboard() {
// //   const [bookings, setBookings] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [timeFilter, setTimeFilter] = useState("30"); // 7, 30, 90, 365, all
// //   const [selectedPet, setSelectedPet] = useState(null);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const { user } = useAuth();

// //   useEffect(() => {
// //     loadBookings();
// //   }, [user]);

// //   const loadBookings = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await getShelterBookings();
// //       setBookings(res.data || []);
// //     } catch (err) {
// //       console.error("Failed to load bookings", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Filter bookings by active status (confirmed or in-progress only)
// //   const activeBookings = useMemo(() => {
// //     return bookings.filter(
// //       (b) => b.bookingStatus === "confirmed" && b.payment.status === "paid"
// //     );
// //   }, [bookings]);

// //   // Filter bookings by time range
// //   const filteredBookings = useMemo(() => {
// //     const now = new Date();
// //     return activeBookings.filter((b) => {
// //       const bookingDate = new Date(b.createdAt);
// //       const daysDiff = Math.floor((now - bookingDate) / (1000 * 60 * 60 * 24));

// //       if (timeFilter === "all") return true;
// //       return daysDiff <= parseInt(timeFilter);
// //     });
// //   }, [activeBookings, timeFilter]);
  

// //   // Calculate statistics
// //   const stats = useMemo(() => {
// //     const totalBookings = filteredBookings.length;
// //     const totalRevenue = filteredBookings.reduce((sum, b) => sum + b.totalAmount, 0);
    
// //     // Get unique pets from active bookings
// //     const allPets = filteredBookings.flatMap((b) => b.pets);
// //     const uniquePetIds = [...new Set(allPets.map(p => p._id))];
// //     const totalPets = uniquePetIds.length;
    
// //     // Get unique users
// //     const uniqueUserIds = [...new Set(filteredBookings.map((b) => b.petOwner._id))];
// //     const totalUsers = uniqueUserIds.length;

// //     // Payment methods breakdown
// //     const cashBookings = filteredBookings.filter((b) => b.payment.method === "cash").length;
// //     const esewaBookings = filteredBookings.filter((b) => b.payment.method === "esewa").length;

// //     // Service type breakdown
// //     const daycareCount = filteredBookings.filter((b) => b.serviceType === "daycare").length;
// //     const boardingCount = filteredBookings.filter((b) => b.serviceType === "boarding").length;

// //     return {
// //       totalBookings,
// //       totalRevenue,
// //       totalPets,
// //       totalUsers,
// //       cashBookings,
// //       esewaBookings,
// //       daycareCount,
// //       boardingCount,
// //       avgBookingValue: totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0
// //     };
// //   }, [filteredBookings]);

// //   // Get unique active pets with details
// //   const activePets = useMemo(() => {
// //     const petMap = new Map();
// //     filteredBookings.forEach((booking) => {
// //       booking.pets.forEach((pet) => {
// //         if (!petMap.has(pet._id)) {
// //           petMap.set(pet._id, {
// //             ...pet,
// //             ownerName: booking.petOwner.name,
// //             ownerId: booking.petOwner._id,
// //             bookingId: booking._id,
// //             startDate: booking.startDate,
// //             endDate: booking.endDate,
// //             serviceType: booking.serviceType
// //           });
// //         }
// //       });
// //     });
// //     return Array.from(petMap.values());
// //   }, [filteredBookings]);

// //   // Get unique active users with their pets
// //   const activeUsers = useMemo(() => {
// //     const userMap = new Map();
// //     filteredBookings.forEach((booking) => {
// //       const userId = booking.petOwner._id;
// //       if (!userMap.has(userId)) {
// //         userMap.set(userId, {
// //           ...booking.petOwner,
// //           pets: [],
// //           bookings: []
// //         });
// //       }
// //       const user = userMap.get(userId);
// //       user.pets.push(...booking.pets);
// //       user.bookings.push({
// //         id: booking._id,
// //         startDate: booking.startDate,
// //         endDate: booking.endDate,
// //         serviceType: booking.serviceType,
// //         totalAmount: booking.totalAmount
// //       });
// //     });
// //     return Array.from(userMap.values());
// //   }, [filteredBookings]);

// //   // Search filtered pets
// //   const searchedPets = useMemo(() => {
// //     if (!searchQuery) return activePets;
// //     return activePets.filter((pet) =>
// //       pet.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       pet.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
// //     );
// //   }, [activePets, searchQuery]);

// //   if (loading) {
// //     return (
// //       <ShelterLayout>
// //         <div className="flex items-center justify-center h-screen">
// //           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
// //         </div>
// //       </ShelterLayout>
// //     );
// //   }

// //   return (
// //     <ShelterLayout>
// //       <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-8">
// //         {/* Header */}
// //         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
// //           <div>
// //             <h1 className="text-4xl font-black tracking-tight" style={{ color: "#183D8B" }}>
// //               Dashboard
// //             </h1>
// //             <p className="text-gray-500 mt-1">Monitor your shelter's active bookings and performance</p>
// //           </div>
          
// //           {/* Time Filter */}
// //           <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-1">
// //             {[
// //               { label: "7 Days", value: "7" },
// //               { label: "30 Days", value: "30" },
// //               { label: "90 Days", value: "90" },
// //               { label: "Year", value: "365" },
// //               { label: "All Time", value: "all" }
// //             ].map((filter) => (
// //               <button
// //                 key={filter.value}
// //                 onClick={() => setTimeFilter(filter.value)}
// //                 className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
// //                   timeFilter === filter.value
// //                     ? "bg-[#183D8B] text-white shadow-md"
// //                     : "text-gray-600 hover:bg-gray-100"
// //                 }`}
// //               >
// //                 {filter.label}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Stats Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //           <StatCard
// //             icon={<Calendar className="text-blue-600" size={24} />}
// //             title="Active Bookings"
// //             value={stats.totalBookings}
// //             subtitle={`${stats.daycareCount} daycare, ${stats.boardingCount} boarding`}
// //             bgColor="bg-blue-50"
// //           />
// //           <StatCard
// //             icon={<PawPrint className="text-purple-600" size={24} />}
// //             title="Pets in Care"
// //             value={stats.totalPets}
// //             subtitle="Currently staying"
// //             bgColor="bg-purple-50"
// //           />
// //           <StatCard
// //             icon={<Users className="text-green-600" size={24} />}
// //             title="Active Clients"
// //             value={stats.totalUsers}
// //             subtitle="Pet owners"
// //             bgColor="bg-green-50"
// //           />
// //           <StatCard
// //             icon={<DollarSign className="text-orange-600" size={24} />}
// //             title="Total Revenue"
// //             value={`Rs ${stats.totalRevenue.toLocaleString()}`}
// //             subtitle={`Avg: Rs ${stats.avgBookingValue.toLocaleString()}`}
// //             bgColor="bg-orange-50"
// //           />
// //         </div>
// //         {/* Payment & Service Breakdown */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //           <div className="bg-white rounded-2xl border border-gray-200 p-6">
// //             <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Methods</h3>
// //             <div className="space-y-3">
// //               <div className="flex justify-between items-center">
// //                 <span className="text-gray-600 font-medium">Cash Payments</span>
// //                 <span className="text-2xl font-bold text-gray-800">{stats.cashBookings}</span>
// //               </div>
// //               <div className="w-full bg-gray-100 rounded-full h-2">
// //                 <div
// //                   className="bg-green-500 h-2 rounded-full"
// //                   style={{
// //                     width: `${stats.totalBookings > 0 ? (stats.cashBookings / stats.totalBookings) * 100 : 0}%`
// //                   }}
// //                 ></div>
// //               </div>
// //               <div className="flex justify-between items-center mt-4">
// //                 <span className="text-gray-600 font-medium">eSewa Payments</span>
// //                 <span className="text-2xl font-bold text-gray-800">{stats.esewaBookings}</span>
// //               </div>
// //               <div className="w-full bg-gray-100 rounded-full h-2">
// //                 <div
// //                   className="bg-blue-500 h-2 rounded-full"
// //                   style={{
// //                     width: `${stats.totalBookings > 0 ? (stats.esewaBookings / stats.totalBookings) * 100 : 0}%`
// //                   }}
// //                 ></div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-white rounded-2xl border border-gray-200 p-6">
// //             <h3 className="text-lg font-bold text-gray-800 mb-4">Service Types</h3>
// //             <div className="space-y-3">
// //               <div className="flex justify-between items-center">
// //                 <span className="text-gray-600 font-medium">Daycare</span>
// //                 <span className="text-2xl font-bold text-gray-800">{stats.daycareCount}</span>
// //               </div>
// //               <div className="w-full bg-gray-100 rounded-full h-2">
// //                 <div
// //                   className="bg-purple-500 h-2 rounded-full"
// //                   style={{
// //                     width: `${stats.totalBookings > 0 ? (stats.daycareCount / stats.totalBookings) * 100 : 0}%`
// //                   }}
// //                 ></div>
// //               </div>
// //               <div className="flex justify-between items-center mt-4">
// //                 <span className="text-gray-600 font-medium">Boarding</span>
// //                 <span className="text-2xl font-bold text-gray-800">{stats.boardingCount}</span>
// //               </div>
// //               <div className="w-full bg-gray-100 rounded-full h-2">
// //                 <div
// //                   className="bg-orange-500 h-2 rounded-full"
// //                   style={{
// //                     width: `${stats.totalBookings > 0 ? (stats.boardingCount / stats.totalBookings) * 100 : 0}%`
// //                   }}
// //                 ></div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Active Pets Section */}
// //         <div className="bg-white rounded-2xl border border-gray-200 p-6">
// //           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
// //             <h3 className="text-xl font-bold text-gray-800">
// //               Active Pets ({searchedPets.length})
// //             </h3>
// //             <div className="relative w-full md:w-72">
// //               <input
// //                 type="text"
// //                 placeholder="Search pets or owners..."
// //                 className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none"
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //               />
// //               <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
// //             </div>
// //           </div>

// //           {searchedPets.length === 0 ? (
// //             <div className="text-center py-12 bg-gray-50 rounded-xl">
// //               <PawPrint className="mx-auto text-gray-300 mb-3" size={48} />
// //               <p className="text-gray-500">No active pets found</p>
// //             </div>
// //           ) : (
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //               {searchedPets.map((pet) => (
// //                 <div
// //                   key={pet._id}
// //                   className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
// //                   onClick={() => setSelectedPet(pet)}
// //                 >
// //                   <div className="flex gap-4">
// //                     {pet.photo && (
// //                       <img
// //                         src={`http://localhost:5050/uploads/${pet.photo}`}
// //                         alt={pet.petName}
// //                         className="w-20 h-20 object-cover rounded-lg"
// //                       />
// //                     )}
// //                     <div className="flex-1">
// //                       <h4 className="font-bold text-gray-800">{pet.petName}</h4>
// //                       <p className="text-sm text-gray-500">{pet.breed}</p>
// //                       <p className="text-xs text-gray-400 mt-1">Owner: {pet.ownerName}</p>
// //                       <div className="flex items-center gap-2 mt-2">
// //                         <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold uppercase">
// //                           {pet.serviceType}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Active Users Section */}
// //         <div className="bg-white rounded-2xl border border-gray-200 p-6">
// //           <h3 className="text-xl font-bold text-gray-800 mb-6">
// //             Active Clients ({activeUsers.length})
// //           </h3>

// //           {activeUsers.length === 0 ? (
// //             <div className="text-center py-12 bg-gray-50 rounded-xl">
// //               <Users className="mx-auto text-gray-300 mb-3" size={48} />
// //               <p className="text-gray-500">No active clients</p>
// //             </div>
// //           ) : (
// //             <div className="space-y-4">
// //               {activeUsers.map((user) => (
// //                 <div
// //                   key={user._id}
// //                   className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer"
// //                   onClick={() => setSelectedUser(user)}
// //                 >
// //                   <div className="flex justify-between items-start mb-3">
// //                     <div>
// //                       <h4 className="font-bold text-lg text-gray-800">{user.name}</h4>
// //                       <p className="text-sm text-gray-500">{user.email}</p>
// //                       <p className="text-sm text-gray-500">{user.phone}</p>
// //                     </div>
// //                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
// //                       {user.bookings.length} Active Booking{user.bookings.length > 1 ? "s" : ""}
// //                     </span>
// //                   </div>
// //                   <div className="border-t pt-3">
// //                     <p className="text-xs font-bold text-gray-400 uppercase mb-2">Pets in Care:</p>
// //                     <div className="flex flex-wrap gap-2">
// //                       {user.pets.map((pet, idx) => (
// //                         <span
// //                           key={idx}
// //                           className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium"
// //                         >
// //                           {pet.petName}
// //                         </span>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Pet Details Modal */}
// //         {selectedPet && (
// //           <Modal onClose={() => setSelectedPet(null)}>
// //             <div className="space-y-4">
// //               <div className="flex items-start gap-4">
// //                 {selectedPet.photo && (
// //                   <img
// //                     src={`http://localhost:5050/uploads/${selectedPet.photo}`}
// //                     alt={selectedPet.petName}
// //                     className="w-32 h-32 object-cover rounded-2xl border-4 border-white shadow-lg"
// //                   />
// //                 )}
// //                 <div className="flex-1">
// //                   <h3 className="text-2xl font-bold text-gray-800">{selectedPet.petName}</h3>
// //                   <p className="text-gray-600">{selectedPet.type} • {selectedPet.breed}</p>
// //                   <p className="text-sm text-gray-500 mt-2">Owner: {selectedPet.ownerName}</p>
// //                 </div>
// //               </div>
              
// //               <div className="grid grid-cols-2 gap-4 pt-4 border-t">
// //                 <div>
// //                   <p className="text-xs font-bold text-gray-400 uppercase">Gender</p>
// //                   <p className="text-lg font-medium">{selectedPet.gender}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-xs font-bold text-gray-400 uppercase">Age</p>
// //                   <p className="text-lg font-medium">{selectedPet.age} Years</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-xs font-bold text-gray-400 uppercase">Weight</p>
// //                   <p className="text-lg font-medium">{selectedPet.weight} kg</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-xs font-bold text-gray-400 uppercase">Location</p>
// //                   <p className="text-lg font-medium">{selectedPet.location}</p>
// //                 </div>
// //               </div>

// //               <div className="pt-4 border-t">
// //                 <p className="text-xs font-bold text-gray-400 uppercase mb-2">Stay Details</p>
// //                 <div className="bg-blue-50 p-4 rounded-xl">
// //                   <p className="text-sm font-medium">
// //                     <strong>Service:</strong> {selectedPet.serviceType}
// //                   </p>
// //                   <p className="text-sm font-medium">
// //                     <strong>Check-in:</strong> {new Date(selectedPet.startDate).toLocaleDateString()}
// //                   </p>
// //                   <p className="text-sm font-medium">
// //                     <strong>Check-out:</strong> {new Date(selectedPet.endDate).toLocaleDateString()}
// //                   </p>
// //                 </div>
// //               </div>

// //               {selectedPet.health && (
// //                 <div className="pt-4 border-t">
// //                   <p className="text-xs font-bold text-gray-400 uppercase mb-2">Health Notes</p>
// //                   <p className="text-sm text-gray-700">{selectedPet.health}</p>
// //                 </div>
// //               )}

// //               {selectedPet.characteristics && selectedPet.characteristics.length > 0 && (
// //                 <div className="pt-4 border-t">
// //                   <p className="text-xs font-bold text-gray-400 uppercase mb-2">Characteristics</p>
// //                   <div className="flex flex-wrap gap-2">
// //                     {selectedPet.characteristics.map((char, idx) => (
// //                       <span key={idx} className="bg-gray-100 px-3 py-1 rounded-lg text-sm font-medium">
// //                         {char}
// //                       </span>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </Modal>
// //         )}

// //         {/* User Details Modal */}
// //         {selectedUser && (
// //           <Modal onClose={() => setSelectedUser(null)}>
// //             <div className="space-y-4">
// //               <div>
// //                 <h3 className="text-2xl font-bold text-gray-800">{selectedUser.name}</h3>
// //                 <p className="text-gray-600">{selectedUser.email}</p>
// //                 <p className="text-gray-600">{selectedUser.phone}</p>
// //               </div>

// //               <div className="pt-4 border-t">
// //                 <p className="text-xs font-bold text-gray-400 uppercase mb-3">Active Bookings</p>
// //                 <div className="space-y-3">
// //                   {selectedUser.bookings.map((booking, idx) => (
// //                     <div key={idx} className="bg-gray-50 p-4 rounded-xl">
// //                       <div className="flex justify-between items-start">
// //                         <div>
// //                           <p className="font-bold text-gray-800 uppercase">{booking.serviceType}</p>
// //                           <p className="text-sm text-gray-600">
// //                             {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
// //                           </p>
// //                         </div>
// //                         <p className="font-bold text-[#183D8B]">Rs {booking.totalAmount.toLocaleString()}</p>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               <div className="pt-4 border-t">
// //                 <p className="text-xs font-bold text-gray-400 uppercase mb-3">Pets ({selectedUser.pets.length})</p>
// //                 <div className="grid grid-cols-2 gap-3">
// //                   {selectedUser.pets.map((pet, idx) => (
// //                     <div key={idx} className="bg-gray-50 p-3 rounded-xl">
// //                       <p className="font-bold text-gray-800">{pet.petName}</p>
// //                       <p className="text-sm text-gray-600">{pet.breed}</p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </Modal>
// //         )}
// //       </div>
// //     </ShelterLayout>
// //   );
// // }

// // // Reusable Stat Card Component
// // function StatCard({ icon, title, value, subtitle, bgColor }) {
// //   return (
// //     <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
// //       <div className="flex items-start justify-between mb-4">
// //         <div className={`${bgColor} p-3 rounded-xl`}>{icon}</div>
// //       </div>
// //       <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">{title}</p>
// //       <p className="text-3xl font-black text-gray-800">{value}</p>
// //       {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
// //     </div>
// //   );
// // }

// // // Reusable Modal Component
// // function Modal({ children, onClose }) {
// //   return (
// //     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
// //       <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
// //         <div className="p-6 border-b flex justify-between items-center">
// //           <h2 className="text-xl font-bold text-gray-800">Details</h2>
// //           <button
// //             onClick={onClose}
// //             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
// //           >
// //             <X size={22} className="text-gray-400" />
// //           </button>
// //         </div>
// //         <div className="overflow-y-auto p-6 max-h-[calc(90vh-80px)]">
// //           {children}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState, useMemo } from "react";
// import { getShelterBookings } from "../../services/Shelter/shelterbooking";
// import { useAuth } from "../../auth/AuthProvider";
// import ShelterLayout from "../../layouts/Shelter/shelterLayout";
// import {
//   Calendar,
//   Users,
//   PawPrint,
//   DollarSign,
//   CheckCircle,
//   AlertCircle,
//   Search,
//   X
// } from "lucide-react";

// export default function ShelterDashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [timeFilter, setTimeFilter] = useState("30"); // 7, 30, 90, 365, all
//   const [totalBookingsFilter, setTotalBookingsFilter] = useState("all"); // all, month, year
//   const [selectedPet, setSelectedPet] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { user } = useAuth();

//   useEffect(() => {
//     if (user?.role === "shelter") {
//       loadBookings();
//     }
//   }, [user]);

//   const loadBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await getShelterBookings();
//       setBookings(res.data || []);
//     } catch (err) {
//       console.error("Failed to load bookings", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Active bookings
//   const activeBookings = useMemo(() => {
//     return bookings.filter(
//       (b) => b.bookingStatus === "confirmed" && b.payment.status === "paid"
//     );
//   }, [bookings]);

//   // Filter by time
//   const filteredBookings = useMemo(() => {
//     const now = new Date();
//     return activeBookings.filter((b) => {
//       const bookingDate = new Date(b.createdAt);
//       const daysDiff = Math.floor((now - bookingDate) / (1000 * 60 * 60 * 24));
//       if (timeFilter === "all") return true;
//       return daysDiff <= parseInt(timeFilter);
//     });
//   }, [activeBookings, timeFilter]);

//   // Total bookings count
//   const totalBookingsCount = useMemo(() => {
//     const now = new Date();
//     const currentMonth = now.getMonth();
//     const currentYear = now.getFullYear();
//     const validBookings = bookings.filter((b) => b.bookingStatus !== "cancelled");

//     if (totalBookingsFilter === "all") return validBookings.length;
//     if (totalBookingsFilter === "month")
//       return validBookings.filter((b) => {
//         const d = new Date(b.createdAt);
//         return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
//       }).length;
//     if (totalBookingsFilter === "year")
//       return validBookings.filter((b) => {
//         const d = new Date(b.createdAt);
//         return d.getFullYear() === currentYear;
//       }).length;
//     return 0;
//   }, [bookings, totalBookingsFilter]);

//   // Stats
//   const stats = useMemo(() => {
//     const totalActiveBookings = filteredBookings.length;
//     const revenueBookings = bookings.filter((b) => b.bookingStatus !== "cancelled");
//     const totalRevenue = revenueBookings.reduce((sum, b) => sum + b.totalAmount, 0);

//     const allPets = filteredBookings.flatMap((b) => b.pets);
//     const uniquePetIds = [...new Set(allPets.map((p) => p._id))];
//     const totalPets = uniquePetIds.length;

//     const uniqueUserIds = [...new Set(filteredBookings.map((b) => b.petOwner._id))];
//     const totalUsers = uniqueUserIds.length;

//     const cashBookings = filteredBookings.filter((b) => b.payment.method === "cash").length;
//     const esewaBookings = filteredBookings.filter((b) => b.payment.method === "esewa").length;

//     const daycareCount = filteredBookings.filter((b) => b.serviceType === "daycare").length;
//     const boardingCount = filteredBookings.filter((b) => b.serviceType === "boarding").length;

//     const avgBookingValue = revenueBookings.length > 0
//       ? Math.round(totalRevenue / revenueBookings.length)
//       : 0;

//     return {
//       totalActiveBookings,
//       totalRevenue,
//       totalPets,
//       totalUsers,
//       cashBookings,
//       esewaBookings,
//       daycareCount,
//       boardingCount,
//       avgBookingValue
//     };
//   }, [filteredBookings, bookings]);

//   // Active pets
//   const activePets = useMemo(() => {
//     const petMap = new Map();
//     filteredBookings.forEach((booking) => {
//       booking.pets.forEach((pet) => {
//         if (!petMap.has(pet._id)) {
//           petMap.set(pet._id, {
//             ...pet,
//             ownerName: booking.petOwner.name,
//             ownerEmail: booking.petOwner.email,
//             ownerPhone: booking.petOwner.phone,
//             ownerId: booking.petOwner._id,
//             bookingId: booking._id,
//             startDate: booking.startDate,
//             endDate: booking.endDate,
//             serviceType: booking.serviceType
//           });
//         }
//       });
//     });
//     return Array.from(petMap.values());
//   }, [filteredBookings]);

//   // Active users
//   const activeUsers = useMemo(() => {
//     const userMap = new Map();
//     filteredBookings.forEach((booking) => {
//       const userId = booking.petOwner._id;
//       if (!userMap.has(userId)) {
//         userMap.set(userId, {
//           ...booking.petOwner,
//           pets: [],
//           bookings: []
//         });
//       }
//       const user = userMap.get(userId);
//       user.pets.push(...booking.pets);
//       user.bookings.push({
//         id: booking._id,
//         startDate: booking.startDate,
//         endDate: booking.endDate,
//         serviceType: booking.serviceType,
//         totalAmount: booking.totalAmount
//       });
//     });
//     return Array.from(userMap.values());
//   }, [filteredBookings]);

//   // Search filtered pets
//   const searchedPets = useMemo(() => {
//     if (!searchQuery) return activePets;
//     return activePets.filter((pet) =>
//       pet.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       pet.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }, [activePets, searchQuery]);

//   if (loading) {
//     return (
//       <ShelterLayout>
//         <div className="flex items-center justify-center h-screen">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
//         </div>
//       </ShelterLayout>
//     );
//   }

//   if (user?.role !== "shelter") {
//     return (
//       <ShelterLayout>
//         <div className="flex items-center justify-center h-screen">
//           <div className="text-center">
//             <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
//             <h2 className="text-xl font-bold text-gray-800">Access Denied</h2>
//             <p className="text-gray-600">This dashboard is only available for shelter accounts.</p>
//           </div>
//         </div>
//       </ShelterLayout>
//     );
//   }

//   return (
//     <ShelterLayout>
//       <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div>
//             <h1 className="text-4xl font-black tracking-tight" style={{ color: "#183D8B" }}>
//               Dashboard
//             </h1>
//             <p className="text-gray-500 mt-1">Monitor your shelter's active bookings and performance</p>
//           </div>

//           {/* Time Filter */}
//           <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-1">
//             {[
//               { label: "7 Days", value: "7" },
//               { label: "30 Days", value: "30" },
//               { label: "90 Days", value: "90" },
//               { label: "Year", value: "365" },
//               { label: "All Time", value: "all" }
//             ].map((filter) => (
//               <button
//                 key={filter.value}
//                 onClick={() => setTimeFilter(filter.value)}
//                 className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
//                   timeFilter === filter.value
//                     ? "bg-[#183D8B] text-white shadow-md"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 {filter.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Total Bookings Card */}
//         <div className="bg-gradient-to-br from-[#183D8B] to-blue-700 rounded-2xl p-6 text-white shadow-xl">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="bg-white/20 p-2 rounded-lg">
//                   <CheckCircle size={28} />
//                 </div>
//                 <h3 className="text-lg font-bold uppercase tracking-wider">Total Bookings Made</h3>
//               </div>
//               <p className="text-5xl font-black mb-2">{totalBookingsCount}</p>
//               <p className="text-blue-100 text-sm">
//                 {totalBookingsFilter === "all" && "All time bookings"}
//                 {totalBookingsFilter === "month" && "Bookings this month"}
//                 {totalBookingsFilter === "year" && "Bookings this year"}
//               </p>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => setTotalBookingsFilter("all")}
//                 className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
//                   totalBookingsFilter === "all"
//                     ? "bg-white text-[#183D8B]"
//                     : "bg-white/20 hover:bg-white/30"
//                 }`}
//               >
//                 All Time
//               </button>
//               <button
//                 onClick={() => setTotalBookingsFilter("month")}
//                 className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
//                   totalBookingsFilter === "month"
//                     ? "bg-white text-[#183D8B]"
//                     : "bg-white/20 hover:bg-white/30"
//                 }`}
//               >
//                 This Month
//               </button>
//               <button
//                 onClick={() => setTotalBookingsFilter("year")}
//                 className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
//                   totalBookingsFilter === "year"
//                     ? "bg-white text-[#183D8B]"
//                     : "bg-white/20 hover:bg-white/30"
//                 }`}
//               >
//                 This Year
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <StatCard
//             icon={<Calendar className="text-blue-600" size={24} />}
//             title="Active Bookings"
//             value={stats.totalActiveBookings}
//             subtitle={`${stats.daycareCount} daycare, ${stats.boardingCount} boarding`}
//             bgColor="bg-blue-50"
//           />
//           <StatCard
//             icon={<PawPrint className="text-purple-600" size={24} />}
//             title="Pets in Care"
//             value={stats.totalPets}
//             subtitle="Currently staying"
//             bgColor="bg-purple-50"
//           />
//           <StatCard
//             icon={<Users className="text-green-600" size={24} />}
//             title="Active Clients"
//             value={stats.totalUsers}
//             subtitle="Pet owners"
//             bgColor="bg-green-50"
//           />
//           <StatCard
//             icon={<DollarSign className="text-orange-600" size={24} />}
//             title="Total Revenue"
//             value={`Rs ${stats.totalRevenue.toLocaleString()}`}
//             subtitle={`Avg: Rs ${stats.avgBookingValue.toLocaleString()}`}
//             bgColor="bg-orange-50"
//           />
//         </div>

//         {/* Payment & Service Breakdown */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <BreakdownCard
//             title="Payment Methods"
//             stats={[
//               { label: "Cash", count: stats.cashBookings, color: "bg-green-500" },
//               { label: "eSewa", count: stats.esewaBookings, color: "bg-blue-500" }
//             ]}
//             total={stats.totalActiveBookings}
//           />
//           <BreakdownCard
//             title="Service Types"
//             stats={[
//               { label: "Daycare", count: stats.daycareCount, color: "bg-purple-500" },
//               { label: "Boarding", count: stats.boardingCount, color: "bg-orange-500" }
//             ]}
//             total={stats.totalActiveBookings}
//           />
//         </div>

//         {/* Active Pets Section */}
//         <ActivePets
//           searchedPets={searchedPets}
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           setSelectedPet={setSelectedPet}
//         />

//         {/* Active Users Section */}
//         <ActiveUsers
//           activeUsers={activeUsers}
//           setSelectedUser={setSelectedUser}
//         />

//         {/* Pet Modal */}
//         {selectedPet && (
//           <Modal onClose={() => setSelectedPet(null)}>
//             <PetModalContent pet={selectedPet} />
//           </Modal>
//         )}

//         {/* User Modal */}
//         {selectedUser && (
//           <Modal onClose={() => setSelectedUser(null)}>
//             <UserModalContent user={selectedUser} />
//           </Modal>
//         )}
//       </div>
//     </ShelterLayout>
//   );
// }

// // -------------------- Components -------------------- //

// function StatCard({ icon, title, value, subtitle, bgColor }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
//       <div className="flex items-start justify-between mb-4">
//         <div className={`${bgColor} p-3 rounded-xl`}>{icon}</div>
//         <div className="text-right">
//           <p className="text-sm font-medium text-gray-500">{title}</p>
//           <p className="text-2xl font-bold text-gray-800">{value}</p>
//           {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// function BreakdownCard({ title, stats, total }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 p-6">
//       <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
//       <div className="space-y-4">
//         {stats.map((s, idx) => (
//           <div key={idx}>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600 font-medium">{s.label}</span>
//               <span className="text-2xl font-bold text-gray-800">{s.count}</span>
//             </div>
//             <div className="w-full bg-gray-100 rounded-full h-2">
//               <div
//                 className={`${s.color} h-2 rounded-full transition-all`}
//                 style={{ width: total > 0 ? (s.count / total) * 100 + "%" : "0%" }}
//               ></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function ActivePets({ searchedPets, searchQuery, setSearchQuery, setSelectedPet }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 p-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//         <h3 className="text-xl font-bold text-gray-800">Active Pets ({searchedPets.length})</h3>
//         <div className="relative w-full md:w-72">
//           <input
//             type="text"
//             placeholder="Search pets or owners..."
//             className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//         </div>
//       </div>

//       {searchedPets.length === 0 ? (
//         <div className="text-center py-12 bg-gray-50 rounded-xl">
//           <PawPrint className="mx-auto text-gray-300 mb-3" size={48} />
//           <p className="text-gray-500">
//             {searchQuery ? "No pets found matching your search" : "No active pets in your shelter"}
//           </p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {searchedPets.map((pet) => (
//             <div
//               key={pet._id}
//               className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
//               onClick={() => setSelectedPet(pet)}
//             >
//               <div className="flex gap-4">
//                 {pet.photo ? (
//                   <img
//                     src={`http://localhost:5050/uploads/${pet.photo}`}
//                     alt={pet.petName}
//                     className="w-20 h-20 object-cover rounded-lg"
//                   />
//                 ) : (
//                   <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
//                     <PawPrint className="text-gray-400" size={32} />
//                   </div>
//                 )}
//                 <div className="flex-1">
//                   <h4 className="font-bold text-gray-800">{pet.petName}</h4>
//                   <p className="text-sm text-gray-500">{pet.breed}</p>
//                   <p className="text-xs text-gray-400 mt-1">Owner: {pet.ownerName}</p>
//                   <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold uppercase mt-2 inline-block">
//                     {pet.serviceType}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function ActiveUsers({ activeUsers, setSelectedUser }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 p-6">
//       <h3 className="text-xl font-bold text-gray-800 mb-4">Active Clients ({activeUsers.length})</h3>
//       {activeUsers.length === 0 ? (
//         <div className="text-center py-12 bg-gray-50 rounded-xl">
//           <Users className="mx-auto text-gray-300 mb-3" size={48} />
//           <p className="text-gray-500">No active clients found</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {activeUsers.map((user) => (
//             <div
//               key={user._id}
//               className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
//               onClick={() => setSelectedUser(user)}
//             >
//               <h4 className="font-bold text-gray-800">{user.name}</h4>
//               <p className="text-sm text-gray-500">{user.email}</p>
//               <p className="text-xs text-gray-400 mt-1">{user.phone}</p>
//               <p className="text-xs text-gray-400 mt-1">Pets: {user.pets.length}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // -------------------- Modal -------------------- //
// function Modal({ children, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-start z-50 overflow-auto">
//       <div className="bg-white rounded-2xl p-6 m-4 max-w-2xl w-full relative">
//         <button
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <X size={24} />
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// }

// function PetModalContent({ pet }) {
//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold">{pet.petName}</h2>
//       <p>Breed: {pet.breed}</p>
//       <p>Owner: {pet.ownerName}</p>
//       <p>Email: {pet.ownerEmail}</p>
//       <p>Phone: {pet.ownerPhone}</p>
//       <p>Service: {pet.serviceType}</p>
//       <p>Booking Dates: {pet.startDate} - {pet.endDate}</p>
//     </div>
//   );
// }

// function UserModalContent({ user }) {
//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold">{user.name}</h2>
//       <p>Email: {user.email}</p>
//       <p>Phone: {user.phone}</p>
//       <h3 className="font-bold mt-2">Pets:</h3>
//       <ul className="list-disc list-inside">
//         {user.pets.map((pet) => (
//           <li key={pet._id}>{pet.petName} ({pet.breed})</li>
//         ))}
//       </ul>
//       <h3 className="font-bold mt-2">Bookings:</h3>
//       <ul className="list-disc list-inside">
//         {user.bookings.map((b) => (
//           <li key={b.id}>{b.serviceType} - {b.startDate} to {b.endDate} - Rs {b.totalAmount}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useEffect, useState, useMemo } from "react";
import { getShelterBookings } from "../../services/Shelter/shelterbooking";
import { useAuth } from "../../auth/AuthProvider";
import ShelterLayout from "../../layouts/Shelter/shelterLayout";
import {
  Calendar,
  Users,
  PawPrint,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Search,
  X,
  Clock,
  Info
} from "lucide-react";

export default function ShelterDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("30"); // 7, 30, 90, 365, all
  const [totalBookingsFilter, setTotalBookingsFilter] = useState("all"); // all, month, year
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === "shelter") {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await getShelterBookings();
      setBookings(res.data || []);
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setLoading(false);
    }
  };

  // Active bookings (confirmed and paid)
  const activeBookings = useMemo(() => {
    return bookings.filter(
      (b) => b.bookingStatus === "confirmed" && b.payment.status === "paid"
    );
  }, [bookings]);

  // Filter by time for stats
  const filteredBookings = useMemo(() => {
    const now = new Date();
    return activeBookings.filter((b) => {
      const bookingDate = new Date(b.createdAt);
      const daysDiff = Math.floor((now - bookingDate) / (1000 * 60 * 60 * 24));
      if (timeFilter === "all") return true;
      return daysDiff <= parseInt(timeFilter);
    });
  }, [activeBookings, timeFilter]);

  // Total bookings count (excluding cancelled)
  const totalBookingsCount = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const validBookings = bookings.filter((b) => b.bookingStatus !== "cancelled");

    if (totalBookingsFilter === "all") return validBookings.length;
    if (totalBookingsFilter === "month")
      return validBookings.filter((b) => {
        const d = new Date(b.createdAt);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      }).length;
    if (totalBookingsFilter === "year")
      return validBookings.filter((b) => {
        const d = new Date(b.getFullYear() === currentYear);
        return d.getFullYear() === currentYear;
      }).length;
    return 0;
  }, [bookings, totalBookingsFilter]);

  // Comprehensive Statistics
  const stats = useMemo(() => {
    const totalActiveBookings = filteredBookings.length;
    const revenueBookings = bookings.filter((b) => b.bookingStatus !== "cancelled");
    const totalRevenue = revenueBookings.reduce((sum, b) => sum + b.totalAmount, 0);

    const allPets = filteredBookings.flatMap((b) => b.pets);
    const uniquePetIds = [...new Set(allPets.map((p) => p._id))];
    const totalPets = uniquePetIds.length;

    const uniqueUserIds = [...new Set(filteredBookings.map((b) => b.petOwner._id))];
    const totalUsers = uniqueUserIds.length;

    const cashBookings = filteredBookings.filter((b) => b.payment.method === "cash").length;
    const esewaBookings = filteredBookings.filter((b) => b.payment.method === "esewa").length;

    const daycareCount = filteredBookings.filter((b) => b.serviceType === "daycare").length;
    const boardingCount = filteredBookings.filter((b) => b.serviceType === "boarding").length;

    const avgBookingValue = revenueBookings.length > 0
      ? Math.round(totalRevenue / revenueBookings.length)
      : 0;

    return {
      totalActiveBookings,
      totalRevenue,
      totalPets,
      totalUsers,
      cashBookings,
      esewaBookings,
      daycareCount,
      boardingCount,
      avgBookingValue
    };
  }, [filteredBookings, bookings]);

  // Active pets enriched with owner details
  const activePetsData = useMemo(() => {
    const petMap = new Map();
    filteredBookings.forEach((booking) => {
      booking.pets.forEach((pet) => {
        if (!petMap.has(pet._id)) {
          petMap.set(pet._id, {
            ...pet,
            ownerName: booking.petOwner.name,
            ownerEmail: booking.petOwner.email,
            ownerPhone: booking.petOwner.phone,
            ownerId: booking.petOwner._id,
            bookingId: booking._id,
            startDate: booking.startDate,
            endDate: booking.endDate,
            serviceType: booking.serviceType
          });
        }
      });
    });
    return Array.from(petMap.values());
  }, [filteredBookings]);

  // Active users enriched with pet and booking arrays
  const activeUsersData = useMemo(() => {
    const userMap = new Map();
    filteredBookings.forEach((booking) => {
      const userId = booking.petOwner._id;
      if (!userMap.has(userId)) {
        userMap.set(userId, {
          ...booking.petOwner,
          pets: [],
          bookings: []
        });
      }
      const user = userMap.get(userId);
      // Avoid adding duplicate pets for the same user
      booking.pets.forEach(p => {
        if (!user.pets.find(up => up._id === p._id)) user.pets.push(p);
      });
      user.bookings.push({
        id: booking._id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        serviceType: booking.serviceType,
        totalAmount: booking.totalAmount
      });
    });
    return Array.from(userMap.values());
  }, [filteredBookings]);

  const searchedPets = useMemo(() => {
    if (!searchQuery) return activePetsData;
    return activePetsData.filter((pet) =>
      pet.petName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activePetsData, searchQuery]);

  if (loading) {
    return (
      <ShelterLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        </div>
      </ShelterLayout>
    );
  }

  if (user?.role !== "shelter") {
    return (
      <ShelterLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
            <h2 className="text-xl font-bold text-gray-800">Access Denied</h2>
            <p className="text-gray-600">This dashboard is only available for shelter accounts.</p>
          </div>
        </div>
      </ShelterLayout>
    );
  }

  return (
    <ShelterLayout>
      <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight" style={{ color: "#183D8B" }}>
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Monitor your shelter's active bookings and performance</p>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-1">
            {["7", "30", "90", "365", "all"].map((v) => (
              <button
                key={v}
                onClick={() => setTimeFilter(v)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  timeFilter === v ? "bg-[#183D8B] text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {v === "all" ? "All Time" : v === "365" ? "Year" : `${v} Days`}
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Card */}
        <div className="bg-gradient-to-br from-[#183D8B] to-blue-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider">Business Impact</h3>
              </div>
              <p className="text-6xl font-black mb-2">{totalBookingsCount}</p>
              <p className="text-blue-100 text-sm font-medium">
                Total bookings recorded {totalBookingsFilter !== "all" ? `this ${totalBookingsFilter}` : "all time"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["all", "month", "year"].map((f) => (
                <button
                  key={f}
                  onClick={() => setTotalBookingsFilter(f)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    totalBookingsFilter === f ? "bg-white text-[#183D8B]" : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <PawPrint className="absolute -bottom-10 -right-10 text-white/10 w-64 h-64" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Calendar className="text-blue-600" size={24} />}
            title="Active Bookings"
            value={stats.totalActiveBookings}
            subtitle={`${stats.daycareCount} daycare, ${stats.boardingCount} boarding`}
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={<PawPrint className="text-purple-600" size={24} />}
            title="Pets in Care"
            value={stats.totalPets}
            subtitle="Current check-ins"
            bgColor="bg-purple-50"
          />
          <StatCard
            icon={<Users className="text-green-600" size={24} />}
            title="Active Clients"
            value={stats.totalUsers}
            subtitle="Owners with active stays"
            bgColor="bg-green-50"
          />
          <StatCard
            icon={<DollarSign className="text-orange-600" size={24} />}
            title="Total Revenue"
            value={`Rs ${stats.totalRevenue.toLocaleString()}`}
            subtitle={`Avg: Rs ${stats.avgBookingValue.toLocaleString()}`}
            bgColor="bg-orange-50"
          />
        </div>

        {/* Breakdown Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BreakdownCard
            title="Payment Methods"
            stats={[
              { label: "Cash", count: stats.cashBookings, color: "bg-green-500" },
              { label: "eSewa", count: stats.esewaBookings, color: "bg-blue-500" }
            ]}
            total={stats.totalActiveBookings}
          />
          <BreakdownCard
            title="Service Breakdown"
            stats={[
              { label: "Daycare", count: stats.daycareCount, color: "bg-purple-500" },
              { label: "Boarding", count: stats.boardingCount, color: "bg-orange-500" }
            ]}
            total={stats.totalActiveBookings}
          />
        </div>

        {/* Active Pets Table-like Cards */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h3 className="text-xl font-bold text-gray-800">Currently in Shelter ({searchedPets.length})</h3>
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search pet, breed, or owner..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          {searchedPets.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <PawPrint className="mx-auto text-gray-300 mb-3" size={48} />
              <p className="text-gray-500">No active pets found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchedPets.map((pet) => (
                <div
                  key={pet._id}
                  className="border border-gray-100 bg-gray-50/30 rounded-2xl p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setSelectedPet(pet)}
                >
                  <div className="flex gap-4">
                    {pet.photo ? (
                      <img
                        src={`http://localhost:5050/uploads/${pet.photo}`}
                        alt={pet.petName}
                        className="w-20 h-20 object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center border border-gray-200">
                        <PawPrint className="text-gray-300" size={32} />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-800 text-lg">{pet.petName}</h4>
                        <Info size={16} className="text-gray-300 group-hover:text-blue-500" />
                      </div>
                      <p className="text-sm text-gray-500 font-medium">{pet.breed}</p>
                      <p className="text-xs text-gray-400 mt-1">Owner: {pet.ownerName}</p>
                      <div className="mt-2 flex">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                          pet.serviceType === 'daycare' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {pet.serviceType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Users */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Active Clients ({activeUsersData.length})</h3>
          {activeUsersData.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <Users className="mx-auto text-gray-300 mb-3" size={48} />
              <p className="text-gray-500">No active clients</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeUsersData.map((client) => (
                <div
                  key={client._id}
                  className="border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all cursor-pointer bg-white relative overflow-hidden"
                  onClick={() => setSelectedUser(client)}
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 -mr-8 -mt-8 rounded-full" />
                  <div className="relative z-10">
                    <h4 className="font-bold text-gray-800 text-lg mb-1">{client.name}</h4>
                    <p className="text-sm text-gray-500">{client.email}</p>
                    <div className="flex items-center gap-2 mt-4 text-xs font-bold text-blue-600">
                      <PawPrint size={14} />
                      {client.pets.length} {client.pets.length === 1 ? 'Pet' : 'Pets'} Currently in Care
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MODALS */}
        {selectedPet && (
          <Modal onClose={() => setSelectedPet(null)}>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                {selectedPet.photo && (
                  <img
                    src={`http://localhost:5050/uploads/${selectedPet.photo}`}
                    alt={selectedPet.petName}
                    className="w-32 h-32 object-cover rounded-3xl border-4 border-white shadow-xl"
                  />
                )}
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-black text-gray-800">{selectedPet.petName}</h3>
                  <p className="text-lg text-blue-600 font-medium">{selectedPet.type} • {selectedPet.breed}</p>
                  <p className="text-sm text-gray-500 mt-2 flex items-center justify-center md:justify-start gap-1">
                    <Users size={14} /> Owner: {selectedPet.ownerName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Gender</p>
                  <p className="text-lg font-bold text-gray-700">{selectedPet.gender || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Age</p>
                  <p className="text-lg font-bold text-gray-700">{selectedPet.age ? `${selectedPet.age} Years` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Weight</p>
                  <p className="text-lg font-bold text-gray-700">{selectedPet.weight ? `${selectedPet.weight} kg` : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Service</p>
                  <p className="text-lg font-bold text-blue-700 capitalize">{selectedPet.serviceType}</p>
                </div>
              </div>

              <div className="bg-blue-50 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                  <Clock size={18} /> Booking Period
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-gray-500 block text-xs">Check-in</span>
                    <span className="font-bold">{new Date(selectedPet.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 block text-xs">Check-out</span>
                    <span className="font-bold">{new Date(selectedPet.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {(selectedPet.health || selectedPet.characteristics) && (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  {selectedPet.health && (
                    <div>
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">Medical Notes</p>
                      <p className="text-sm text-gray-700 leading-relaxed bg-red-50 p-3 rounded-lg border border-red-100">
                        {selectedPet.health}
                      </p>
                    </div>
                  )}
                  {selectedPet.characteristics?.length > 0 && (
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Traits</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedPet.characteristics.map((char, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Modal>
        )}

        {selectedUser && (
          <Modal onClose={() => setSelectedUser(null)}>
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-black text-gray-800">{selectedUser.name}</h3>
                  <p className="text-gray-500">{selectedUser.email}</p>
                  <p className="text-gray-500">{selectedUser.phone}</p>
                </div>
                <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-black uppercase">
                  Active Client
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Bookings for this Period</h4>
                {selectedUser.bookings.map((booking, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-black uppercase bg-blue-600 text-white px-2 py-0.5 rounded mr-2">
                        {booking.serviceType}
                      </span>
                      <p className="text-sm font-bold text-gray-800 mt-2">
                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right font-black text-[#183D8B] text-lg">
                      Rs {booking.totalAmount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Associated Pets</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedUser.pets.map((pet, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <PawPrint size={20} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{pet.petName}</p>
                        <p className="text-[10px] text-gray-400">{pet.breed}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </ShelterLayout>
  );
}

// -------------------- Sub-Components -------------------- //

function StatCard({ icon, title, value, subtitle, bgColor }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className={`${bgColor} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>{icon}</div>
      </div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-3xl font-black text-gray-800">{value}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-2 font-medium">{subtitle}</p>}
    </div>
  );
}

function BreakdownCard({ title, stats, total }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6">{title}</h3>
      <div className="space-y-6">
        {stats.map((s, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-gray-600 uppercase tracking-wide">{s.label}</span>
              <span className="text-2xl font-black text-gray-800">{s.count}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className={`${s.color} h-full rounded-full transition-all duration-1000`}
                style={{ width: total > 0 ? (s.count / total) * 100 + "%" : "0%" }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-[#183D8B]/40 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button
          className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors z-10"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <div className="overflow-y-auto p-8 md:p-12 max-h-[90vh]">
          {children}
        </div>
      </div>
    </div>
  );
}