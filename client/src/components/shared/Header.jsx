import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/authContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          TravelApp
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/destinations" className="hover:text-blue-200">
            Destinations
          </Link>
          <Link to="/about" className="hover:text-blue-200">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-200">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/profile" className="hover:text-blue-200">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
