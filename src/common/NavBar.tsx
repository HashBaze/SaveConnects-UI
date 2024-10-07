import React, { useEffect, useState } from "react";
import { IMenuItem } from "../interface/Interface";
import { isTokenExpired, logout } from "../utils/JWTUtils";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  isShowMenu: boolean;
  setIsShowMenu: (isShowMenu: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({isShowMenu,setIsShowMenu}: NavBarProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const path = window.location.pathname.split("/").pop() || "/";
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setMenuItems([
      {
        label: "Home",
        link: "/",
        icon: "home",
        alt: "Home",
      },
      {
        label: "Contact Us",
        link: "#contact",
        icon: "projects",
        alt: "Projects",
      },
    ]);
  }, []);

  const checkIfSignedIn = async () => {
    const accesstoken = localStorage.getItem("accesstoken");
    const companyNameKey = localStorage.getItem("companyNameKey");

    if (accesstoken && companyNameKey && companyNameKey === path) {
      if (isTokenExpired(accesstoken)) {
        logout();
      } else {
        setIsSignedIn(true);
      }
    } else {
      setIsSignedIn(false);
    }
  };

  useEffect(() => {
    checkIfSignedIn();
  }, []);

  return (
    <div>
      <nav className="bg-gray-800 fixed w-full z-30">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden p-2">
            <button
              onClick={() => setIsShowMenu(!isShowMenu)}
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 bg-gray-700 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center justify-center cursor-pointer z-20" onClick={()=>{
                navigate("/");
            }}>
              < img src="/images/only-logo.png" alt="Logo" className="h-20 w-auto" />
              <h3 className="text-center text-white font-poppins z-10 hidden sm:block">
                SaveConnects
              </h3>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="relative ml-3">
              <div>
                {isSignedIn ? (
                  <button
                    onClick={() => {
                      setIsOpenMenu(!isOpenMenu);
                    }}
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    ></img>
                  </button>
                ) : (
                  <a
                    onClick={() => navigate("/login")}
                    className="bg-blue-500 text-white sm:py-2 py-2 px-6 w-max rounded-full text-sm hover:bg-blue-700 no-underline whitespace-nowrap"
                  >
                    Sign In
                  </a>
                )}
              </div>

              {isOpenMenu ? (
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {isShowMenu ? (
        <div className="bg-gray-300 rounded-lg" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {menuItems.map((item, index) => (
              <div key={index} className="border-b border-gray-400 border-2 bg-slate-200 rounded-lg">
                <a
                  href={item.link}
                  className="text-gray-700 text-center hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium no-underline"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
    </div>
    
  );
};

export default NavBar;
