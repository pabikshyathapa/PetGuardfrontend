// import { useEffect, useState } from "react";
// import { getShelterBookings, markCashPaid, completeBooking } from "../../services/Shelter/shelterbooking";
// import BookingDetailsModal from "../../pages/Shelter/bookingdetail";
// import { useAuth } from "../../auth/AuthProvider";

// // Payment Badge Component with Mark Paid button
// const PaymentBadge = ({ payment, onMarkPaid }) => {
//   const colors = {
//     pending: "bg-yellow-100 text-yellow-700",
//     paid: "bg-green-100 text-green-700",
//   };

//   return (
//     <span className={`px-2 py-1 rounded text-sm font-medium ${colors[payment.status] || "bg-gray-100 text-gray-600"}`}>
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
//     if (!loading && user?.role === "shelter") loadBookings();
//   }, [user, loading]);

//   if (loading) return <p>Loading...</p>;
//   if (!user || user.role !== "shelter") return <p>Access denied</p>;

//   const handleMarkPaid = async (bookingId) => {
//     try {
//       await markCashPaid(bookingId);
//       loadBookings();
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

//       {bookings.length === 0 && <p className="text-gray-500">No bookings found</p>}

//       {bookings.map((b) => (
//         <div key={b._id} className="border p-4 rounded mb-3 shadow">
//           <p><strong>Service:</strong> {b.serviceType}</p>
//           <p><strong>Pets:</strong> {b.petCount}</p>
//           <p><strong>Dates:</strong> {new Date(b.startDate).toDateString()} – {new Date(b.endDate).toDateString()}</p>
//           <p><strong>Total:</strong> Rs {b.totalAmount}</p>

//           <p className="flex items-center gap-2">
//             <strong>Payment:</strong>
//             <PaymentBadge payment={b.payment} onMarkPaid={() => handleMarkPaid(b._id)} />
//           </p>

//           <p className="flex items-center gap-2">
//             <strong>Status:</strong>
//             <span className={`px-2 py-1 rounded text-sm font-medium ${b.bookingStatus === "completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
//               {b.bookingStatus.toUpperCase()}
//             </span>
//           </p>

//           <div className="flex gap-2 mt-2">
//             <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => setSelectedBooking(b._id)}>View</button>
//             {b.payment.status === "paid" && b.bookingStatus !== "completed" && (
//               <button className="bg-purple-600 text-white px-3 py-1 rounded" onClick={() => handleComplete(b._id)}>Complete</button>
//             )}
//           </div>
//         </div>
//       ))}

//       {selectedBooking && (
//         <BookingDetailsModal bookingId={selectedBooking} onClose={() => setSelectedBooking(null)} reload={loadBookings} />
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  getShelterBookings,
  markCashPaid,
  completeBooking,
} from "../../services/Shelter/shelterbooking";
import BookingDetailsModal from "../../pages/Shelter/bookingdetail";
import { useAuth } from "../../auth/AuthProvider";

// Payment Badge Component
const PaymentBadge = ({ payment, onMarkPaid }) => {
  const colors = {
    pending: "bg-yellow-100 text-yellow-700",
    paid: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-sm font-medium ${
        colors[payment.status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {payment.status.toUpperCase()}
      {payment.status === "pending" && (
        <button
          onClick={onMarkPaid}
          className="ml-2 bg-green-600 text-white px-2 py-0.5 rounded text-xs"
        >
          Mark Paid
        </button>
      )}
    </span>
  );
};

export default function ShelterBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { user, loading } = useAuth();

  const loadBookings = async () => {
    try {
      const res = await getShelterBookings();
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load bookings", err);
    }
  };

  useEffect(() => {
    if (!loading && user?.role === "shelter") {
      loadBookings();
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;
  if (!user || user.role !== "shelter") return <p>Access denied</p>;

  const handleMarkPaid = async (bookingId) => {
    try {
      await markCashPaid(bookingId);
      loadBookings(); // refresh immediately
    } catch (err) {
      console.error("Failed to mark payment as paid", err);
    }
  };

  const handleComplete = async (bookingId) => {
    try {
      await completeBooking(bookingId);
      loadBookings();
    } catch (err) {
      console.error("Failed to complete booking", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shelter Bookings</h2>

      {bookings.length === 0 && (
        <p className="text-gray-500">No bookings found</p>
      )}

      {bookings.map((b) => (
        <div key={b._id} className="border p-4 rounded mb-3 shadow">
          <p>
            <strong>Service:</strong> {b.serviceType}
          </p>
          <p>
            <strong>Pets:</strong> {b.petCount}
          </p>
          <p>
            <strong>Dates:</strong>{" "}
            {new Date(b.startDate).toDateString()} –{" "}
            {new Date(b.endDate).toDateString()}
          </p>
          <p>
            <strong>Total:</strong> Rs {b.totalAmount}
          </p>

          {/* Payment Method */}
          <p className="flex items-center gap-2">
            <strong>Payment Method:</strong>
            <span className="capitalize text-gray-700">
              {b.payment.method}
            </span>
          </p>

          {/* Payment Status */}
          <p className="flex items-center gap-2">
            <strong>Payment Status:</strong>
            <PaymentBadge
              payment={b.payment}
              onMarkPaid={() => handleMarkPaid(b._id)}
            />
          </p>

          {/* Booking Status */}
          <p className="flex items-center gap-2">
            <strong>Status:</strong>
            <span
              className={`px-2 py-1 rounded text-sm font-medium ${
                b.bookingStatus === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {b.bookingStatus.toUpperCase()}
            </span>
          </p>

          {/* Actions */}
          <div className="flex gap-2 mt-2">
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded"
              onClick={() => setSelectedBooking(b._id)}
            >
              View
            </button>

            {b.payment.status === "paid" &&
              b.bookingStatus !== "completed" && (
                <button
                  className="bg-purple-600 text-white px-3 py-1 rounded"
                  onClick={() => handleComplete(b._id)}
                >
                  Complete
                </button>
              )}
          </div>
        </div>
      ))}

      {selectedBooking && (
        <BookingDetailsModal
          bookingId={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          reload={loadBookings}
        />
      )}
    </div>
  );
}
