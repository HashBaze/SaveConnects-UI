import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AppContextType } from "../interface/Interface";

const AppContext = createContext<AppContextType | null>(null);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);

  const toggleSideBar = () => setSideBarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const isMobileOrTablet = window.innerWidth <= 1024;
      setSideBarOpen(!isMobileOrTablet);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  

  return (
    <AppContext.Provider
      value={{
        sideBarOpen,
        setSideBarOpen,
        toggleSideBar,
        companyKey: "",
        setCompanyKey: () => {},
        exhibitor: {
          _id: "",
          email: "",
          salesPersonName: "",
          companyName: "",
          companyNameKey: "",
          coverImage: "",
          companyCategory: "",
          phoneNumber: "",
          website: "",
          address: "",
          about: "",
          gallery: [],
        },
        setExhibitor: () => {
          return;
        },
      }}
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
