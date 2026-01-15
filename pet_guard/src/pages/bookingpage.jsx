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
                  className="group relative flex-1 lg:flex-none bg-[#183D8B] text-white px-12 py-5 rounded-[1.5rem] font-bold shadow-2xl shadow-blue-900/30 hover:bg-[#122e6b] active:scale-95 disabled:bg-gray-300 disabled:shadow-none transition-all flex items-center justify-center gap-3"
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