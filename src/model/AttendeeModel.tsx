import React, { useState, useEffect } from "react";
import { IAttendee } from "../interface/Interface";

interface AttendeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: IAttendee) => void;
  initialData: IAttendee | null;
}

const AttendeeModel: React.FC<AttendeeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<IAttendee>({
    name: "",
    email: "",
    contactNumber: "",
    companyName: "",
    note: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        contactNumber: initialData.contactNumber,
        companyName: initialData.companyName,
        note: initialData.note,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        contactNumber: "",
        companyName: "",
        note: "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "contactNumber") {
      if (/^\d*$/.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.companyName.trim())
      newErrors.companyName = "Company Name is required.";
    if (!formData.contactNumber.trim())
      newErrors.contactNumber = "Contact Number is required.";
    else if (formData.contactNumber.length !== 10)
      newErrors.contactNumber = "Phone number must be 10 characters.";
    if (!formData.note.trim()) newErrors.note = "Note is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return; // Do not proceed if there are validation errors

    onSave(formData);
    onClose();
    setFormData({
      name: "",
      email: "",
      contactNumber: "",
      companyName: "",
      note: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed absolute z-50 inset-0 bg-gray-500 bg-opacity-20 flex items-center justify-center p-6">
      <div className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-[800px]">
        <div className="flex bg-naviblue text-white py-3 px-4 rounded-t-lg items-center justify-between">
          <div className="flex-grow text-center">
            <h2 className="text-[18px] font-semibold">
              {initialData ? "Edit Attendee" : "Add New Attendee"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex w-6 h-6 items-center justify-center bg-white hover:text-gray-300 rounded-full border border-gray-300"
          >
            <img src="/icon/close.svg" alt="Close" className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex flex-col">
              <div className="flex">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full text-sm lg:text-md p-4 border rounded-md lg:rounded-lg"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm m-0">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="w-full text-sm lg:text-md p-4 border rounded-md lg:rounded-lg"
                />
              </div>
              {errors.companyName && (
                <p className="text-red-500 text-sm m-0">{errors.companyName}</p>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full text-sm lg:text-md p-4 border rounded-md lg:rounded-lg"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm m-0">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full text-sm lg:text-md p-4 border rounded-md lg:rounded-lg"
                />
              </div>
              {errors.contactNumber && (
                <p className="text-red-500 text-sm m-0">{errors.contactNumber}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex">
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Additional Note"
                className="w-full text-sm lg:text-md p-2 border rounded-md lg:rounded-lg h-32 lg:h-35"
              ></textarea>
            </div>
            {errors.note && (
              <p className="text-red-500 text-sm m-0">{errors.note}</p>
            )}
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

export default AttendeeModel;
