"use client";
import { useEffect, useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";

export const SidebarContext = createContext({
  sidebarOpen: {},
  setSidebarOpen: () => {},
});

export const SidebarProvider = ({ children }) => {
  SidebarProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const value = {
    sidebarOpen,
    setSidebarOpen,
  };
  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
