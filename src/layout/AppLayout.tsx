import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../context/AppProvider";
import SideBar from "../common/SideBar";
import Header from "../common/Header";

const AppLayout: React.FC = () => {
  const location = useLocation();
  const { sideBarOpen } = useAppContext();
  
  const companyNameKey = localStorage.getItem("companyNameKey") || "";
  const isCompanyRoute = location.pathname === `/${companyNameKey}`;
  
  const excludedPaths = ["/login", "/signup", "/admin", "/", "/forgot-password", "/reset-password"];
  const shouldShowSidebar = !excludedPaths.includes(location.pathname);

  return (
    <div className="relative flex h-screen overflow-hidden">
      {shouldShowSidebar && <SideBar />}
      <div
        className={`flex flex-col flex-grow transition-all duration-300 ${
          shouldShowSidebar ? (sideBarOpen ? "lg:ml-64" : "lg:ml-0") : "lg:ml-0"
        } ${sideBarOpen && !shouldShowSidebar ? "ml-0" : ""}`}
      >
        {shouldShowSidebar && (
          <Header
            breadcrumb={
              isCompanyRoute ? "Dashboard" : location.pathname === "/dashboard" ? "Dashboard" : "Attendees"
            }
          />
        )}
        <main className="flex-grow overflow-auto p-2">
          <Outlet />
        </main>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default AppLayout;