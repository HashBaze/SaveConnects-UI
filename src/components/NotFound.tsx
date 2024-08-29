import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto flex items-center justify-center">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="text-center">
          <h1 className="text-[20px] md:text-[40px] font-bold mb-4 text-naviblue">
            404 - URL Not Found
          </h1>
          <p className="text-[10px] md:text-[20px] text-gray-500">
            The page you are looking for does not exist.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
