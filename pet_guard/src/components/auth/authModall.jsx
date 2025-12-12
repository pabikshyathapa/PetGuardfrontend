// import React, { useState } from "react";
// // Assuming the other imports are correct for the full functionality
// import useAuthForm from "../../hooks/useAuthform";
// import { registerUser, loginUser } from "../../services/authService";

// const AuthModal = ({ type = "login", onClose, onLoginSuccess }) => {
//   // We keep the role state to pass it to the form after selection
//   const [role, setRole] = useState(""); // 'petowner' or 'shelter'
//   const [currentType, setCurrentType] = useState(type); // 'login' or 'register'

//   // The form state and logic are still necessary for the next step (login/register form)
//   const { form, handleChange, message, setMessage, resetForm } = useAuthForm({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const isLogin = currentType === "login";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isLogin) {
//         const res = await loginUser({
//           email: form.email,
//           password: form.password,
//         });
//         localStorage.setItem("token", res.data.token);
//         // Ensure 'role' is set before calling this
//         localStorage.setItem(
//           "user",
//           JSON.stringify({ ...res.data.data, role })
//         );
//         setMessage("Login successful!");
//         onLoginSuccess();
//       } else {
//         await registerUser({ ...form, role });
//         setMessage("Registration successful! You can login now.");
//         resetForm();
//         // Option: Automatically switch to login screen after successful registration
//         setCurrentType("login");
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error occurred");
//     }
//   };

//   // --- New State and Functionality to implement the Multi-Step Flow ---
//   const [step, setStep] = useState("choose"); // 'choose' or 'form'

//   const handleRoleSelect = (selectedRole) => {
//     setRole(selectedRole);
//     // Move to the actual login or register form based on the initial 'type' prop
//     setStep("form");
//   };

//   // Function to switch between Login/Register on the form screen
//   const toggleFormType = () => {
//     resetForm();
//     setMessage("");
//     setCurrentType(currentType === "login" ? "register" : "login");
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       {/* Container - using max-w-lg for a smaller, more focused modal like the image */}
//       <div className="bg-white rounded-lg w-full max-w-xl shadow-2xl overflow-hidden">
//         {/* Header Tabs (Login/Register) */}
//         <div className="flex bg-gray-100 border-b">
//           <button
//             className={`w-1/2 py-4 text-lg font-semibold transition ${
//               currentType === "login"
//                 ? "text-gray-500 bg-white hover:bg-gray-100"
//                 : "text-gray-500 hover:bg-gray-200"
//             }`}
//             onClick={() => {
//               setCurrentType("login");
//               setStep("choose");
//             }}
//           >
//             Login
//           </button>
//           <button
//             className={`w-1/2 py-4 text-lg font-semibold transition ${
//               currentType === "register"
//                 ? "text-[#183D8B] bg-[#F3F1EE] shadow-inner-t"
//                 : "text-gray-500 hover:bg-gray-200"
//             }`}
//             onClick={() => {
//               setCurrentType("register");
//               setStep("choose");
//             }}
//           >
//             Register
//           </button>
//         </div>

//         {/* Close Button */}
//         <button
//           className="absolute top-2 right-2 text-gray-500 text-2xl p-2 hover:text-gray-700 transition"
//           onClick={() => onClose()}
//           style={{ zIndex: 60 }} // Ensure close button is above content
//         >
//           &times;
//         </button>

//         {/* Choice Screen */}
//         {step === "choose" && (
//           <div className="flex">
//             {/* Left Visual Section */}
//             <div className="w-1/2 p-4 flex items-center justify-center border-r">
//               <img
//                 src={"/images/register.png"}
//                 alt="Pets"
//                 className="w-full h-auto object-cover rounded-lg"
//               />
//             </div>

//             {/* Right Functional Section */}
//             <div className="w-1/2 p-8 flex flex-col justify-center gap-6">
//               <h3 className="text-xl text-gray-700 font-medium">
//                 Register as:
//               </h3>

//               {/* Pet Owner Button */}
//               <button
//                 onClick={() => handleRoleSelect("petowner")}
//                 className="bg-[#183D8B] text-white p-4 rounded-lg shadow-md hover:bg-blue-900 transition text-left"
//               >
//                 <h4 className="text-xl font-bold">Pet Owner</h4>
//                 <p className="text-sm opacity-90 mt-1">
//                   Find trusted shelter and services
//                 </p>
//               </button>

