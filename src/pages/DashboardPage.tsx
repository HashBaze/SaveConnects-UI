import React from "react";
import Dashboard from "../components/Dashboard";
import Header from "../common/Header";
import SideBar from "../common/SideBar";
import { useAppContext } from "../context/AppProvider";

const DashboardPage: React.FC = () => {
  const { sideBarOpen } = useAppContext();
  return (
    <>
      <SideBar />
      <div
        className={`flex flex-col flex-grow transition-all duration-300 ${
          sideBarOpen ? "lg:ml-64" : "lg:ml-0"
        } ${sideBarOpen ? "ml-0" : ""}`}
      >
        <Header breadcrumb="Dashboard" />
        <main className="flex-grow h-screen p-0 md:p-2">
          <Dashboard />
        </main>
      </div>
    </>
  );
};

export default DashboardPage;
