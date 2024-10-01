"use client"
import React, { createContext, useState, useContext } from 'react';

const RoleContext = createContext('');
export const RoleContextProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState('');

  return <RoleContext.Provider value={{ currentRole, setCurrentRole }}>{children}</RoleContext.Provider>;
};

export const useCurrentRole = () => useContext(RoleContext);
