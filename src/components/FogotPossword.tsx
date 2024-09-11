import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FogotPosswordRequest } from "../utils/ApiRequest";
import { toast } from "react-toastify";

const FogotPossword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
      setLoading(true);
      try {
        const response = await FogotPosswordRequest(email);
        if (response.status === 200) {
          toast.success(response.data.message);
          setIsSubmitted(true);
        } else {
          toast.error(response.data.message);
          setIsSubmitted(false);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to send instructions. Please try again.");
        setIsSubmitted(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container mx-auto flex items-center justify-center">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-0">
        <div className="w-full max-w-[450px] px-[25px] sm:px-[50px] py-[50px] bg-white border border-gray-200 rounded-3xl shadow-md relative">
          {!isSubmitted ? (
            <>
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-naviblue font-bold text-2xl">
                  Lost Access?
                </h2>
                <p className="text-gray-500 text-sm">
                  Enter the email address associated with your account to
                  initiate the password recovery process. We'll send you
                  instructions on how to reset your password shortly.
                </p>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="mt-4">
                  <div className="flex items-center mt-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="block w-full h-8 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-naviblue focus:border-naviblue sm:text-sm"
                    />
                  </div>
                  {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full h-[40px] mt-6 bg-naviblue border border-naviblue shadow-sm text-white rounded-md hover:bg-naviblue/80 relative"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex flex-row gap-2 items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5"
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
                            d="M4 12a8 8 0 018-8V4a12 12 0 00-12 12h2z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-naviblue font-bold text-2xl">
                Instructions Sent
              </h3>
              <p className="text-gray-500 text-sm">
                Password reset instructions sent to your email. Please check
                your email and click on the link to reset your password.
              </p>
              <span className="text-sm text-gray-500">
                If you don't see the email in your inbox, please check your spam
                folder.
              </span>
              <h3 className="text-naviblue font-bold text-2xl">Thank you</h3>
              <button
                className="w-full h-8 mt-6 bg-naviblue border border-naviblue shadow-sm text-white rounded-md hover:bg-naviblue/80"
                onClick={() => navigate("/")}
              >
                Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FogotPossword;
