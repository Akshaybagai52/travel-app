import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/authContext";

const PrivateRoute = ({ element: Element }) => {
  const { user } = useContext(AuthContext);

  return user ? <Element /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