//               {/* Shelter Home Button */}
//               <button
//                 onClick={() => handleRoleSelect("shelter")}
//                 className="bg-gray-200 text-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-300 transition text-left"
//               >
//                 <h4 className="text-xl font-bold">Shelter Home</h4>
//                 <p className="text-sm mt-1">Connect with pet owners</p>
//               </button>
//             </div>
//           </div>
//         )}

//         {/* --- LOGIN/REGISTER FORM SCREEN (Not in Image, but needed for functionality) --- */}
//         {step === "form" && (
//           <div className="p-8">
//             <h2 className="text-3xl font-bold mb-4 text-center">
//               {isLogin ? "Login" : "Register"} as{" "}
//               <span className="capitalize text-blue-700">{role}</span>
//             </h2>
//             {message && (
//               <p className="mb-4 text-center text-red-600 font-medium">
//                 {message}
//               </p>
//             )}

//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//               {!isLogin && (
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   className="p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                 />
//               )}
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 className="p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//               />
//               {!isLogin && (
//                 <input
//                   type="text"
//                   name="phone"
//                   placeholder="Phone (Optional)"
//                   className="p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                   value={form.phone}
//                   onChange={handleChange}
//                 />
//               )}
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 className="p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//               />

//               <button
//                 type="submit"
//                 className="bg-blue-600 text-white py-3 mt-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
//               >
//                 {isLogin ? "Login" : "Register"}
//               </button>
//             </form>

//             <p className="mt-5 text-center text-sm">
//               {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//               <span
//                 className="text-blue-500 cursor-pointer font-medium hover:text-blue-700 transition"
//                 onClick={toggleFormType}
//               >
//                 {isLogin ? "Register" : "Login"}
//               </span>
//               <span
//                 className="ml-3 text-gray-500 cursor-pointer font-medium hover:text-gray-700 transition"
//                 onClick={() => {
//                   setStep("choose");
//                   resetForm();
//                   setMessage("");
//                 }}
//               >
//                 (Change Role)
//               </span>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthModal;

// import React, { useState } from "react";
// // Assuming the other imports are correct for the full functionality
// import useAuthForm from "../../hooks/useAuthform";
// import { registerUser, loginUser } from "../../services/authService";

// // ** Image Path Placeholder **
// const IMAGE_PATH = "/images/register.png"; // Use your actual image path

// const AuthModal = ({ type = "login", onClose, onLoginSuccess }) => {
//   // We keep the role state to pass it to the form after selection
//   const [role, setRole] = useState(""); // 'petowner' or 'shelter'
//   const [currentType, setCurrentType] = useState(type); // 'login' or 'register'

//   // The form state and logic are still necessary for the next step (login/register form)
//   const { form, handleChange, message, setMessage, resetForm } = useAuthForm({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const isLogin = currentType === "login";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isLogin) {
//         const res = await loginUser({
//           email: form.email,
//           password: form.password,
//         });
//         localStorage.setItem("token", res.data.token);
//         // Ensure 'role' is set before calling this
//         localStorage.setItem(
//           "user",
//           JSON.stringify({ ...res.data.data, role })
//         );
//         setMessage("Login successful!");
//         onLoginSuccess();
//       } else {
//         await registerUser({ ...form, role });
//         setMessage("Registration successful! You can login now.");
//         resetForm();
//         // Option: Automatically switch to login screen after successful registration
//         setCurrentType("login");
//         setStep("form"); // Stay on form screen but switch to login view
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error occurred");
//     }
//   };

//   // --- New State and Functionality to implement the Multi-Step Flow ---
//   const [step, setStep] = useState("choose"); // 'choose' or 'form'

//   const handleRoleSelect = (selectedRole) => {
//     setRole(selectedRole);
//     // Move to the actual login or register form based on the initial 'type' prop
//     setStep("form");
//   };

//   // Function to switch between Login/Register on the form screen
//   const toggleFormType = () => {
//     resetForm();
//     setMessage("");
//     setCurrentType(currentType === "login" ? "register" : "login");
//   };

//   // Helper component for the Image/Visual side
//   const ImageSection = () => (
//     // The h-full and object-cover classes here are important to make the image fill the fixed height container
//     <div className="w-full h-full flex items-center justify-center p-4">
//         <img
//             src={IMAGE_PATH} // ** Image Path used here **
//             alt="Pets"
//             className="w-full h-full object-cover rounded-lg" 
//         />
//     </div>
//   );

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       {/* Container - We define the overall size here: max-w-lg to match form size, overflow-hidden for rounded corners */}
//       <div className="bg-white rounded-lg w-full max-w-4xl shadow-2xl overflow-hidden">
        
