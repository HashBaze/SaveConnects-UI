import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ResetPasswordRequest } from "../utils/ApiRequest";
import { toast } from "react-toastify";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const token = query.get("token");
  const [hide, setHide] = useState<boolean>(true);
  const [confirmHide, setConfirmHide] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.newPassword) {
      newErrors.newPassword = "Password is required.";
    } else if (!passwordRegex.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must be at least 8 characters long, include at least one letter, one number, and one special character.";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const togglePasswordVisibility = () => {
    setHide(!hide);
  };

  const toggleConfirmVisibility = () => {
    setConfirmHide(!confirmHide);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (token) {
      setLoading(true);
      try {
        const response = await ResetPasswordRequest(
          token,
          formData.newPassword
        );
        if (response.status === 200) {
          toast.success("Password reset successfully");
          navigate("/login", { replace: true });
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error submitting form: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center">
      <div className="flex flex-col items-center justify-center min-h-screen px-2 sm:px-0">
        <div className="w-full px-[25px] max-w-[450px] sm:px-[50px] py-[50px] bg-white border border-gray-200 rounded-3xl shadow-md relative">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-naviblue font-bold text-2xl">Password Reset</h2>
            <p className="text-gray-500 text-sm -mt-2">
              Enter Your New Password
            </p>
          </div>
          <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
            <div className="relative mt-4">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative flex flex-row items-center mt-1">
                <input
                  type={hide ? "password" : "text"}
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  placeholder="Enter your password"
                  className={`block mt-1 w-full h-8 px-3 py-2 pr-10 border ${
                    errors.newPassword ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-naviblue focus:border-naviblue sm:text-sm`}
                />
                <img
                  onClick={togglePasswordVisibility}
                  className="absolute right-[10px] top-[50%] translate-y-[-50%] w-6 h-6 cursor-pointer"
                  alt="Toggle visibility"
                  src={hide ? "/icon/hide.svg" : "/icon/show.svg"}
                />
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.newPassword}
                </p>
              )}
            </div>
            <div className="relative mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="relative flex flex-row items-center mt-1">
                <input
                  type={confirmHide ? "password" : "text"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm your new password"
                  className={`block mt-1 w-full h-8 px-3 py-2 pr-10 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-naviblue focus:border-naviblue sm:text-sm`}
                />
                <img
                  onClick={toggleConfirmVisibility}
                  className="absolute right-[10px] top-[50%] translate-y-[-50%] w-6 h-6 cursor-pointer"
                  alt="Toggle visibility"
                  src={confirmHide ? "/icon/hide.svg" : "/icon/show.svg"}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
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
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
