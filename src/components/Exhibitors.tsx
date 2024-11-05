import React, { useState, useEffect } from "react";
import Pagination from "../model/PaginationModel";
import Loading from "./Loading";
import { IExhibitor } from "../interface/InterFaces";
import { GetAllExhibitors, ExhibitorStatusChange } from "../utils/ApiRequest";
import { toast } from "react-toastify";

const Exhibitors: React.FC = () => {
  const [exhibitors, setExhibitors] = useState<IExhibitor[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(11);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await GetAllExhibitors();
      setExhibitors(response.data.exhibitors);
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
    exhibitors?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = exhibitors
    ? Math.ceil(exhibitors.length / itemsPerPage)
    : 0;

  const handleStatusChange = async (email: string, status: boolean) => {
    try {
      const response = await ExhibitorStatusChange(email, status);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchData();
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
    }
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
              Exhibitors Table
            </h2>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead>
                <tr className="w-full bg-gray-100">
                  <th className="text-center p-2 text-gray-600 font-medium">
                    Company Name
                  </th>
                  <th className="text-center p-2 text-gray-600 font-medium">
                    Email
                  </th>
                  <th className="text-center p-2 text-gray-600 font-medium">
                    Phone Number
                  </th>
                  <th className="text-center p-2 text-gray-600 font-medium">
                    Sales Rep
                  </th>
                  <th className="text-center p-2 text-gray-600 font-medium">
                    Address
                  </th>
                  <th className="text-center p-2 text-gray-600 font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((exhibitor, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 text-center text-gray-800 max-w-[100px] lg:max-w-[200px] break-words lg:break-normal">
                      {exhibitor.companyName}
                    </td>
                    <td className="p-2 text-center text-gray-800 max-w-[100px] lg:max-w-[200px] break-words lg:break-normal">
                      {exhibitor.email}
                    </td>
                    <td className="p-2 text-center text-gray-800 max-w-[100px] lg:max-w-[200px] break-words lg:break-normal">
                      {exhibitor.phoneNumber}
                    </td>
                    <td className="p-2 text-center text-gray-800 max-w-[100px] lg:max-w-[200px] break-words lg:break-normal">
                      {exhibitor.salesPersonName}
                    </td>
                    <td className="p-2 text-center text-gray-800 max-w-[100px] lg:max-w-[200px] break-words lg:break-normal">
                      {exhibitor.address}
                    </td>
                    <td className="p-2 text-center text-gray-800 flex align-middle items-center justify-center space-x-2">
                      <select
                        className="text-center text-sm text-gray-800 h-8 p-1 border border-gray-300 rounded bg-white w-24"
                        value={exhibitor.isEnabled ? "true" : "false"}
                        onChange={(e) =>
                          handleStatusChange(
                            exhibitor.email,
                            e.target.value === "true"
                          )
                        }
                      >
                        <option value="true">Active</option>
                        <option value="false">Deactive</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {(!exhibitors || exhibitors.length === 0) && (
                  <tr>
                    <td className="p-2 text-center text-gray-500" colSpan={6}>
                      No exhibitors found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {exhibitors && exhibitors.length > 0 ? (
        <div className="flex absolute right-2">
          <Pagination
            currentPage={currentPage + 1}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page - 1)}
          />
        </div>
      ) : null}
    </>
  );
};

export default Exhibitors;
