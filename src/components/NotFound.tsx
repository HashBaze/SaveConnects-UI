import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-naviblue">404 - URL Not Found</h1>
        <p className="text-lg text-gray-500">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
