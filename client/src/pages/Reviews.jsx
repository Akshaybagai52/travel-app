import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import ReviewCard from "../components/ReviewCard";
import reviewService from "../services/reviewService";

const Reviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // const { data } = await reviewService.getAllReviews();
        setReviews(data.data.reviews);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch reviews");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Travel Reviews</h1>

      <div className="grid grid-cols-1 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        ) : (
          <p className="text-center text-gray-600">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
