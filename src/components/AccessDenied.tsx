import React from "react";
import { useNavigate } from "react-router-dom";

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="container mx-auto flex items-center justify-center">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="text-center">
          <h1 className="text-[20px] md:text-[40px] font-bold mb-4 text-red-600">
            Access Denied
          </h1>
          <p className="text-[10px] md:text-[20px] text-gray-500 mb-6">
            You need to log in to access this page.
          </p>
          <button
            onClick={handleLoginRedirect}
            className="bg-naviblue text-white px-6 py-2 rounded-lg hover:bg-naviblue/90 border-0"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
