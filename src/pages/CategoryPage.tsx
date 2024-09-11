import React from "react";
import Categories from "../components/Categories";
import Header from "../common/Header";
import SideBar from "../common/SideBar";
import { useAppContext } from "../context/AppProvider";

const CategoryPage: React.FC = () => {
  const { sideBarOpen } = useAppContext();
  return (
    <>
      <SideBar />
      <div
        className={`flex flex-col flex-grow transition-all duration-300 ${
          sideBarOpen ? "lg:ml-64" : "lg:ml-0"
        } ${sideBarOpen ? "ml-0" : ""}`}
      >
        <Header breadcrumb="Categories" />
        <main className="flex-grow overflow-auto p-2">
          <Categories />
        </main>
      </div>
    </>
  );
};

export default CategoryPage;
