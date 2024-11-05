import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppProvider";
import { getMenuItems } from "../data/MenuItem";
import { IMenuItem } from "../interface/Interface";
import { useNavigate, useLocation } from "react-router-dom";
import SignOutModal from "../model/SignOutModel";

const Sidebar: React.FC = () => {
  const { sideBarOpen, toggleSideBar } = useAppContext();
  const [activeItem, setActiveItem] = React.useState<number | null>(null);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseSignOutModal = () => setIsSignOutModalOpen(false);

  useEffect(() => {
    const companyNameKey = localStorage.getItem("companyNameKey");
    setMenuItems(getMenuItems(companyNameKey));
  }, []);

  const handleItemClick = (index: number, link: string) => {
    if (menuItems[index].label === "Sign Out") {
      setIsSignOutModalOpen(true);
    } else {
      setActiveItem(index);
      navigate(link);
      const mobile = window.innerWidth >= 440;
      if (!mobile && sideBarOpen) {
        toggleSideBar();
      }
    }
  };

  const handleSignOutConfirm = () => {
    localStorage.removeItem("companyNameKey");
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("role");
    navigate("/");
    setIsSignOutModalOpen(false);
  };

  useEffect(() => {
    const activeIndex = menuItems.findIndex(
      (item) => item.link === location.pathname
    );
    setActiveItem(activeIndex);
  }, [location.pathname, menuItems]);

  return (
    <>
      <div
        className={`fixed left-0 top-0 h-full bg-white border-r z-50 border-gray-200 shadow-lg transition-transform duration-300 ${
          sideBarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex mt-4 items-center justify-center h-20 border-b px-8">
          <img src="/images/Without-BG.png" alt="Logo" className="w-16" />
          <h1 className="text-[22px] ml-2 font-bold text-naviblue">
            SaveConnects
          </h1>
          {sideBarOpen && (
            <div
              className="absolute flex items-center justify-center cursor-pointer -right-3 top-11 w-6 h-6 bg-gray-500 border-2 rounded-full md:hidden"
              onClick={toggleSideBar}
            >
              <img
                className="w-4 h-4 rounded-full"
                src="/icon/arrow.svg"
                alt="Arrow"
              />
            </div>
          )}
        </div>
        <nav className="flex flex-col mt-4 space-y-6 p-4 overflow-y-auto">
          {menuItems.map((item, index) => (
            <a
              key={index}
              onClick={() => handleItemClick(index, item.link)}
              className={`flex items-center px-6 py-4 no-underline rounded-xl ${
                activeItem === index
                  ? "bg-naviblue text-white"
                  : "text-gray-700 hover:bg-gray-300"
              } cursor-pointer`}
            >
              <img
                src={item.icon}
                className={`w-6 h-6 mr-5 ${
                  activeItem === index ? "text-white" : "text-naviblue"
                }`}
                alt={item.alt}
                style={{
                  filter:
                    activeItem === index ? "brightness(0) invert(1)" : "none",
                }}
              />
              <span className="font-medium text-[16px]">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
      <SignOutModal
        isOpen={isSignOutModalOpen}
        onClose={handleCloseSignOutModal}
        onConfirm={handleSignOutConfirm}
      />
    </>
  );
};

export default Sidebar;
