import React from "react";
import ProfileCard from "../components/ProfileCard";

const ProfileCardPage: React.FC = () => {
  return (
    <>
      <main className="flex-grow overflow-auto p-2">
        <ProfileCard />
      </main>
    </>
  );
};

export default ProfileCardPage;
