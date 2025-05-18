import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/bookings";

// Create booking
const createBooking = async (bookingData) => {
  const response = await axios.post(API_URL, bookingData);
  return response.data;
};

// Get all bookings (admin only)
const getAllBookings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get user bookings
const getMyBookings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/my-bookings`, config);
  return response.data;
};

// Get single booking
const getBooking = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${id}`, config);
  return response.data;
};

// Update booking (admin only)
const updateBooking = async (id, bookingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(`${API_URL}/${id}`, bookingData, config);
  return response.data;
};

// Delete booking (admin only)
const deleteBooking = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

// Get checkout session
const getCheckoutSession = async (destinationId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/checkout-session/${destinationId}`,
    config
  );
  return response.data;
};

const bookingService = {
  createBooking,
  getAllBookings,
  getMyBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  getCheckoutSession,
};

export default bookingService;
