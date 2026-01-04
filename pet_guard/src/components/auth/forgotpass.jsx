import React from "react";
import { Mail, ArrowLeft } from "lucide-react"; // Optional: Using lucide-react for icons

const ForgotPassword = ({ email, setEmail, handleSubmit, onBack }) => {
  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#183D8B]">Forgot Password?</h2>
        <p className="text-gray-500 mt-2">
          No worries, we'll send you reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
            Email Address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Mail size={18} />
            </span>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#183D8B] focus:border-transparent outline-none transition-all duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <button 
          type="submit"
          className="bg-[#183D8B] hover:bg-[#122d66] text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-900/20 transform transition-all active:scale-[0.98]"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;