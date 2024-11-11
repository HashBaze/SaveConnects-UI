import React from "react";

interface ProfileImageViewModalProps {
  companyName: string;
  onClose: () => void;
  initialData: string | null;
}

const ProfileImageViewModal: React.FC<ProfileImageViewModalProps> = ({
  companyName,
  onClose,
  initialData,
}) => {
  return (
    <div className="fixed z-50 inset-0 bg-gray-500 bg-opacity-20 flex items-center justify-center p-6">
      <div className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-[600px] max-h-[90vh]">
        <div className="flex bg-naviblue text-white py-3 px-4 rounded-t-lg items-center justify-between">
          <div className="flex-grow text-center">
            <h2 className="text-[18px] font-semibold">{companyName}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex w-6 h-6 cursor-pointer items-center justify-center bg-white hover:text-gray-300 rounded-full border border-gray-300"
          >
            <img src="/icon/close.svg" alt="Close" className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col p-4 overflow-y-auto">
          <img
            src={initialData || "/images/placeholder.png"}
            alt="Profile Image"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileImageViewModal;
