// import { useEffect, useState } from "react";
// import {
//   getShelterBookings,
//   markCashPaid,
//   completeBooking,
// } from "../../services/Shelter/shelterbooking";
// import BookingDetailsModal from "../../pages/Shelter/bookingdetail";
// import { useAuth } from "../../auth/AuthProvider";

// // Payment Badge Component
// const PaymentBadge = ({ payment, onMarkPaid }) => {
//   const colors = {
//     pending: "bg-yellow-100 text-yellow-700",
//     paid: "bg-green-100 text-green-700",
//   };

//   return (
//     <span
//       className={`px-2 py-1 rounded text-sm font-medium ${
//         colors[payment.status] || "bg-gray-100 text-gray-600"
//       }`}
//     >
//       {payment.status.toUpperCase()}
//       {payment.status === "pending" && (
//         <button
//           onClick={onMarkPaid}
//           className="ml-2 bg-green-600 text-white px-2 py-0.5 rounded text-xs"
//         >
//           Mark Paid
//         </button>
//       )}
//     </span>
//   );
// };

// export default function ShelterBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const { user, loading } = useAuth();

//   const loadBookings = async () => {
//     try {
//       const res = await getShelterBookings();
//       setBookings(res.data);
//     } catch (err) {
//       console.error("Failed to load bookings", err);
//     }
//   };

//   useEffect(() => {
//     if (!loading && user?.role === "shelter") {
//       loadBookings();
//     }
//   }, [user, loading]);

//   if (loading) return <p>Loading...</p>;
//   if (!user || user.role !== "shelter") return <p>Access denied</p>;

//   const handleMarkPaid = async (bookingId) => {
//     try {
//       await markCashPaid(bookingId);
//       loadBookings(); // refresh immediately
//     } catch (err) {
//       console.error("Failed to mark payment as paid", err);
//     }
//   };

//   const handleComplete = async (bookingId) => {
//     try {
//       await completeBooking(bookingId);
//       loadBookings();
//     } catch (err) {
//       console.error("Failed to complete booking", err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Shelter Bookings</h2>

//       {bookings.length === 0 && (
//         <p className="text-gray-500">No bookings found</p>
//       )}
//       {bookings.map((b) => (
//         <div key={b._id} className="border p-4 rounded mb-3 shadow">
//           <p className="mb-2 text-sm text-gray-700">
//             <strong>Booked by:</strong> {b.petOwner?.name || "Unknown User"}
//           </p>
//           <p>
//             <strong>Service:</strong> {b.serviceType}
//           </p>
//           <p>
//             <strong>Pets:</strong> {b.petCount}
//           </p>
//           <p>
//             <strong>Dates:</strong> {new Date(b.startDate).toDateString()} –{" "}
//             {new Date(b.endDate).toDateString()}
//           </p>
//           <p>
//             <strong>Total:</strong> Rs {b.totalAmount}
//           </p>

//           {/* Payment Method */}
//           <p className="flex items-center gap-2">
//             <strong>Payment Method:</strong>
//             <span className="capitalize text-gray-700">{b.payment.method}</span>
//           </p>

//           {/* Payment Status */}
//           <p className="flex items-center gap-2">
//             <strong>Payment Status:</strong>
//             <PaymentBadge
//               payment={b.payment}
//               onMarkPaid={() => handleMarkPaid(b._id)}
//             />
//           </p>

//           {/* Booking Status */}
//           <p className="flex items-center gap-2">
//             <strong>Status:</strong>
//             <span
//               className={`px-2 py-1 rounded text-sm font-medium ${
//                 b.bookingStatus === "completed"
//                   ? "bg-green-100 text-green-700"
//                   : "bg-blue-100 text-blue-700"
//               }`}
//             >
//               {b.bookingStatus.toUpperCase()}
//             </span>
//           </p>

//           {/* Actions */}
//           <div className="flex gap-2 mt-2">
//             <button
//               className="bg-blue-600 text-white px-3 py-1 rounded"
//               onClick={() => setSelectedBooking(b._id)}
//             >
//               View
//             </button>

//             {b.payment.status === "paid" && b.bookingStatus !== "completed" && (
//               <button
//                 className="bg-purple-600 text-white px-3 py-1 rounded"
//                 onClick={() => handleComplete(b._id)}
//               >
//                 Complete
//               </button>
//             )}
//           </div>
//         </div>
//       ))}

//       {selectedBooking && (
//         <BookingDetailsModal
//           bookingId={selectedBooking}
//           onClose={() => setSelectedBooking(null)}
//           reload={loadBookings}
//         />
//       )}
//     </div>
//   );
// }

