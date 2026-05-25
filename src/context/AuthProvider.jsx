import { useState, useContext, useEffect } from "react";
import { isTokenValid } from "../utils/jwt.utils.js";
import { AuthContext } from "./AuthContext.js";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");

    return !!token && isTokenValid(token);
  });

  const token = localStorage.getItem("token");

  if (token && !isTokenValid(token)) {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
