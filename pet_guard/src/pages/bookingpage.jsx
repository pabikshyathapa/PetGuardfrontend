// // // import { useState, useEffect } from "react";
// // // import { useParams, useNavigate } from "react-router-dom";
// // // import { useAuth } from "../auth/AuthProvider";
// // // import axios from "axios";
// // // import { getPets } from "../services/petowner/petProfile";

// // // const API_URL = "http://localhost:5050/api/bookings";
// // // const SHELTER_URL = "http://localhost:5050/api/shelters";
// // // const IMAGE_URL = "http://localhost:5050/uploads";

// // // const authConfig = () => ({
// // //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// // // });

// // // export default function BookingPage() {
// // //   const { id } = useParams();
// // //   const { user, loading } = useAuth();
// // //   const navigate = useNavigate();

// // //   const [shelter, setShelter] = useState(null);
// // //   const [pets, setPets] = useState([]);
// // //   const [selectedPets, setSelectedPets] = useState([]);
// // //   const [serviceType, setServiceType] = useState("boarding");
// // //   const [startDate, setStartDate] = useState("");
// // //   const [endDate, setEndDate] = useState("");
// // //   const [totalAmount, setTotalAmount] = useState(0);
// // //   const [loadingPets, setLoadingPets] = useState(true);
// // //   const [paymentMethod, setPaymentMethod] = useState("cash");
// // //   const [isSubmitting, setIsSubmitting] = useState(false);

// // //   useEffect(() => {
// // //     if (!user) return;
// // //     axios
// // //       .get(`${SHELTER_URL}/${id}`, authConfig())
// // //       .then((res) => setShelter(res.data))
// // //       .catch((err) => {
// // //         console.error("Failed to fetch shelter:", err);
// // //         alert("Failed to load shelter details");
// // //       });
// // //   }, [id, user]);

// // //   useEffect(() => {
// // //     const fetchPets = async () => {
// // //       try {
// // //         if (user?.pets?.length) {
// // //           setPets(user.pets);
// // //         } else {
// // //           const data = await getPets();
// // //           setPets(data || []);
// // //         }
// // //       } catch (err) {
// // //         console.error("Failed to fetch pets:", err);
// // //       } finally {
// // //         setLoadingPets(false);
// // //       }
// // //     };

// // //     if (!loading) fetchPets();
// // //   }, [user, loading]);

// // //   useEffect(() => {
// // //     if (!shelter) return;
// // //     const days =
// // //       serviceType === "boarding" && startDate && endDate
// // //         ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1
// // //         : 1;
// // //     setTotalAmount(days * (shelter.pricePerDay || 0) * selectedPets.length);
// // //   }, [serviceType, startDate, endDate, selectedPets, shelter]);

// // //   const togglePetSelection = (petId) => {
// // //     setSelectedPets((prev) =>
// // //       prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]
// // //     );
// // //   };

// // //   const redirectToEsewa = (paymentData) => {
// // //     console.log("=== eSewa Redirect Data ===");
// // //     console.log("URL:", paymentData.esewa_url);
// // //     console.log("Amount:", paymentData.amount);
// // //     console.log("Total Amount:", paymentData.total_amount);
// // //     console.log("Transaction UUID:", paymentData.transaction_uuid);
// // //     console.log("Product Code:", paymentData.product_code);
// // //     console.log("Signature:", paymentData.signature);
// // //     console.log("Success URL:", paymentData.success_url);
// // //     console.log("Failure URL:", paymentData.failure_url);
// // //     console.log("===========================");

// // //     const form = document.createElement("form");
// // //     form.method = "POST";
// // //     form.action = paymentData.esewa_url;
// // //     form.style.display = "none";

// // //     const fields = {
// // //       amount: paymentData.amount,
// // //       tax_amount: paymentData.tax_amount,
// // //       total_amount: paymentData.total_amount,
// // //       transaction_uuid: paymentData.transaction_uuid,
// // //       product_code: paymentData.product_code,
// // //       product_service_charge: paymentData.product_service_charge,
// // //       product_delivery_charge: paymentData.product_delivery_charge,
// // //       success_url: paymentData.success_url,
// // //       failure_url: paymentData.failure_url,
// // //       signed_field_names: paymentData.signed_field_names,
// // //       signature: paymentData.signature,
// // //     };

// // //     // Verify all fields are present
// // //     Object.entries(fields).forEach(([key, value]) => {
// // //       if (value === undefined || value === null) {
// // //         console.error(`Missing field: ${key}`);
// // //       }
// // //       const input = document.createElement("input");
// // //       input.type = "hidden";
// // //       input.name = key;
// // //       input.value = String(value || "");
// // //       form.appendChild(input);
// // //     });

// // //     document.body.appendChild(form);
    
// // //     console.log("Form HTML:", form.innerHTML);
// // //     console.log("Submitting form to eSewa...");
    
// // //     form.submit();
// // //   };

// // //   const handleBooking = async () => {
// // //     if (!selectedPets.length) {
// // //       return alert("Please select at least one pet");
// // //     }

// // //     if (!startDate) {
// // //       return alert("Please select a start date");
// // //     }

// // //     if (serviceType === "boarding" && !endDate) {
// // //       return alert("Please select an end date for boarding");
// // //     }

// // //     if (serviceType === "boarding" && new Date(endDate) < new Date(startDate)) {
// // //       return alert("End date cannot be before start date");
// // //     }

// // //     setIsSubmitting(true);

// // //     const bookingData = {
// // //       shelterId: id,
// // //       serviceType,
// // //       startDate,
// // //       endDate: serviceType === "daycare" ? startDate : endDate,
// // //       pets: pets
// // //         .filter((p) => selectedPets.includes(p._id))
// // //         .map((p) => ({
// // //           petName: p.petName,
// // //           location: p.location,
// // //           type: p.type,
// // //           breed: p.breed,
// // //           gender: p.gender,
// // //           age: p.age,
// // //           weight: p.weight,
// // //           health: p.health,
// // //           characteristics: p.characteristics,
// // //           emergencyContact: p.emergencyContact,
// // //           photo: p.photo,
// // //         })),
// // //       pricePerDay: shelter.pricePerDay,
// // //       paymentMethod,
// // //     };

// // //     console.log(" Booking Data:", bookingData);

// // //     try {
// // //       const response = await axios.post(API_URL, bookingData, authConfig());
// // //       console.log(" Booking Response:", response.data);

