import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/destinations";

// Get all destinations
const getDestinations = async (params) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

// Get single destination
const getDestination = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create destination (admin only)
const createDestination = async (destinationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, destinationData, config);
  return response.data;
};

// Update destination (admin only)
const updateDestination = async (id, destinationData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(
    `${API_URL}/${id}`,
    destinationData,
    config
  );
  return response.data;
};

// Delete destination (admin only)
const deleteDestination = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const destinationService = {
  getDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination,
};

export default destinationService;
