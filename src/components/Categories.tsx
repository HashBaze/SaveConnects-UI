import React, { useState, useEffect } from "react";
import CategoryModel from "../model/CategoryModel";
import LoadingModal from "../model/LoadingModel";
import DeleteConformModel from "../model/DeleteConformModel";
import Loading from "./Loading";
import { ICategory } from "../interface/InterFace";
import {
  CreateCategory,
  GetAllCategories,
  DeleteCategory,
} from "../utils/ApiRequest";
import { toast } from "react-toastify";
import axios from "axios";

const Categories: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [initialData, setInitialData] = useState<ICategory | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenModel = () => setIsOpen(true);

  const handleOpenDeleteModel = () => setIsOpenDelete(true);

  const handleCloseModel = () => {
    setIsOpen(false);
    setInitialData(null);
  };

  const handleCloseDeleteModel = () => {
    setIsOpenDelete(false);
    setInitialData(null);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await GetAllCategories();
      setCategories(response.data.categories);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (data: ICategory) => {
    try {
      setIsUploading(true);
      const response = await CreateCategory(data.name);
      if (response.status === 201) {
        toast.success("Category created successfully");
        handleCloseModel();
        fetchData();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message || "Failed to create category");
      } else {
        toast.error("An unexpected error occurred");
        console.error("Error during category creation: ", err);
      }
    }
    setIsUploading(false);
    setInitialData(null);
    handleCloseModel();
  };

  const handleDelete = (category: ICategory) => {
    setInitialData(category);
    handleOpenDeleteModel();
  };

  const handleDeleteConform = async () => {
    if (!initialData) return;
    try {
      const response = await DeleteCategory(initialData?.name);
      if (response.status === 200) {
        toast.success("Category deleted successfully");
        handleCloseDeleteModel();
        fetchData();
      } else {
        toast.error("Failed to delete category");
      }
    } catch (err) {
      toast.error("Failed to delete category");
      console.error(err);
    }
    handleCloseDeleteModel();
  };

  return (
    <>
      {isLoading ? (
        <div className="flex-grow overflow-auto">
          <Loading />
        </div>
      ) : (
        <div
          className="bg-white items-center justify-center shadow-md p-6 rounded-lg shadow-md 
      mx-auto w-[300px] sm:w-auto text-sm sm:text-base"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <button
                className="bg-naviblue hover:bg-naviblue/90 text-white px-4 py-2 rounded-[10px] border 
              border-gray-300 flex items-center justify-center mx-auto"
                onClick={handleOpenModel}
              >
                <img
                  className="w-4 h-4 mr-2"
                  src="/icon/plus.svg"
                  alt="New Attendee"
                />
                <span className="hidden sm:block">New Category</span>
              </button>
            </div>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead>
                <tr className="w-full bg-gray-100">
                  <th className="text-center p-2 text-gray-600 font-medium">
                    Name
                  </th>
                  <th className="text-center p-2 text-gray-600 font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 text-center text-gray-800">
                      {category.name}
                    </td>
                    <td className="p-2 text-center text-gray-800 flex align-middle items-center justify-center space-x-2">
                      <button
                        className="w-10 h-10"
                        onClick={() => handleDelete(category)}
                      >
                        <img
                          className="w-full h-full"
                          src="/icon/delete.svg"
                          alt="Delete"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
                {(!categories || categories.length === 0) && (
                  <tr>
                    <td className="p-2 text-center text-gray-500" colSpan={6}>
                      No categories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <CategoryModel
        isOpen={isOpen}
        onClose={handleCloseModel}
        onSave={handleSave}
        initialData={initialData}
      />
      <DeleteConformModel
        isOpen={isOpenDelete}
        isCategory={true}
        name={initialData?.name}
        onClose={handleCloseDeleteModel}
        onConfirm={handleDeleteConform}
      />
      {isUploading && <LoadingModal />}
    </>
  );
};

export default Categories;