// // //       if (response.data.isEsewa) {
// // //         console.log("Redirecting to eSewa payment gateway...");
// // //         setTimeout(() => {
// // //           redirectToEsewa(response.data.paymentData);
// // //         }, 100);
// // //       } else {
// // //         // alert(" Booking successful! Please pay at the shelter.");
// // //         navigate("/payment-success");
// // //       }
// // //     } catch (err) {
// // //       console.error(" Booking error:", err);
// // //       console.error("Error response:", err.response?.data);
// // //       const errorMsg = err.response?.data?.message || "Booking failed. Please try again.";
// // //       alert(errorMsg);
// // //       setIsSubmitting(false);
// // //     }
// // //   };

// // //   if (loading || loadingPets) {
// // //     return (
// // //       <div className="h-screen flex items-center justify-center">
// // //         <p className="text-xl font-bold text-[#183D8B] animate-pulse">Loading...</p>
// // //       </div>
// // //     );
// // //   }

// // //   if (!user) return <p className="text-center p-10">User not found. Please login.</p>;
// // //   if (!shelter) return <p className="text-center p-10">Loading shelter details...</p>;

// // //   return (
// // //     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
// // //       <h2 className="text-3xl font-bold mb-4 text-[#183D8B]">{shelter.name}</h2>

// // //       <div className="mb-6 border p-4 rounded-lg bg-gray-50">
// // //         <p className="mb-1 text-gray-700">
// // //           <strong> Location:</strong> {shelter.location}
// // //         </p>
// // //         <p className="mb-1 text-gray-700">
// // //           <strong>Price per Day:</strong> Rs {shelter.pricePerDay}
// // //         </p>
// // //         <p className="text-gray-700">
// // //           <strong>Availability:</strong>{" "}
// // //           <span className={shelter.status ? "text-green-600" : "text-red-600"}>
// // //             {shelter.status ? "Available" : "Not Available"}
// // //           </span>
// // //         </p>
// // //       </div>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// // //         <div>
// // //           <label className="block font-semibold mb-2">Service Type</label>
// // //           <select
// // //             value={serviceType}
// // //             onChange={(e) => setServiceType(e.target.value)}
// // //             className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
// // //             disabled={isSubmitting}
// // //           >
// // //             <option value="boarding">Boarding (Overnight)</option>
// // //             <option value="daycare">Daycare (Single Day)</option>
// // //           </select>
// // //         </div>

// // //         <div>
// // //           <label className="block font-semibold mb-2">Payment Method</label>
// // //           <select
// // //             value={paymentMethod}
// // //             onChange={(e) => setPaymentMethod(e.target.value)}
// // //             className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
// // //             disabled={isSubmitting}
// // //           >
// // //             <option value="cash">Cash (Pay at Shelter)</option>
// // //             <option value="esewa">eSewa (Pay Online Now)</option>
// // //           </select>
// // //         </div>
// // //       </div>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// // //         <div>
// // //           <label className="block font-semibold mb-2">Start Date</label>
// // //           <input
// // //             type="date"
// // //             value={startDate}
// // //             onChange={(e) => setStartDate(e.target.value)}
// // //             min={new Date().toISOString().split("T")[0]}
// // //             className="w-full border p-2 rounded"
// // //             disabled={isSubmitting}
// // //           />
// // //         </div>
// // //         {serviceType === "boarding" && (
// // //           <div>
// // //             <label className="block font-semibold mb-2">End Date</label>
// // //             <input
// // //               type="date"
// // //               value={endDate}
// // //               onChange={(e) => setEndDate(e.target.value)}
// // //               min={startDate || new Date().toISOString().split("T")[0]}
// // //               className="w-full border p-2 rounded"
// // //               disabled={isSubmitting}
// // //             />
// // //           </div>
// // //         )}
// // //       </div>

// // //       <div className="mb-8">
// // //         <h3 className="text-xl font-bold mb-4 text-gray-800">Select Your Pets</h3>
// // //         {pets?.length > 0 ? (
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //             {pets.map((pet) => {
// // //               const isSelected = selectedPets.includes(pet._id);
// // //               return (
// // //                 <div
// // //                   key={pet._id}
// // //                   onClick={() => !isSubmitting && togglePetSelection(pet._id)}
// // //                   className={`border-2 p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all ${
// // //                     isSelected
// // //                       ? "border-blue-600 bg-blue-50"
// // //                       : "border-gray-200 hover:border-gray-300 bg-white"
// // //                   } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
// // //                 >
// // //                   <img
// // //                     src={pet.photo ? `${IMAGE_URL}/${pet.photo}` : "/default-pet.png"}
// // //                     alt={pet.petName}
// // //                     className="w-16 h-16 rounded-full object-cover border"
// // //                   />
// // //                   <div className="flex-1">
// // //                     <p className="font-bold text-gray-800">{pet.petName}</p>
// // //                     <p className="text-sm text-gray-500">
// // //                       {pet.type} • {pet.breed}
// // //                     </p>
// // //                   </div>
// // //                   {isSelected && (
// // //                     <div className="bg-blue-600 rounded-full p-1 text-white">✓</div>
// // //                   )}
// // //                 </div>
// // //               );
// // //             })}
// // //           </div>
// // //         ) : (
// // //           <p className="text-red-500">Add pets to your profile first.</p>
// // //         )}
// // //       </div>

// // //       <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
// // //         <p className="text-2xl font-black">
// // //           Total: <span className="text-blue-600">Rs {totalAmount}</span>
// // //         </p>
// // //         <button
// // //           onClick={handleBooking}
// // //           disabled={!selectedPets.length || isSubmitting}
// // //           className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
// // //         >
// // //           {isSubmitting
// // //             ? "Processing..."
// // //             : paymentMethod === "esewa"
// // //             ? "Pay with eSewa"
// // //             : "Confirm Cash Booking"}
// // //         </button>
// // //       </div>

// // //       {paymentMethod === "esewa" && (
// // //         <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
// // //           <p className="text-sm font-bold text-blue-900 mb-3">
// // //             📱 eSewa Test Login Instructions:
// // //           </p>
// // //           <div className="space-y-2 text-sm text-gray-800">
// // //             <div className="flex items-start gap-2">
// // //               <span className="font-bold text-blue-600">Step 1:</span>
// // //               <div>
// // //                 <p>Enter eSewa ID: <code className="bg-white px-2 py-1 rounded">9806800002</code></p>
// // //                 <p className="text-xs text-gray-600 mt-1">
// // //                   (Try 9806800001, 002, 003, 004, or 005 if one doesn't work)
// // //                 </p>
// // //               </div>
// // //             </div>
// // //             <div className="flex items-start gap-2">
// // //               <span className="font-bold text-blue-600">Step 2:</span>
// // //               <p>Enter Password: <code className="bg-white px-2 py-1 rounded">Nepal@123</code></p>
// // //             </div>
// // //             <div className="flex items-start gap-2">
// // //               <span className="font-bold text-blue-600">Step 3:</span>
// // //               <p>Enter Token/OTP: <code className="bg-white px-2 py-1 rounded">123456</code></p>
// // //             </div>
// // //           </div>
// // //           <div className="mt-3 p-3 bg-yellow-100 rounded border border-yellow-300">
// // //             <p className="text-xs font-semibold text-yellow-900">
// // //               ⚠️ Important: Do NOT use MPIN (1122) - that's for mobile app only!
// // //             </p>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // import { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useAuth } from "../auth/AuthProvider";
// // import axios from "axios";
// // import { getPets } from "../services/petowner/petProfile";