//         {/* Header Tabs (Login/Register) */}
//         <div className="flex bg-gray-100">
//           <button
//             className={`w-1/2 py-4 text-lg font-semibold transition ${
//               currentType === "login"
//                 ? "text-[#183D8B] bg-white shadow-inner" // Active tab styling
//                 : "text-gray-500 hover:bg-gray-100"
//             }`}
//             onClick={() => {
//               setCurrentType("login");
//               setStep("form"); 
//             }}
//           >
//             Login
//           </button>
//           <button
//             className={`w-1/2 py-4 text-lg font-semibold transition ${
//               currentType === "register"
//                 ? "text-[#183D8B] bg-white shadow-inner" // Active tab styling
//                 : "text-gray-500 hover:bg-gray-100"
//             }`}
//             onClick={() => {
//               setCurrentType("register");
//               setStep("form"); 
//             }}
//           >
//             Register
//           </button>
//         </div>

//         {/* Close Button */}
//         <button
//           className="absolute top-2 right-2 text-gray-500 text-2xl p-2 hover:text-gray-700 transition"
//           onClick={() => onClose()}
//           style={{ zIndex: 60 }} 
//         >
//           &times;
//         </button>

//         {/* --- CONTENT AREA: Apply a consistent height for visual uniformity --- */}
//         {/* Adjusted the height to a large fixed value (h-[500px]) to ensure both steps have the same visual size */}
//         <div className="flex h-[500px]"> 

//             {/* --- CHOICE SCREEN (Role Selection) --- */}
//             {step === "choose" && (
//                 <div className="flex w-full">
//                     {/* Left Visual Section */}
//                     <div className="w-1/2 h-full border-r">
//                         <ImageSection />
//                     </div>

//                     {/* Right Functional Section (Role Selection) */}
//                     <div className="w-1/2 p-8 flex flex-col justify-center gap-6">
//                       <h3 className="text-xl text-gray-700 font-medium">
//                         Register as:
//                       </h3>

//                       {/* Pet Owner Button */}
//                       <button
//                         onClick={() => handleRoleSelect("petowner")}
//                         className="bg-[#183D8B] text-white p-4 rounded-lg shadow-md hover:bg-blue-900 transition text-left"
//                       >
//                         <h4 className="text-xl font-bold">Pet Owner</h4>
//                         <p className="text-sm opacity-90 mt-1">
//                           Find trusted shelter and services
//                         </p>
//                       </button>

//                       {/* Shelter Home Button */}
//                       <button
//                         onClick={() => handleRoleSelect("shelter")}
//                         className="bg-gray-200 text-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-300 transition text-left"
//                       >
//                         <h4 className="text-xl font-bold">Shelter Home</h4>
//                         <p className="text-sm mt-1">Connect with pet owners</p>
//                       </button>
                      
//                       <p className="text-sm text-center mt-2">
//                         Already selected? <span 
//                             className="text-blue-500 cursor-pointer" 
//                             onClick={() => setStep("form")}
//                         >
//                             Go to {currentType}
//                         </span>
//                       </p>
//                     </div>
//                 </div>
//             )}

//             {/* --- LOGIN/REGISTER FORM SCREEN (Matches New Images) --- */}
//             {step === "form" && (
//                 // Use flex-row-reverse for login (form on left, image on right) and flex-row for register (image on left, form on right)
//                 <div className={`flex w-full ${isLogin ? "flex-row-reverse" : "flex-row"}`}>
                    
//                     {/* Form Section (W-1/2, always first in the reversed flex for login) */}
//                     <div className="w-1/2 p-8">
//                         <h3 className="text-xl font-medium mb-4">{isLogin ? "Login" : "Register"}</h3> 
                        
//                         {/* Message Area */}
//                         {message && (
//                             <p className="mb-4 text-center text-red-600 font-medium">{message}</p>
//                         )}

//                         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//                             {/* Register Fields */}
//                             {!isLogin && (
//                                 <>
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         placeholder="Full Name"
//                                         className="p-3 border-none rounded-lg bg-[#E6E6E6] placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
//                                         value={form.name}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         placeholder="Email"
//                                         className="p-3 border-none rounded-lg bg-[#E6E6E6] placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
//                                         value={form.email}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                     <input
//                                         type="text"
//                                         name="phone"
//                                         placeholder="Phone"
//                                         className="p-3 border-none rounded-lg bg-[#E6E6E6] placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
//                                         value={form.phone}
//                                         onChange={handleChange}
//                                     />
//                                     <input
//                                         type="password"
//                                         name="password"
//                                         placeholder="Create Password"
//                                         className="p-3 border-none rounded-lg bg-[#E6E6E6] placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
//                                         value={form.password}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </>
//                             )}
                            
