"use client"
import React, { useContext, useState } from "react";

export const ContextApi = React.createContext();

export const useTheme = () => useContext(ContextApi);

export const ContextProvider = ({ children }) => {
  const [userId,setUserId] = useState("")
  const data = {
    userId,setUserId
  };

  return (
    <ContextApi.Provider value={{ data }}>{children}</ContextApi.Provider>
  );
};