// // const API_URL = "http://localhost:5050/api/bookings";
// // const SHELTER_URL = "http://localhost:5050/api/shelters";
// // const IMAGE_URL = "http://localhost:5050/uploads";

// // const authConfig = () => ({
// //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// // });

// // export default function BookingPage() {
// //   const { id } = useParams();
// //   const { user, loading } = useAuth();
// //   const navigate = useNavigate();

// //   const [shelter, setShelter] = useState(null);
// //   const [pets, setPets] = useState([]);
// //   const [selectedPets, setSelectedPets] = useState([]);
// //   const [serviceType, setServiceType] = useState("boarding");
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");
// //   const [totalAmount, setTotalAmount] = useState(0);
// //   const [loadingPets, setLoadingPets] = useState(true);
// //   const [paymentMethod, setPaymentMethod] = useState("cash");
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   useEffect(() => {
// //     if (!user) return;
// //     axios
// //       .get(`${SHELTER_URL}/${id}`, authConfig())
// //       .then((res) => setShelter(res.data))
// //       .catch((err) => {
// //         console.error("Failed to fetch shelter:", err);
// //         alert("Failed to load shelter details");
// //       });
// //   }, [id, user]);

// //   useEffect(() => {
// //     const fetchPets = async () => {
// //       try {
// //         if (user?.pets?.length) {
// //           setPets(user.pets);
// //         } else {
// //           const data = await getPets();
// //           setPets(data || []);
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch pets:", err);
// //       } finally {
// //         setLoadingPets(false);
// //       }
// //     };

// //     if (!loading) fetchPets();
// //   }, [user, loading]);

// //   useEffect(() => {
// //     if (!shelter) return;
// //     const days =
// //       serviceType === "boarding" && startDate && endDate
// //         ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1
// //         : 1;
// //     setTotalAmount(days * (shelter.pricePerDay || 0) * selectedPets.length);
// //   }, [serviceType, startDate, endDate, selectedPets, shelter]);

// //   const togglePetSelection = (petId) => {
// //     setSelectedPets((prev) =>
// //       prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]
// //     );
// //   };

// //   const redirectToEsewa = (paymentData) => {
// //     const form = document.createElement("form");
// //     form.method = "POST";
// //     form.action = paymentData.esewa_url;
// //     form.style.display = "none";

// //     const fields = {
// //       amount: paymentData.amount,
// //       tax_amount: paymentData.tax_amount,
// //       total_amount: paymentData.total_amount,
// //       transaction_uuid: paymentData.transaction_uuid,
// //       product_code: paymentData.product_code,
// //       product_service_charge: paymentData.product_service_charge,
// //       product_delivery_charge: paymentData.product_delivery_charge,
// //       success_url: paymentData.success_url,
// //       failure_url: paymentData.failure_url,
// //       signed_field_names: paymentData.signed_field_names,
// //       signature: paymentData.signature,
// //     };

// //     Object.entries(fields).forEach(([key, value]) => {
// //       const input = document.createElement("input");
// //       input.type = "hidden";
// //       input.name = key;
// //       input.value = String(value || "");
// //       form.appendChild(input);
// //     });

// //     document.body.appendChild(form);
// //     form.submit();
// //   };

// //   const handleBooking = async () => {
// //     if (!selectedPets.length) return alert("Please select at least one pet");
// //     if (!startDate) return alert("Please select a start date");
// //     if (serviceType === "boarding" && !endDate) return alert("Please select an end date");
// //     if (serviceType === "boarding" && new Date(endDate) < new Date(startDate)) {
// //       return alert("End date cannot be before start date");
// //     }

// //     setIsSubmitting(true);

// //     const bookingData = {
// //       shelterId: id,
// //       serviceType,
// //       startDate,
// //       endDate: serviceType === "daycare" ? startDate : endDate,
// //       pets: pets
// //         .filter((p) => selectedPets.includes(p._id))
// //         .map((p) => ({
// //           petName: p.petName,
// //           location: p.location,
// //           type: p.type,
// //           breed: p.breed,
// //           gender: p.gender,
// //           age: p.age,
// //           weight: p.weight,
// //           health: p.health,
// //           characteristics: p.characteristics,
// //           emergencyContact: p.emergencyContact,
// //           photo: p.photo,
// //         })),
// //       pricePerDay: shelter.pricePerDay,
// //       paymentMethod,
// //     };

// //     try {
// //       const response = await axios.post(API_URL, bookingData, authConfig());
// //       if (response.data.isEsewa) {
// //         setTimeout(() => redirectToEsewa(response.data.paymentData), 100);
// //       } else {
// //         navigate("/payment-success");
// //       }
// //     } catch (err) {
// //       const errorMsg = err.response?.data?.message || "Booking failed.";
// //       alert(errorMsg);
// //       setIsSubmitting(false);
// //     }
// //   };

// //   if (loading || loadingPets) {
// //     return (
// //       <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
// //         <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
// //         <p className="text-xl font-medium text-gray-600">Preparing your booking...</p>
// //       </div>
// //     );
// //   }

// //   if (!user) return <p className="text-center p-10">User not found. Please login.</p>;
// //   if (!shelter) return <p className="text-center p-10">Loading shelter details...</p>;

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-12 px-4">
// //       <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
// //         {/* Header Section */}
// //         <div className="bg-[#183D8B] p-8 text-white">
// //           <h2 className="text-3xl font-bold mb-2">{shelter.name}</h2>
// //           <div className="flex flex-wrap gap-4 text-blue-100">
// //             <p className="flex items-center gap-1">📍 {shelter.location}</p>
// //             <p className="flex items-center gap-1">💰 Rs {shelter.pricePerDay} / day</p>
// //           </div>
// //         </div>

// //         <div className="p-8">
// //           {/* Service & Payment Selection */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
// //             <div className="space-y-2">
// //               <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Service Type</label>
// //               <select
// //                 value={serviceType}
// //                 onChange={(e) => setServiceType(e.target.value)}
// //                 className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-blue-500 outline-none transition-all bg-gray-50"
// //                 disabled={isSubmitting}
// //               >
// //                 <option value="boarding">🏠 Boarding (Overnight)</option>
// //                 <option value="daycare">☀️ Daycare (Single Day)</option>
// //               </select>
// //             </div>

// //             <div className="space-y-2">
// //               <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Payment Method</label>
// //               <select
// //                 value={paymentMethod}
// //                 onChange={(e) => setPaymentMethod(e.target.value)}
// //                 className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-blue-500 outline-none transition-all bg-gray-50"
// //                 disabled={isSubmitting}
// //               >
// //                 <option value="cash">💵 Cash (Pay at Shelter)</option>
// //                 <option value="esewa">📱 eSewa (Online Payment)</option>
// //               </select>
// //             </div>
// //           </div>

// //           {/* Date Selection */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 p-6 bg-blue-50 rounded-2xl">
// //             <div className="space-y-2">
// //               <label className="text-sm font-bold text-blue-800 uppercase tracking-wider">Start Date</label>
// //               <input
// //                 type="date"
// //                 value={startDate}
// //                 onChange={(e) => setStartDate(e.target.value)}
// //                 min={new Date().toISOString().split("T")[0]}
// //                 className="w-full border-none p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
// //                 disabled={isSubmitting}
// //               />
// //             </div>
// //             {serviceType === "boarding" && (
// //               <div className="space-y-2">
// //                 <label className="text-sm font-bold text-blue-800 uppercase tracking-wider">End Date</label>
// //                 <input
// //                   type="date"
// //                   value={endDate}
// //                   onChange={(e) => setEndDate(e.target.value)}
// //                   min={startDate || new Date().toISOString().split("T")[0]}
// //                   className="w-full border-none p-3 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
// //                   disabled={isSubmitting}
// //                 />
// //               </div>
// //             )}
// //           </div>

// //           {/* Pet Selection */}
// //           <div className="mb-10">
// //             <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
// //               🐾 Select Your Pets <span className="text-sm font-normal text-gray-500">({selectedPets.length} selected)</span>
// //             </h3>
// //             {pets?.length > 0 ? (
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                 {pets.map((pet) => {
// //                   const isSelected = selectedPets.includes(pet._id);
// //                   return (
// //                     <div
// //                       key={pet._id}
// //                       onClick={() => !isSubmitting && togglePetSelection(pet._id)}
// //                       className={`group relative border-2 p-4 rounded-2xl cursor-pointer flex items-center gap-4 transition-all duration-200 ${
// //                         isSelected
// //                           ? "border-blue-600 bg-blue-50 ring-4 ring-blue-50"
// //                           : "border-gray-100 hover:border-blue-200 bg-white"
// //                       } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
// //                     >
// //                       <img
// //                         src={pet.photo ? `${IMAGE_URL}/${pet.photo}` : "/default-pet.png"}
// //                         alt={pet.petName}
// //                         className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-sm"
// //                       />
// //                       <div className="flex-1">
// //                         <p className={`font-bold ${isSelected ? "text-blue-900" : "text-gray-800"}`}>{pet.petName}</p>
// //                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-tight">
// //                           {pet.type} • {pet.breed}
// //                         </p>
// //                       </div>
// //                       <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
// //                         isSelected ? "bg-blue-600 border-blue-600" : "border-gray-200 group-hover:border-blue-300"
// //                       }`}>
// //                         {isSelected && <span className="text-white text-xs">✓</span>}
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             ) : (
// //               <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500">
// //                 No pets found. Please add a pet to your profile.
// //               </div>
// //             )}
// //           </div>

// //           {/* eSewa Instructions */}
// //           {paymentMethod === "esewa" && (
// //             <div className="mb-10 p-6 bg-amber-50 border border-amber-200 rounded-2xl relative overflow-hidden">
// //                <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl font-bold">eSewa</div>
// //               <p className="text-sm font-bold text-amber-900 mb-4 flex items-center gap-2">
// //                 💡 Sandbox Credentials (Test Mode)
// //               </p>
// //               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
// //                 <div className="p-3 bg-white rounded-xl shadow-sm">
// //                   <span className="block text-xs text-gray-500 font-bold uppercase mb-1">ID</span>
// //                   <code className="text-amber-700">9806800002</code>
// //                 </div>
// //                 <div className="p-3 bg-white rounded-xl shadow-sm">
// //                   <span className="block text-xs text-gray-500 font-bold uppercase mb-1">Password</span>
// //                   <code className="text-amber-700">Nepal@123</code>
// //                 </div>
// //                 <div className="p-3 bg-white rounded-xl shadow-sm">
// //                   <span className="block text-xs text-gray-500 font-bold uppercase mb-1">OTP</span>
// //                   <code className="text-amber-700">123456</code>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Footer Actions */}
// //           <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
// //             <div className="text-center md:text-left">
// //               <p className="text-sm text-gray-500 font-bold uppercase">Estimated Total</p>
// //               <p className="text-4xl font-black text-[#183D8B]">
// //                 Rs {totalAmount}
// //               </p>
// //             </div>
            
// //             <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
// //               <button
// //                 type="button"
// //                 onClick={() => navigate(-1)}
// //                 className="px-8 py-4 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
// //                 disabled={isSubmitting}
// //               >
// //                 Cancel
// //               </button>
              
// //               <button
// //                 onClick={handleBooking}
// //                 disabled={!selectedPets.length || isSubmitting}
// //                 className="bg-[#183D8B] text-white px-12 py-4 rounded-xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 disabled:bg-gray-300 disabled:shadow-none transition-all flex items-center justify-center gap-2"
// //               >
// //                 {isSubmitting ? (
// //                   <>
// //                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                     Processing...
// //                   </>
// //                 ) : (
// //                   paymentMethod === "esewa" ? "Pay with eSewa" : "Confirm Booking"
// //                 )}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthProvider";
// import axios from "axios";
// import { getPets } from "../services/petowner/petProfile";
// // Import Icons from Lucide
// import { 
//   MapPin, 
//   Calendar, 
//   CreditCard, 
//   Banknote, 
//   CheckCircle2, 
//   Info, 
//   ArrowLeft, 
//   PawPrint,
//   Loader2,
//   ChevronRight
// } from "lucide-react";

// const API_URL = "http://localhost:5050/api/bookings";
// const SHELTER_URL = "http://localhost:5050/api/shelters";
// const IMAGE_URL = "http://localhost:5050/uploads";

// const authConfig = () => ({
//   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// });

// export default function BookingPage() {
//   const { id } = useParams();
//   const { user, loading } = useAuth();
//   const navigate = useNavigate();

//   const [shelter, setShelter] = useState(null);
//   const [pets, setPets] = useState([]);
//   const [selectedPets, setSelectedPets] = useState([]);
//   const [serviceType, setServiceType] = useState("boarding");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [loadingPets, setLoadingPets] = useState(true);
//   const [paymentMethod, setPaymentMethod] = useState("cash");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (!user) return;
//     axios
//       .get(`${SHELTER_URL}/${id}`, authConfig())
//       .then((res) => setShelter(res.data))
//       .catch((err) => {
//         console.error("Failed to fetch shelter:", err);
//         alert("Failed to load shelter details");
//       });
//   }, [id, user]);

//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         if (user?.pets?.length) {
//           setPets(user.pets);
//         } else {
//           const data = await getPets();
//           setPets(data || []);
//         }
//       } catch (err) {
//         console.error("Failed to fetch pets:", err);
//       } finally {
//         setLoadingPets(false);
//       }
//     };

//     if (!loading) fetchPets();
//   }, [user, loading]);

//   useEffect(() => {
//     if (!shelter) return;
//     const days =
//       serviceType === "boarding" && startDate && endDate
//         ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1
//         : 1;
//     setTotalAmount(days * (shelter.pricePerDay || 0) * selectedPets.length);
//   }, [serviceType, startDate, endDate, selectedPets, shelter]);

//   const togglePetSelection = (petId) => {
//     setSelectedPets((prev) =>
//       prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]
//     );
//   };

//   const redirectToEsewa = (paymentData) => {
//     const form = document.createElement("form");
//     form.method = "POST";
//     form.action = paymentData.esewa_url;
//     form.style.display = "none";

//     const fields = {
//       amount: paymentData.amount,
//       tax_amount: paymentData.tax_amount,
//       total_amount: paymentData.total_amount,
//       transaction_uuid: paymentData.transaction_uuid,
//       product_code: paymentData.product_code,
//       product_service_charge: paymentData.product_service_charge,
//       product_delivery_charge: paymentData.product_delivery_charge,
//       success_url: paymentData.success_url,
//       failure_url: paymentData.failure_url,
//       signed_field_names: paymentData.signed_field_names,
//       signature: paymentData.signature,
//     };

//     Object.entries(fields).forEach(([key, value]) => {
//       const input = document.createElement("input");
//       input.type = "hidden";
//       input.name = key;
//       input.value = String(value || "");
//       form.appendChild(input);
//     });

//     document.body.appendChild(form);
//     form.submit();
//   };

//   const handleBooking = async () => {
//     if (!selectedPets.length) return alert("Please select at least one pet");
//     if (!startDate) return alert("Please select a start date");
//     if (serviceType === "boarding" && !endDate) return alert("Please select an end date");
//     if (serviceType === "boarding" && new Date(endDate) < new Date(startDate)) {
//       return alert("End date cannot be before start date");
//     }

//     setIsSubmitting(true);

//     const bookingData = {
//       shelterId: id,
//       serviceType,
//       startDate,
//       endDate: serviceType === "daycare" ? startDate : endDate,
//       pets: pets
//         .filter((p) => selectedPets.includes(p._id))
//         .map((p) => ({
//           petName: p.petName,
//           location: p.location,
//           type: p.type,
//           breed: p.breed,
//           gender: p.gender,
//           age: p.age,
//           weight: p.weight,
//           health: p.health,
//           characteristics: p.characteristics,
//           emergencyContact: p.emergencyContact,
//           photo: p.photo,
//         })),
//       pricePerDay: shelter.pricePerDay,
//       paymentMethod,
//     };

//     try {
//       const response = await axios.post(API_URL, bookingData, authConfig());
//       if (response.data.isEsewa) {
//         setTimeout(() => redirectToEsewa(response.data.paymentData), 100);
//       } else {
//         navigate("/payment-success");
//       }
//     } catch (err) {
//       const errorMsg = err.response?.data?.message || "Booking failed.";
//       alert(errorMsg);
//       setIsSubmitting(false);
//     }
//   };

//   if (loading || loadingPets) {
//     return (
//       <div className="h-screen flex flex-col items-center justify-center bg-white">
//         <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
//         <p className="text-gray-500 font-medium tracking-wide">Fetching Details...</p>
//       </div>
//     );
//   }

//   if (!user) return <p className="text-center p-10 font-medium">Please login first for a fast and safe booking.</p>;
//   if (!shelter) return <p className="text-center p-10 font-medium">Loading shelter details...</p>;

//   return (
//     <div className="min-h-screen bg-[#F3F1EE] py-12 px-4 font-sans">
//       <div className="max-w-4xl mx-auto">
//         {/* Navigation Header */}
//         <div className="flex items-center justify-between mb-8">
//           <button 
//             onClick={() => navigate(-1)}
//             className="group flex items-center gap-2 text-gray-500 hover:text-[#183D8B] transition-colors font-semibold"
//           >
//             <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
//             Back to List
//           </button>
//           <div className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-1 rounded-full tracking-widest">
//             Step 2: Booking Details
//           </div>
//         </div>

//         <div className="bg-white shadow-2xl shadow-blue-900/5 rounded-[2rem] overflow-hidden border border-gray-100">
//           {/* Main Shelter Header */}
//           <div className="bg-[#183D8B] p-8 text-white relative">
//             <div className="relative z-10">
//               <h2 className="text-4xl font-extrabold mb-4 tracking-tight">{shelter.name}</h2>
//               <div className="flex flex-wrap gap-5 text-blue-100">
//                 <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-sm backdrop-blur-md">
//                   <MapPin size={16} className="text-blue-300" /> {shelter.location}
//                 </span>
//                 <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-sm backdrop-blur-md">
//                   <Banknote size={16} className="text-blue-300" /> Rs {shelter.pricePerDay} / day
//                 </span>
//               </div>
//             </div>
//             <PawPrint className="absolute top-1/2 -right-8 -translate-y-1/2 opacity-10 w-48 h-48 rotate-12" />
//           </div>

//           <div className="p-8 lg:p-12">
//             {/* Selection Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//               <div className="space-y-3">
//                 <label className="text-xs font-black text-gray-600 tracking-[0.10em] flex items-center gap-2">
//                   Service Type
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={serviceType}
//                     onChange={(e) => setServiceType(e.target.value)}
//                     className="w-full appearance-none border-2 border-gray-50 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-gray-50 font-bold text-gray-700"
//                     disabled={isSubmitting}
//                   >
//                     <option value="boarding">Boarding (Overnight)</option>
//                     <option value="daycare">Daycare (Single Day)</option>
//                   </select>
//                   <ChevronRight size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" />
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <label className="text-xs font-black text-gray-600 tracking-[0.15em] flex items-center gap-2">
//                   Payment Method
//                 </label>
//                 <div className="grid grid-cols-2 gap-3">
//                   <button
//                     type="button"
//                     onClick={() => setPaymentMethod("cash")}
//                     className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all font-bold ${
//                       paymentMethod === "cash" 
//                       ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm" 
//                       : "border-gray-50 bg-gray-50 text-gray-500 hover:bg-gray-100"
//                     }`}
//                   >
//                     <Banknote size={18} /> Cash
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => setPaymentMethod("esewa")}
//                     className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all font-bold ${
//                       paymentMethod === "esewa" 
//                       ? "border-green-500 bg-green-50 text-green-700 shadow-sm" 
//                       : "border-gray-50 bg-gray-50 text-gray-500 hover:bg-gray-100"
//                     }`}
//                   >
//                     <img src="https://esewa.com.np/common/images/esewa-logo.png" alt="eSewa" className="h-4 object-contain" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Date Selection Panel */}
//             <div className="bg-[#183D8B]/5 rounded-3xl p-8 mb-12 border border-[#183D8B]/10">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div className="space-y-3">
//                   <label className="text-xs font-bold text-[#183D8B] tracking-widest flex items-center gap-2">
//                     <Calendar size={14} /> Start Date
//                   </label>
//                   <input
//                     type="date"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                     min={new Date().toISOString().split("T")[0]}
//                     className="w-full border-2 border-white p-4 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-100 outline-none font-bold text-gray-700"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 {serviceType === "boarding" && (
//                   <div className="space-y-3">
//                     <label className="text-xs font-bold text-[#183D8B] tracking-widest flex items-center gap-2">
//                       <Calendar size={14} /> End Date
//                     </label>
//                     <input
//                       type="date"
//                       value={endDate}
//                       onChange={(e) => setEndDate(e.target.value)}
//                       min={startDate || new Date().toISOString().split("T")[0]}
//                       className="w-full border-2 border-white p-4 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-100 outline-none font-bold text-gray-700"
//                       disabled={isSubmitting}
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Pet Selector */}
//             <div className="mb-12">
//               <div className="flex items-center justify-between mb-8">
//                 <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
//                   Select Your Pets
//                 </h3>
//                 <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full font-bold text-xs text-gray-600 tracking-tighter">
//                   <CheckCircle2 size={14} className="text-green-600" />
//                   {selectedPets.length} Selected
//                 </div>
//               </div>
              
//               {pets?.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                   {pets.map((pet) => {
//                     const isSelected = selectedPets.includes(pet._id);
//                     return (
//                       <div
//                         key={pet._id}
//                         onClick={() => !isSubmitting && togglePetSelection(pet._id)}
//                         className={`group relative border-2 p-5 rounded-[1.5rem] cursor-pointer flex items-center gap-5 transition-all duration-300 ${
//                           isSelected
//                             ? "border-blue-600 bg-blue-50/50 shadow-lg shadow-blue-100 ring-2 ring-blue-600/10"
//                             : "border-gray-50 bg-white hover:border-blue-200 hover:bg-gray-50/30"
//                         } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
//                       >
//                         <div className="relative">
//                           <img
//                             src={pet.photo ? `${IMAGE_URL}/${pet.photo}` : "/default-pet.png"}
//                             alt={pet.petName}
//                             className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform"
//                           />
//                           {isSelected && (
//                             <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1 border-2 border-white shadow-sm">
//                               <CheckCircle2 size={12} />
//                             </div>
//                           )}
//                         </div>
//                         <div className="flex-1">
//                           <p className={`font-black text-lg leading-tight ${isSelected ? "text-blue-900" : "text-gray-800"}`}>
//                             {pet.petName}
//                           </p>
//                           <p className="text-xs text-gray-400 font-bold tracking-tight mt-1">
//                             {pet.type} • {pet.breed}
//                           </p>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <div className="text-center py-12 px-4 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50">
//                   <PawPrint className="mx-auto w-12 h-12 text-gray-200 mb-4" />
//                   <p className="text-gray-400 font-bold">No pets in your profile. Please add one first!</p>
//                 </div>
//               )}
//             </div>

//             {/* Sandbox Details for eSewa
//             {paymentMethod === "esewa" && (
//               <div className="mb-12 p-6 bg-green-50 border border-green-100 rounded-[1.5rem] shadow-sm">
//                 <div className="flex items-center gap-2 mb-4 text-green-900 font-black text-sm tracking-widest">
//                   <Info size={16} /> eSewa Sandbox Credentials
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                   {[
//                     ['eSewa ID', '9806800002'], 
//                     ['Password', 'Nepal@123'], 
//                     ['Token/OTP', '123456']
//                   ].map(([label, val]) => (
//                     <div key={label} className="bg-white p-3 rounded-xl border border-green-100 flex flex-col items-center">
//                       <span className="text-[10px] font-black text-green-300 mb-1">{label}</span>
//                       <code className="text-green-800 font-bold text-sm tracking-wide">{val}</code>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )} */}

//             {/* Bottom Sticky Action Bar */}
//             <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-10 border-t border-gray-100 mt-6">
//               <div className="text-center lg:text-left">
//                 <p className="text-xs font-black text-gray-600 tracking-[0.2em] mb-2">Total Payable Amount</p>
//                 <h4 className="text-5xl font-black text-[#183D8B]">
//                   <span className="text-xl font-bold mr-2 text-[#183D8B]">NPR</span>
//                   {totalAmount}
//                 </h4>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
//                 <button
//                   type="button"
//                   onClick={() => navigate(-1)}
//                   className="px-10 py-5 rounded-[1.5rem] font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-all text-center"
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleBooking}
//                   disabled={!selectedPets.length || isSubmitting}
//                   className="group relative flex-1 lg:flex-none bg-[#183D8B] text-white px-12 py-5 rounded-[1.5rem] font-bold shadow-2xl shadow-blue-900/30 hover:bg-blue-800 active:scale-95 disabled:bg-gray-300 disabled:shadow-none transition-all flex items-center justify-center gap-3"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin" />
//                       <span>Processing Payment...</span>
//                     </>
//                   ) : (
//                     <>
//                       <CheckCircle2 size={20} />
//                       <span>{paymentMethod === "esewa" ? "Pay with eSewa" : "Confirm Booking"}</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import axios from "axios";
import { getPets } from "../services/petowner/petProfile";
import { 
  MapPin, Calendar, Banknote, CheckCircle2, Info, ArrowLeft, PawPrint, Loader2, ChevronRight, DoorOpen
} from "lucide-react";

const API_URL = "http://localhost:5050/api/bookings";
const SHELTER_URL = "http://localhost:5050/api/shelters";
const IMAGE_URL = "http://localhost:5050/uploads";

const authConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export default function BookingPage() {
  const { id } = useParams();
  const location = useLocation();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [shelter, setShelter] = useState(null);
  const [pets, setPets] = useState([]);
  const [selectedPets, setSelectedPets] = useState([]);
  const [serviceType, setServiceType] = useState("boarding");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [loadingPets, setLoadingPets] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Room management
  const [preSelectedRooms, setPreSelectedRooms] = useState([]);
  const [petRoomAssignments, setPetRoomAssignments] = useState({});

  useEffect(() => {
    // Get pre-selected rooms from navigation state
    if (location.state?.selectedRooms) {
      setPreSelectedRooms(location.state.selectedRooms);
    }
  }, [location.state]);

  useEffect(() => {
    if (!user) return;
    axios
      .get(`${SHELTER_URL}/${id}`, authConfig())
      .then((res) => setShelter(res.data))
      .catch((err) => {
        console.error("Failed to fetch shelter:", err);
        alert("Failed to load shelter details");
      });
  }, [id, user]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        if (user?.pets?.length) {
          setPets(user.pets);
        } else {
          const data = await getPets();
          setPets(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch pets:", err);
      } finally {
        setLoadingPets(false);
      }
    };

    if (!loading) fetchPets();
  }, [user, loading]);

  useEffect(() => {
    if (!shelter) return;
    const days =
      serviceType === "boarding" && startDate && endDate
        ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1
        : 1;
    setTotalAmount(days * (shelter.pricePerDay || 0) * selectedPets.length);
  }, [serviceType, startDate, endDate, selectedPets, shelter]);

  const togglePetSelection = (petId) => {
    setSelectedPets((prev) => {
      if (prev.includes(petId)) {
        // Remove pet and their room assignment
        const newAssignments = { ...petRoomAssignments };
        delete newAssignments[petId];
        setPetRoomAssignments(newAssignments);
        return prev.filter((id) => id !== petId);
      } else {
        // Check if we have enough rooms
        if (prev.length >= preSelectedRooms.length) {
          alert(`You can only select ${preSelectedRooms.length} pet for the ${preSelectedRooms.length} room you chose`);
          return prev;
        }
        return [...prev, petId];
      }
    });
  };

  const assignPetToRoom = (petId, roomNumber) => {
    // Check if room is already assigned to another pet
    const existingPet = Object.entries(petRoomAssignments).find(
      ([pid, room]) => room === roomNumber && pid !== petId
    );
    
    if (existingPet) {
      alert(`Room ${roomNumber} is already assigned to another pet`);
      return;
    }
    
    setPetRoomAssignments(prev => ({
      ...prev,
      [petId]: roomNumber
    }));
  };

  const redirectToEsewa = (paymentData) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = paymentData.esewa_url;
    form.style.display = "none";

    const fields = {
      amount: paymentData.amount,
      tax_amount: paymentData.tax_amount,
      total_amount: paymentData.total_amount,
      transaction_uuid: paymentData.transaction_uuid,
      product_code: paymentData.product_code,
      product_service_charge: paymentData.product_service_charge,
      product_delivery_charge: paymentData.product_delivery_charge,
      success_url: paymentData.success_url,
      failure_url: paymentData.failure_url,
      signed_field_names: paymentData.signed_field_names,
      signature: paymentData.signature,
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = String(value || "");
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  const handleBooking = async () => {
    if (!selectedPets.length) return alert("Please select at least one pet");
    if (selectedPets.length !== preSelectedRooms.length) {
      return alert(`Please select exactly ${preSelectedRooms.length} pet for your ${preSelectedRooms.length} room`);
    }
    
    // Check if all pets have room assignments
    const unassignedPets = selectedPets.filter(petId => !petRoomAssignments[petId]);
    if (unassignedPets.length > 0) {
      return alert("Please assign a room to each selected pet");
    }
    
    if (!startDate) return alert("Please select a start date");
    if (serviceType === "boarding" && !endDate) return alert("Please select an end date");
    if (serviceType === "boarding" && new Date(endDate) < new Date(startDate)) {
      return alert("End date cannot be before start date");
    }

    setIsSubmitting(true);

    const bookingData = {
      shelterId: id,
      serviceType,
      startDate,
      endDate: serviceType === "daycare" ? startDate : endDate,
      pets: pets
        .filter((p) => selectedPets.includes(p._id))
        .map((p) => ({
          petName: p.petName,
          location: p.location,
          type: p.type,
          breed: p.breed,
          gender: p.gender,
          age: p.age,
          weight: p.weight,
          health: p.health,
          characteristics: p.characteristics,
          emergencyContact: p.emergencyContact,
          photo: p.photo,
          roomNumber: petRoomAssignments[p._id], // Add room assignment
        })),
      pricePerDay: shelter.pricePerDay,
      paymentMethod,
      roomAssignments: selectedPets.map(petId => {
        const pet = pets.find(p => p._id === petId);
        return {
          roomNumber: petRoomAssignments[petId],
          petName: pet.petName,
          petPhoto: pet.photo
        };
      }),
    };

    try {
      const response = await axios.post(API_URL, bookingData, authConfig());
      if (response.data.isEsewa) {
        setTimeout(() => redirectToEsewa(response.data.paymentData), 100);
      } else {
        navigate("/payment-success");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Booking failed.";
      alert(errorMsg);
      setIsSubmitting(false);
    }
  };

  if (loading || loadingPets) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium tracking-wide">Fetching Details...</p>
      </div>
    );
  }

  if (!user) return <p className="text-center p-10 font-medium">Please login first.</p>;
  if (!shelter) return <p className="text-center p-10 font-medium">Loading shelter details...</p>;

  return (
    <div className="min-h-screen bg-[#F3F1EE] py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-gray-500 hover:text-[#183D8B] transition-colors font-semibold"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Back
          </button>
          <div className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-1 rounded-full tracking-widest">
            Step 2: Booking Details
          </div>
        </div>

        <div className="bg-white shadow-2xl shadow-blue-900/5 rounded-[2rem] overflow-hidden border border-gray-100">
          <div className="bg-[#183D8B] p-8 text-white relative">
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold mb-4 tracking-tight">{shelter.name}</h2>
              <div className="flex flex-wrap gap-5 text-blue-100">
                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-sm backdrop-blur-md">
                  <MapPin size={16} className="text-blue-300" /> {shelter.location}
                </span>
                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-sm backdrop-blur-md">
                  <Banknote size={16} className="text-blue-300" /> Rs {shelter.pricePerDay} / day
                </span>
                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-sm backdrop-blur-md">
                  <DoorOpen size={16} className="text-blue-300" /> {preSelectedRooms.length} Room Selected
                </span>
              </div>
            </div>
            <PawPrint className="absolute top-1/2 -right-8 -translate-y-1/2 opacity-10 w-48 h-48 rotate-12" />
          </div>

          <div className="p-8 lg:p-12">
            {/* Selected Rooms Display */}
            {preSelectedRooms.length > 0 && (
              <div className="mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <h3 className="text-sm font-black text-[#183D8B] mb-3 flex items-center gap-2">
                  <DoorOpen size={16} /> YOUR SELECTED ROOMS
                </h3>
                <div className="flex flex-wrap gap-2">
                  {preSelectedRooms.map(roomNum => (
                    <span key={roomNum} className="px-4 py-2 bg-[#183D8B] text-white font-bold rounded-xl text-sm">
                      Room {roomNum}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#183D8B] mt-3 font-semibold">
                  Please select {preSelectedRooms.length} pet and assign them to rooms
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-600 tracking-[0.10em]">Service Type</label>
                <div className="relative">
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full appearance-none border-2 border-gray-50 p-4 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all bg-gray-50 font-bold text-gray-700"
                    disabled={isSubmitting}
                  >
                    <option value="boarding">Boarding (Overnight)</option>
                    <option value="daycare">Daycare (Single Day)</option>
                  </select>
                  <ChevronRight size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-gray-600 tracking-[0.15em]">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all font-bold ${
                      paymentMethod === "cash" 
                      ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm" 
                      : "border-gray-50 bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <Banknote size={18} /> Cash
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("esewa")}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all font-bold ${
                      paymentMethod === "esewa" 
                      ? "border-green-500 bg-green-50 text-green-700 shadow-sm" 
                      : "border-gray-50 bg-gray-50 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    <img src="https://esewa.com.np/common/images/esewa-logo.png" alt="eSewa" className="h-4 object-contain" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#183D8B]/5 rounded-3xl p-8 mb-12 border border-[#183D8B]/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-[#183D8B] tracking-widest flex items-center gap-2">
                    <Calendar size={14} /> Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border-2 border-white p-4 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-100 outline-none font-bold text-gray-700"
                    disabled={isSubmitting}
                  />
                </div>
                {serviceType === "boarding" && (
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-[#183D8B] tracking-widest flex items-center gap-2">
                      <Calendar size={14} /> End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || new Date().toISOString().split("T")[0]}
                      className="w-full border-2 border-white p-4 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-100 outline-none font-bold text-gray-700"
                      disabled={isSubmitting}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Pet Selection with Room Assignment */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                  Select Pets & Assign Rooms
                </h3>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full font-bold text-xs text-gray-600">
                  <CheckCircle2 size={14} className="text-green-600" />
                  {selectedPets.length}/{preSelectedRooms.length} Assigned
                </div>
              </div>
              
              {pets?.length > 0 ? (
                <div className="space-y-4">
                  {pets.map((pet) => {
                    const isSelected = selectedPets.includes(pet._id);
                    const assignedRoom = petRoomAssignments[pet._id];
                    
                    return (
                      <div key={pet._id} className="border-2 border-gray-100 rounded-2xl p-5 bg-white">
                        <div className="flex items-center gap-5">
                          <button
                            onClick={() => !isSubmitting && togglePetSelection(pet._id)}
                            className={`flex-shrink-0 relative border-2 p-1 rounded-2xl transition-all ${
                              isSelected ? "border-blue-600 ring-2 ring-blue-100" : "border-gray-200"
                            }`}
                          >
                            <img
                              src={pet.photo ? `${IMAGE_URL}/${pet.photo}` : "/default-pet.png"}
                              alt={pet.petName}
                              className="w-16 h-16 rounded-xl object-cover"
                            />
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full p-1">
                                <CheckCircle2 size={14} />
                              </div>
                            )}
                          </button>
                          
                          <div className="flex-1">
                            <p className="font-black text-lg text-gray-800">{pet.petName}</p>
                            <p className="text-xs text-gray-400 font-bold">{pet.type} • {pet.breed}</p>
                          </div>
                          
                          {isSelected && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-gray-500">Assign to:</span>
                              <select
                                value={assignedRoom || ""}
                                onChange={(e) => assignPetToRoom(pet._id, Number(e.target.value))}
                                className="border-2 border-blue-200 bg-blue-50 px-4 py-2 rounded-xl font-bold text-blue-700 focus:ring-2 focus:ring-blue-300 outline-none"
                              >
                                <option value="">Select Room</option>
                                {preSelectedRooms.map(roomNum => (
                                  <option key={roomNum} value={roomNum}>
                                    Room {roomNum}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 px-4 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50">
                  <PawPrint className="mx-auto w-12 h-12 text-gray-200 mb-4" />
                  <p className="text-gray-400 font-bold">No pets found. Please add a pet first!</p>
                </div>
              )}
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-10 border-t border-gray-100 mt-6">
              <div className="text-center lg:text-left">
                <p className="text-xs font-black text-gray-600 tracking-[0.2em] mb-2">Total Amount</p>
                <h4 className="text-5xl font-black text-[#183D8B]">
                  <span className="text-xl font-bold mr-2">NPR</span>
                  {totalAmount}
                </h4>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-10 py-5 rounded-[1.5rem] font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 transition-all"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleBooking}
                  disabled={selectedPets.length !== preSelectedRooms.length || Object.keys(petRoomAssignments).length !== selectedPets.length || isSubmitting}
                  className="group relative flex-1 lg:flex-none bg-[#183D8B] text-white px-12 py-5 rounded-[1.5rem] font-bold shadow-2xl shadow-blue-900/30 hover:bg-blue-800 active:scale-95 disabled:bg-gray-300 disabled:shadow-none transition-all flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={20} />
                      <span>{paymentMethod === "esewa" ? "Pay with eSewa" : "Confirm Booking"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}