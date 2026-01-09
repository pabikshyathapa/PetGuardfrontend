// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Thumbs, EffectCoverflow } from "swiper";
// import { MapPin, Phone, Info, DoorOpen, CheckCircle } from "lucide-react";
// import { FaHeart } from "react-icons/fa";
// import { useFavorites } from "../../components/petowner/favoritescontext";
// import { toast } from "react-toastify";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/thumbs";
// import "swiper/css/effect-coverflow";
// import {
//   IMAGE_URL,
//   getShelterById,
// } from "../../services/petowner/browseService";
// import Header from "../../layouts/Header";
// import ShelterReviews from "../../components/petowner/ratingreviewcomponent";
// import Footer from "../../layouts/Footer";

// export default function ShelterDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [shelter, setShelter] = useState(null);
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [selectedRooms, setSelectedRooms] = useState([]);

//   const { isFavorite, handleToggleFavorite } = useFavorites();
//   const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

//   useEffect(() => {
//     getShelterById(id).then(setShelter);
//   }, [id]);

//   const onToggleFavorite = async () => {
//     if (isTogglingFavorite) return;

//     try {
//       setIsTogglingFavorite(true);
//       const response = await handleToggleFavorite(shelter._id);

//       if (response.isFavorite) {
//         toast.success("Added to favorites!", { autoClose: 2000 });
//       } else {
//         toast.info("Removed from favorites", { autoClose: 2000 });
//       }
//     } catch (error) {
//       console.error("Error toggling favorite:", error);
//       toast.error("Failed to update favorites");
//     } finally {
//       setIsTogglingFavorite(false);
//     }
//   };

//   const handleRoomSelection = (roomNumber) => {
//     setSelectedRooms((prev) => {
//       if (prev.includes(roomNumber)) {
//         return prev.filter((r) => r !== roomNumber);
//       } else {
//         return [...prev, roomNumber];
//       }
//     });
//   };

//   const handleBookNow = () => {
//     if (selectedRooms.length === 0) {
//       toast.warn("Please select at least one room");
//       return;
//     }
//     navigate(`/booking/${shelter._id}`, {
//       state: {
//         shelter,
//         selectedRooms,
//       },
//     });
//   };

//   if (!shelter) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-white">
//         <p className="text-xl font-bold text-[#183D8B] animate-pulse">
//           Loading...
//         </p>
//       </div>
//     );
//   }

//   const isFavorited = isFavorite(shelter._id);
//   const availableRooms =
//     shelter.rooms?.filter((r) => r.status === "available") || [];
//   const bookedRooms = shelter.rooms?.filter((r) => r.status === "booked") || [];

