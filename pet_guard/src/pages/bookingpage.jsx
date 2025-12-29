// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthProvider";
// import axios from "axios";
// import { getPets } from "../services/petowner/petProfile"; 

// const API_URL = "http://localhost:5050/api/bookings";
// const SHELTER_URL = "http://localhost:5050/api/shelters";
// const IMAGE_URL = "http://localhost:5050/uploads";

// const authConfig = () => ({
//   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// });

// export default function BookingPage() {
//   const { id } = useParams(); // shelterId
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
//   const [paymentMethod, setPaymentMethod] = useState("cash"); // new state

//   // Fetch shelter
//   useEffect(() => {
//     if (!user) return;
//     axios
//       .get(`${SHELTER_URL}/${id}`, authConfig())
//       .then((res) => setShelter(res.data))
//       .catch(console.error);
//   }, [id, user]);

//   // Fetch pets if not already in context
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

//   // Calculate total amount
//   useEffect(() => {
//     if (!shelter) return;
//     const days =
//       serviceType === "boarding" && startDate && endDate
//         ? (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1
//         : 1;
//     setTotalAmount(days * (shelter.pricePerDay || 0) * selectedPets.length);
//   }, [serviceType, startDate, endDate, selectedPets, shelter]);

//   const togglePetSelection = (petId) => {
//     setSelectedPets((prev) =>
//       prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]
//     );
//   };

//   const handleBooking = async () => {
//     if (!selectedPets.length) return alert("Select at least one pet");
//     if (!startDate || (serviceType === "boarding" && !endDate))
//       return alert("Select valid dates");

//     const bookingData = {
//       petOwner: user._id,
//       shelter: id,
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
//       petCount: selectedPets.length,
//       pricePerDay: shelter.pricePerDay,
//       totalDays:
//         serviceType === "boarding"
//           ? (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1
//           : 1,
//       totalAmount,
//       payment: { method: paymentMethod, status: "pending" },
//         transactionId: null,     // optional, for eSewa later

//     };

//     try {
//       await axios.post(API_URL, bookingData, authConfig());
//       alert("Booking successful!");
//       navigate("/mybookings");
//     } catch (err) {
//       console.error(err);
//       alert("Booking failed");
//     }
//   };

//   if (loading || loadingPets) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <p className="text-xl font-bold text-[#183D8B] animate-pulse">Loading...</p>
//       </div>
//     );
//   }

//   if (!user) return <p>User not found. Please login.</p>;
//   if (!shelter) return <p>Loading shelter...</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-2">{shelter.name}</h2>

//       {/* Shelter Info */}
//       <div className="mb-4 border p-3 rounded bg-gray-50">
//         <p><strong>Location:</strong> {shelter.location}</p>
//         <p><strong>Price per Day:</strong> Rs {shelter.pricePerDay}</p>
//         <p>
//           <strong>Availability:</strong>{" "}
//           {shelter.availability ? "Available" : "Not Available"}
//         </p>
//       </div>

//       {/* Service Type */}
//       <div className="mb-4">
//         <label>Service Type:</label>
//         <select
//           value={serviceType}
//           onChange={(e) => setServiceType(e.target.value)}
//           className="border p-1 rounded ml-2"
//         >
//           <option value="boarding">Boarding</option>
//           <option value="daycare">Daycare</option>
//         </select>
//       </div>

//       {/* Dates */}
//       <div className="mb-4 flex gap-4">
//         <div>
//           <label>Start Date:</label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="border p-1 rounded ml-2"
//           />
//         </div>
//         {serviceType === "boarding" && (
//           <div>
//             <label>End Date:</label>
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="border p-1 rounded ml-2"
//             />
//           </div>
//         )}
//       </div>

//       {/* Pet Selection */}
//       <div className="mb-4">
//         <h3>Select Pets</h3>
//         {pets?.length > 0 ? (
//           <div className="grid grid-cols-2 gap-2">
//             {pets.map((pet) => {
//               const isSelected = selectedPets.includes(pet._id);
//               return (
//                 <div
//                   key={pet._id}
//                   onClick={() => togglePetSelection(pet._id)}
//                   className={`border p-2 rounded cursor-pointer flex items-center gap-2 ${
//                     isSelected ? "bg-blue-100 border-blue-400" : "hover:border-gray-300"
//                   }`}
//                 >
//                   <img
//                     src={pet.photo ? `${IMAGE_URL}/${pet.photo}` : "/default-pet.png"}
//                     alt={pet.petName}
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="font-semibold">{pet.petName}</p>
//                     <p className="text-sm">{pet.type}, {pet.age} yrs</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <p className="text-red-500">You have no pets. Please add pets first.</p>
//         )}
//       </div>

