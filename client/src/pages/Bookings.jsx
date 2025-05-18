import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import bookingService from "../services/bookingService";
import BookingCard from "../components/BookingCard";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await bookingService.getMyBookings();
        setBookings(data.data.bookings);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch bookings");
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-center py-8">
        Please{" "}
        <a href="/login" className="text-blue-600">
          login
        </a>{" "}
        to view your bookings
      </div>
    );
  }

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">You don't have any bookings yet.</p>
          <a href="/destinations" className="text-blue-600 hover:underline">
            Browse destinations
          </a>
        </div>
      )}
    </div>
  );
};

export default Bookings;
