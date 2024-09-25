import React from "react";

const CreateAccount: React.FC = () => {
  return (
    <div className="bg-white py-12 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">
          Ready to Join? Let's Create Your Profile! 🚀
        </h2>

        <p className="text-center w-2/4 m-auto text-[14px] text-gray-400">
          Ready to Join? Create your profile and start connecting with
          exhibitors and attendees instantly. Sign up now and experience
          seamless networking with SaveConnects!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg h-[200px] flex items-center">
            <div>
              <h3 className="text-xl font-poppins mb-2">Step 1: Sign Up</h3>
              <img
                src="/icon/web-sign-in.svg"
                alt="Easy Connect through WhatsApp"
                className="mx-auto mb-4 w-12 h-13 mt-5"
              />
              <p className="text-gray-600">
                Click the <strong>Create Account</strong> button, fill in your
                deets, and boom 💥, you're almost there!
              </p>
            </div>
          </div>
          <div className="p-6 rounded-lgh-[200px] flex items-center">
            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-poppins mb-2">
                Step 2: Select Category
              </h3>

              <img
                src="/icon/web-select.svg"
                alt="Easy Connect through WhatsApp"
                className="mx-auto mb-4 w-12 h-13 mt-5"
              />

              <p className="text-gray-600 mb-4">
                Please choose the category that best describes your company.
              </p>
            </div>
          </div>
          <div className="p-6 rounded-lg h-[200px]  flex items-center">
            <div>
              <h3 className="text-xl font-poppins mb-2">
                Step 3: Complete Profile
              </h3>

              <img
                src="/icon/web-success.svg"
                alt="Easy Connect through WhatsApp"
                className="mx-auto mb-4 w-12 h-13 mt-5"
              />

              <p className="text-gray-600">
                Fill in your profile details to make it official. Let’s get you
                ready to network like a pro! 💼
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <a
            href="/signup"
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
