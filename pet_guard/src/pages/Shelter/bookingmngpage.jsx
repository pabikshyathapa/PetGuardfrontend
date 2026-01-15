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
          className="text-[11px] bg-green-50 text-green-600 hover:underline font-semibold"
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
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
                <option value="cancelled">Cancelled</option>
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
                      {/* ✅ ADDED: ASSIGNED ROOMS */}
                      {b.roomAssignments?.length > 0 && (
                        <div className="sm:col-span-2">
                          <span className="text-[10px] font-bold uppercase text-gray-400 block">
                            Assigned Rooms
                          </span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {[
                              ...new Set(
                                b.roomAssignments.map((r) => r.roomNumber)
                              ),
                            ].map((room) => (
                              <span
                                key={room}
                                className="px-3 py-1 rounded-full text-xs font-bold 
                                       bg-blue-100 text-[#183D8B] 
                                       border border-blue-200"
                              >
                                Room {room}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Section: Payment & Actions */}
                  <div className="flex flex-col md:items-end justify-between border-t md:border-none pt-4 md:pt-0 gap-4">
                    <div className="flex items-center md:items-end gap-6 md:gap-4">
                      <div className="text-left md:text-right">
                        <span className="font-bold text-gray-400 uppercase text-[10px] block">
                          Total Amount
                        </span>
                        <p
                          className="text-2xl font-black leading-tight"
                          style={{ color: "#183D8B" }}
                        >
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
                            className="flex-1 bg-[#183D8B] text-white hover:bg-[#122e6b] px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
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
