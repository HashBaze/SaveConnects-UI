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
    designation: "",
    facebookProfile: "",
    linkedinProfile: "",
    instagramProfile: "",
  });
  const [countryCode, setCountryCode] = useState<string>("+94");
  const [phoneError, setPhoneError] = useState<boolean>(false);

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

  const phoneRegex = {
    "+94": /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    "+1": /^(\+1)?\d{10}$/, // USA/Canada: +1 followed by 10 digits
    "+44": /^(\+44)?[1-9]\d{9}$/, // UK: +44 followed by 10 digits, starting with 1-9
    "+91": /^(\+91)?[1-9]\d{9}$/, // India: +91 followed by 10 digits, starting with 1-9
    "+62": /^(\+62)?[1-9]\d{8,11}$/, // Indonesia: +62 followed by 9-12 digits, starting with 1-9
    "+55": /^(\+55)?[1-9]\d{9,10}$/, // Brazil: +55 followed by 10-11 digits, starting with 1-9
    "+86": /^(\+86)?[1-9]\d{9}$/, // China: +86 followed by 10 digits, starting with 1-9
    "+7": /^(\+7)?[1-9]\d{9}$/, // Russia: +7 followed by 10 digits, starting with 1-9
  };

  const validatePhoneNumber = (
    countryCode: string,
    phoneNumber: string
  ): boolean => {
    const regex = phoneRegex[countryCode as keyof typeof phoneRegex];
    return regex ? regex.test(phoneNumber) : false;
  };

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
        designation: initialData.designation,
        facebookProfile: initialData.facebookProfile,
        linkedinProfile: initialData.linkedinProfile,
        instagramProfile: initialData.instagramProfile,
      });
      setCountryCode(code || "+94");
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
    if (!validatePhoneNumber(countryCode, formData.phoneNumber)) {
      setPhoneError(true);
      return;
    } else {
      setPhoneError(false);
    }

    if (formData.phoneNumber.charAt(0) === "0") {
      formData.phoneNumber = formData.phoneNumber.slice(1);
    }

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
        <form className="p-6 space-y-4">
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
              <div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-[100%] h-[73%] ml-1 text-sm lg:text-lg p-2 border rounded-md lg:rounded-lg"
                />
                {phoneError && (
                  <p className="text-red-500 text-[12px]">
                    Invalid phone number
                  </p>
                )}
              </div>
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
                name="instagramProfile"
                value={formData.instagramProfile}
                onChange={handleChange}
                placeholder="Instagram Profile"
                className="w-full text-sm lg:text-lg p-4 border rounded-md lg:rounded-lg"
              />
            </div>
            <div className="flex h-12 lg:h-16">
              <input
                type="text"
                name="facebookProfile"
                value={formData.facebookProfile}
                onChange={handleChange}
                placeholder="Facebook Profile"
                className="w-full text-sm lg:text-lg p-2 border rounded-md lg:rounded-lg"
              />
            </div>
            
            <div className="flex h-12 lg:h-16">
              <input
                type="text"
                name="linkedinProfile"
                value={formData.linkedinProfile}
                onChange={handleChange}
                placeholder="Linkedin Profile"
                className="w-full text-sm lg:text-lg p-2 border rounded-md lg:rounded-lg"
              />
            </div>
          </div>


          <div className="flex h-12 lg:h-16">
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="w-full text-sm lg:text-lg p-2 border rounded-md lg:rounded-lg"
            />
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
              onClick={handleSubmit}
              type="button"
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
