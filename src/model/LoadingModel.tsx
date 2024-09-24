import React from "react";

const LoadingModal: React.FC = () => {
  return (
    <div className="fixed absolute inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="flex p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center space-x-4">
          <svg
            className="animate-spin h-10 w-10 text-naviblue"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-xl font-medium text-naviblue">
            Uploading ...
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
