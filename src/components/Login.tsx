import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const togglePasswordVisibility = () => {
    setHide(!hide);
  };

  // Client-side validation function
  const validate = () => {
    const tempErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await axios.post("http://localhost:8080/user/login", {
        email: formData.email,
        password: formData.password,
      });

      toast.success("Login Successful");;
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Login failed");
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error("Error during login: ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-0">
      <div className="w-full max-w-[450px] px-[25px] sm:px-[50px] py-[50px] bg-white border border-gray-200 rounded-3xl shadow-md relative">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
        </div>
        <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
          Sign In
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="mt-4">
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
                className={`mt-1 block w-full h-8 px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div className="relative mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
              <img
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-0 w-6 h-6 cursor-pointer"
                alt="Toggle visibility"
                src={hide ? "/show.svg" : "/hide.svg"}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-0 mr-6 text-sm text-gray-500 cursor-pointer"
              >
                {hide ? "Show" : "Hide"}
              </span>
            </label>
            <div className="flex items-center mt-1">
              <input
                type={hide ? "password" : "text"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Enter your password"
                className={`block mt-1 w-full h-8 px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full h-[50px] mt-6 mx-auto py-2 px-4 border border-transparent rounded-3xl shadow-sm text-lg font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log in
          </button>
          <p className="mt-4 text-sm text-left text-gray-500">
            By continuing, you agree to the{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Privacy Policy
            </a>
          </p>
          <p className="relative mt-2 text-sm text-center text-gray-500">
            <a
              href="#"
              className="absolute right-0 top-0 text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </p>
        </form>
      </div>
      <div className="flex items-center justify-center w-full mt-6">
        <div className="w-[100px] sm:w-[180px] h-[1px] bg-gray-300"></div>
        <h3 className="px-2 sm:px-4 text-sm font-medium text-gray-200">
          New to our community
        </h3>
        <div className="w-[100px] sm:w-[180px] h-[1px] bg-gray-300"></div>
      </div>
      <button
        onClick={() => navigate("/signup")}
        className="flex items-center justify-center w-full sm:w-[550px] h-[50px] mt-6 mx-auto py-2 px-4 border rounded-3xl shadow-sm text-lg font-medium text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create an account
      </button>
    </div>
  );
};

export default Login;
