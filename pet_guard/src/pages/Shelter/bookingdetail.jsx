import { useEffect, useState, useRef } from "react";
import { getBookingDetails } from "../../services/Shelter/shelterbooking";
import {
  X,
  Download,
  Heart,
  ShieldAlert,
  Activity,
  PawPrint
} from "lucide-react";

export default function BookingDetailsModal({ bookingId, onClose }) {
  const [booking, setBooking] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    getBookingDetails(bookingId).then((res) => setBooking(res.data));
  }, [bookingId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 print:p-0">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col print:shadow-none print:max-h-full print:rounded-none"
      >
        {/* HEADER */}
        <div className="p-6 border-b flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-[#183D8B]/10 p-2 rounded-lg text-[#183D8B]">
              <PawPrint size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
              Pet Stay Details
            </h2>
          </div>
          <div className="flex items-center gap-3 print:hidden">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-all"
            >
              <Download size={16} /> Print Report
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={22} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-8 space-y-10 print:overflow-visible">
          {/* SECTION 1: PET INFORMATION */}
          <div className="space-y-8">
            {booking.pets.map((pet, index) => (
              <div key={index} className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {pet.photo && (
                    <div className="shrink-0 mx-auto lg:mx-0">
                      <img
                        src={`http://localhost:5050/uploads/${pet.photo}`}
                        alt={pet.petName}
                        className="w-40 h-40 object-cover rounded-2xl border-4 border-white shadow-xl"
                      />
                    </div>
                  )}

                  <div className="flex-1 w-full">
                    {/* ✅ PET NAME + ROOM */}
                    <div className="mb-6 border-b pb-4 flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-4xl font-extrabold text-gray-900">
                          {pet.petName}
                        </h3>

                        {booking.roomAssignments?.some(
                          (r) => r.petName === pet.petName
                        ) && (
                          <span
                            className="px-4 py-1 rounded-full text-sm font-bold 
                                       bg-blue-100 text-[#183D8B] 
                                       border border-blue-200"
                          >
                            Room{" "}
                            {
                              booking.roomAssignments.find(
                                (r) => r.petName === pet.petName
                              )?.roomNumber
                            }
                          </span>
                        )}
                      </div>

                      <p className="text-lg font-semibold text-[#183D8B]">
                        {pet.type} • {pet.breed}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">
                          Gender
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                          {pet.gender}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">
                          Age
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                          {pet.age} Years
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">
                          Weight
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                          {pet.weight} kg
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">
                          Location
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                          {pet.location}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-6 rounded-2xl border">
                        <div className="flex items-center gap-2 font-bold text-gray-800">
                          <Activity
                            size={18}
                            className="text-[#183D8B]"
                          />
                          Health & Medical Notes
                        </div>
                        <p className="text-gray-600 mt-2">
                          {pet.health ||
                            "No medical conditions reported."}
                        </p>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-2xl border">
                        <div className="flex items-center gap-2 font-bold text-gray-800">
                          <Heart size={18} className="text-[#183D8B]" />
                          Pet Characteristics
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {pet.characteristics?.map((tag, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-white text-gray-700 text-sm font-semibold rounded-lg border shadow-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-red-100 rounded-xl border border-[#183D8B]/20">
                  <ShieldAlert size={20} className="text-[#183D8B]" />
                  <div>
                    <p className="text-xs font-bold uppercase text-[#183D8B]">
                      Emergency Contact
                    </p>
                    <p className="text-sm font-bold text-gray-800">
                      {pet.emergencyContact?.name} —{" "}
                      {pet.emergencyContact?.phone}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SECTION 2: BOOKING DETAILS */}
          <div className="pt-4 space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400">
              Stay & Billing Details
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#183D8B]/5 p-5 rounded-2xl">
                <p className="text-xs font-bold uppercase text-[#183D8B]">
                  Primary Contact
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {booking.petOwner.name}
                </p>
                <p className="text-sm text-gray-600">
                  {booking.petOwner.phone}
                </p>
              </div>

              <div className="bg-slate-100 p-5 rounded-2xl">
                <p className="text-xs font-bold uppercase text-gray-500">
                  Service Type
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {booking.serviceType}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  Status: {booking.bookingStatus}
                </p>
              </div>

              <div className="bg-slate-100 p-5 rounded-2xl">
                <p className="text-xs font-bold uppercase text-gray-500">
                  Booking Period
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {new Date(
                    booking.startDate
                  ).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-400 my-1">to</p>
                <p className="text-sm font-bold text-gray-800">
                  {new Date(
                    booking.endDate
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="bg-[#183D8B]/5 border-2 border-[#183D8B]/20 rounded-2xl p-6 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold uppercase text-[#183D8B]">
                  Payment Method
                </p>
                <p className="text-lg font-bold capitalize text-gray-800">
                  {booking.payment.method}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase text-[#183D8B]">
                  Final Amount
                </p>
                <p className="text-3xl font-black text-[#183D8B]">
                  Rs {booking.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .fixed,
          .fixed * {
            visibility: visible;
          }
          .fixed {
            position: absolute;
            inset: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
