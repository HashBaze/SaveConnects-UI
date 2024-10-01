import React, { useEffect, useState } from "react";
import { IMenuItem } from "../interface/Interface";
import { isTokenExpired, logout } from "../utils/JWTUtils";

const NavBar: React.FC = () => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const path = window.location.pathname.split("/").pop() || "/";
  const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);

  useEffect(() => {
    setMenuItems([
      {
        label: "Home",
        link: "/",
        icon: "home",
        alt: "Home",
      },
      {
        label: "About Us",
        link: "/team",
        icon: "team",
        alt: "Team",
      },
      {
        label: "Contact Us",
        link: "/projects",
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
    <nav className="bg-gray-800 fixed w-full z-10">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden p-2">
            <button
              onClick={() => setIsShowMenu(!isShowMenu)}
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                fill="#fff"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <h1 className="text-white text-2xl font-bold">LOGO</h1>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium no-underline"
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
                    href="/login"
                    className="bg-blue-500 text-white sm:py-2 py-2 px-6 w-max rounded-full text-sm hover:bg-blue-700 no-underline"
                  >
                    Sign In
                  </a>
                )}
              </div>

              {isOpenMenu ? (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
        <div className="bg-white rounded-lg" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium no-underline"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default NavBar;
