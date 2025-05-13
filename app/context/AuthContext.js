"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [role, setRole] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role"); 
    setIsLoggedIn(!!token);
    setRole(storedRole || null); 

    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setRole(localStorage.getItem("role") || null);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (token, userRole) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole); 
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); 
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);