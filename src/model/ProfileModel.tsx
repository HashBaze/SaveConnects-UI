import React, { useState, useEffect } from "react";
import { IProfileModal, IExhibitor } from "../interface/Interface";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: IProfileModal) => void;
  initialData: IExhibitor | null;
}

const ProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<IProfileModal>({
    salesPersonName: "",
    companyName: "",
    companyEmail: "",
    phoneNumber: "",
    companyAddress: "",
    about: "",
    website: "",
  });
  const [countryCode, setCountryCode] = useState<string>("+94");

  const countryOptions = [
    "+94 (SR)",
    "+1 (US)",
    "+44 (UK)",
    "+91 (IND)",
    "+62 (IN)",
    "+55 (BR)",
    "+7 (RU)",
    "+86 (CN)",
  ];

  const needsScrollbar = countryOptions.length > 5;

  useEffect(() => {
    if (initialData) {
      const [code, number] = initialData.phoneNumber.split(" ", 2);
      setFormData({
        salesPersonName: initialData.salesPersonName,
        companyName: initialData.companyName,
        companyEmail: initialData.email,
        phoneNumber: number,
        companyAddress: initialData.address,
        about: initialData.about,
        website: initialData.website,
      });
      setCountryCode(code || "+1");
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      phoneNumber: `${countryCode} ${formData.phoneNumber}`,
    };
    onSave(dataToSave);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed absolute z-50 inset-0 bg-gray-500 bg-opacity-20 flex items-center justify-center p-6">
      <div className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-[800px]">
        <div className="flex bg-naviblue text-white py-3 px-4 rounded-t-lg items-center justify-between">
          <div className="flex-grow text-center">
            <h2 className="text-[18px] font-semibold">Edit Profile Content</h2>
          </div>
          <button
            onClick={onClose}
            className="flex w-6 h-6 items-center justify-center bg-white hover:text-gray-300 rounded-full border border-gray-300"
          >
            <img src="/icon/close.svg" alt="Close" className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex h-12 lg:h-16">
              <input
                type="text"
                name="salesPersonName"
                value={formData.salesPersonName}
                onChange={handleChange}
                placeholder="Sales Person Name"
                className="w-full text-sm lg:text-lg p-4 border rounded-md lg:rounded-lg"
              />
            </div>
            <div className="flex h-12 lg:h-16">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full text-sm lg:text-lg p-4 border rounded-md lg:rounded-lg"
              />
            </div>
            <div className="flex h-12 lg:h-16">
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                placeholder="Company Email"
                className="w-full text-sm lg:text-lg p-2 border rounded-md lg:rounded-lg"
              />
            </div>
            <div className="flex h-12 lg:h-16">
              <select
                value={countryCode}
                onChange={handleCountryCodeChange}
                className={`w-[30%] text-sm lg:text-lg p-2 border rounded-md lg:rounded-lg ${
                  needsScrollbar ? "max-h-36 overflow-y-auto" : ""
                }`}
              >
                {countryOptions.map((option) => (
                  <option key={option} value={option.split(" ")[0]}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-[70%] ml-1 text-sm lg:text-lg p-2 border rounded-md lg:rounded-lg"
              />
            </div>
            <div className="flex h-12 lg:h-16">
              <input
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                placeholder="Company Address"
                className="w-full text-sm lg:text-lg p-2 border rounded-md lg:rounded-lg"
              />
            </div>
            <div className="flex h-12 lg:h-16">
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Company Website"
                className="w-full text-sm lg:text-lg p-2 border rounded-md lg:rounded-lg"
              />
            </div>
          </div>
          <div className="flex h-auto">
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="About"
              className="w-full text-sm lg:text-lg p-2 border rounded-md lg:rounded-lg h-32 lg:h-40"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center bg-naviblue text-white px-4 py-2 rounded-lg border border-naviblue hover:bg-gray-600"
            >
              <img
                src="/icon/done.svg"
                alt="Done"
                className="w-6 h-6"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <span className="ml-2 text-[14px]">Save</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