// import { useEffect, useState, useMemo } from "react";
// import {
//   getShelterBookings,
//   markCashPaid,
//   completeBooking,
// } from "../../services/Shelter/shelterbooking";
// import BookingDetailsModal from "../../pages/Shelter/bookingdetail";
// import { useAuth } from "../../auth/AuthProvider";
// import ShelterLayout from "../../layouts/Shelter/shelterLayout";

// // --- Sub-component: Payment Badge ---
// const PaymentBadge = ({ payment, onMarkPaid }) => {
//   const isPaid = payment.status === "paid";
//   return (
//     <div className="flex flex-col items-end">
//       <div className="flex items-center gap-2">
//         <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
//           isPaid
//             ? "bg-green-50 text-green-700 border-green-200"
//             : "bg-amber-50 text-amber-700 border-amber-200"
//         }`}>
//           {payment.status}
//         </span>
//       </div>
//       {!isPaid && (
//         <button
//           onClick={onMarkPaid}
//           className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold mt-1 transition-colors"
//         >
//           Confirm Cash Payment
//         </button>
//       )}
//     </div>
//   );
// };

// // --- Sub-component: Stat Card ---
// const StatCard = ({ label, value, icon, colorClass }) => (
//   <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
//     <div className={`p-3 rounded-xl ${colorClass}`}>
//       {icon}
//     </div>
//     <div>
//       <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
//       <p className="text-xl font-bold text-gray-900">{value}</p>
//     </div>
//   </div>
// );

// export default function ShelterBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const { user, loading } = useAuth();

//   const [statusFilter, setStatusFilter] = useState("all");
//   const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
//   const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const loadBookings = async () => {
//     try {
//       const res = await getShelterBookings();
//       setBookings(res.data || []);
//     } catch (err) {
//       console.error("Failed to load bookings", err);
//     }
//   };

//   useEffect(() => {
//     if (!loading && user?.role === "shelter") {
//       loadBookings();
//     }
//   }, [user, loading]);

//   const filteredBookings = useMemo(() => {
//     return bookings.filter((b) => {
//       const bookingDate = new Date(b.createdAt || b.startDate);
//       const now = new Date();

//       if (searchQuery && !b.petOwner?.name?.toLowerCase().includes(searchQuery.toLowerCase())) return false;

//       if (timeFilter === "30") {
//         if (bookingDate < new Date().setDate(now.getDate() - 30)) return false;
//       } else if (timeFilter === "60") {
//         if (bookingDate < new Date().setDate(now.getDate() - 60)) return false;
//       } else if (timeFilter === "custom") {
//         if (startDate && bookingDate < new Date(startDate)) return false;
//         if (endDate && bookingDate > new Date(endDate)) return false;
//       }

//       if (statusFilter !== "all" && b.bookingStatus !== statusFilter) return false;
//       if (paymentStatusFilter !== "all" && b.payment.status !== paymentStatusFilter) return false;
//       if (paymentMethodFilter !== "all" && b.payment.method.toLowerCase() !== paymentMethodFilter.toLowerCase()) return false;

//       return true;
//     });
//   }, [bookings, searchQuery, statusFilter, paymentStatusFilter, paymentMethodFilter, timeFilter, startDate, endDate]);

//   // --- Derived Totals for Stat Cards ---
//   const stats = useMemo(() => {
//     const totalRevenue = filteredBookings
//       .filter(b => b.payment.status === 'paid')
//       .reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

//     const active = filteredBookings.filter(b => b.bookingStatus === 'confirmed').length;

//     return { totalRevenue, active, count: filteredBookings.length };
//   }, [filteredBookings]);

//   const handleMarkPaid = async (bookingId) => {
//     if (!window.confirm("Verify that you have received the cash payment?")) return;
//     try {
//       await markCashPaid(bookingId);
//       loadBookings();
//     } catch (err) { console.error(err); }
//   };

//   const handleComplete = async (bookingId) => {
//     try {
//       await completeBooking(bookingId);
//       loadBookings();
//     } catch (err) { console.error(err); }
//   };

//   if (loading) return <ShelterLayout><div className="p-10 text-center text-gray-500">Loading Dashboard...</div></ShelterLayout>;

//   return (
//     <ShelterLayout>
//       <div className="min-h-screen bg-gray-50/50 p-4 lg:p-10">

