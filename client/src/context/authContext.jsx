import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getUser();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const getUser = async () => {
    try {
      const res = await axios.get("/api/v1/users/me");
      setUser(res.data.data.user);
      setIsLoading(false);
    } catch (err) {
      logout();
    }
  };

  const register = async (formData) => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/users/signup", formData);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/users/login", formData);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        register,
        login,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
