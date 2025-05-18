import { useState, useContext } from "react";
import reviewService from "../../services/reviewService";
import AuthContext from "../context/authContext";

const ReviewForm = ({ destinationId, onCancel }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    review: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reviewService.createReview({
        destination: destinationId,
        rating: formData.rating,
        review: formData.review,
      });
      setSuccess(true);
      setTimeout(() => {
        onCancel();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review");
    }
  };

  if (success) {
    return (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
        Review submitted successfully!
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Add Your Review</h3>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Rating</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Very Poor</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Review</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