//         {/* Header Section */}
//         <div className="max-w-6xl mx-auto mb-8">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//             <div>
//               <h2 className="text-3xl font-black text-gray-900 tracking-tight">Shelter Bookings</h2>
//               <p className="text-gray-500 mt-1">Manage, filter, and track your service history.</p>
//             </div>
//             <div className="relative group">
//               <input
//                 type="text"
//                 placeholder="Search pet owner..."
//                 className="pl-11 pr-5 py-3 border-none bg-white shadow-sm rounded-2xl text-sm w-full md:w-80 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <span className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors">🔍</span>
//             </div>
//           </div>

//           {/* Stat Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//             <StatCard label="Total Revenue" value={`Rs ${stats.totalRevenue}`} colorClass="bg-green-100 text-green-600" icon="💰" />
//             <StatCard label="Confirmed" value={stats.active} colorClass="bg-blue-100 text-blue-600" icon="📅" />
//             <StatCard label="Results" value={stats.count} colorClass="bg-purple-100 text-purple-600" icon="📊" />
//           </div>

//           {/* Filter Bar */}
//           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//               {[
//                 { label: "Timeline", value: timeFilter, setter: setTimeFilter, options: [{v:"all", l:"All Time"}, {v:"30", l:"Last 30 Days"}, {v:"60", l:"Last 60 Days"}, {v:"custom", l:"Custom Range"}] },
//                 { label: "Status", value: statusFilter, setter: setStatusFilter, options: [{v:"all", l:"Any Status"}, {v:"confirmed", l:"Confirmed"}, {v:"completed", l:"Completed"}] },
//                 { label: "Payment", value: paymentStatusFilter, setter: setPaymentStatusFilter, options: [{v:"all", l:"Any Payment"}, {v:"paid", l:"Paid"}, {v:"pending", l:"Pending"}] },
//                 { label: "Method", value: paymentMethodFilter, setter: setPaymentMethodFilter, options: [{v:"all", l:"Any Method"}, {v:"cash", l:"Cash"}, {v:"esewa", l:"eSewa"}] },
//               ].map((f, i) => (
//                 <div key={i}>
//                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">{f.label}</label>
//                   <select
//                     className="w-full bg-gray-50 border-none rounded-xl p-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none"
//                     value={f.value}
//                     onChange={(e) => f.setter(e.target.value)}
//                   >
//                     {f.options.map(opt => <option key={opt.v} value={opt.v}>{opt.l}</option>)}
//                   </select>
//                 </div>
//               ))}
//             </div>

//             {timeFilter === "custom" && (
//               <div className="flex gap-4 mt-6 pt-6 border-t border-gray-50 animate-in slide-in-from-top-2 duration-300">
//                 <input type="date" className="bg-gray-50 border-none rounded-xl p-2.5 text-sm" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//                 <input type="date" className="bg-gray-50 border-none rounded-xl p-2.5 text-sm" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//               </div>
//             )}
//           </div>

//           {/* Bookings List */}
//           <div className="space-y-4">
//             {filteredBookings.length === 0 ? (
//               <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200">
//                 <p className="text-gray-400 font-medium">No records matching your filters.</p>
//                 <button onClick={() => setTimeFilter("all")} className="mt-2 text-blue-500 text-sm hover:underline">Clear all filters</button>
//               </div>
//             ) : (
//               filteredBookings.map((b) => (
//                 <div key={b._id} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center transition-all hover:shadow-xl hover:shadow-gray-200/50 group relative overflow-hidden">
//                   <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

//                   <div className="space-y-2">
//                     <div className="flex items-center gap-3">
//                       <h3 className="font-bold text-xl text-gray-800 tracking-tight">{b.petOwner?.name || "Manisha Acharya"}</h3>
//                       <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
//                         b.bookingStatus === "completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
//                       }`}>
//                         {b.bookingStatus}
//                       </span>
//                     </div>

//                     <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-gray-500 font-medium">
//                       <span className="flex items-center gap-1.5">🏷️ {b.serviceType}</span>
//                       <span className="flex items-center gap-1.5">🐾 {b.petCount} Pets</span>
//                       <span className="flex items-center gap-1.5 text-gray-400 italic">
//                         📅 {new Date(b.startDate).toDateString()} – {new Date(b.endDate).toDateString()}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="mt-6 md:mt-0 flex flex-col md:items-end gap-3 w-full md:w-auto border-t md:border-none pt-4 md:pt-0">
//                     <div className="flex items-center justify-between md:justify-end gap-6">
//                       <div className="text-left md:text-right">
//                         <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none mb-1">Total Amount</p>
//                         <p className="text-2xl font-black text-gray-900 leading-none">Rs {b.totalAmount}</p>
//                         <p className="text-[11px] text-gray-400 mt-1 italic">via {b.payment.method}</p>
//                       </div>
//                       <PaymentBadge payment={b.payment} onMarkPaid={() => handleMarkPaid(b._id)} />
//                     </div>

