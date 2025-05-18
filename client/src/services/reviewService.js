import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/reviews";

// Get all reviews
const getAllReviews = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get reviews for a destination
const getDestinationReviews = async (destinationId) => {
  const response = await axios.get(`${API_URL}?destination=${destinationId}`);
  return response.data;
};

// Create review
const createReview = async (reviewData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, reviewData, config);
  return response.data;
};

// Update review
const updateReview = async (id, reviewData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(`${API_URL}/${id}`, reviewData, config);
  return response.data;
};

// Delete review
const deleteReview = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const reviewService = {
  getAllReviews,
  getDestinationReviews,
  createReview,
  updateReview,
  deleteReview,
};

export default reviewService;
