import React, { useState, useEffect } from "react";
import { ICategory } from "../interface/InterFace";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ICategory) => void;
  initialData: ICategory | null;
}

const CategoryModel: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<ICategory>({
    name: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
      });
    } else {
      setFormData({
        name: "",
      });
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
      <div className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-[600px]">
        <div className="flex bg-naviblue text-white py-3 px-4 rounded-t-lg items-center justify-between">
          <div className="flex-grow text-center">
            <h2 className="text-[18px] font-semibold">
              {initialData ? "Edit Category" : "Add New Category"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex w-6 h-6 items-center justify-center bg-white hover:text-gray-300 rounded-full border border-gray-300"
          >
            <img src="/icon/close.svg" alt="Close" className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
          <div className="flex justify-start">
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
              <span className="ml-2 text-[14px]">Add New Category</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModel;
