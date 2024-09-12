import React from "react";
import AccessDenied from "../components/AccessDenied";

const AccessDeniedPage: React.FC = () => {
  return (
    <>
      <main className="flex-grow overflow-auto p-2">
        <AccessDenied />
      </main>
    </>
  );
};

export default AccessDeniedPage;
