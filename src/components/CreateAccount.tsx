import React from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white py-12 px-6 flex justify-center items-center">
      <div className="container mx-auto">
        <h2 className="sm:text-[30px] text-[20px] font-bold text-center mb-6">
          Ready to Join? Let's Create Your Profile!
        </h2>

        <p  className="text-center sm:w-2/4 m-auto text-[12px] sm:text-[15px] text-gray-400">
          Ready to Join? Create your profile and start connecting with
          exhibitors and attendees instantly. Sign up now and experience
          seamless networking with SaveConnects!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:mt-10">
          
          <div className="p-6 rounded-lg h-[200px] flex items-center justify-center">
            <div>
              <h3 className="text-xl font-poppins mb-2 md:text-lg">Step&nbsp;1:&nbsp;Sign&nbsp;Up</h3>
              <img
                src="/icon/web-sign-in.svg"
                alt="Easy Connect through WhatsApp"
                className="mx-auto mb-4 w-12 h-13 mt-5"
              />
              <p className="text-gray-500 md:text-sm">
                Click the <strong>Create Account</strong> button, fill in your
                deets, and boom, you're almost there!
              </p>
            </div>
          </div>

          <div className="sm:p-6 md:rounded-lg h-[200px] md:flex md:items-center">
            <div>
              <h3 className="text-xl font-poppins mb-2 md:text-lg">Step&nbsp;2:&nbsp;Select&nbsp;Category</h3>
              <img
                src="/icon/web-select.svg"
                alt="Easy Connect through WhatsApp"
                className="mx-auto mb-4 w-12 h-13 mt-5"
              />
              <p className="text-gray-500 md:text-sm">
              Please choose the category that best describes your company.
              </p>
            </div>
          </div>

          
          <div className="sm:p-6 rounded-lg h-[200px]  flex items-center">
            <div>
              <h3 className="text-xl font-poppins mb-2 md:text-lg">
                Step&nbsp;3:&nbsp;Complete&nbsp;Profile
              </h3>

              <img
                src="/icon/web-success.svg"
                alt="Easy Connect through WhatsApp"
                className="mx-auto mb-4 w-12 h-13 mt-5"
              />

              <p className="text-gray-500 md:text-sm">
                Fill in your profile details to make it official. Let’s get you
                ready to network like a pro!
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <a
            onClick={() => navigate("/signup")}
            className="bg-blue-500 text-white py-3 px-8 rounded-full text-lg hover:bg-blue-700 no-underline"
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