//       {/* Payment Method */}
//       <div className="mb-4">
//         <label className="font-semibold">Payment Method:</label>
//         <select
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//           className="border p-1 rounded ml-2"
//         >
//           <option value="cash">Cash</option>
//           <option value="esewa">eSewa</option>
//         </select>
//       </div>

//       {/* Total Amount */}
//       <div className="mb-4">
//         <p>Total Amount: Rs {totalAmount}</p>
//       </div>

//       <button
//         onClick={handleBooking}
//         disabled={pets.length === 0}
//         className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ${
//           pets.length === 0 ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//       >
//         Confirm Booking
//       </button>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthProvider";
// import axios from "axios";
// import { getPets } from "../services/petowner/petProfile";

// const API_URL = "http://localhost:5050/api/bookings";
// const SHELTER_URL = "http://localhost:5050/api/shelters";
// const IMAGE_URL = "http://localhost:5050/uploads";

// const authConfig = () => ({
//   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// });

// export default function BookingPage() {
//   const { id } = useParams(); // shelterId
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

//   // Fetch shelter
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

//   // Fetch pets
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

//   // Calculate total amount
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

//   /**
//    * ESEWA REDIRECT LOGIC
//    * Submits the hidden form to eSewa gateway
//    */
//   const redirectToEsewa = (paymentData) => {
//     console.log("Redirecting to eSewa with data:", paymentData);
    
//     const form = document.createElement("form");
//     form.method = "POST";
//     form.action = paymentData.esewa_url;

//     // All mandatory fields for eSewa v2
//     const mandatoryFields = {
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

//     console.log("Form fields:", mandatoryFields);

//     Object.entries(mandatoryFields).forEach(([key, value]) => {
//       const input = document.createElement("input");
//       input.type = "hidden";
//       input.name = key;
//       input.value = value;
//       form.appendChild(input);
//     });

//     document.body.appendChild(form);
//     form.submit();
//   };

//   const handleBooking = async () => {
//     // Validation
//     if (!selectedPets.length) {
//       return alert("Please select at least one pet");
//     }
    
//     if (!startDate) {
//       return alert("Please select a start date");
//     }
    
//     if (serviceType === "boarding" && !endDate) {
//       return alert("Please select an end date for boarding");
//     }

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

//     console.log("Submitting booking:", bookingData);

//     try {
//       const response = await axios.post(API_URL, bookingData, authConfig());
//       console.log("Booking response:", response.data);

//       if (response.data.isEsewa) {
//         // Redirect to eSewa for payment
//         redirectToEsewa(response.data.paymentData);
//       } else {
//         // Cash payment - booking confirmed
//         alert("Booking successful! Please pay at the shelter.");
//         navigate("/mybookings");
//       }
//     } catch (err) {
//       console.error("Booking error:", err);
//       const errorMsg = err.response?.data?.message || "Booking failed. Please try again.";
//       alert(errorMsg);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading || loadingPets) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <p className="text-xl font-bold text-[#183D8B] animate-pulse">Loading...</p>
//       </div>
//     );
//   }

//   if (!user) return <p className="text-center p-10">User not found. Please login.</p>;
//   if (!shelter) return <p className="text-center p-10">Loading shelter details...</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
//       <h2 className="text-3xl font-bold mb-4 text-[#183D8B]">{shelter.name}</h2>

//       {/* Shelter Info */}
//       <div className="mb-6 border p-4 rounded-lg bg-gray-50">
//         <p className="mb-1 text-gray-700"><strong>📍 Location:</strong> {shelter.location}</p>
//         <p className="mb-1 text-gray-700"><strong>💰 Price per Day:</strong> Rs {shelter.pricePerDay}</p>
//         <p className="text-gray-700">
//           <strong>Availability:</strong>{" "}
//           <span className={shelter.status ? "text-green-600" : "text-red-600"}>
//             {shelter.status ? "Available" : "Not Available"}
//           </span>
//         </p>
//       </div>

//       {/* Service Selection */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block font-semibold mb-2">Service Type</label>
//           <select
//             value={serviceType}
//             onChange={(e) => setServiceType(e.target.value)}
//             className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
//             disabled={isSubmitting}
//           >
//             <option value="boarding">Boarding (Overnight)</option>
//             <option value="daycare">Daycare (Single Day)</option>
//           </select>
//         </div>