//                     <div className="flex gap-2 w-full">
//                       <button
//                         className="flex-1 md:flex-none bg-gray-50 text-gray-600 hover:bg-gray-100 px-6 py-2 rounded-xl text-sm font-bold transition-all"
//                         onClick={() => setSelectedBooking(b._id)}
//                       >
//                         View Details
//                       </button>
//                       {b.payment.status === "paid" && b.bookingStatus !== "completed" && (
//                         <button
//                           className="flex-1 md:flex-none bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
//                           onClick={() => handleComplete(b._id)}
//                         >
//                           Complete
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {selectedBooking && (
//           <BookingDetailsModal
//             bookingId={selectedBooking}
//             onClose={() => setSelectedBooking(null)}
//             reload={loadBookings}
//           />
//         )}
//       </div>
//     </ShelterLayout>
//   );
// }

import { useEffect, useState, useMemo } from "react";
import {
  getShelterBookings,
  markCashPaid,
  completeBooking,
} from "../../services/Shelter/shelterbooking";
import { Search } from "lucide-react";
import BookingDetailsModal from "../../pages/Shelter/bookingdetail";
import { useAuth } from "../../auth/AuthProvider";
import ShelterLayout from "../../layouts/Shelter/shelterLayout";

// --- Sub-component for Payment Badge ---
const PaymentBadge = ({ payment, onMarkPaid }) => {
  const isPending = payment.status === "pending";
  return (
    <div className="flex flex-col items-start md:items-end gap-1">
      <span
        className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
          isPending
            ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
            : "bg-green-100 text-green-700 border border-green-200"
        }`}
      >
        {payment.status}
      </span>
      {isPending && (
        <button
          onClick={onMarkPaid}
          className="text-[11px] text-blue-600 hover:underline font-semibold"
        >
          Mark as Paid
        </button>
      )}
    </div>
  );
};

export default function ShelterBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, loading } = useAuth();

  // --- Filter States ---
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const loadBookings = async () => {
    try {
      const res = await getShelterBookings();
      setBookings(res.data || []);
    } catch (err) {
      console.error("Failed to load bookings", err);
    }
  };

  useEffect(() => {
    if (!loading && user?.role === "shelter") {
      loadBookings();
    }
  }, [user, loading]);

  // --- Filtering Logic ---
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const bookingDate = new Date(b.createdAt || b.startDate);
      const now = new Date();

      if (
        searchQuery &&
        !b.petOwner?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;

      if (timeFilter === "30") {
        if (bookingDate < new Date().setDate(now.getDate() - 30)) return false;
      } else if (timeFilter === "60") {
        if (bookingDate < new Date().setDate(now.getDate() - 60)) return false;
      } else if (timeFilter === "custom") {
        if (startDate && bookingDate < new Date(startDate)) return false;
        if (endDate && bookingDate > new Date(endDate)) return false;
      }

      if (statusFilter !== "all" && b.bookingStatus !== statusFilter)
        return false;
      if (
        paymentStatusFilter !== "all" &&
        b.payment.status !== paymentStatusFilter
      )
        return false;
      if (
        paymentMethodFilter !== "all" &&
        b.payment.method.toLowerCase() !== paymentMethodFilter.toLowerCase()
      )
        return false;

      return true;
    });
  }, [
    bookings,
    searchQuery,
    statusFilter,
    paymentStatusFilter,
    paymentMethodFilter,
    timeFilter,
    startDate,
    endDate,
  ]);

  const handleMarkPaid = async (bookingId) => {
    if (!window.confirm("Confirm cash payment received?")) return;
    try {
      await markCashPaid(bookingId);
      loadBookings();
    } catch (err) {
      alert("Error updating payment");
    }
  };

  const handleComplete = async (bookingId) => {
    try {
      await completeBooking(bookingId);
      loadBookings();
    } catch (err) {
      alert("Error completing booking");
    }
  };

  const resetFilters = () => {
    setStatusFilter("all");
    setPaymentStatusFilter("all");
    setPaymentMethodFilter("all");
    setTimeFilter("all");
    setSearchQuery("");
  };

  if (loading)
    return (
      <ShelterLayout>
        <p className="p-10 text-center">Loading...</p>
      </ShelterLayout>
    );

  return (
    <ShelterLayout>
      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2
            className="text-3xl font-black tracking-tight"
            style={{ color: "#183D8B" }}
          >
            Booking Management
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search pet owner..."
              className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm w-full md:w-72 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3.5 top-3 text-gray-400">
              <Search size={18} />
            </span>{" "}
          </div>
        </div>

        {/* Filter Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">
                Time Frame
              </label>
              <select
                className="w-full bg-gray-50 border-none rounded-lg p-2 text-sm font-medium"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="all">All Records</option>
                <option value="30">Last 30 Days</option>
                <option value="60">Last 60 Days</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">
                Booking Status
              </label>
              <select
                className="w-full bg-gray-50 border-none rounded-lg p-2 text-sm font-medium"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Any Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">
                Payment
              </label>
              <select
                className="w-full bg-gray-50 border-none rounded-lg p-2 text-sm font-medium"
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
              >
                <option value="all">Any Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">
                Method
              </label>
              <select
                className="w-full bg-gray-50 border-none rounded-lg p-2 text-sm font-medium"
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value)}
              >
                <option value="all">Any Method</option>
                <option value="cash">Cash</option>
                <option value="esewa">eSewa</option>
              </select>
            </div>
          </div>
          {timeFilter === "custom" && (
            <div className="flex gap-4 mt-4 pt-4 border-t border-gray-50">
              <input
                type="date"
                className="bg-gray-50 rounded-lg p-2 text-sm outline-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                className="bg-gray-50 rounded-lg p-2 text-sm outline-none"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-6 px-2">
          <p className="text-sm font-semibold text-gray-500">
            Showing {filteredBookings.length} bookings
          </p>
          <button
            onClick={resetFilters}
            className="text-xs text-blue-600 font-bold hover:underline"
          >
            Clear Filters
          </button>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed">
              <p className="text-gray-400">
                No bookings found matching your filters.
              </p>
            </div>
          ) : (
            filteredBookings.map((b) => (
              <div
                key={b._id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* Left Section: Core Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-xl text-gray-800">
                        {b.petOwner?.name || "Manisha Acharya"}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                          b.bookingStatus === "completed"
                            ? "bg-green-50 text-green-600 border border-green-200"
                            : "bg-blue-50 text-blue-600 border border-blue-200"
                        }`}
                      >
                        {b.bookingStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
                      <div className="text-gray-600">
                        <span className="font-bold text-gray-400 uppercase text-[10px] block">
                          Service
                        </span>
                        <span className="uppercase font-semibold">
                          {b.serviceType}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        <span className="font-bold text-gray-400 uppercase text-[10px] block">
                          Pets
                        </span>
                        <span className="text-lg font-bold">{b.petCount}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="font-bold text-gray-400 uppercase text-[10px] block">
                          Dates
                        </span>
                        <p className="text-gray-700 font-medium">
                          {new Date(b.startDate).toDateString()} –{" "}
                          {new Date(b.endDate).toDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Payment & Actions */}
                  <div className="flex flex-col md:items-end justify-between border-t md:border-none pt-4 md:pt-0 gap-4">
                    <div className="flex items-center md:items-end gap-6 md:gap-4">
                      <div className="text-left md:text-right">
                        <span className="font-bold text-gray-400 uppercase text-[10px] block">
                          Total Amount
                        </span>
                        <p className="text-2xl font-black leading-tight" style={{ color: '#183D8B'}}>
                          Rs {b.totalAmount}
                        </p>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                          via {b.payment.method}
                        </p>
                      </div>
                      <PaymentBadge
                        payment={b.payment}
                        onMarkPaid={() => handleMarkPaid(b._id)}
                      />
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                      <button
                        className="flex-1 bg-blue-100 text-gray-700 hover:bg-gray-200 px-5 py-2 rounded-xl text-sm font-bold transition-colors"
                        onClick={() => setSelectedBooking(b._id)}
                      >
                        Details
                      </button>
                      {b.payment.status === "paid" &&
                        b.bookingStatus !== "completed" && (
                          <button
                            className="flex-1 bg-[#183D8B] text-white hover:bg-blue-500 px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
                            onClick={() => handleComplete(b._id)}
                          >
                            Complete
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedBooking && (
          <BookingDetailsModal
            bookingId={selectedBooking}
            onClose={() => setSelectedBooking(null)}
            reload={loadBookings}
          />
        )}
      </div>
    </ShelterLayout>
  );
}
