// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   Calendar,
//   LayoutGrid,
//   History,
//   Trash2,
//   Loader2,
//   Wallet,
//   PawPrint,
//   MapPin,
//   CheckCircle2,
//   Clock,
//   ArrowRight,
// } from "lucide-react";

// import Header from "../../layouts/Header";
// import {
//   getBookingHistory,
//   cancelBooking,
// } from "../../services/Shelter/shelterbooking";

// export default function BookingHistory() {
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Filters
//   const [filter, setFilter] = useState("all");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const fetchBookings = async () => {
//     try {
//       const { data } = await getBookingHistory();
//       setBookings(data.bookings || []);
//     } catch (err) {
//       console.error("Failed to fetch history:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const handleCancel = async (id) => {
//     if (!window.confirm("Are you sure you want to cancel this booking?")) return;
//     try {
//       await cancelBooking(id);
//       fetchBookings();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const filteredBookings = useMemo(() => {
//     const now = new Date();
//     return bookings.filter((b) => {
//       const createdAt = new Date(b.createdAt);
//       if (filter === "30") return (now - createdAt) / (1000 * 60 * 60 * 24) <= 30;
//       if (filter === "45") return (now - createdAt) / (1000 * 60 * 60 * 24) <= 45;
//       if (filter === "custom") {
//         if (!fromDate || !toDate) return true;
//         return createdAt >= new Date(fromDate) && createdAt <= new Date(toDate);
//       }
//       return true;
//     });
//   }, [bookings, filter, fromDate, toDate]);

//   const getStatusStyles = (status) => {
//     const styles = {
//       confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
//       pending: "bg-amber-50 text-amber-700 border-amber-200",
//       completed: "bg-blue-50 text-blue-700 border-blue-200",
//       cancelled: "bg-red-50 text-red-700 border-red-200",
//     };
//     return styles[status] || "bg-gray-50 text-gray-700 border-gray-200";
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50">
//         <Loader2 className="w-10 h-10 text-[#183D8B] animate-spin mb-4" />
//         <p className="text-gray-500 font-medium tracking-wide">Retrieving your records...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* 1. Added Global Header */}
//       <Header />

//       <div className="py-20 px-4 sm:px-6">
//         <div className="max-w-5xl mx-auto">
          
//           <button 
//             onClick={() => navigate(-1)} 
//             className="flex items-center gap-2 text-slate-500 hover:text-[#183D8B] font-bold mb-8 transition-colors group"
//           >
//             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//             <span>Back</span>
//           </button>

//           {/* Header Content Section */}
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
//             <div className="flex items-center gap-5">
//               <div className="bg-[#183D8B] p-4 rounded-2xl shadow-lg shadow-blue-900/20">
//                 <History className="text-white" size={28} />
//               </div>
//               <div>
//                 <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
//                   Booking History
//                 </h2>
//                 <p className="text-slate-500 font-medium">
//                   You have <span className="text-[#183D8B]">{filteredBookings.length}</span> total records
//                 </p>
//               </div>
//             </div>

