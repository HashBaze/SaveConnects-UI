import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 shadow p-7 sm:p-10">
      <div className="flex items-center justify-between">
        <span className="text-[10px] sm:text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a
            href="https://saveconnects.com"
            className="text-gray-300 no-underline"
          >
            saveConnects™&nbsp;
          </a>
          All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center text-[10px] sm:text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="privacy-policy" className="hover:underline me-4 md:me-6 text-gray-300">
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
