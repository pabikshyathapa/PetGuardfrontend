import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentFailed() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const status = searchParams.get("status");

  const getErrorMessage = () => {
    if (error === "no_data") return "No payment data received";
    if (error === "invalid_signature") return "Payment verification failed";
    if (error === "booking_not_found") return "Booking not found";
    if (error === "verification_failed") return "Payment verification failed";
    if (status) return `Payment status: ${status}`;
    return "Payment was not completed";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-2">
          {getErrorMessage()}
        </p>
        <p className="text-sm text-gray-500 mb-6">
          No charges have been made to your account.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </button>
        </div>

        {/* Support Info */}
        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-600">Need help?</p>
          <p className="text-sm text-blue-600 font-semibold mt-1">
            Contact Support
          </p>
        </div>
      </div>
    </div>
  );
}