"use client";
import { useEffect, useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";

export const ItemsContext = createContext({
  items: {},
  setItems: () => {},
  offset: "",
  setOffset: () => {},
  year: "",
  setYear: () => {},
  data: {},
  setData: () => {},
  updateData: () => {},
});

export const ItemsProvider = ({ children }) => {
  ItemsProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(1);
  const [year, setYear] = useState(2024);
  const [data, setData] = useState({
   
  });

  const updateData = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const value = {
    items,
    setItems,
    offset,
    setOffset,
    year,
    setYear,
    data,
    setData,
    updateData
  };
  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};
