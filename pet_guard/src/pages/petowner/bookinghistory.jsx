import { useEffect, useState } from "react";
import { getBookingHistory, cancelBooking } from "../../services/Shelter/shelterbooking";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await getBookingHistory();
      setBookings(data.bookings);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      fetchBookings(); // refresh after cancel
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Booking History</h2>
      <ul>
        {bookings.map((b) => (
          <li key={b._id} style={{ marginBottom: "10px" }}>
            <p>Shelter: {b.shelter.name}</p>
            <p>Status: {b.bookingStatus} | Payment: {b.payment.status}</p>
            <p>Start Date: {new Date(b.startDate).toLocaleDateString()}</p>
            <p>Created: {new Date(b.createdAt).toLocaleString()}</p>
            {b.canCancel && <button onClick={() => handleCancel(b._id)}>Cancel</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
