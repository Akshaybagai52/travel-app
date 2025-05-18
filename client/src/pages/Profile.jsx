import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/authContext';
import bookingService from '../services/bookingService';
import BookingCard from '../components/BookingCard';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
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
        setError(err.response?.data?.message || 'Failed to fetch bookings');
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return <div className="text-center py-8">Please login to view your profile</div>;
  }

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <span className="text-4xl text-gray-500">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-grow">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600 capitalize">{user.role}</p>
              <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Your Bookings</h2>
          {bookings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {bookings.map((booking) => (
                <BookingCard key={booking._id} booking={booking} />
              ))}
            </div>
          ) : (
            <p>You don't have any bookings yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;