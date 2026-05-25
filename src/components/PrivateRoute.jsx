import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/jwt.utils";

export default function PrivateRoute({ children, role }) {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  if (!isAuthenticated || !token || !isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }

  if (role) {
    const { role: userRole } = jwtDecode(token);

    if (userRole !== role) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
