import React from "react";

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
  return (
    <div className="flex w-full">
      
      {/* Left Image (same UI everywhere) */}
      <div className="w-1/2 border-r flex items-center justify-center p-4">
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

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-[#E6E6E6]"
            value={form.password}
            onChange={handleChange}
            required
          />

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
