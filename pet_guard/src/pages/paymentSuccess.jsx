import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const ref = searchParams.get("ref");

  useEffect(() => {
    // Auto redirect after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 20000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Your booking has been confirmed. You will receive a confirmation email shortly.
        </p>

        {/* Transaction Details */}
        {ref && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Transaction Reference</p>
            <p className="font-mono text-lg font-semibold text-gray-800">{ref}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/profile")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Redirecting to your bookings in 20 seconds...
        </p>
      </div>
    </div>
  );
}

