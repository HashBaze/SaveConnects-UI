import React, { createContext, useContext, useState, ReactNode } from "react";
import { AppContextType } from "../interface/Interface";

const AppContext = createContext<AppContextType | null>(null);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);
  const toggleSideBar = () => setSideBarOpen(prev => !prev);

  return (
    <AppContext.Provider
      value={{ sideBarOpen, setSideBarOpen, toggleSideBar }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default AppProvider;