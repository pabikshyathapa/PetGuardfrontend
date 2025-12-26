import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const RegisterForm = ({
  form,
  message,
  handleChange,
  handleSubmit,
  toggleFormType,
  setStep,
  resetForm,
  setRole,
  role,
  IMAGE_PATH,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const onlyNums = value.replace(/[^0-9]/g, "");

    const mockEvent = {
      target: {
        name: "phone",
        value: onlyNums,
      },
    };
    handleChange(mockEvent);
  };
  return (
    <div className="flex w-full">
      {/* Left Image */}
      <div className="w-1/2 flex items-center justify-center p-4">
        <img
          src={IMAGE_PATH}
          alt="Register"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Right Form */}
      <div className="w-1/2 p-8 flex flex-col justify-center">
        <h3 className="text-xl font-medium mb-4">Register </h3>

        {message && <p className="text-red-600 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="p-3 rounded-lg bg-[#E6E6E6]"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-[#E6E6E6]"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="p-3 rounded-lg bg-[#E6E6E6]"
            value={form.phone}
            onChange={handlePhoneChange}
          />

          {/* Password Input with Eye Icon */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create Password"
              className="p-3 rounded-lg bg-[#E6E6E6] w-full pr-10" // added padding-right for icon
              value={form.password}
              onChange={handleChange}
              required
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
            </div>
          </div>

          <button className="bg-[#183D8B] text-white py-3 rounded-lg mt-3">
            Register
          </button>
        </form>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={toggleFormType}
          >
            Login
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

export default RegisterForm;
