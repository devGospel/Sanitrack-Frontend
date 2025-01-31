"use client"
// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in when app initializes
  useEffect(() => {
    const loggedIn =
      typeof window !== "undefined"
        ? localStorage.getItem("isLoggedIn")
        : null === "true";
        if(isLoggedIn){
          setIsLoggedIn(loggedIn);
        }
   
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy access to auth context
export const useAuthState = () => useContext(AuthContext);
