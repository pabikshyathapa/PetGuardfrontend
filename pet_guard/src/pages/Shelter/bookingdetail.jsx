import { useEffect, useState } from "react";
import { getBookingDetails } from "../../services/Shelter/shelterbooking";

export default function BookingDetailsModal({ bookingId, onClose }) {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    getBookingDetails(bookingId).then((res) => setBooking(res.data));
  }, [bookingId]);

  if (!booking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-[600px] max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4">Booking Details</h3>

        {/* OWNER DETAILS */}
        <div className="mb-4">
          <h4 className="font-semibold text-lg mb-1">Owner Information</h4>
          <p><strong>Name:</strong> {booking.petOwner.name}</p>
          <p><strong>Contact:</strong> {booking.petOwner.phone}</p>
        </div>

        <hr className="my-3" />

        {/* PET DETAILS */}
        <h4 className="font-semibold text-lg mb-2">Pet Details</h4>

        {booking.pets.map((pet, index) => (
          <div
            key={index}
            className="border rounded p-3 mb-3 bg-gray-50"
          >
            <div className="flex gap-4">
              {/* PET IMAGE */}
              {pet.photo && (
                <img
                  src={`http://localhost:5050/uploads/${pet.photo}`}
                  alt={pet.petName}
                  className="w-24 h-24 object-cover rounded"
                />
              )}

              {/* PET INFO */}
              <div>
                <p className="font-semibold text-lg">
                  🐾 {pet.petName}
                </p>
                <p><strong>Type:</strong> {pet.type}</p>
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Gender:</strong> {pet.gender}</p>
                <p><strong>Age:</strong> {pet.age} years</p>
                <p><strong>Weight:</strong> {pet.weight} kg</p>
              </div>
            </div>

            {/* EXTRA DETAILS */}
            <div className="mt-2">
              <p><strong>Location:</strong> {pet.location}</p>
              <p><strong>Health:</strong> {pet.health}</p>

              <p className="mt-1">
                <strong>Characteristics:</strong>{" "}
                {pet.characteristics?.join(", ")}
              </p>

              <p className="mt-1">
                <strong>Emergency Contact:</strong>{" "}
                {pet.emergencyContact?.name} ({pet.emergencyContact?.phone})
              </p>
            </div>
          </div>
        ))}

        <hr className="my-3" />

        {/* BOOKING INFO */}
        <div>
          <h4 className="font-semibold text-lg mb-1">Booking Info</h4>
          <p><strong>Service:</strong> {booking.serviceType}</p>
          <p>
            <strong>Dates:</strong>{" "}
            {new Date(booking.startDate).toDateString()} –{" "}
            {new Date(booking.endDate).toDateString()}
          </p>
          <p><strong>Total Days:</strong> {booking.totalDays}</p>
          <p><strong>Total Amount:</strong> Rs {booking.totalAmount}</p>
          <p>
            <strong>Payment:</strong> {booking.payment.method} (
            {booking.payment.status})
          </p>
          <p><strong>Status:</strong> {booking.bookingStatus}</p>
        </div>

        <button
          onClick={onClose}
          className="mt-5 bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}
