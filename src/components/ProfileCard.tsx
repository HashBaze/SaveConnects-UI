import React, { useState, useEffect } from "react";
import { IExhibitor } from "../interface/Interface";
import { CompanyKeyExistsRequest } from "../utils/ApiRequest";
import EmailModal from "../model/EmailModal";
import { toast } from "react-toastify";
import { Loader } from "react-feather";

const ProfileCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("company");
  const path = window.location.pathname.split("/").pop() || "/";
  const [exhibitorData, setExhibitorData] = useState<IExhibitor | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [loadingImages, setLoadingImages] = useState<boolean[]>([]);
  const [isCoverImageLoading, setIsCoverImageLoading] = useState(true);

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
          const { data } = await CompanyKeyExistsRequest(path);

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

          setLoadingImages(new Array(data.data.gallery.length).fill(true));
        } catch (err) {
          console.error("Failed to fetch exhibitor data:", err);
        }
      };

      fetchExhibitorData();
    }
  }, [path]);

  const handleImageLoad = (index: number) => {
    setLoadingImages((prevLoadingImages) => {
      const updatedLoadingImages = [...prevLoadingImages];
      updatedLoadingImages[index] = false;
      return updatedLoadingImages;
    });
  };

  const handleCoverImageLoad = () => {
    setIsCoverImageLoading(false);
  };

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
    const currentUrl = window.location.href;

    const fallbackCopyTextToClipboard = (text: string) => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand("copy");
        if (successful) {
          toast.success("URL copied to clipboard!");
        } else {
          toast.error("Failed to copy URL");
        }
      } catch (err) {
        console.error("Unable to copy", err);
        toast.error("Failed to copy URL");
      }

      document.body.removeChild(textArea);
    };

    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(currentUrl);
      return;
    }

    navigator.clipboard.writeText(currentUrl).then(
      () => {
        toast.success("URL copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
        fallbackCopyTextToClipboard(currentUrl);
      }
    );
  };

  const handleConnect = () => {
    const phoneNumber = exhibitorData?.phoneNumber || "";
    const message = `Hi ${exhibitorData?.salesPersonName}, I'm interested in learning more about ${exhibitorData?.companyName}.`;

    if (phoneNumber) {
      const validPhoneNumber = phoneNumber.replace(/\s+/g, "");
      const whatsappUrl = `https://wa.me/${validPhoneNumber}?text=${encodeURIComponent(
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
          <div className="max-w-[330px] sm:max-w-[450px] w-full bg-white shadow-lg rounded-[20px] overflow-hidden ring-1 ring-gray-900/5">
            {/* Header */}
            <div className="relative md:h-64">
              {isCoverImageLoading && (
                <div className="flex items-center justify-center w-full h-full">
                  <Loader />
                </div>
              )}
              <img
                className={`w-full h-[120px] sm:h-full object-cover ${
                  isCoverImageLoading ? "hidden" : "block"
                }`}
                src={exhibitorData?.coverImage}
                alt="Profile"
                onLoad={handleCoverImageLoad}
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/15 sm:translate-y-1/2">
                <img
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-white"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Profile"
                />
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 sm:mt-8 mt-[-30px]">
              {activeTab === "about" && (
                <div>
                  <h3 className="text-lg font-semibold text-naviblue mb-2">
                    About Me
                  </h3>
                  <p className="text-gray-600 -mt-1">
                    Sales Person of {exhibitorData?.companyName}
                  </p>
                  <p className="text-gray-600">
                    Hi! My name is {exhibitorData?.salesPersonName}. It's nice
                    to meet you.
                  </p>
                </div>
              )}
              {activeTab === "company" && (
                <div>
                  <h3 className="text-[24px] text-naviblue font-semibold my-2 text-center">
                    {exhibitorData?.salesPersonName} <br />
                    <span className="text-[16px] text-gray-600">
                      {exhibitorData?.companyName}
                    </span>
                  </h3>
                  <p className="text-[10px] md:text-[16px] lg:text-[14px] text-gray-600 text-justify">
                    {exhibitorData?.about}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1 space-x-2 md:space-x-1">
                    <div className="flex gap-1">
                      <button
                        onClick={handleSaveContact}
                        className="bg-naviblue text-white rounded-[10px] border-0 cursor-pointer flex justify-between h-8 sm:h-10"
                      >
                        <div className="flex align-content-center justify-center">
                          <img
                            src="/icon/contact-light.svg"
                            alt="Contact"
                            className="w-4 h-4 sm:mt-1 mt-0 p-2"
                          />
                          <span className="p-2 text-[10px] sm:text-[16px]">
                            Contact
                          </span>
                        </div>
                      </button>
                      <button
                        onClick={handleConnect}
                        className="bg-naviblue text-white rounded-[10px] border-0 cursor-pointer flex h-8 sm:h-10"
                      >
                        <div className="flex align-content-center justify-center">
                          <img
                            src="/icon/whatsapp.svg"
                            alt="Contact"
                            className="w-4 h-4 p-2 sm:mt-1"
                          />
                          <span className="p-2 text-[10px] sm:text-[16px]">
                            Whatsapp
                          </span>
                        </div>
                      </button>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={handleEmail}
                        className="bg-naviblue text-white rounded-[10px] border-0 cursor-pointer h-8 sm:h-10 mt-1"
                      >
                        <div className="flex align-content-center justify-center">
                          <img
                            src="/icon/mail-light.svg"
                            alt="Contact"
                            className="w-5 h-5 sm:h-5 p-2 sm:mt-1"
                          />
                          <span className="p-2 text-[10px] sm:text-[16px]">
                            Email
                          </span>
                        </div>
                      </button>
                      <button
                        onClick={handleShare}
                        className=" hover:bg-blue-200 bg-transparent text-white rounded-full w-[40px] md:w-[50px] h-[40px] md:h-[50px] border-0 cursor-pointer"
                      >
                        <img
                          src="/icon/copy-content.svg"
                          alt="Share"
                          className="w-6 h-6"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="mt-[-5px] sm:mt-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src="/icon/phone.svg"
                        alt="Phone"
                        className="w-4 h-4 md:w-8 md:h-8"
                      />
                      <p className="text-[10px] md:text-[16px] font-semibold text-naviblue">
                        <a
                          className="text-naviblue"
                          href={`tel:${exhibitorData?.phoneNumber}`}
                        >
                          {exhibitorData?.phoneNumber}
                        </a>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <img
                        src="/icon/email.svg"
                        alt="Email"
                        className="w-4 h-4 md:w-8 md:h-8"
                      />
                      <p className="text-[10px] md:text-[16px] font-semibold text-naviblue">
                        <a
                          className="text-naviblue"
                          href={`mailto:${exhibitorData?.email}`}
                        >
                          {exhibitorData?.email}
                        </a>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <img
                        src="/icon/location.svg"
                        alt="Location"
                        className="w-4 h-4 md:w-8 md:h-8"
                      />
                      <p className="text-[10px] md:text-[16px] font-semibold text-naviblue">
                        {exhibitorData?.address}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <img
                        src="/icon/web.svg"
                        alt="Website"
                        className="w-4 h-4 md:w-8 md:h-8"
                      />
                      <p className="text-[10px] md:text-[16px] font-semibold text-naviblue">
                        <a
                          className="text-naviblue"
                          href={"https://" + exhibitorData?.website}
                        >
                          {exhibitorData?.website}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "gallery" && (
                <div className="grid w-full grid-cols-2 gap-2 mt-8">
                  {exhibitorData?.gallery?.slice(0, 4).map((image, index) => (
                    <div key={index} className="relative">
                      {loadingImages[index] && (
                        <div className="flex items-center justify-center p-4">
                          <Loader />
                        </div>
                      )}

                      <img
                        src={image}
                        alt="Gallery"
                        className={`w-[130px] h-[130px] md:w-[200px] md:h-[200px] rounded-lg object-cover ${
                          loadingImages[index] ? "hidden" : "block"
                        }`} //
                        onLoad={() => handleImageLoad(index)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="border-0">
              <div className="flex space-x-2">
                {["ABOUT", "COMPANY", "GALLERY"].map((tab) => (
                  <button
                    key={tab}
                    className={`flex-1 text-sm md:text-lg text-naviblue py-2 cursor-pointer font-medium border-0 bg-white ${
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
