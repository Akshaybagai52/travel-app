import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/authContext";
import destinationService from "../services/destinationService";
// import bookingService from "../services/bookingService";
// import ReviewCard from "../components/reviews/ReviewCard";
// import ReviewForm from "../components/reviews/ReviewForm";

const Destination = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingData, setBookingData] = useState({
    startDate: "",
    participants: 1,
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const { data } = await destinationService.getDestination(id);
        setDestination(data.data.destination);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookNow = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const booking = {
        destination: id,
        user: user._id,
        price: destination.price * bookingData.participants,
        startDate: bookingData.startDate,
        participants: bookingData.participants,
      };

    //   await bookingService.createBooking(booking);
      navigate("/bookings");
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{destination.name}</h1>
          <div className="mb-6">
            <img
              src={destination.images[0]}
              alt={destination.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{destination.description}</p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {destination.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
            {destination.reviews.length > 0 ? (
              <div className="space-y-4">
                {/* {destination.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))} */}
                review card
              </div>
            ) : (
              <p>No reviews yet.</p>
            )}
            {user && !showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add Review
              </button>
            )}
            {/* {showReviewForm && (
              <ReviewForm
                destinationId={id}
                onCancel={() => setShowReviewForm(false)}
              />
            )} */}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-2xl font-bold mb-4">Book Now</h2>
            <div className="mb-4">
              <label className="block mb-2">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={bookingData.startDate}
                onChange={handleBookingChange}
                className="w-full p-2 border rounded"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Participants</label>
              <input
                type="number"
                name="participants"
                value={bookingData.participants}
                onChange={handleBookingChange}
                min="1"
                max="10"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <p className="text-xl font-semibold">
                Total: ${destination.price * bookingData.participants}
              </p>
            </div>
            <button
              onClick={handleBookNow}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg text-lg"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
