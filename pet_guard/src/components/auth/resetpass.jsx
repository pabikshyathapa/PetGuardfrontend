import React, { useState } from "react";
import { Lock, Key, Eye, EyeOff } from "lucide-react";

const ResetPassword = ({ resetData, setResetData, handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#183D8B]">Set New Password</h2>
        <p className="text-gray-500 mt-2">
          Please enter the code sent to your email and your new password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Token Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 ml-1">
            Reset Token
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Key size={18} />
            </span>
            <input
              type="text"
              placeholder="Enter code"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#183D8B] focus:border-transparent outline-none transition-all"
              value={resetData.token}
              onChange={(e) =>
                setResetData({ ...resetData, token: e.target.value })
              }
              required
            />
          </div>
        </div>

        {/* New Password Input */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 ml-1">
            New Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Lock size={18} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-10 pr-12 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#183D8B] focus:border-transparent outline-none transition-all"
              value={resetData.newPassword}
              onChange={(e) =>
                setResetData({ ...resetData, newPassword: e.target.value })
              }
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}{" "}
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1 ml-1"></p>
        </div>

        <button
          type="submit"
          className="mt-2 bg-[#183D8B] hover:bg-[#122d66] text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-900/20 transform transition-all active:scale-[0.98]"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
