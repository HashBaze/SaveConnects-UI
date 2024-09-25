import React from "react";

const TopFeature: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-8">
          Key Features of SaveConnects 🚀
        </h2>

        <p className="text-center w-2/4 m-auto text-[14px] text-gray-400">
          We showcase only the best exhibitors and their products, all brought
          together with passion, simplicity, and creativity. With SaveConnects,
          effortlessly connect, share, and grow your exhibition experience!
        </p>

        {/* Slider/Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
          {/* Feature 1: Mobile Friendly */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-gray-300">
            <img
              src="/icon/web-mobile.svg"
              alt="Mobile Friendly"
              className="mx-auto mb-4 w-16 h-16"
            />
            <h3 className="text-xl font-semibold mb-2 text-naviblue">Mobile Friendly</h3>
            <p className="text-gray-400 text-[14px] mt-8">
              Our platform is fully optimized for mobile use, ensuring that you
              can connect on the go with ease.
            </p>
          </div>

          {/* Feature 2: One Click Contact Saving */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-gray-300">
            <img
              src="/icon/web-contact.svg"
              alt="One Click Contact Saving"
              className="mx-auto mb-4 w-15 h-14"
            />
            <h3 className="text-xl font-semibold mb-2 text-naviblue">
              One Click Contact Saving
            </h3>
            <p className="text-gray-400 text-[14px] mt-8">
              Save exhibitor contacts instantly with just one click, simplifying
              your networking experience.
            </p>
          </div>

          {/* Feature 3: Easy Connect through WhatsApp */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-gray-300">
            <img
              src="/icon/web-whatsapp.svg"
              alt="Easy Connect through WhatsApp"
              className="mx-auto mb-4 w-12 h-13"
            />
            <h3 className="text-xl font-semibold mb-2 text-naviblue">
              Easy Connect through WhatsApp
            </h3>
            <p className="text-gray-400 text-[14px] mt-8">
              Instantly connect with exhibitors via WhatsApp, bridging the gap
              with quick and efficient messaging.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFeature;
