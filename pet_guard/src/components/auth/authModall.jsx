import React, { useState, useRef, useEffect } from "react";
import useAuthForm from "../../hooks/useAuthform";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../../services/authService";
import { useAuth } from "../../auth/AuthProvider";
import ChooseRole from "../../components/auth/chooseRole";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import ForgotPassword from "./forgotpass";
import ResetPassword from "./resetpass";
const IMAGE_PATH = "/images/register.png";

const AuthModal = ({ type = "login", onClose, onLoginSuccess }) => {
  const [role, setRole] = useState("");
  const [currentType, setCurrentType] = useState(type);
  const [step, setStep] = useState(type === "register" ? "choose" : "form");
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetData, setResetData] = useState({
    token: "",
    newPassword: "",
  });

  const modalRef = useRef(null);
  const { login } = useAuth();

  const { form, handleChange, message, setMessage, resetForm } = useAuthForm({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const isLogin = currentType === "login";

  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await loginUser({
          email: form.email,
          password: form.password,
        });

        const userData = res.data.data; // user info incl. role
        const token = res.data.token;

        // Save to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        // Update Auth Context immediately
        login(userData, token);

        setMessage("Login successful!");

        // Pass role to Header / parent
        if (onLoginSuccess) {
          onLoginSuccess(userData);
        }
      } else {
        // 🔹 Register flow
        await registerUser({ ...form, role });

        setMessage("Registration successful! You can login now.");
        resetForm();
        setCurrentType("login");
        setStep("form");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email: forgotEmail });
      // Optionally, auto-fill token for testing
      setResetData({ ...resetData, token: res.data.resetToken });
      setForgotEmail("");
      setStep("reset"); // go to reset form
    } catch (err) {
      console.log(err.response?.data?.message || "Forgot password failed");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(resetData); // sends {token, newPassword}
      setResetData({ token: "", newPassword: "" });
      setStep("form"); // back to login form
    } catch (err) {
      console.log(err.response?.data?.message || "Reset password failed");
    }
  };
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setCurrentType("register");
    setStep("form");
  };

  const toggleFormType = () => {
    resetForm();
    setMessage("");
    if (currentType === "login") {
      setCurrentType("register");
      setStep("choose");
    } else {
      setCurrentType("login");
      setStep("form");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-4xl shadow-2xl overflow-hidden relative"
      >
        <div className="flex bg-gray-100">
          <button
            className={`w-1/2 py-4 font-semibold ${
              currentType === "login"
                ? "text-[#183D8B] bg-white shadow-inner"
                : "text-gray-500"
            }`}
            onClick={() => {
              setCurrentType("login");
              setStep("form");
            }}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-4 font-semibold ${
              currentType === "register"
                ? "text-[#183D8B] bg-white shadow-inner"
                : "text-gray-500"
            }`}
            onClick={() => {
              setCurrentType("register");
              setStep("choose");
            }}
          >
            Register
          </button>
        </div>

        <div className="flex h-[500px]">
          {step === "choose" && (
            <ChooseRole IMAGE_PATH={IMAGE_PATH} onSelect={handleRoleSelect} />
          )}
          {step === "forgot" && (
            <div className="flex w-full items-center justify-center">
              <ForgotPassword
                email={forgotEmail}
                setEmail={setForgotEmail}
                handleSubmit={handleForgotPassword}
              />
            </div>
          )}

          {step === "reset" && (
            <div className="flex w-full items-center justify-center">
              <ResetPassword
                resetData={resetData}
                setResetData={setResetData}
                handleSubmit={handleResetPassword}
              />
            </div>
          )}

          {step === "form" &&
            (isLogin ? (
              <LoginForm
                form={form}
                message={message}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                toggleFormType={toggleFormType}
                setStep={setStep}
                resetForm={resetForm}
                setRole={setRole}
                IMAGE_PATH={IMAGE_PATH}
              />
            ) : (
              <RegisterForm
                form={form}
                message={message}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                toggleFormType={toggleFormType}
                setStep={setStep}
                resetForm={resetForm}
                setRole={setRole}
                role={role}
                IMAGE_PATH={IMAGE_PATH}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
