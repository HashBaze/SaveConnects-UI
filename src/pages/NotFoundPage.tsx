import React from "react";
import NotFound from "../components/NotFound";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <main className="flex-grow overflow-auto p-2">
        <NotFound />
      </main>
    </>
  );
};

export default NotFoundPage;
