import React from "react";
import AdminRegister from "../components/AdminRegister";

const AdminRegisterPage: React.FC = () => {
  return (
    <>
      <main className="flex-grow overflow-auto p-2">
        <AdminRegister />
      </main>
    </>
  );
};

export default AdminRegisterPage;
