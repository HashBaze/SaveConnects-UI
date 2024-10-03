import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RegisterRequest } from "../utils/ApiRequest";
import { toast } from "react-toastify";
import SelectModel from "../model/SelectModel";
import { GetAllCategories } from "../utils/ApiRequest";
import { ICategory } from "../interface/Interface";

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
  const [categories, setCategories] = useState<ICategory[]>([]);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setHide(!hide);
  };

  const toggleConfirmVisibility = () => {
    setConfirmHide(!confirmHide);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GetAllCategories();
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#$@!%*?&])[A-Za-z\d#$@!%*?&]{8,}$/;

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
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include at least one letter, one number, and one special character.";
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
      const response = await RegisterRequest(
        formData.companyName,
        formData.companyCategory,
        formData.email,
        formData.password
      );

      localStorage.setItem("accesstoken", response.data.token);
      localStorage.setItem("companyNameKey", response.data.companyKey);
      localStorage.setItem("role", response.data.role);
      toast.success("Registration Successful");
      reset();
      if(response.data.role === "Exhibitor") {
        navigate(`/${response.data.companyKey}`, { replace: true });
        window.location.reload();
      } else {
        navigate("/login", { replace: true });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Registration failed");
      } else {
        toast.error("An unexpected error occurred");
        console.error("Error during registration: ", error);
      }
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

  const selectHandler = (selectedOption: ICategory) => {
    setFormData({
      ...formData,
      companyCategory: selectedOption.name,
    });
  };

  return (
    <div className="container mx-auto flex items-center justify-center">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-[600px] px-[40px] lg:px-[120px] md:px-[100px] py-[50px] bg-white border border-gray-500 rounded-3xl shadow-md relative">
          <div className="flex justify-center">
          < img src="/images/Without-BG.png" alt="Logo" className="w-32" />
          </div>
          <h2 className="mt-6 text-center text-13xl font-extrabold text-naviblue">
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
                    className="block w-full h-8 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-naviblue focus:border-naviblue sm:text-sm"
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
                <div className="absalute border border-gray-300 #{!important} rounded-md shadow-sm focus:outline-none focus:ring-naviblue focus:border-naviblue">
                  <SelectModel
                    options={categories}
                    onChange={selectHandler}
                    name="companyCategory"
                    placeholder="Select Category"
                    setapiEndPoint={(name: string) => {
                      setFormData({
                        ...formData,
                        companyCategory: name,
                      });
                    }}
                  />
                </div>
                {errors.companyCategory && (
                  <p className="text-red-500 text-sm">
                    {errors.companyCategory}
                  </p>
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
                  className="block w-full h-8 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-naviblue focus:border-naviblue sm:text-sm"
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
            <div>
              <button
                type="submit"
                className="flex items-center justify-center w-[250px] h-[50px] mt-6 mx-auto py-2 px-4 border border-transparent rounded-3xl shadow-sm text-lg font-medium text-white bg-naviblue hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-naviblue focus:border-naviblue"
              >
                Create an account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
