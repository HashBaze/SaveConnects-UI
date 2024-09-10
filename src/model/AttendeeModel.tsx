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
      })
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed absolute z-50 inset-0 bg-gray-500 bg-opacity-20 flex items-center justify-center p-6">
      <div className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-[800px]">
        <div className="flex bg-naviblue text-white py-3 px-4 rounded-t-lg items-center justify-between">
          <div className="flex-grow text-center">
            <h2 className="text-[18px] font-semibold">{initialData ? "Edit Attendee" : "Add New Attendee"}</h2>
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
            <div className="flex h-12 lg:h-14">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full text-sm lg:text-md p-4 border rounded-md lg:rounded-lg"
              />
            </div>
            <div className="flex h-12 lg:h-14">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full text-sm lg:text-md p-4 border rounded-md lg:rounded-lg"
              />
            </div>
            <div className="flex h-12 lg:h-14">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full text-sm lg:text-md p-2 border rounded-md lg:rounded-lg"
              />
            </div>
            <div className="flex h-12 lg:h-14">
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full text-sm lg:text-md p-2 border rounded-md lg:rounded-lg"
              />
            </div>
          </div>
          <div className="flex h-auto">
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Additional Note"
              className="w-full text-sm lg:text-md p-2 border rounded-md lg:rounded-lg h-32 lg:h-35"
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

export default AttendeeModel;
