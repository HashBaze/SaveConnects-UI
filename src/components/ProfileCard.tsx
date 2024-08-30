import React, { useState, useEffect } from "react";
import { IExhibitor } from "../interface/Interface";
import { companyKeyExistsRequest } from "../utils/ApiRequest";
import EmailModal from "../model/EmailModal";
import { toast } from "react-toastify";

const ProfileCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("company");
  const path = window.location.pathname.split("/").pop() || "/";
  const [exhibitorData, setExhibitorData] = useState<IExhibitor | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  useEffect(() => {
    const availableRoutes = [
      "signup",
      "login",
      "admin",
      "forgot-password",
      "reset-password",
      "attendees",
    ];
    if (!availableRoutes.includes(path)) {
      const fetchExhibitorData = async () => {
        try {
          const { data } = await companyKeyExistsRequest(path);

          setExhibitorData({
            _id: data.data._id,
            email: data.data.email,
            salesPersonName: data.data.salesPersonName,
            companyName: data.data.companyName,
            companyNameKey: data.data.companyNameKey,
            coverImage: data.data.coverImage,
            companyCategory: data.data.companyCategory,
            phoneNumber: data.data.phoneNumber,
            website: data.data.website,
            address: data.data.address,
            about: data.data.about,
            gallery: data.data.gallery,
          });
        } catch (err) {
          console.error("Failed to fetch exhibitor data:", err);
        }
      };

      fetchExhibitorData();
    }
  }, [path]);

  const generateVCard = () => {
    if (!exhibitorData) return "";

    return `
BEGIN:VCARD
VERSION:3.0
FN:${exhibitorData.salesPersonName}
ORG:${exhibitorData.companyName}
TEL:${exhibitorData.phoneNumber}
EMAIL:${exhibitorData.email}
ADR:;;${exhibitorData.address}
URL:${exhibitorData.website}
END:VCARD
    `;
  };

  const handleSaveContact = () => {
    const vCardData = generateVCard();
    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${exhibitorData?.companyName}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: exhibitorData?.companyName,
          text: `Check out ${exhibitorData?.companyName}`,
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.error("Error sharing:", error));
      toast.success("Link copied to clipboard");
    } else {
      console.error("Web Share API is not supported in this browser.");
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handleConnect = () => {
    const phoneNumber = exhibitorData?.phoneNumber || "";
    const message = `Hi ${exhibitorData?.salesPersonName}, I'm interested in learning more about ${exhibitorData?.companyName}.`;

    if (phoneNumber) {
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
    } else {
      console.error("Phone number is not available.");
      toast.error("Phone number is not available.");
    }
  };

  const handleEmail = () => {
    setIsEmailModalOpen(true);
  };

  return (
    <>
    <div className="container mx-auto flex items-center justify-center">
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-0">
        <div className="max-w-sm w-full bg-white shadow-lg rounded-[20px] overflow-hidden ring-1 ring-gray-900/5">
          {/* Header */}
          <div className="relative h-48">
            <img
              className="w-full h-full object-cover"
              src={exhibitorData?.coverImage}
              alt="Profile"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <img
                className="w-24 h-24 rounded-full border-4 border-white"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile"
              />
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 mt-8">
            {activeTab === "about" && (
              <div>
                <h3 className="text-lg font-semibold text-naviblue mb-2">
                  About Me
                </h3>
                <p className="text-gray-600 -mt-1">
                  Sales Person of {exhibitorData?.companyName}
                </p>
                <p className="text-gray-600">
                  Hi! My name is {exhibitorData?.salesPersonName}. It's nice to
                  meet you.
                </p>
              </div>
            )}
            {activeTab === "company" && (
              <div>
                <h3 className="text-[24px] text-naviblue font-semibold my-2 text-center">
                  {exhibitorData?.companyName}
                </h3>
                <p className="text-sm text-gray-600 text-justify">
                  {exhibitorData?.about}
                </p>
                <div className="flex flex-row items-center justify-center space-x-4">
                  <button
                    onClick={handleSaveContact}
                    className="bg-naviblue text-white rounded-[10px] p-2  border-0 cursor-pointer"
                  >
                    Contact
                  </button>
                  <button
                    onClick={handleConnect}
                    className="bg-naviblue text-white rounded-[10px] p-2  border-0 cursor-pointer"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={handleEmail}
                    className="bg-naviblue text-white rounded-[10px] p-2  border-0 cursor-pointer"
                  >
                    Email
                  </button>
                  <button
                    onClick={handleShare}
                    className="bg-naviblue text-white rounded-full p-2 w-[40px] h-[40px] border-0 cursor-pointer"
                  >
                    <img
                      src="/icon/share.svg"
                      alt="Share"
                      className="w-6 h-6 object-cover"
                    />
                  </button>
                </div>
                <div className="mt-4 ">
                  <div className="flex items-center space-x-2">
                    <img
                      src="/icon/phone.svg"
                      alt="Phone"
                      className="w-6 h-6"
                    />
                    <p className="text-sm font-semibold text-naviblue">
                      {exhibitorData?.phoneNumber}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img
                      src="/icon/email.svg"
                      alt="Email"
                      className="w-6 h-6"
                    />
                    <p className="text-sm font-semibold text-naviblue">
                      {exhibitorData?.email}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img
                      src="/icon/location.svg"
                      alt="Location"
                      className="w-6 h-6"
                    />
                    <p className="text-sm font-semibold text-naviblue">
                      {exhibitorData?.address}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img
                      src="/icon/web.svg"
                      alt="Website"
                      className="w-6 h-6"
                    />
                    <p className="text-sm font-semibold text-naviblue">
                      {exhibitorData?.website}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "gallery" && (
              <div className="grid w-full grid-cols-2 gap-2 mt-8">
                {exhibitorData?.gallery?.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Gallery"
                    className="w-[130px] h-[130px] md:w-[150px] md:h-[150px] rounded-lg object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="border-0 p-4">
            <div className="flex space-x-2">
              {["ABOUT", "COMPANY", "GALLERY"].map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 text-sm text-naviblue py-2 cursor-pointer font-medium border-0 bg-white ${
                    activeTab.toUpperCase() === tab
                      ? "text-naviblue border-b-2 border-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        exhibitorName={exhibitorData?.salesPersonName}
        exhibitorEmail={exhibitorData?.email}
      />
    </>
  );
};

export default ProfileCard;