//             {/* Filter Pills */}
//             <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
//               {["all", "30", "45", "custom"].map((f) => (
//                 <button
//                   key={f}
//                   onClick={() => setFilter(f)}
//                   className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
//                     filter === f
//                       ? "bg-[#183D8B] text-white shadow-md"
//                       : "text-slate-600 hover:bg-slate-50"
//                   }`}
//                 >
//                   {f === "all" ? "All Time" : f === "custom" ? "Custom Range" : `Last ${f} Days`}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Custom Date Picker */}
//           {filter === "custom" && (
//             <div className="bg-white border-2 border-[#183D8B]/10 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-4 items-center animate-in fade-in slide-in-from-top-2">
//               <div className="flex-1 w-full">
//                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">From Date</label>
//                 <input
//                   type="date"
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                   className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 focus:border-[#183D8B] outline-none transition-colors"
//                 />
//               </div>
//               <ArrowRight className="hidden sm:block text-slate-300 mt-6" />
//               <div className="flex-1 w-full">
//                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">To Date</label>
//                 <input
//                   type="date"
//                   value={toDate}
//                   onChange={(e) => setToDate(e.target.value)}
//                   className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 focus:border-[#183D8B] outline-none transition-colors"
//                 />
//               </div>
//             </div>
//           )}

//           {/* Booking Cards */}
//           {filteredBookings.length ? (
//             <div className="space-y-6">
//               {filteredBookings.map((b) => (
//                 <div
//                   key={b._id}
//                   className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
//                 >
//                   <div className="p-1 px-6 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
//                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">
//                        Transaction Ref: {b.payment?.transactionId || "N/A"}
//                      </span>
//                   </div>
                  
//                   <div className="p-8">
//                     <div className="flex flex-col lg:flex-row justify-between gap-10">
//                       <div className="flex-1">
//                         <div className="flex flex-wrap items-center gap-4 mb-8">
//                           <h3 className="text-2xl font-black text-slate-900">
//                             {b.shelter?.name}
//                           </h3>
//                           <span className={`px-4 py-1.5 rounded-full border-2 text-[11px] font-black uppercase tracking-wider ${getStatusStyles(b.bookingStatus)}`}>
//                             {b.bookingStatus}
//                           </span>
//                           <div className="flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full text-slate-700 font-bold text-sm">
//                             <PawPrint size={16} className="text-[#183D8B]" />
//                             {b.petCount} Pet{b.petCount > 1 && "s"}
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-4">
//                           <Info icon={<Calendar size={18}/>} label="Stay Duration">
//                             <span className="font-bold text-slate-800">
//                               {new Date(b.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
//                             </span>
//                             <span className="mx-2 text-slate-300">—</span>
//                             <span className="font-bold text-slate-800">
//                               {new Date(b.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
//                             </span>
//                           </Info>

//                           <Info icon={<Wallet size={18}/>} label="Payment Details">
//                             <span className="capitalize font-bold text-slate-800">{b.payment?.method}</span>
//                             <span className="ml-2 text-xs font-medium text-slate-400">({b.payment?.status})</span>
//                           </Info>

//                           <Info icon={<Clock size={18}/>} label="Booking Date">
//                             <span className="font-medium text-slate-700">{new Date(b.createdAt).toLocaleString()}</span>
//                           </Info>

//                           <Info icon={<LayoutGrid size={18}/>} label="Service Provided">
//                             <span className="font-bold uppercase text-slate-800">{b.serviceType}</span>
//                           </Info>
//                         </div>
//                       </div>

//                       <div className="lg:w-64 flex flex-col items-center lg:items-end justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-8 lg:pt-0 lg:pl-10">
//                         <div className="text-center lg:text-right">
//                           <p className="text-xs font-semi-bold text-slate-400 uppercase tracking-widest mb-1">
//                             Grand Total
//                           </p>
//                           <p className="text-xl font-black text-[#183D8B]">
//                             NPR {b.totalAmount.toLocaleString()}
//                           </p>
//                         </div>

//                         <div className="w-full mt-8">
//                           {b.bookingStatus === "confirmed" && (
//                             <button
//                               onClick={() => handleCancel(b._id)}
//                               className="w-full flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-600 font-bold py-3 px-6 rounded-2xl hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all active:scale-95"
//                             >
//                               <Trash2 size={18} />
//                               Cancel
//                             </button>
//                           )}

//                           {b.bookingStatus === "completed" && (
//                             <div className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-500 font-bold py-3 px-6 rounded-2xl border-2 border-transparent">
//                               <CheckCircle2 size={18} className="text-emerald-500" />
//                               Completed
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="bg-white border-4 border-dashed border-slate-100 rounded-[40px] p-20 text-center">
//               <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <PawPrint size={40} className="text-slate-300" />
//               </div>
//               <h3 className="text-xl font-bold text-slate-900 mb-2">No Bookings Found</h3>
//               <p className="text-slate-500 max-w-xs mx-auto font-medium">
//                 We couldn't find any booking records for the selected period.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Info({ label, children, icon }) {
//   return (
//     <div className="flex flex-col">
//       <div className="flex items-center gap-2 mb-2">
//         <span className="text-slate-400">{icon}</span>
//         <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">{label}</p>
//       </div>
//       <div className="text-slate-900 text-[15px] pl-7">
//         {children}
//       </div>
//     </div>
//   );
// }

// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   Calendar,
//   LayoutGrid,
//   History,
//   Trash2,
//   Loader2,
//   Wallet,
//   PawPrint,
//   CheckCircle2,
//   Clock,
//   ArrowRight,
// } from "lucide-react";

// import Header from "../../layouts/Header";
// import {
//   getBookingHistory,
//   cancelBooking,
// } from "../../services/Shelter/shelterbooking";

// export default function BookingHistory() {
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [filter, setFilter] = useState("all");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const fetchBookings = async () => {
//     try {
//       const { data } = await getBookingHistory();
//       setBookings(data.bookings || []);
//     } catch (err) {
//       console.error("Failed to fetch history:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const handleCancel = async (id) => {
//     if (!window.confirm("Are you sure you want to cancel this booking?")) return;
//     try {
//       await cancelBooking(id);
//       fetchBookings();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const filteredBookings = useMemo(() => {
//     const now = new Date();
//     return bookings.filter((b) => {
//       const createdAt = new Date(b.createdAt);
//       if (filter === "30") return (now - createdAt) / (1000 * 60 * 60 * 24) <= 30;
//       if (filter === "45") return (now - createdAt) / (1000 * 60 * 60 * 24) <= 45;
//       if (filter === "custom") {
//         if (!fromDate || !toDate) return true;
//         return createdAt >= new Date(fromDate) && createdAt <= new Date(toDate);
//       }
//       return true;
//     });
//   }, [bookings, filter, fromDate, toDate]);

//   const getStatusStyles = (status) => {
//     const styles = {
//       confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
//       pending: "bg-amber-50 text-amber-700 border-amber-200",
//       completed: "bg-blue-50 text-blue-700 border-blue-200",
//       cancelled: "bg-red-50 text-red-700 border-red-200",
//     };
//     return styles[status] || "bg-gray-50 text-gray-700 border-gray-200";
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50">
//         <Loader2 className="w-10 h-10 text-[#183D8B] animate-spin mb-4" />
//         <p className="text-gray-500 font-medium tracking-wide">
//           Retrieving your records...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header />

//       <div className="py-20 px-4 sm:px-6">
//         <div className="max-w-5xl mx-auto">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-slate-500 hover:text-[#183D8B] font-bold mb-8 transition-colors group"
//           >
//             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//             <span>Back</span>
//           </button>

//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
//             <div className="flex items-center gap-5">
//               <div className="bg-[#183D8B] p-4 rounded-2xl shadow-lg shadow-blue-900/20">
//                 <History className="text-white" size={28} />
//               </div>
//               <div>
//                 <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
//                   Booking History
//                 </h2>
//                 <p className="text-slate-500 font-medium">
//                   You have{" "}
//                   <span className="text-[#183D8B]">
//                     {filteredBookings.length}
//                   </span>{" "}
//                   total records
//                 </p>
//               </div>
//             </div>
//           </div>

//           {filteredBookings.length ? (
//             <div className="space-y-6">
//               {filteredBookings.map((b) => (
//                 <div
//                   key={b._id}
//                   className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all"
//                 >
//                   <div className="p-1 px-6 bg-slate-50/50 border-b">
//                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
//                       Transaction Ref: {b.payment?.transactionId || "N/A"}
//                     </span>
//                   </div>

//                   <div className="p-8">
//                     <div className="flex flex-col lg:flex-row justify-between gap-10">
//                       <div className="flex-1">
//                         <div className="flex flex-wrap items-center gap-4 mb-8">
//                           {/* ✅ CLICKABLE SHELTER NAME */}
//                           <h3
//                             onClick={() =>
//                               navigate(`/shelter/${b.shelter?._id}`)
//                             }
//                             className="text-2xl font-black text-slate-900 cursor-pointer hover:text-[#183D8B] transition-colors"
//                           >
//                             {b.shelter?.name}
//                           </h3>

//                           <span
//                             className={`px-4 py-1.5 rounded-full border-2 text-[11px] font-black uppercase tracking-wider ${getStatusStyles(
//                               b.bookingStatus
//                             )}`}
//                           >
//                             {b.bookingStatus}
//                           </span>

//                           <div className="flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full text-slate-700 font-bold text-sm">
//                             <PawPrint size={16} className="text-[#183D8B]" />
//                             {b.petCount} Pet{b.petCount > 1 && "s"}
//                           </div>

//                           {/* ✅ ROOMS SHOWN */}
//                           {b.roomAssignments?.length > 0 && (
//                             <div className="bg-blue-50 text-[#183D8B] px-4 py-1.5 rounded-full text-sm font-bold border border-blue-200">
//                               Rooms:{" "}
//                               {b.roomAssignments
//                                 .map((r) => r.roomNumber)
//                                 .sort((a, b) => a - b)
//                                 .join(", ")}
//                             </div>
//                           )}
//                         </div>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-4">
//                           <Info icon={<Calendar size={18} />} label="Stay Duration">
//                             <span className="font-bold text-slate-800">
//                               {new Date(b.startDate).toLocaleDateString()}
//                             </span>
//                             <span className="mx-2 text-slate-300">—</span>
//                             <span className="font-bold text-slate-800">
//                               {new Date(b.endDate).toLocaleDateString()}
//                             </span>
//                           </Info>

//                           <Info icon={<Wallet size={18} />} label="Payment Details">
//                             <span className="capitalize font-bold text-slate-800">
//                               {b.payment?.method}
//                             </span>
//                           </Info>

//                           <Info icon={<Clock size={18} />} label="Booking Date">
//                             <span className="font-medium text-slate-700">
//                               {new Date(b.createdAt).toLocaleString()}
//                             </span>
//                           </Info>

//                           <Info icon={<LayoutGrid size={18} />} label="Service">
//                             <span className="font-bold uppercase text-slate-800">
//                               {b.serviceType}
//                             </span>
//                           </Info>
//                         </div>
//                       </div>

//                       <div className="lg:w-64 flex flex-col items-end justify-between">
//                         <div className="text-right">
//                           <p className="text-xs font-bold text-slate-400 uppercase">
//                             Grand Total
//                           </p>
//                           <p className="text-xl font-black text-[#183D8B]">
//                             NPR {b.totalAmount.toLocaleString()}
//                           </p>
//                         </div>

//                         {b.bookingStatus === "confirmed" && (
//                           <button
//                             onClick={() => handleCancel(b._id)}
//                             className="mt-6 w-full flex items-center justify-center gap-2 border-2 text-slate-600 font-bold py-3 rounded-2xl hover:bg-red-50 hover:text-red-600"
//                           >
//                             <Trash2 size={18} />
//                             Cancel
//                           </button>
//                         )}

//                         {b.bookingStatus === "completed" && (
//                           <div className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-500 font-bold py-3 rounded-2xl">
//                             <CheckCircle2 size={18} className="text-emerald-500" />
//                             Completed
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="bg-white border-4 border-dashed rounded-[40px] p-20 text-center">
//               <PawPrint size={40} className="text-slate-300 mx-auto mb-6" />
//               <h3 className="text-xl font-bold text-slate-900 mb-2">
//                 No Bookings Found
//               </h3>
//               <p className="text-slate-500 font-medium">
//                 We couldn't find any booking records.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Info({ label, children, icon }) {
//   return (
//     <div className="flex flex-col">
//       <div className="flex items-center gap-2 mb-2">
//         <span className="text-slate-400">{icon}</span>
//         <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
//           {label}
//         </p>
//       </div>
//       <div className="text-slate-900 text-[15px] pl-7">{children}</div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  LayoutGrid,
  History,
  Trash2,
  Loader2,
  Wallet,
  PawPrint,
  CheckCircle2,
  Clock,
  ArrowRight,
  DoorOpen,
} from "lucide-react";

import Header from "../../layouts/Header";
import {
  getBookingHistory,
  cancelBooking,
} from "../../services/Shelter/shelterbooking";

export default function BookingHistory() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchBookings = async () => {
    try {
      const { data } = await getBookingHistory();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await cancelBooking(id);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBookings = useMemo(() => {
    const now = new Date();
    return bookings.filter((b) => {
      const createdAt = new Date(b.createdAt);
      if (filter === "30") return (now - createdAt) / 86400000 <= 30;
      if (filter === "45") return (now - createdAt) / 86400000 <= 45;
      if (filter === "custom") {
        if (!fromDate || !toDate) return true;
        return createdAt >= new Date(fromDate) && createdAt <= new Date(toDate);
      }
      return true;
    });
  }, [bookings, filter, fromDate, toDate]);

  const getStatusStyles = (status) => {
    const styles = {
      confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      completed: "bg-blue-50 text-blue-700 border-blue-200",
      cancelled: "bg-red-50 text-red-700 border-red-200",
    };
    return styles[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50">
        <Loader2 className="w-10 h-10 text-[#183D8B] animate-spin mb-4" />
        <p className="text-gray-500 font-medium tracking-wide">
          Retrieving your records...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-[#183D8B] font-bold mb-8"
          >
            <ArrowLeft size={20} /> Back
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="flex items-center gap-5">
              <div className="bg-[#183D8B] p-4 rounded-2xl">
                <History className="text-white" size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900">
                  Booking History
                </h2>
                <p className="text-slate-500 font-medium">
                  You have{" "}
                  <span className="text-[#183D8B]">
                    {filteredBookings.length}
                  </span>{" "}
                  total records
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 bg-white p-1.5 rounded-2xl border">
              {["all", "30", "45", "custom"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold ${
                    filter === f
                      ? "bg-[#183D8B] text-white"
                      : "text-slate-600"
                  }`}
                >
                  {f === "all"
                    ? "All Time"
                    : f === "custom"
                    ? "Custom Range"
                    : `Last ${f} Days`}
                </button>
              ))}
            </div>
          </div>

          {filter === "custom" && (
            <div className="bg-white rounded-2xl p-6 mb-8 flex gap-4">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border rounded-xl px-4 py-2"
              />
              <ArrowRight className="text-slate-300" />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border rounded-xl px-4 py-2"
              />
            </div>
          )}

          {filteredBookings.length ? (
            <div className="space-y-4"> {/* Reduced space between cards */}
              {filteredBookings.map((b) => {
                const rooms =
                  b.roomAssignments?.map((r) => r.roomNumber) ||
                  b.selectedRooms ||
                  [];

                return (
                  <div
                    key={b._id}
                    className="bg-white border rounded-2xl overflow-hidden" // Slightly smaller border radius
                  >
                    {/* Reduced padding from p-8 to p-6 */}
                    <div className="p-6 flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        {/* Reduced margin from mb-6 to mb-4 */}
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <h3
                            onClick={() =>
                              navigate(
                                `/shelters/${b.shelter?._id}${
                                  rooms.length
                                    ? `?room=${rooms[0]}`
                                    : ""
                                }`
                              )
                            }
                            className="text-xl font-black text-slate-900 cursor-pointer hover:text-[#183D8B]"
                          >
                            {b.shelter?.name}
                          </h3>

                          <span
                            className={`px-3 py-0.5 rounded-full border text-[10px] font-black uppercase ${getStatusStyles(
                              b.bookingStatus
                            )}`}
                          >
                            {b.bookingStatus}
                          </span>
                        </div>

                        {/* ROOMS DISPLAY - Reduced bottom margin */}
                        {rooms.length > 0 && (
                          <div className="mb-4 flex items-center gap-3">
                            <DoorOpen size={16} className="text-[#183D8B]" />
                            <span className="font-bold text-sm text-slate-700">
                              Room{rooms.length > 1 ? "s" : ""}:
                            </span>
                            {rooms.map((r) => (
                              <span
                                key={r}
                                className="px-2 py-0.5 bg-blue-50 text-[#183D8B] rounded-full text-xs font-bold border"
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Grid layout for info items to save vertical space */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                          <Info icon={<Calendar size={16} />} label="Stay">
                            {new Date(b.startDate).toLocaleDateString()} — {new Date(b.endDate).toLocaleDateString()}
                          </Info>

                          <Info icon={<Wallet size={16} />} label="Payment">
                            {b.payment?.method} ({b.payment?.status})
                          </Info>

                          <Info icon={<Clock size={16} />} label="Booked">
                            {new Date(b.createdAt).toLocaleDateString()}
                          </Info>

                          <Info icon={<LayoutGrid size={16} />} label="Service">
                            {b.serviceType}
                          </Info>
                        </div>
                      </div>

                      <div className="lg:w-48 flex flex-col justify-between border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6">
                        <div>
                          <p className="text-[10px] uppercase text-slate-400">
                            Total
                          </p>
                          <p className="text-lg font-black text-[#183D8B]">
                            NPR {b.totalAmount.toLocaleString()}
                          </p>
                        </div>

                        {b.bookingStatus === "confirmed" && (
                          <button
                            onClick={() => handleCancel(b._id)}
                            className="mt-4 flex items-center justify-center gap-2 border rounded-xl py-2 text-sm font-bold hover:bg-red-50 text-red-600 transition-colors"
                          >
                            <Trash2 size={16} /> Cancel
                          </button>
                        )}

                        {b.bookingStatus === "completed" && (
                          <div className="mt-4 flex items-center justify-center gap-2 bg-slate-50 rounded-xl py-2 text-sm font-bold">
                            <CheckCircle2
                              size={16}
                              className="text-emerald-500"
                            />
                            Completed
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border-dashed border-4 rounded-3xl p-20 text-center">
              <PawPrint size={40} className="mx-auto text-slate-300 mb-4" />
              <h3 className="font-bold text-xl">No Bookings Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ label, children, icon }) {
  return (
    <div className="mt-1"> {/* Reduced top margin */}
      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase">
        {icon} {label}
      </div>
      <div className="ml-6 text-slate-800 text-sm font-medium">{children}</div>
    </div>
  );
}