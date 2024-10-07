import React from "react";

export const Contact: React.FC = () => {
  return (
    <div className="bg-white py-12 px-6" id="contact">
      <div className="container mx-auto mt-10 mb-10">
        <h2 className="text-3xl font-bold text-center mb-6">
          Get in Touch with Us Save Connects
        </h2>
      </div>
      <section className="mx-auto container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-5">
          <div className="bg-white p-6 rounded-lg text-center hover:shadow-gray-300">
            <img
              src="/icon/phone.svg"
              alt="Mobile Friendly"
              className="mx-auto mb-4 w-12 h-12"
            />
            <h3 className="text-xl font-semibold mb-2 text-naviblue">
              <a
                className="text-naviblue no-underline"
                href="tel:+919999999999"
              >
                +91 9999999999
              </a>
            </h3>
            <p className="text-gray-400 text-[14px] mt-8">
              Have a question or need assistance? Our support team is ready to
              help. Reach out to us, and we’ll get back to you as soon as
              possible.
            </p>
          </div>

          {/* Feature 2: One Click Contact Saving */}
          <div className="bg-white p-6 rounded-lg text-center hover:shadow-gray-300">
            <img
              src="/icon/email.svg"
              alt="One Click Contact Saving"
              className="mx-auto mb-4 w-15 h-14"
            />
            <h3 className="text-xl font-semibold mb-2 text-naviblue">
              <a
                className="text-naviblue no-underline"
                href="mailto:saveconnects@gmail.com"
              >
                support@saveconnects.com
              </a>
            </h3>
            <p className="text-gray-400 text-[14px] mt-8">
              Got something on your mind? Drop us an email at
              support@saveconnects.com, and we'll respond promptly with the
              assistance you need.
            </p>
          </div>

          {/* Feature 3: Easy Connect through WhatsApp */}
          <div className="bg-white p-6 rounded-lg text-center hover:shadow-gray-300">
            <img
              src="/icon/web.svg"
              alt="Easy Connect through WhatsApp"
              className="mx-auto mb-4 w-12"
            />
            <h3 className="text-xl font-semibold mb-2 text-naviblue">
              <a
                className="text-naviblue no-underline"
                href="https://wa.me/919999999999"
              >
                saveconnects.com
              </a>
            </h3>
            <p className="text-gray-400 text-[14px] mt-8">
              Looking for more information? Visit www.saveconnects.com to
              explore our platform, services, and resources tailored for your
              exhibition success.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
