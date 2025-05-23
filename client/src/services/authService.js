import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/users";

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

// Get user profile
const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/me`, config);

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getProfile,
};

export default authService;
