import React from "react";
import Login from "../components/Login";

const LoginPage: React.FC = () => {
  return (
    <>
      <main className="flex-grow overflow-auto p-2">
        <Login />
      </main>
    </>
  );
};

export default LoginPage;
