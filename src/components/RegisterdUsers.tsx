import React from "react";

export const RegisterdUsers: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto mt-10 mb-10">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Registered Users
        </h2>
      </div>
      <p className="mx-auto text-center text-[14px] sm:text-[15px] text-gray-400 sm:w-2/5">
        Join a growing community of professionals connecting and expanding their
        networks with SaveConnects!
      </p>
      <section className="container mx-auto">
        <div className="grid grid-cols-2 grid-rows-4 sm:grid-cols-5 sm:grid-rows-2 gap-10 p-10 mt-10">
          <div className="p-4 rounded-md hover:shadow-gray-300">
            <img
              className="h-[100%] w-[100%] rounded-full"
              src="/images/client-1.svg"
              alt=""
            ></img>
          </div>
          <div className="p-4 rounded-md hover:shadow-gray-300">
            <img
              className="h-[100%] w-[100%] rounded-full"
              src="/images/client-2.svg"
              alt=""
            ></img>
          </div>
          <div className="p-4 rounded-md hover:shadow-gray-300">
            <img
              className="h-[100%] w-[100%] rounded-full"
              src="/images/client-3.svg"
              alt=""
            ></img>
          </div>
          <div className="p-4 rounded-md hover:shadow-gray-300">
            <img
              className="h-[100%] w-[100%] rounded-full"
              src="/images/client-6.svg"
              alt=""
            ></img>
          </div>
          <div className="p-4 rounded-md hover:shadow-gray-300">
            <img
              className="h-[100%] w-[100%] rounded-full"
              src="/images/client-5.svg"
              alt=""
            ></img>
          </div>
          <div className="p-4 rounded-md hover:shadow-gray-300">
            <img
              className="h-[100%] w-[100%] rounded-full"
              src="/images/client-6.svg"
              alt=""
            ></img>
          </div>
          <div className="p-4 rounded-md hover:shadow-gray-300">
            <img
              className="h-[100%] w-[100%] rounded-full"
              src="/images/client-5.svg"
              alt=""
            ></img>
          </div>
          <div className="p-4 rounded-md hover:shadow-gray-300">
            <img
              className="h-[100%] w-[100%] rounded-full"
              src="/images/client-2.svg"
              alt=""
            ></img>
          </div>
          <div className="p-4 rounded-md hover:shadow-gray-300">
            <img
              className="h-[100%] w-[100%] rounded-full"
              src="/images/client-3.svg"
              alt=""
            ></img>
          </div>
          <div className="p-4 rounded-md hover:shadow-gray-300">
            <img
              className="h-[100%] w-[100%] rounded-full"
              src="/images/client-1.svg"
              alt=""
            ></img>
          </div>
        </div>
      </section>
      
    </div>
  );
};
