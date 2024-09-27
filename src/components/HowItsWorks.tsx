import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

export const HowItsWorks: React.FC = () => {

    useEffect(() => {
        AOS.init(); // Initialize AOS
      }, []);

  return (
    <div className="bg-white">
      <section className="container mx-auto">
        <section className="grid grid-cols-1 grid-rows-3 shadow-sm items-center justify-around gap-0">
            
          <div className="flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center" >

            <div className="p-4 hover:shadow-gray-300" >
              <div className="flex justify-center sm:justify-center md:justify-center lg:justify-start">
                <img 
                  src="/icon/hand.svg"
                  alt="Quote"
                  className=" w-20 h-full"
                />
              </div>
              <h1 className="font-poppins text-[20px] sm:text-[40px] text-center sm:text-center md:text-center lg:text-start">
                Works on all platforms
              </h1>
              <p className="text-gray-400 text-[12px] sm:text-[18px] text-center sm:text-center md:text-center lg:text-start md:w-full mt-10">
                Duis aute irure dolor in reprehenderit in voluptate esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui official.
              </p>
            </div>

            <div className="p-4 hover:shadow-gray-300 md:w-full">
              <img
                src="/images/mobile-with-laptop.png"
                alt="Quote"
                className="w-[300px] md:w-full"
              />
            </div>
          </div>


          <div className="flex flex-col justify-center items-center md:flex-col lg:flex-row">

          <div className="p-4 hover:shadow-gray-300 md:w-full">
              <img
                src="/images/mobile-with-laptop.png"
                alt="Quote"
                className="w-[300px] md:w-full"
              />
            </div>


            <div className="p-4 hover:shadow-gray-300">
              <div className="flex justify-center sm:justify-center md:justify-center lg:justify-end">
                <img
                  src="/icon/qr.svg"
                  alt="Quote"
                  className=" w-20 h-full"
                />
              </div>
              <h1 className="font-poppins text-[20px] sm:text-[40px] text-center sm:text-center md:text-center lg:text-end">
                Works on all platforms
              </h1>
              <p className="text-gray-400 text-[12px] sm:text-[18px] text-center sm:text-center md:text-center lg:text-end md:w-full mt-10">
                Duis aute irure dolor in reprehenderit in voluptate esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui official.
              </p>
            </div>

            
          </div>


          <div className="flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center">
            <div className="p-4 hover:shadow-gray-300">
              <div className="flex justify-center sm:justify-center md:justify-center lg:justify-start">
                <img
                  src="/icon/rocket.svg"
                  alt="Quote"
                  className=" w-20 h-full"
                />
              </div>
              <h1 className="font-poppins text-[20px] sm:text-[40px] text-center sm:text-center md:text-center lg:text-start">
                Works on all platforms
              </h1>
              <p className="text-gray-400 text-[12px] sm:text-[18px] text-center sm:text-center md:text-center lg:text-start md:w-full mt-10">
                Duis aute irure dolor in reprehenderit in voluptate esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui official.
              </p>
            </div>

            <div className="p-4 hover:shadow-gray-300 md:w-full">
              <img
                src="/images/mobile-with-laptop.png"
                alt="Quote"
                className="w-[300px] md:w-full"
              />
            </div>
          </div>

          

        </section>
      </section>
    </div>
  );
};