//                             {/* Login Fields */}
//                             {isLogin && (
//                                 <>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         placeholder="Email"
//                                         className="p-3 border-none rounded-lg bg-[#E6E6E6] placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
//                                         value={form.email}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                     <input
//                                         type="password"
//                                         name="password"
//                                         placeholder="Password"
//                                         className="p-3 border-none rounded-lg bg-[#E6E6E6] placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
//                                         value={form.password}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </>
//                             )}

//                             <button
//                                 type="submit"
//                                 className="bg-[#183D8B] text-white py-3 mt-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
//                             >
//                                 {isLogin ? "Login" : "Register"}
//                             </button>
//                         </form>

//                         <p className="mt-4 text-sm text-left">
//                             {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//                             <span
//                                 className="text-blue-500 cursor-pointer font-medium hover:text-blue-700 transition"
//                                 onClick={toggleFormType}
//                             >
//                                 {isLogin ? "Register" : "Login"}
//                             </span>
//                         </p>
//                     </div>

//                     {/* Visual Section (W-1/2, always last in the reversed flex for login) */}
//                     <div className="w-1/2 h-full border-r">
//                         <ImageSection />
//                     </div>
//                 </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthModal;

import React, { useState } from "react";
// Assuming the other imports are correct for the full functionality
import useAuthForm from "../../hooks/useAuthform";
import { registerUser, loginUser } from "../../services/authService";

// ** Image Path Placeholder **
const IMAGE_PATH = "/images/register.png"; // Use your actual image path

