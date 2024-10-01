// src/contexts/AuthContext.js
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationsContext = createContext();

export const LocationsProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [token, setToken] = useState('');
  const [locations, setLocations] = useState([]);
  const [id, setId] = useState('');
  // Check if user is logged in when app initializes

  return (
    <LocationsContext.Provider
      value={{
        modal,
        setModal,
        token,
        setToken,
        id,
        setId,
        setLocations,
        locations,
      }}>
      {children}
    </LocationsContext.Provider>
  );
};

// Hook for easy access to auth context
export const useLocationsState = () => useContext(LocationsContext);
