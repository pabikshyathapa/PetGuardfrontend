import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, EffectCoverflow } from "swiper";
import { MapPin, Phone, Info } from "lucide-react";

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

export default function ShelterDetails() {
  const { id } = useParams();
  const [shelter, setShelter] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    getShelterById(id).then(setShelter);
  }, [id]);

  if (!shelter)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <p className="text-xl font-bold text-[#183D8B] animate-pulse">
          Loading...
        </p>
      </div>
    );

  return (
    <div className="bg-white min-h-screen pb-20">
      {" "}
      <Header />
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        {" "}
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
                  />{" "}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnails */}
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

            {/* Shelter Info */}
            <div className="mt-6 space-y-4">
              {" "}
              <div className="flex flex-col">
                <h1 className="text-4xl font-extrabold text-[#183D8B] tracking-tight">
                  {shelter.name}
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-green-100 text-green-700 text-xs font-black px-3 py-1 rounded-full tracking-widest uppercase border border-green-200">
                    {shelter.status || "AVAILABLE"}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[#183D8B] font-semibold flex items-center gap-2">
                  <MapPin size={18} className="text-[#183D8B]" />{" "}
                  {shelter.location}
                </p>
                <p className="text-[#183D8B] font-semibold flex items-center gap-2">
                  <Phone size={18} className="text-[#183D8B]" />{" "}
                  {shelter.contact}
                </p>
              </div>
              <div className="inline-block bg-[#183D8B] px-6 py-3 rounded-2xl shadow-md transform hover:-rotate-1 transition-transform">
                <p className="text-white text-sm font-medium opacity-80 uppercase tracking-wider">
                  Price per day
                </p>
                <p className="text-2xl font-bold text-white">
                  Rs {shelter.pricePerDay}
                </p>
              </div>
            </div>

            {/* Documents */}
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

          {/* Right Side: About & Ratings */}
          <div className="space-y-8 mt-0 md:mt-[-8px]">
            {" "}
            {/* About Us */}
            <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.09)] border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Info size={28} className="text-[#183D8B]" />
                <h2 className="text-2xl font-bold text-[#183D8B] uppercase tracking-tighter">
                  About Us
                </h2>
              </div>
              <p className="text-black leading-relaxed text-left">
                {shelter.description}
              </p>
            </div>
            {/* Ratings & Reviews */}
            <div>
              <h2 className="text-2xl font-bold text-[#183D8B] mb-4 uppercase tracking-tight">
                Ratings & Reviews
              </h2>

              <ShelterReviews shelterId={shelter._id} />
            </div>
          </div>
        </div>
        {/* Button*/}
        <div className="fixed bottom-8 left-0 right-0 z-50 px-4 pointer-events-none flex justify-center">
          <button className="pointer-events-auto bg-[#183D8B] hover:bg-[#0f2a63] text-white text-xl font-bold px-16 py-5 rounded-full shadow-[0_10px_30px_rgba(24,61,139,0.4)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3">
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
}
