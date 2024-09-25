import React from "react";

const BannerArea: React.FC = () => {
  return (
    <div className="py-10 bg-gray-800 h-[500px] text-white w-full">
      <div className="container mx-auto text-center">
        <div className="mt-5">
          <h1 className="text-4xl font-bold mb-4 mt-10">
            Transform Your Exhibition Experience <br/> with SaveConnects.
          </h1>
        </div>
        <div className="mb-6">
          <img
            src="/images/web-qr-sample.jpg"
            alt="QR Code"
            className="mx-auto h-48 w-48 rounded-sm"
          />
        </div>
        <p className="w-2/4 m-auto">
          Let’s simplify your networking. SaveConnects makes it effortless for
          exhibitors to connect, share, and grow. One-click is all it takes to
          turn contacts into opportunities. Join us and experience the future of
          exhibition networking.
        </p>
        <a
          href="/create-account"
          className="bg-blue-500 text-white py-3 px-8 w-max relative top-8 rounded-full text-lg hover:bg-blue-700 mt-10 no-underline"
        >
          Create Account
        </a>
      </div>
    </div>
  );
};

export default BannerArea;