//         <div>
//           <label className="block font-semibold mb-2">Payment Method</label>
//           <select
//             value={paymentMethod}
//             onChange={(e) => setPaymentMethod(e.target.value)}
//             className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
//             disabled={isSubmitting}
//           >
//             <option value="cash">Cash (Pay at Shelter)</option>
//             <option value="esewa">eSewa (Pay Online Now)</option>
//           </select>
//         </div>
//       </div>

//       {/* Dates */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <div>
//           <label className="block font-semibold mb-2">Start Date</label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             min={new Date().toISOString().split('T')[0]}
//             className="w-full border p-2 rounded"
//             disabled={isSubmitting}
//           />
//         </div>
//         {serviceType === "boarding" && (
//           <div>
//             <label className="block font-semibold mb-2">End Date</label>
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               min={startDate || new Date().toISOString().split('T')[0]}
//               className="w-full border p-2 rounded"
//               disabled={isSubmitting}
//             />
//           </div>
//         )}
//       </div>

//       {/* Pet Selection */}
//       <div className="mb-8">
//         <h3 className="text-xl font-bold mb-4 text-gray-800">Select Your Pets</h3>
//         {pets?.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {pets.map((pet) => {
//               const isSelected = selectedPets.includes(pet._id);
//               return (
//                 <div
//                   key={pet._id}
//                   onClick={() => !isSubmitting && togglePetSelection(pet._id)}
//                   className={`border-2 p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all ${
//                     isSelected ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300 bg-white"
//                   } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
//                 >
//                   <img
//                     src={pet.photo ? `${IMAGE_URL}/${pet.photo}` : "/default-pet.png"}
//                     alt={pet.petName}
//                     className="w-16 h-16 rounded-full object-cover border"
//                   />
//                   <div className="flex-1">
//                     <p className="font-bold text-gray-800">{pet.petName}</p>
//                     <p className="text-sm text-gray-500">{pet.type} • {pet.breed}</p>
//                   </div>
//                   {isSelected && (
//                     <div className="bg-blue-600 rounded-full p-1 text-white">
//                        ✓
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <p className="text-red-500">Add pets to your profile first.</p>
//         )}
//       </div>

//       {/* Total & Action */}
//       <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
//         <p className="text-2xl font-black">
//           Total: <span className="text-blue-600">Rs {totalAmount}</span>
//         </p>
//         <button
//           onClick={handleBooking}
//           disabled={!selectedPets.length || isSubmitting}
//           className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//         >
//           {isSubmitting ? "Processing..." : paymentMethod === "esewa" ? "Pay with eSewa" : "Confirm Cash Booking"}
//         </button>
//       </div>

//       {/* eSewa Test Credentials Info */}
//       {paymentMethod === "esewa" && (
//         <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//           <p className="text-sm font-semibold text-yellow-800 mb-2">ℹ️ Test Mode - Use these credentials:</p>
//           <p className="text-xs text-gray-700">eSewa ID: 9806800001 (or 2/3/4/5)</p>
//           <p className="text-xs text-gray-700">Password: Nepal@123</p>
//           <p className="text-xs text-gray-700">Token: 123456</p>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import axios from "axios";
import { getPets } from "../services/petowner/petProfile";

const API_URL = "http://localhost:5050/api/bookings";
const SHELTER_URL = "http://localhost:5050/api/shelters";
const IMAGE_URL = "http://localhost:5050/uploads";

const authConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export default function BookingPage() {
  const { id } = useParams();
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
    setSelectedPets((prev) =>
      prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]
    );
  };

  const redirectToEsewa = (paymentData) => {
    console.log("=== eSewa Redirect Data ===");
    console.log("URL:", paymentData.esewa_url);
    console.log("Amount:", paymentData.amount);
    console.log("Total Amount:", paymentData.total_amount);
    console.log("Transaction UUID:", paymentData.transaction_uuid);
    console.log("Product Code:", paymentData.product_code);
    console.log("Signature:", paymentData.signature);
    console.log("Success URL:", paymentData.success_url);
    console.log("Failure URL:", paymentData.failure_url);
    console.log("===========================");

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

    // Verify all fields are present
    Object.entries(fields).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        console.error(`Missing field: ${key}`);
      }
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = String(value || "");
      form.appendChild(input);
    });

    document.body.appendChild(form);
    
    console.log("Form HTML:", form.innerHTML);
    console.log("Submitting form to eSewa...");
    
    form.submit();
  };

  const handleBooking = async () => {
    if (!selectedPets.length) {
      return alert("Please select at least one pet");
    }

    if (!startDate) {
      return alert("Please select a start date");
    }

    if (serviceType === "boarding" && !endDate) {
      return alert("Please select an end date for boarding");
    }

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
        })),
      pricePerDay: shelter.pricePerDay,
      paymentMethod,
    };

    console.log(" Booking Data:", bookingData);

    try {
      const response = await axios.post(API_URL, bookingData, authConfig());
      console.log(" Booking Response:", response.data);

      if (response.data.isEsewa) {
        console.log("Redirecting to eSewa payment gateway...");
        setTimeout(() => {
          redirectToEsewa(response.data.paymentData);
        }, 100);
      } else {
        alert(" Booking successful! Please pay at the shelter.");
        navigate("/mybookings");
      }
    } catch (err) {
      console.error(" Booking error:", err);
      console.error("Error response:", err.response?.data);
      const errorMsg = err.response?.data?.message || "Booking failed. Please try again.";
      alert(errorMsg);
      setIsSubmitting(false);
    }
  };

  if (loading || loadingPets) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl font-bold text-[#183D8B] animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!user) return <p className="text-center p-10">User not found. Please login.</p>;
  if (!shelter) return <p className="text-center p-10">Loading shelter details...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
      <h2 className="text-3xl font-bold mb-4 text-[#183D8B]">{shelter.name}</h2>

      <div className="mb-6 border p-4 rounded-lg bg-gray-50">
        <p className="mb-1 text-gray-700">
          <strong> Location:</strong> {shelter.location}
        </p>
        <p className="mb-1 text-gray-700">
          <strong>Price per Day:</strong> Rs {shelter.pricePerDay}
        </p>
        <p className="text-gray-700">
          <strong>Availability:</strong>{" "}
          <span className={shelter.status ? "text-green-600" : "text-red-600"}>
            {shelter.status ? "Available" : "Not Available"}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-semibold mb-2">Service Type</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            <option value="boarding">Boarding (Overnight)</option>
            <option value="daycare">Daycare (Single Day)</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            <option value="cash">Cash (Pay at Shelter)</option>
            <option value="esewa">eSewa (Pay Online Now)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-semibold mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full border p-2 rounded"
            disabled={isSubmitting}
          />
        </div>
        {serviceType === "boarding" && (
          <div>
            <label className="block font-semibold mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || new Date().toISOString().split("T")[0]}
              className="w-full border p-2 rounded"
              disabled={isSubmitting}
            />
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Select Your Pets</h3>
        {pets?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pets.map((pet) => {
              const isSelected = selectedPets.includes(pet._id);
              return (
                <div
                  key={pet._id}
                  onClick={() => !isSubmitting && togglePetSelection(pet._id)}
                  className={`border-2 p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all ${
                    isSelected
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <img
                    src={pet.photo ? `${IMAGE_URL}/${pet.photo}` : "/default-pet.png"}
                    alt={pet.petName}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{pet.petName}</p>
                    <p className="text-sm text-gray-500">
                      {pet.type} • {pet.breed}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="bg-blue-600 rounded-full p-1 text-white">✓</div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-red-500">Add pets to your profile first.</p>
        )}
      </div>

      <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-2xl font-black">
          Total: <span className="text-blue-600">Rs {totalAmount}</span>
        </p>
        <button
          onClick={handleBooking}
          disabled={!selectedPets.length || isSubmitting}
          className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting
            ? "Processing..."
            : paymentMethod === "esewa"
            ? "Pay with eSewa"
            : "Confirm Cash Booking"}
        </button>
      </div>

      {paymentMethod === "esewa" && (
        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <p className="text-sm font-bold text-blue-900 mb-3">
            📱 eSewa Test Login Instructions:
          </p>
          <div className="space-y-2 text-sm text-gray-800">
            <div className="flex items-start gap-2">
              <span className="font-bold text-blue-600">Step 1:</span>
              <div>
                <p>Enter eSewa ID: <code className="bg-white px-2 py-1 rounded">9806800002</code></p>
                <p className="text-xs text-gray-600 mt-1">
                  (Try 9806800001, 002, 003, 004, or 005 if one doesn't work)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-blue-600">Step 2:</span>
              <p>Enter Password: <code className="bg-white px-2 py-1 rounded">Nepal@123</code></p>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-blue-600">Step 3:</span>
              <p>Enter Token/OTP: <code className="bg-white px-2 py-1 rounded">123456</code></p>
            </div>
          </div>
          <div className="mt-3 p-3 bg-yellow-100 rounded border border-yellow-300">
            <p className="text-xs font-semibold text-yellow-900">
              ⚠️ Important: Do NOT use MPIN (1122) - that's for mobile app only!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}