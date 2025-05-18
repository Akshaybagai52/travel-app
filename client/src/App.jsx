import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Header from "./components/shared/Header";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Destination from "./pages/Destination";
import Footer from "./components/shared/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import Reviews from "./pages/Reviews";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      {/* <Router> */}
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:id" element={<Destination />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route
                path="/profile"
                element={<PrivateRoute element={<Profile />} />}
              />
              <Route
                path="/bookings"
                element={<PrivateRoute element={<Bookings />} />}
              />
            </Routes>
          </main>
          <Footer />
        </div>
      {/* </Router> */}
    </AuthProvider>
  );
}

export default App;
