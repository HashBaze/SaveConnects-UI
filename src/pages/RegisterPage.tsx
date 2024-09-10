import React from "react";
import Register from "../components/Register";

const RegisterPage: React.FC = () => {
  return (
    <>
      <main className="flex-grow overflow-auto p-2">
        <Register />
      </main>
    </>
  );
};

export default RegisterPage;
