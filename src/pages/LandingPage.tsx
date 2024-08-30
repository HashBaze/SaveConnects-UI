import React from "react";
import Landing from "../components/Landing";

const LandingPage: React.FC = () => {
  return (
    <>
      <main className="flex-grow overflow-auto p-2">
        <Landing />
      </main>
    </>
  );
};

export default LandingPage;
