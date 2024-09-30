import React from "react";
import { useNavigate } from "react-router-dom";

const BannerArea: React.FC = () => {
  const navigate = useNavigate();
  return ( 
    <div className="bg-gray-800 text-white w-full sm:h-screen overflow-hidden mt-[60px] relative">
      <div className="container mx-auto text-center">
        <div className="">
          <h1 className="sm:text-[40px] text-[20px] font-bold mt-10 flicker">
            Transform Your Exhibition Experience <br /> with SaveConnects.
          </h1>
        </div>

        {/* <img data-aos="fade-right" src="/icon/grid 1.png" alt="Banner Image" className="absolute bottom-52 left-[40px] z-10" />
        <img data-aos="fade-left" src="/icon/arrow-styled.png" alt="Banner Image" className="absolute top-20 right-[50px] z-10" /> */}

        <div>
          <p className="sm:w-2/4 m-auto sm:text-[16px] text-[10px] p-3">
            Let’s simplify your networking. SaveConnects makes it effortless for
            exhibitors to connect, share, and grow. One-click is all it takes to
            turn contacts into opportunities. Join us and experience the future
            of exhibition networking.
          </p>
          <a
            onClick={() => navigate("/signup")}
            className="z-10 bg-blue-500 text-white sm:py-3 py-2 px-8 w-max relative top-8 rounded-full text-lg hover:bg-blue-700 mt-10 no-underline"
          >
            Create Account
          </a>
        </div>

        <img
          src="/images/saveconnects-header.jpeg"
          alt="Banner Image"
          className="sm:w-2/2 m-auto relative sm:top-[0px] z-0 w-[100%] top-[90px]"
        />
      </div>
    </div>
  );
};

export default BannerArea;
