import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import AttendeeModel from "../model/AttendeeModel";
import LoadingModal from "../model/LoadingModel";
import Pagination from "../model/PaginationModel";
import DeleteConformModel from "../model/DeleteConformModel";
import Loading from "./Loading";
import { IAttendee } from "../interface/Interface";
import {
  AddAttendee,
  GetExhibitorProfile,
  EditAttendee,
  DeleteAttendee,
} from "../utils/ApiRequest";
import { toast } from "react-toastify";

const Attendees: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [exhibitorId, setExhibitorId] = useState<string>("");
  const [attendees, setAttendees] = useState<IAttendee[] | null>(null);
  const [initialData, setInitialData] = useState<IAttendee | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(12);

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
      const response = await GetExhibitorProfile();
      setAttendees(response.data.exhibitor.attendees);
      setExhibitorId(response.data.exhibitor._id);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    if (accessToken) {
      fetchData();
    }
  }, []);

  // Pagination logic
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    attendees?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = attendees ? Math.ceil(attendees.length / itemsPerPage) : 0;

  const handleEdit = (attendee: IAttendee) => {
    setInitialData(attendee);
    handleOpenModel();
  };

  const handleSave = async (data: IAttendee) => {
    try {
      setIsUploading(true);
      if (initialData) {
        // Editing existing attendee
        const response = await EditAttendee(
          exhibitorId,
          initialData._id,
          data.name,
          data.email,
          data.contactNumber,
          data.companyName,
          data.note
        );
        if (response.status === 200) {
          fetchData();
          toast.success("Attendee edited successfully");
        } else {
          toast.error("Failed to edit attendee");
        }
      } else {
        // Adding new attendee
        const response = await AddAttendee(
          exhibitorId,
          data.name,
          data.email,
          data.contactNumber,
          data.companyName,
          data.note
        );
        if (response.status === 200) {
          fetchData();
          toast.success("Attendee added successfully");
        } else {
          toast.error("Failed to add attendee");
        }
      }

      setIsUploading(false);
      handleCloseModel();
      setInitialData(null);
    } catch (err) {
      toast.error("Failed to save attendee");
      console.error(err);
    }
  };

  const handleDelete = (attendee: IAttendee) => {
    setInitialData(attendee);
    handleOpenDeleteModel();
  };

  const handleDeleteConform = async () => {
    if (!initialData) return;

    try {
      const response = await DeleteAttendee(exhibitorId, initialData._id);
      if (response.status === 200) {
        fetchData();
        toast.success("Attendee deleted successfully");
      } else {
        toast.error("Failed to delete attendee");
      }
    } catch (err) {
      toast.error("Failed to delete attendee");
      console.error(err);
    }
    handleCloseDeleteModel();
  };

  const handleExportCSV = () => {
    if (!attendees) return;

    const worksheet = XLSX.utils.json_to_sheet(
      attendees.map((attendee) => ({
        Name: attendee.name,
        Email: attendee.email,
        "Contact Number": attendee.contactNumber,
        "Company Name": attendee.companyName,
        "Additional Note": attendee.note,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendees");
    XLSX.writeFile(workbook, "attendees.xlsx");
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
            <h2 className="text-lg font-semibold text-naviblue text-sm sm:text-base">
              Attendees Table
            </h2>
            <div className="flex space-x-4">
              <button
                className="bg-naviblue hover:bg-naviblue/90 text-white px-4 py-2 rounded-[10px] border 
            border-gray-300 flex items-center justify-center mx-auto"
                onClick={handleExportCSV}
              >
                <img
                  className="w-4 h-4 mr-2"
                  src="/icon/export.svg"
                  alt="Export CSV"
                />
                <span className="hidden sm:block">Export CSV</span>
              </button>
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
                <span className="hidden sm:block">New Attendee</span>
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
                    Email
                  </th>
                  <th className="text-center p-2 text-gray-600 font-medium">
                    Contact Number
                  </th>
                  <th className="text-center p-2 text-gray-600 font-medium">
                    Company Name
                  </th>
                  <th className="text-center p-2 text-gray-600 font-medium">
                    Additional Note
                  </th>
                  <th className="text-center p-2 text-gray-600 font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((attendee, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 text-center text-gray-800 max-w-[100px] lg:max-w-[200px] break-words lg:break-normal">
                      {attendee.name}
                    </td>
                    <td className="p-2 text-center text-gray-800 max-w-[100px] lg:max-w-[200px] break-words lg:break-normal">
                      {attendee.email}
                    </td>
                    <td className="p-2 text-center text-gray-800 max-w-[100px] lg:max-w-[200px] break-words lg:break-normal">
                      {attendee.contactNumber}
                    </td>
                    <td className="p-2 text-center text-gray-800 max-w-[100px] lg:max-w-[200px] break-words lg:break-normal">
                      {attendee.companyName}
                    </td>
                    <td className="p-2 text-center text-gray-800 max-w-[100px] lg:max-w-[200px] break-words lg:break-normal">
                      {attendee.note}
                    </td>
                    <td className="p-2 text-center text-gray-800 flex align-middle items-center justify-center space-x-2">
                      <button
                        className="w-10 h-10"
                        onClick={() => handleEdit(attendee)}
                      >
                        <img
                          className="w-full h-full"
                          src="/icon/editsqure.svg"
                          alt="Edit"
                        />
                      </button>
                      <button
                        className="w-10 h-10"
                        onClick={() => handleDelete(attendee)}
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
                {(!attendees || attendees.length === 0) && (
                  <tr>
                    <td className="p-2 text-center text-gray-500" colSpan={6}>
                      No attendees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {attendees && attendees.length > 0 ? (
        <div className="flex absolute right-2">
          <Pagination
            currentPage={currentPage + 1}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page - 1)}
          />
        </div>
      ) : null}
      <AttendeeModel
        isOpen={isOpen}
        onClose={handleCloseModel}
        onSave={handleSave}
        initialData={initialData}
      />
      <DeleteConformModel
        isOpen={isOpenDelete}
        name={initialData?.name}
        onClose={handleCloseDeleteModel}
        onConfirm={handleDeleteConform}
      />
      {isUploading && <LoadingModal />}
    </>
  );
};

export default Attendees;