//   return (
//     <div className="bg-white-100 min-h-screen pb-20">
//       <Header />
//       <div className="pt-20 px-4 max-w-7xl mx-auto">
//         <div className="md:grid md:grid-cols-2 gap-12">
//           <div>
//             <Swiper
//               modules={[Navigation, Pagination, Thumbs, EffectCoverflow]}
//               navigation
//               pagination={{ clickable: true }}
//               effect="coverflow"
//               coverflowEffect={{
//                 rotate: 10,
//                 stretch: 0,
//                 depth: 100,
//                 modifier: 1,
//                 slideShadows: true,
//               }}
//               spaceBetween={20}
//               slidesPerView={1}
//               className="rounded-3xl overflow-hidden shadow-2xl"
//               {...(thumbsSwiper ? { thumbs: { swiper: thumbsSwiper } } : {})}
//             >
//               {shelter.photos.map((img) => (
//                 <SwiperSlide key={img}>
//                   <img
//                     src={`${IMAGE_URL}/${img}`}
//                     alt={shelter.name}
//                     className="w-full h-[450px] object-cover transform transition-transform duration-500 hover:scale-105"
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {shelter.photos.length > 1 && (
//               <Swiper
//                 onSwiper={setThumbsSwiper}
//                 modules={[Navigation, Thumbs]}
//                 slidesPerView={Math.min(shelter.photos.length, 4)}
//                 spaceBetween={12}
//                 watchSlidesProgress
//                 className="mt-6"
//               >
//                 {shelter.photos.map((img) => (
//                   <SwiperSlide key={img} className="cursor-pointer">
//                     <img
//                       src={`${IMAGE_URL}/${img}`}
//                       alt="Thumbnail"
//                       className="w-full h-20 object-cover rounded-xl border-2 border-transparent swiper-slide-thumb-active:border-[#183D8B] transition-all duration-300"
//                     />
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//             )}
//             <div className="mt-6 space-y-4">
//               <div className="flex justify-between items-start">
//                 <div className="flex flex-col">
//                   <h1 className="text-4xl font-extrabold text-[#183D8B] tracking-tight">
//                     {shelter.name}
//                   </h1>
//                   <div className="flex items-center gap-2 mt-2">
//                     <span
//                       className={`text-xs font-black px-3 py-1 rounded-full tracking-widest uppercase border transition-colors duration-300 ${
//                         shelter.status?.toUpperCase() === "UNAVAILABLE"
//                           ? "bg-red-100 text-red-700 border-red-200"
//                           : "bg-green-100 text-green-700 border-green-200"
//                       }`}
//                     >
//                       {shelter.status || "AVAILABLE"}
//                     </span>
//                   </div>
//                 </div>

//                 <button
//                   onClick={onToggleFavorite}
//                   disabled={isTogglingFavorite}
//                   className="p-2.5 bg-white rounded-full shadow-lg border border-gray-100 hover:shadow-xl hover:bg-gray-50 transition-all active:scale-90 disabled:opacity-50"
//                   aria-label="Toggle Favorite"
//                 >
//                   <FaHeart
//                     size={30}
//                     className={`transition-all duration-300 ${
//                       isFavorited
//                         ? "text-red-500 fill-red-500 scale-110"
//                         : "text-gray-300 hover:text-red-400"
//                     }`}
//                   />
//                 </button>
//               </div>

//               <div className="space-y-3">
//                 <p className="text-[#183D8B] font-semibold flex items-center gap-2">
//                   <MapPin size={18} className="text-[#183D8B]" />
//                   {shelter.location}
//                 </p>
//                 <p className="text-[#183D8B] font-semibold flex items-center gap-2">
//                   <Phone size={18} className="text-[#183D8B]" />
//                   {shelter.contact}
//                 </p>

//                 {shelter.services && shelter.services.length > 0 && (
//                   <div className="mt-6">
//                     <h3 className="text-lg font-bold text-[#183D8B] mb-3 uppercase tracking-wide">
//                       Services Offered
//                     </h3>
//                     <div className="flex flex-wrap gap-3">
//                       {shelter.services.map((service, index) => (
//                         <span
//                           key={index}
//                           className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-[#183D8B] border border-blue-200 shadow-sm"
//                         >
//                           {service}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="inline-block bg-[#183D8B] px-6 py-3 rounded-2xl shadow-md transform hover:-rotate-1 transition-transform">
//                 <p className="text-white text-sm font-medium opacity-80 uppercase tracking-wider">
//                   Price per day
//                 </p>
//                 <p className="text-2xl font-bold text-white">
//                   Rs {shelter.pricePerDay}
//                 </p>
//               </div>
//               {shelter.documents?.length > 0 && (
//                 <div className="mt-10">
//                   <h2 className="text-xl font-bold text-[#183D8B] mb-4 flex items-center gap-2 uppercase tracking-wide">
//                     Related Documents
//                   </h2>
//                   <div className="grid grid-cols-2 gap-4">
//                     {shelter.documents.map((doc) => (
//                       <img
//                         key={doc}
//                         src={`${IMAGE_URL}/${doc}`}
//                         alt="Document"
//                         className="w-full h-40 object-cover rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow"
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//             {/* ROOM SELECTION SECTION */}
//             {shelter.rooms && shelter.rooms.length > 0 && (
//               <div className="mt-10 bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-2xl font-bold text-[#183D8B] flex items-center gap-2">
//                     <DoorOpen size={24} />
//                     Available Rooms
//                   </h3>
//                   <div className="text-sm">
//                     <span className="font-bold text-green-600">
//                       {availableRooms.length} Available
//                     </span>
//                     <span className="mx-2 text-gray-300">|</span>
//                     <span className="font-bold text-orange-600">
//                       {bookedRooms.length} Booked
//                     </span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
//                   {shelter.rooms.map((room) => {
//                     const isSelected = selectedRooms.includes(room.roomNumber);
//                     const isBooked = room.status === "booked";

//                     return (
//                       <button
//                         key={room.roomNumber}
//                         onClick={() =>
//                           !isBooked && handleRoomSelection(room.roomNumber)
//                         }
//                         disabled={isBooked}
//                         className={`relative p-4 rounded-2xl border-2 transition-all ${
//                           isBooked
//                             ? "bg-orange-50 border-orange-200 cursor-not-allowed opacity-75"
//                             : isSelected
//                             ? "bg-[#183D8B] border-blue-600 text-white shadow-lg scale-105"
//                             : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-md"
//                         }`}
//                       >
//                         <div className="flex flex-col items-center gap-2">
//                           <span
//                             className={`text-2xl font-black ${
//                               isBooked
//                                 ? "text-orange-600"
//                                 : isSelected
//                                 ? "text-white"
//                                 : "text-gray-700"
//                             }`}
//                           >
//                             {room.roomNumber}
//                           </span>

//                           {isBooked && room.bookedPet?.petImage && (
//                             <img
//                               src={`${IMAGE_URL}/${room.bookedPet.petImage}`}
//                               alt={room.bookedPet.petName}
//                               className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
//                             />
//                           )}

//                           {isSelected && !isBooked && (
//                             <CheckCircle size={16} className="text-white" />
//                           )}

//                           <span
//                             className={`text-[10px] font-bold uppercase tracking-wider ${
//                               isBooked
//                                 ? "text-orange-600"
//                                 : isSelected
//                                 ? "text-blue-100"
//                                 : "text-gray-500"
//                             }`}
//                           >
//                             {isBooked
//                               ? "Booked"
//                               : isSelected
//                               ? "Selected"
//                               : "Available"}
//                           </span>

//                           {isBooked && room.bookedPet?.petName && (
//                             <span className="text-[9px] text-orange-500 truncate w-full text-center">
//                               {room.bookedPet.petName}
//                             </span>
//                           )}
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {selectedRooms.length > 0 && (
//                   <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
//                     <p className="text-sm font-bold text-blue-900">
//                       Selected Rooms:{" "}
//                       {selectedRooms.sort((a, b) => a - b).join(", ")}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="flex flex-col gap-8 mt-0 md:mt-[-8px]">
//             <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.09)] border border-gray-100 h-[585px] flex flex-col">
//               <div className="flex items-center gap-3 mb-4">
//                 <Info size={28} className="text-[#183D8B]" />
//                 <h2 className="text-2xl font-bold text-[#183D8B] uppercase tracking-tighter">
//                   About Us
//                 </h2>
//               </div>
//               <div className="overflow-y-auto flex-1 pr-2">
//                 <p className="text-black leading-relaxed text-left">
//                   {shelter.description}
//                 </p>
//               </div>
//             </div>

//             <div className="flex-1">
//               <h2 className="text-2xl font-bold text-[#183D8B] mb-4 uppercase tracking-tight">
//                 Ratings & Reviews
//               </h2>
//               <ShelterReviews shelterId={shelter._id} />
//             </div>
//           </div>
//         </div>

//         <div className="fixed bottom-8 left-0 right-0 z-50 px-4 pointer-events-none flex justify-center">
//           <button
//             disabled={shelter.status?.toUpperCase() === "UNAVAILABLE"}
//             onClick={handleBookNow}
//             className={`pointer-events-auto text-lg font-bold px-12 py-3 rounded-lg shadow-lg transition-all transform flex items-center justify-center gap-3 uppercase tracking-wider ${
//               shelter.status?.toUpperCase() === "UNAVAILABLE"
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none border border-gray-400"
//                 : "bg-[#183D8B] hover:bg-[#122e6b] text-white hover:-translate-y-1 active:scale-95 shadow-[0_10px_25px_rgba(24,61,139,0.3)]"
//             }`}
//           >
//             {shelter.status?.toUpperCase() === "UNAVAILABLE"
//               ? "NOT BOOKABLE"
//               : selectedRooms.length > 0
//               ? `BOOK ${selectedRooms.length} ROOM${
//                   selectedRooms.length > 1 ? "S" : ""
//                 }`
//               : "SELECT ROOMS TO BOOK"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, EffectCoverflow } from "swiper";
import { MapPin, Phone, Info, DoorOpen, CheckCircle } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { useFavorites } from "../../components/petowner/favoritescontext";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/effect-coverflow";
import {
  IMAGE_URL,
  getShelterById,
} from "../../services/petowner/browseService";
import Header from "../../layouts/Header";
import ShelterReviews from "../../components/petowner/ratingreviewcomponent";
import AuthModal from "../../components/auth/authModall";

export default function ShelterDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shelter, setShelter] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isFavorite, handleToggleFavorite } = useFavorites();
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

  useEffect(() => {
    getShelterById(id).then(setShelter);
    
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!(token && user));
  }, [id]);

  const onToggleFavorite = async () => {
    if (isTogglingFavorite) return;

    // Check if user is logged in
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    try {
      setIsTogglingFavorite(true);
      const response = await handleToggleFavorite(shelter._id);

      if (response.isFavorite) {
        toast.success("Added to favorites!", { autoClose: 2000 });
      } else {
        toast.info("Removed from favorites", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorites");
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const handleRoomSelection = (roomNumber) => {
    setSelectedRooms((prev) => {
      if (prev.includes(roomNumber)) {
        return prev.filter((r) => r !== roomNumber);
      } else {
        return [...prev, roomNumber];
      }
    });
  };

  const handleBookNow = () => {
    // Check if user is logged in
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    if (selectedRooms.length === 0) {
      toast.warn("Please select at least one room");
      return;
    }
    
    navigate(`/booking/${shelter._id}`, {
      state: {
        shelter,
        selectedRooms,
      },
    });
  };

  const handleLoginSuccess = (userData) => {
    // Immediately update login state
    setIsLoggedIn(true);
    setShowAuthModal(false);
    
    // Force re-render by updating a timestamp or triggering useEffect
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (token && user) {
      // Confirmed login successful
      toast.success(`Welcome back, ${userData.name || 'User'}!`);
      
      // Re-fetch shelter data to update favorites status
      getShelterById(id).then(setShelter);
    }
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  if (!shelter) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <p className="text-xl font-bold text-[#183D8B] animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  const isFavorited = isFavorite(shelter._id);
  const availableRooms =
    shelter.rooms?.filter((r) => r.status === "available") || [];
  const bookedRooms = shelter.rooms?.filter((r) => r.status === "booked") || [];

  return (
    <div className="bg-white-100 min-h-screen pb-20">
      <Header />
      
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          type="login"
          onClose={handleCloseAuthModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="md:grid md:grid-cols-2 gap-12">
          <div>
            <Swiper
              modules={[Navigation, Pagination, Thumbs, EffectCoverflow]}
              navigation
              pagination={{ clickable: true }}
              effect="coverflow"
              coverflowEffect={{
                rotate: 10,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              spaceBetween={20}
              slidesPerView={1}
              className="rounded-3xl overflow-hidden shadow-2xl"
              {...(thumbsSwiper ? { thumbs: { swiper: thumbsSwiper } } : {})}
            >
              {shelter.photos.map((img) => (
                <SwiperSlide key={img}>
                  <img
                    src={`${IMAGE_URL}/${img}`}
                    alt={shelter.name}
                    className="w-full h-[450px] object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {shelter.photos.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Navigation, Thumbs]}
                slidesPerView={Math.min(shelter.photos.length, 4)}
                spaceBetween={12}
                watchSlidesProgress
                className="mt-6"
              >
                {shelter.photos.map((img) => (
                  <SwiperSlide key={img} className="cursor-pointer">
                    <img
                      src={`${IMAGE_URL}/${img}`}
                      alt="Thumbnail"
                      className="w-full h-20 object-cover rounded-xl border-2 border-transparent swiper-slide-thumb-active:border-[#183D8B] transition-all duration-300"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h1 className="text-4xl font-extrabold text-[#183D8B] tracking-tight">
                    {shelter.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-xs font-black px-3 py-1 rounded-full tracking-widest uppercase border transition-colors duration-300 ${
                        shelter.status?.toUpperCase() === "UNAVAILABLE"
                          ? "bg-red-100 text-red-700 border-red-200"
                          : "bg-green-100 text-green-700 border-green-200"
                      }`}
                    >
                      {shelter.status || "AVAILABLE"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={onToggleFavorite}
                  disabled={isTogglingFavorite}
                  className="p-2.5 bg-white rounded-full shadow-lg border border-gray-100 hover:shadow-xl hover:bg-gray-50 transition-all active:scale-90 disabled:opacity-50"
                  aria-label="Toggle Favorite"
                >
                  <FaHeart
                    size={30}
                    className={`transition-all duration-300 ${
                      isFavorited
                        ? "text-red-500 fill-red-500 scale-110"
                        : "text-gray-300 hover:text-red-400"
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-[#183D8B] font-semibold flex items-center gap-2">
                  <MapPin size={18} className="text-[#183D8B]" />
                  {shelter.location}
                </p>
                <p className="text-[#183D8B] font-semibold flex items-center gap-2">
                  <Phone size={18} className="text-[#183D8B]" />
                  {shelter.contact}
                </p>

                {shelter.services && shelter.services.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-[#183D8B] mb-3 uppercase tracking-wide">
                      Services Offered
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {shelter.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-[#183D8B] border border-blue-200 shadow-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="inline-block bg-[#183D8B] px-6 py-3 rounded-2xl shadow-md transform hover:-rotate-1 transition-transform">
                <p className="text-white text-sm font-medium opacity-80 uppercase tracking-wider">
                  Price per day
                </p>
                <p className="text-2xl font-bold text-white">
                  Rs {shelter.pricePerDay}
                </p>
              </div>
              {shelter.documents?.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-xl font-bold text-[#183D8B] mb-4 flex items-center gap-2 uppercase tracking-wide">
                    Related Documents
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {shelter.documents.map((doc) => (
                      <img
                        key={doc}
                        src={`${IMAGE_URL}/${doc}`}
                        alt="Document"
                        className="w-full h-40 object-cover rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* ROOM SELECTION SECTION */}
            {shelter.rooms && shelter.rooms.length > 0 && (
              <div className="mt-10 bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-[#183D8B] flex items-center gap-2">
                    <DoorOpen size={24} />
                    Available Rooms
                  </h3>
                  <div className="text-sm">
                    <span className="font-bold text-green-600">
                      {availableRooms.length} Available
                    </span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span className="font-bold text-orange-600">
                      {bookedRooms.length} Booked
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {shelter.rooms.map((room) => {
                    const isSelected = selectedRooms.includes(room.roomNumber);
                    const isBooked = room.status === "booked";

                    return (
                      <button
                        key={room.roomNumber}
                        onClick={() =>
                          !isBooked && handleRoomSelection(room.roomNumber)
                        }
                        disabled={isBooked}
                        className={`relative p-4 rounded-2xl border-2 transition-all ${
                          isBooked
                            ? "bg-orange-50 border-orange-200 cursor-not-allowed opacity-75"
                            : isSelected
                            ? "bg-[#183D8B] border-blue-600 text-white shadow-lg scale-105"
                            : "bg-white border-gray-200 hover:border-blue-400 hover:shadow-md"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span
                            className={`text-2xl font-black ${
                              isBooked
                                ? "text-orange-600"
                                : isSelected
                                ? "text-white"
                                : "text-gray-700"
                            }`}
                          >
                            {room.roomNumber}
                          </span>

                          {isBooked && room.bookedPet?.petImage && (
                            <img
                              src={`${IMAGE_URL}/${room.bookedPet.petImage}`}
                              alt={room.bookedPet.petName}
                              className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                          )}

                          {isSelected && !isBooked && (
                            <CheckCircle size={16} className="text-white" />
                          )}

                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider ${
                              isBooked
                                ? "text-orange-600"
                                : isSelected
                                ? "text-blue-100"
                                : "text-gray-500"
                            }`}
                          >
                            {isBooked
                              ? "Booked"
                              : isSelected
                              ? "Selected"
                              : "Available"}
                          </span>

                          {isBooked && room.bookedPet?.petName && (
                            <span className="text-[9px] text-orange-500 truncate w-full text-center">
                              {room.bookedPet.petName}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedRooms.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-sm font-bold text-blue-900">
                      Selected Rooms:{" "}
                      {selectedRooms.sort((a, b) => a - b).join(", ")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-8 mt-0 md:mt-[-8px]">
            <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.09)] border border-gray-100 h-[585px] flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Info size={28} className="text-[#183D8B]" />
                <h2 className="text-2xl font-bold text-[#183D8B] uppercase tracking-tighter">
                  About Us
                </h2>
              </div>
              <div className="overflow-y-auto flex-1 pr-2">
                <p className="text-black leading-relaxed text-left">
                  {shelter.description}
                </p>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#183D8B] mb-4 uppercase tracking-tight">
                Ratings & Reviews
              </h2>
              <ShelterReviews shelterId={shelter._id} />
            </div>
          </div>
        </div>

        <div className="fixed bottom-8 left-0 right-0 z-50 px-4 pointer-events-none flex justify-center">
          <button
            disabled={shelter.status?.toUpperCase() === "UNAVAILABLE"}
            onClick={handleBookNow}
            className={`pointer-events-auto text-lg font-bold px-12 py-3 rounded-lg shadow-lg transition-all transform flex items-center justify-center gap-3 uppercase tracking-wider ${
              shelter.status?.toUpperCase() === "UNAVAILABLE"
                ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none border border-gray-400"
                : "bg-[#183D8B] hover:bg-[#122e6b] text-white hover:-translate-y-1 active:scale-95 shadow-[0_10px_25px_rgba(24,61,139,0.3)]"
            }`}
          >
            {shelter.status?.toUpperCase() === "UNAVAILABLE"
              ? "NOT BOOKABLE"
              : selectedRooms.length > 0
              ? `BOOK ${selectedRooms.length} ROOM${
                  selectedRooms.length > 1 ? "S" : ""
                }`
              : "SELECT ROOMS TO BOOK"}
          </button>
        </div>
      </div>
    </div>
  );
}