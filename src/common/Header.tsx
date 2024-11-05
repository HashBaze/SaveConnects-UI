import React from "react";
import { Breadcrumb } from "../interface/InterFace";
import { useAppContext } from "../context/AppProvider";

const Header: React.FC<Breadcrumb> = ({ breadcrumb }: Breadcrumb) => {
  const { toggleSideBar, salesPersonName } = useAppContext();

  return (
    <div className="relative top-0 z-10 fixed flex h-12 items-center justify-between bg-white p-4 shadow-md border-b border-gray-200">
      <div className="flex items-center">
        <span className="font-bold text-[22px] text-naviblue hidden md:inline">
          {breadcrumb}
        </span>
      </div>
      <div className="flex items-center space-x-4 px-8">
        <div
          className="flex items-center cursor-pointer md:ml-4 ml-4 absolute md:relative left-0 md:left-auto"
          onClick={toggleSideBar}
        >
          <img
            className="w-12 h-12 rounded-full"
            src="/icon/menu.svg"
            alt="Menu"
          />
        </div>
        <div className="flex space-x-4 items-center">
          <div className="flex flex-col space-y-1 text-sm text-naviblue font-mono sm:font-bold">
            <span>{salesPersonName}</span>
            <span>{localStorage.getItem("companyNameKey")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
