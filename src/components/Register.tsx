import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register: React.FC = () => {
  const [hide, setHide] = useState<boolean>(true);
  const [confirmHide, setConfirmHide] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    companyName: "",
    companyCategory: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setHide(!hide);
  };

  const toggleConfirmVisibility = () => {
    setConfirmHide(!confirmHide);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.companyName)
      newErrors.companyName = "Company Name is required.";
    if (!formData.companyCategory)
      newErrors.companyCategory = "Company Category is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:8080/exhibitor/register", {
        companyName: formData.companyName,
        companyCategory: formData.companyCategory,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Registration Successful");
      reset();
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  const reset = () => {
    setFormData({
      companyName: "",
      companyCategory: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[600px] px-[60px] lg:px-[120px] md:px-[100px] py-[50px] bg-white border border-gray-500 rounded-3xl shadow-md relative">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
        </div>
        <h2 className="mt-6 text-center text-13xl font-extrabold text-gray-200">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </a>
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <div className="flex items-center mt-1">
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  placeholder="Enter your company name"
                  className="block w-full h-8 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {errors.companyName && (
                <p className="text-red-500 text-sm">{errors.companyName}</p>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Company Category
              </label>
              <select
                value={formData.companyCategory}
                onChange={(e) =>
                  setFormData({ ...formData, companyCategory: e.target.value })
                }
                className="mt-1 block w-full  h-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>Select category</option>
                <option>Software</option>
                <option>Civil</option>
                <option>Electrical</option>
                <option>Mechanical</option>
                <option>Electronics</option>
              </select>
              {errors.companyCategory && (
                <p className="text-red-500 text-sm">{errors.companyCategory}</p>
              )}
            </div>
          </div>
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
                  className="block w-full h-8 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Confirm your password
                <img
                  onClick={toggleConfirmVisibility}
                  className="absolute right-0 top-0 w-6 h-6 cursor-pointer"
                  alt="Toggle visibility"
                  src={confirmHide ? "/show.svg" : "/hide.svg"}
                />
                <span
                  onClick={toggleConfirmVisibility}
                  className="absolute right-0 top-0 mr-6 text-sm text-gray-500 cursor-pointer"
                >
                  {confirmHide ? "Show" : "Hide"}
                </span>
              </label>
              <div className="flex items-center mt-1">
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
                  className="block w-full h-8 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          <p className="mt-2 text-sm text-center text-gray-500">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>
          <button
            type="submit"
            className="flex items-center justify-center w-[250px] h-[50px] mt-6 mx-auto py-2 px-4 border border-transparent rounded-3xl shadow-sm text-lg font-medium text-white bg-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create an account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
