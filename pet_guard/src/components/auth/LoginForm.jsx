import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const LoginForm = ({
  form,
  message,
  handleChange,
  handleSubmit,
  toggleFormType,
  setStep,
  resetForm,
  setRole,
  IMAGE_PATH,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex w-full">
      {/* Left Image  */}
      <div className="w-1/2  flex items-center justify-center p-4">
        <img
          src={IMAGE_PATH}
          alt="Login"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Right Form */}
      <div className="w-1/2 p-8 flex flex-col justify-center">
        <h3 className="text-xl font-medium mb-4">Login </h3>

        {message && <p className="text-red-600 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-[#E6E6E6]"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="p-3 rounded-lg bg-[#E6E6E6] w-full"
              value={form.password}
              onChange={handleChange}
              onPaste={(e) => e.preventDefault()}
              required
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </div>
          </div>

          <button className="bg-[#183D8B] text-white py-3 rounded-lg mt-3">
            Login
          </button>
        </form>

        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={toggleFormType}
          >
            Register
          </span>
        </p>

        <p
          className="text-gray-500 text-sm mt-2 cursor-pointer"
          onClick={() => {
            setStep("choose");
            resetForm();
            setRole("");
          }}
        >
          (Change Role)
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
