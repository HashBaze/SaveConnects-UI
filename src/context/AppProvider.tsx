import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AppContextType } from "../interface/InterFaces";

const AppContext = createContext<AppContextType | null>(null);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(true);
  const [salesPersonName, setSalesPersonName] = useState(""); 


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
        salesPersonName : salesPersonName,
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
          designation: "",
          facebookProfile: "",
          linkedinProfile: "",
          instagramProfile: "",
        },
        setExhibitor: () => { return; },
        setSelsePersonName: (name: string) => setSalesPersonName(name)
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
