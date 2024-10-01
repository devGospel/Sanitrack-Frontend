// src/contexts/AuthContext.js
"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthRolesContext = createContext();

export const AuthRolesProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [token, setToken] = useState('');
  const [roles,setRoles]= useState([]);
  const [id, setId] = useState('');
  // Check if user is logged in when app initializes
 

  return <AuthRolesContext.Provider value={{ modal,setModal,token,setToken,id,setId ,setRoles,roles}}>{children}</AuthRolesContext.Provider>;
};

// Hook for easy access to auth context
export const useAuthRolesState = () => useContext(AuthRolesContext);
