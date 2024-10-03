import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const HowItsWorks: React.FC = () => {
  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <div className="bg-white">
      <section className="container mx-auto">
        <section className="grid grid-cols-1 grid-rows-3 items-center justify-around gap-0">
          <div className="flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center">
            <div className="p-4 hover:shadow-gray-300 w-5/6">
              <div className="flex justify-center sm:justify-center md:justify-center lg:justify-start">
                <img
                  src="/icon/hand.svg"
                  alt="Quote"
                  className=" w-20 h-full"
                />
              </div>
              <h1 className="font-poppins text-[20px] sm:text-[40px] text-center sm:text-center md:text-center lg:text-start">
                Generate QR Code
              </h1>
              <p className="text-gray-400 text-[12px] sm:text-[16px] text-center sm:text-center md:text-center lg:text-start md:w-2/1 mt-10">
                Unlock the power of QR codes for seamless connectivity. Whether
                you're looking to share links, business details, or custom
                content, QR codes provide an instant and convenient way to
                bridge the digital and physical worlds. Discover how easy it is
                to generate your personalised QR code in just a few clicks!
              </p>
            </div>

            <div className="p-4 hover:shadow-gray-300 md:w-full">
              <img
                src="/images/Component-1.png"
                alt="Quote"
                className="w-[300px] md:w-full"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center md:flex-col lg:flex-row">
            <div className="p-4 hover:shadow-gray-300 md:w-full">
              <img
                src="/images/Component-2.png"
                alt="Quote"
                className="w-[300px] md:w-full"
              />
            </div>

            <div className="p-4 hover:shadow-gray-300 w-5/6">
              <div className="flex justify-center sm:justify-center md:justify-center lg:justify-end">
                <img src="/icon/qr.svg" alt="Quote" className=" w-20 h-full" />
              </div>
              <h1 className="font-poppins text-[20px] sm:text-[40px] text-center sm:text-center md:text-center lg:text-end">
                Save & Export Contacts
              </h1>
              <p className="text-gray-400 text-[12px] sm:text-[18px] text-center sm:text-center md:text-center lg:text-end md:w-full mt-10">
                Effortlessly save and export contacts using QR codes. Simplify
                networking by generating codes that allow others to instantly
                add your information to their devices. Whether you're at a
                conference or meeting, a quick scan ensures seamless connection
                and hassle-free contact sharing.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-col-reverse lg:flex-row items-center">
            <div className="p-4 hover:shadow-gray-300 w-5/6">
              <div className="flex justify-center sm:justify-center md:justify-center lg:justify-start">
                <img
                  src="/icon/rocket.svg"
                  alt="Quote"
                  className=" w-20 h-full"
                />
              </div>
              <h1 className="font-poppins text-[20px] sm:text-[40px] text-center sm:text-center md:text-center lg:text-start">
                ⁠Connect at Exhibitions
              </h1>
              <p className="text-gray-400 text-[12px] sm:text-[18px] text-center sm:text-center md:text-center lg:text-start md:w-full mt-10">
                Use QR codes to make your experience at exhibitions easier.
                Create personalised QR codes and share your company's
                information, product data, or promotional content with ease.
                Attendees may engage with your brand with only a quick scan,
                which makes networking easier and more effective.
              </p>
            </div>

            <div className="p-4 hover:shadow-gray-300 md:w-full">
              <img
                src="/images/Component-3.png"
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
