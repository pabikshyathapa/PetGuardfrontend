import React, { useState, useEffect } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function LandingPage() {
  // 1. Array of images - replace these paths with your actual images
  const images = [
    "/images/main.png",
    "/images/main2.png",
    // "/images/main3.png",
  ];
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Logic to change image every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 12000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [images.length]);

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "#F3F1EE" }}>
      <Header />

      {/* HERO SECTION - Removed pt-20 to eliminate the gap */}
      <section className="relative w-full">
        <div className="relative w-full overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.12)]">
          {/* Invisible spacer to maintain original height/aspect ratio */}
          <img
            src={images[0]}
            className="w-full h-auto object-cover invisible"
            alt="spacer"
          />

          {/* Sliding images */}
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* Hero Text - Adjusted top position to keep it centered despite removed padding */}
        <div className="absolute top-1/4 left-20 z-10">
          <h2 className="text-4xl font-bold mb-6" style={{ color: "#183D8B" }}>
            Find and Book Today.
          </h2>

          <div className="relative w-[370px]">
            <input
              type="text"
              placeholder="Search shelters..."
              className="w-full px-5 py-3 pr-32 border shadow-md outline-none rounded-[20px]"
            />

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 text-white text-sm rounded-[14px] shadow"
              style={{ backgroundColor: "#183D8B" }}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="pt-20 pb-16 text-center px-6 -mt-12">
        <h2 className="text-4xl font-semibold tracking-wide font-serif text-[#183D8B]">
          Why Choose PetGuard?
        </h2>

        <p className="text-gray-700 text-2xl font-semibold max-w-4xl mx-auto mt-3">
          Easily find and connect with nearby verified shelters that meet your
          pet’s needs.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto">
          {/* CARD 1 */}
          <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            style={{ border: "2px solid #183D8B" }}
          >
            <img
              src="/images/card1.png"
              alt="Kind to Everyone"
              className="w-20 h-20 mx-auto mb-3 object-cover"
            />

            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "#183D8B" }}
            >
              Kind to Everyone
            </h3>

            <p className="text-gray-700">
              Every pet deserves to be safe, loved, and respected. PetGuard
              helps connect owners with trusted shelters and care services,
              ensuring every pet receives the attention and protection they
              deserve.{" "}
            </p>
          </div>

          {/* CARD 2 */}
          <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            style={{ border: "2px solid #183D8B" }}
          >
            <img
              src="/images/card2.png"
              alt="Connect to Shelters"
              className="w-20 h-20 mx-auto mb-3 object-cover"
            />

            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "#183D8B" }}
            >
              Connect to Shelters
            </h3>

            <p className="text-gray-700">
              Easily find and connect with nearby verified shelters that meet
              your pet’s needs. PetGuard brings trusted shelters closer to you,
              helping you choose the right place for your pet with confidence
              and peace of mind.{" "}
            </p>
          </div>

          {/* CARD 3 */}
          <div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            style={{ border: "2px solid #183D8B" }}
          >
            <img
              src="/images/card3.png"
              alt="Simple & Smart"
              className="w-20 h-20 mx-auto mb-3 object-cover"
            />

            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "#183D8B" }}
            >
              Simple & Smart
            </h3>

            <p className="text-gray-700">
              User-friendly design that makes managing your pet’s care
              effortless. PetGuard keeps everything simple and organized,
              allowing you to handle pet profiles, searches, and bookings with
              ease, all in one smooth, intuitive platform.{" "}
            </p>
          </div>
        </div>
      </section>

      {/* IMAGE SECTION IN GREY BOX */}
      <section className="py-10" style={{ backgroundColor: "#D9D9D9" }}>
        <div className="grid md:grid-cols-2 gap-10 max-w-[95%] mx-auto px-2">
          <img
            src="/images/hpshelter.jpg"
            className="w-full h-[450px] object-cover rounded-xl shadow-lg"
          />
          <img
            src="/images/dogs.jpg"
            className="w-full h-[450px] object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="text-center mt-10">
          <button
             onClick={() => navigate("/browseshelter")}
            className="text-white w-[200px] px-8 py-2 rounded-lg font-semibold shadow-md"
            style={{ backgroundColor: "#183D8B" }}
          >
            Explore <FaArrowRight className="inline-block ml-1"
 />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
