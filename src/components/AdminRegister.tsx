import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AdminRegisterRequest } from "../utils/ApiRequest";
import { toast } from "react-toastify";

const AdminRegister: React.FC = () => {
  const [hide, setHide] = useState<boolean>(true);
  const [confirmHide, setConfirmHide] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => {
    setHide(!hide);
  };

  const toggleConfirmVisibility = () => {
    setConfirmHide(!confirmHide);
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", confirmPassword: "" };
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include at least one letter, one number, and one special character.";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const response = await AdminRegisterRequest(
        formData.email,
        formData.password
      );

      if (response.status === 201) {
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message ||
            "An error occurred during registration."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-[600px] px-[60px] lg:px-[100px] md:px-[100px] py-[50px] bg-white border border-gray-500 rounded-3xl shadow-md relative">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-naviblue rounded-full"></div>
          </div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-naviblue">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-naviblue hover:text-indigo-500 no-underline"
            >
              Log in
            </a>
          </p>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="flex items-center mt-1">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email address"
                  className="block w-full h-8 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative flex flex-row items-center mt-1">
                  <input
                    type={hide ? "password" : "text"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Enter your password"
                    className="block flex-1 w-full h-8 px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-naviblue focus:border-naviblue sm:text-sm"
                  />
                  <img
                    onClick={togglePasswordVisibility}
                    className="absolute right-[10px] top-[50%] translate-y-[-50%] w-6 h-6 cursor-pointer"
                    alt="Toggle visibility"
                    src={hide ? "/icon/hide.svg" : "/icon/show.svg"}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm your password
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
                    placeholder="Confirm your password"
                    className="block flex-1 w-full h-8 px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-naviblue focus:border-naviblue sm:text-sm"
                  />
                  <img
                    onClick={toggleConfirmVisibility}
                    className="absolute right-[10px] top-[50%] translate-y-[-50%] w-6 h-6 cursor-pointer"
                    alt="Toggle visibility"
                    src={confirmHide ? "/icon/hide.svg" : "/icon/show.svg"}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <p className="mt-2 text-sm text-center text-gray-500">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
            <button
              type="submit"
              className="flex items-center justify-center w-[250px] h-[50px] mt-6 mx-auto py-2 px-4 border border-transparent rounded-3xl shadow-sm text-lg font-medium text-white bg-naviblue hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-naviblue"
            >
              Create an account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
