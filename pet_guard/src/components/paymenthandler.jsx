import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5050/api/bookings";

const authConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export default function PendingPaymentCard({ booking, onUpdate }) {
  const [checking, setChecking] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Calculate time since booking was created
  useEffect(() => {
    const calculateTime = () => {
      const bookingTime = new Date(booking.createdAt).getTime();
      const now = Date.now();
      const elapsed = now - bookingTime;
      const tenMinutes = 10 * 60 * 1000;
      const remaining = tenMinutes - elapsed;

      if (remaining > 0) {
        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setTimeRemaining("Expired");
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [booking.createdAt]);

  const checkPaymentStatus = async () => {
    setChecking(true);
    try {
      const response = await axios.get(
        `${API_URL}/payment-status/${booking._id}`,
        authConfig()
      );

      if (response.data.status === "paid") {
        alert("✅ Payment verified! Your booking is confirmed.");
        onUpdate();
      } else if (response.data.status === "pending") {
        alert("⏳ Payment still pending. Please complete the payment.");
      } else {
        alert(`Payment status: ${response.data.status}`);
      }
    } catch (error) {
      console.error("Status check error:", error);
      alert("Failed to check payment status");
    } finally {
      setChecking(false);
    }
  };

  const cancelPendingPayment = async () => {
    if (!confirm("Are you sure you want to cancel this pending booking?")) {
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/cancel-pending/${booking._id}`,
        {},
        authConfig()
      );
      alert("Booking cancelled successfully");
      onUpdate();
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to cancel booking";
      alert(msg);
    }
  };

  const retryPayment = () => {
    // Redirect to eSewa again with the same booking
    alert("Please create a new booking to retry payment");
  };

  return (
    <div className="border-2 border-yellow-500 rounded-lg p-4 bg-yellow-50">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-800">
            {booking.shelter?.name || "Loading..."}
          </h3>
          <p className="text-sm text-gray-600">
            {booking.serviceType} • {booking.petCount} pet(s)
          </p>
        </div>
        <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-semibold">
          ⏳ Payment Pending
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <p className="text-gray-700">
          <strong>Amount:</strong> Rs {booking.totalAmount}
        </p>
        <p className="text-gray-700">
          <strong>Method:</strong> eSewa
        </p>
        <p className="text-gray-700">
          <strong>Booking ID:</strong> {booking._id}
        </p>
        {timeRemaining && (
          <p className="text-gray-700">
            <strong>Time to complete:</strong>{" "}
            <span className={timeRemaining === "Expired" ? "text-red-600" : "text-yellow-700"}>
              {timeRemaining}
            </span>
          </p>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={checkPaymentStatus}
          disabled={checking}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {checking ? "Checking..." : "Check Status"}
        </button>
        <button
          onClick={cancelPendingPayment}
          className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700"
        >
          Cancel
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-3 text-center">
        Complete your payment within 10 minutes or the booking will expire
      </p>
    </div>
  );
}