const AuthModal = ({ type = "login", onClose, onLoginSuccess }) => {
  // We keep the role state to pass it to the form after selection
  const [role, setRole] = useState(""); // 'petowner' or 'shelter'
  const [currentType, setCurrentType] = useState(type); // 'login' or 'register'

  // The form state and logic are still necessary for the next step (login/register form)
  const { form, handleChange, message, setMessage, resetForm } = useAuthForm({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const isLogin = currentType === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await loginUser({
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", res.data.token);
        // Ensure 'role' is set before calling this
        localStorage.setItem(
          "user",
          JSON.stringify({ ...res.data.data, role })
        );
        setMessage("Login successful!");
        onLoginSuccess();
      } else {
        await registerUser({ ...form, role });
        setMessage("Registration successful! You can login now.");
        resetForm();
        // After successful registration, automatically switch to login view
        setCurrentType("login");
        setStep("form"); 
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  // --- New State and Functionality to implement the Multi-Step Flow ---
  const [step, setStep] = useState("choose"); // 'choose' or 'form'

  // *** CORRECTED LOGIC: Explicitly set to 'register' when selecting a role ***
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    // If the user selects a role, they are starting the registration process.
    setCurrentType("register"); 
    setStep("form");
  };

  // Function to switch between Login/Register on the form screen
  const toggleFormType = () => {
    resetForm();
    setMessage("");
    // When switching from login to register (or vice versa), reset the step back to choose 
    // if the role is not yet fully determined, or keep it on 'form' if we assume the role selection is persistent.
    // Given the UI, we should keep it on 'form' and only switch the currentType.
    setCurrentType(currentType === "login" ? "register" : "login");
  };

  // Helper component for the Image/Visual side
  const ImageSection = () => (
    <div className="w-full h-full flex items-center justify-center p-4">
        <img
            src={IMAGE_PATH} // ** Image Path used here **
            alt="Pets"
            className="w-full h-full object-cover rounded-lg" 
        />
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Container - We define the overall size here: max-w-lg to match form size, overflow-hidden for rounded corners */}
      <div className="bg-white rounded-lg w-full max-w-4xl shadow-2xl overflow-hidden">
        
        {/* Header Tabs (Login/Register) */}
        <div className="flex bg-gray-100">
          <button
            className={`w-1/2 py-4 text-lg font-semibold transition ${
              currentType === "login"
                ? "text-[#183D8B] bg-white shadow-inner" // Active tab styling
                : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => {
              setCurrentType("login");
              setStep("form"); 
            }}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-4 text-lg font-semibold transition ${
              currentType === "register"
                ? "text-[#183D8B] bg-white shadow-inner" // Active tab styling
                : "text-gray-500 hover:bg-gray-100"
            }`}
            onClick={() => {
              setCurrentType("register");
              setStep("form"); 
            }}
          >
            Register
          </button>
        </div>

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 text-2xl p-2 hover:text-gray-700 transition"
          onClick={() => onClose()}
          style={{ zIndex: 60 }} 
        >
          &times;
        </button>

        {/* --- CONTENT AREA: Apply a consistent height for visual uniformity --- */}
        <div className="flex h-[500px]"> 

            {/* --- CHOICE SCREEN (Role Selection) --- */}
            {step === "choose" && (
                <div className="flex w-full">
                    {/* Left Visual Section */}
                    <div className="w-1/2 h-full border-r">
                        <ImageSection />
                    </div>

                    {/* Right Functional Section (Role Selection) */}
                    <div className="w-1/2 p-8 flex flex-col justify-center gap-6">
                      <h3 className="text-xl text-gray-700 font-medium">
                        {currentType === "login" ? "Register as:" : "Register as:"}
                      </h3>

                      {/* Pet Owner Button */}
                      <button
                        onClick={() => handleRoleSelect("petowner")}
                        className="bg-[#183D8B] text-white p-4 rounded-lg shadow-md hover:bg-blue-900 transition text-left"
                      >
                        <h4 className="text-xl font-bold">Pet Owner</h4>
                        <p className="text-sm opacity-90 mt-1">
                          Find trusted shelter and services
                        </p>
                      </button>

                      {/* Shelter Home Button */}
                      <button
                        onClick={() => handleRoleSelect("shelter")}
                        className="bg-gray-200 text-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-300 transition text-left"
                      >
                        <h4 className="text-xl font-bold">Shelter Home</h4>
                        <p className="text-sm mt-1">Connect with pet owners</p>
                      </button>
                      
                      <p className="text-sm text-center mt-2">
                        Already have an account? <span 
                            className="text-blue-500 cursor-pointer" 
                            onClick={() => setStep("form")}
                        >
                            Go to {currentType}
                        </span>
                      </p>
                    </div>
                </div>
            )}

            {/* --- LOGIN/REGISTER FORM SCREEN (Matches New Images) --- */}
            {step === "form" && (
                <div className={`flex w-full ${isLogin ? "flex-row-reverse" : "flex-row"}`}>
                    
                    {/* Form Section */}
                    <div className="w-1/2 p-8">
                        <h3 className="text-xl font-medium mb-4">{isLogin ? "Login" : "Register"} as <span className="capitalize text-[#183D8B]">{role}</span></h3> 
                        
                        {/* Message Area */}
                        {message && (
                            <p className="mb-4 text-center text-red-600 font-medium">{message}</p>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            {/* Register Fields (shows Full Name, Phone) */}
                            {!isLogin && (
                                <>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        className="p-3 border-none rounded-lg bg-[#E6E6E6] placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="p-3 border-none rounded-lg bg-[#E6E6E6] placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        className="p-3 border-none rounded-lg bg-[#E6E6E6] placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Create Password"
                                        className="p-3 border-none rounded-lg bg-[#E6E6E6] placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </>
                            )}
                            
                            {/* Login Fields (shows Email, Password only) */}
                            {isLogin && (
                                <>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="p-3 border-none rounded-lg bg-[#E6E6E6] placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="p-3 border-none rounded-lg bg-[#E6E6E6] placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </>
                            )}

                            <button
                                type="submit"
                                className="bg-[#183D8B] text-white py-3 mt-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                            >
                                {isLogin ? "Login" : "Register"}
                            </button>
                        </form>

                        <p className="mt-4 text-sm text-left">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <span
                                className="text-blue-500 cursor-pointer font-medium hover:text-blue-700 transition"
                                onClick={toggleFormType}
                            >
                                {isLogin ? "Register" : "Login"}
                            </span>
                            {/* Added "Change Role" Link Back */}
                            <span
                                className="ml-3 text-gray-500 cursor-pointer font-medium hover:text-gray-700 transition"
                                onClick={() => {
                                    setStep("choose");
                                    resetForm();
                                    setMessage("");
                                    setRole(""); // Clear role when going back to choose screen
                                    // Do NOT change currentType here, let the tabs handle it on the choose screen if needed
                                }}
                            >
                                (Change Role)
                            </span>
                        </p>
                    </div>

                    {/* Visual Section */}
                    <div className={`w-1/2 h-full ${!isLogin ? 'border-r' : 'border-l'}`}>
                        <ImageSection />
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;