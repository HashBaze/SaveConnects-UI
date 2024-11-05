import React, { useState, useEffect } from "react";
import { IExhibitor } from "../interface/InterFaces";
import { CompanyKeyExistsRequest } from "../utils/ApiRequest";
import EmailModal from "../model/EmailModal";
import { toast } from "react-toastify";
import { Loader } from "react-feather";
import ProfileImageViewModal from "../model/ProfileImageViewModal";

const ProfileCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("company");
  const path = window.location.pathname.split("/").pop() || "/";
  const [exhibitorData, setExhibitorData] = useState<IExhibitor | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [loadingImages, setLoadingImages] = useState<boolean[]>([]);
  const [isCoverImageLoading, setIsCoverImageLoading] = useState(true);
  const [viewImageModal, setViewImageModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

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
      fetchExhibitorData();
    }
  }, [path]);

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
        designation: data.data.designation,
        facebookProfile: data.data.facebookProfile,
        linkedinProfile: data.data.linkedinProfile,
        instagramProfile: data.data.instagramProfile,
      });

      setLoadingImages(new Array(data.data.gallery.length).fill(true));
      setIsCoverImageLoading(true);
    } catch (err) {
      console.error("Failed to fetch exhibitor data:", err);
    }
  };

  const dowenloadVcfContact = (exhibitorData: IExhibitor) => {
    const makeVCardVersion = (): string => `VERSION:3.0`;

    const makeVCardInfo = (info: string): string => `N:${info}`;

    const makeVCardName = (name: string): string => `FN:${name}`;

    const makeVCardOrg = (org: string): string => `ORG:${org}`;

    const makeVCardTitle = (title: string): string => `TITLE:${title}`;

    const makeVCardTel = (phone: string): string =>
      `TEL;TYPE=WORK,VOICE:${phone}`;

    const makeVCardAdr = (address: string): string =>
      `ADR;TYPE=WORK,PREF:;;${address}`;

    const makeVCardEmail = (email: string): string => `EMAIL:${email}`;

    const makeVCardTimeStamp = (): string => `REV:${new Date().toISOString()}`;

    const makeabout = (about: string): string => `NOTE:${about}`;

    let vcard = `BEGIN:VCARD
${makeVCardVersion()}
${makeVCardInfo(
  exhibitorData.salesPersonName + ";" + exhibitorData.companyName
)}
${makeVCardName(exhibitorData.salesPersonName)}
${makeVCardOrg(exhibitorData.companyName)}
${makeVCardTitle(exhibitorData.companyCategory)}
${makeVCardTel(exhibitorData.phoneNumber)}
${makeVCardAdr(exhibitorData.address)}
${makeVCardEmail(exhibitorData.email)}
${makeVCardTimeStamp()}
${makeabout(exhibitorData.about)}
END:VCARD`;
    const a = document.createElement("a");
    const file = new Blob([vcard], { type: "text/vcard" });

    a.href = URL.createObjectURL(file);
    a.download = `${exhibitorData.companyName}.vcf`;
    a.click();

    URL.revokeObjectURL(a.href);
  };

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

  const handleSaveContact = () => {
    dowenloadVcfContact(exhibitorData as IExhibitor);
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
      <div className="flex justify-center">
        <div className="">
          <div className="absolute top-2 sm:top-2 sm:left-0 sm:block z-20">
            <a href="/" className="p-2">
              <img
                src="/images/Without-BG.png"
                alt="Logo"
                className="sm:w-24 w-16"
              />
            </a>
          </div>
          <div className="relative bg-white h-[95vh] shadow-lg rounded-[20px] ring-1 ring-gray-900/5 w-[100%] sm:w-[450px] overflow-scroll custom-scrollbar">
            {/* Header */}
            <div className="relative h-[200px] bg-gray-300">
              {exhibitorData?.coverImage && isCoverImageLoading ? (
                <h5 className="text-center absolute top-0 bottom-0 left-0 right-0 m-auto bg-white text-3xl text-naviblue font-bold">
                  Loading...
                </h5>
              ) : (
                <img
                  className={`w-full h-full object-cover ${
                    exhibitorData?.coverImage ? "hidden" : "block"
                  }`}
                  src="/images/empty-bg.png"
                  alt="Profile"
                  onLoad={handleCoverImageLoad}
                />
              )}

              <img
                className={`w-full h-full object-cover ${
                  exhibitorData?.coverImage ? "block" : "hidden"
                }`}
                src={exhibitorData?.coverImage}
                alt="Profile"
                onLoad={handleCoverImageLoad}
              />
            </div>

            <div className="mb-4 border-b border-gray-200 dark:border-gray-700 p-2">
              <div className="flex flex-row justify-around items-center p-3 pb-0">
                {["about", "company", "gallery"].map((tab) => (
                  <button
                    className={`inline-block sm:p-2 border-b-0 rounded-t-lg w-[75px] sm:w-[100px] cursor-pointer ${
                      activeTab === tab
                        ? "bg-naviblue text-white h-[50px] border-0"
                        : "bg-white"
                    }`}
                    id={`${tab}-tab`}
                    type="button"
                    role="tab"
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div id="default-tab-content p-2">
                {activeTab === "about" && (
                  <div
                    className="p-6 rounded-xl bg-gray-50"
                    id="about"
                    role="tabpanel"
                    aria-labelledby="about-tab"
                  >
                    <div className="flex flex-col items-center h-[50vh] justify-center space-y-4">
                      <h3 className="text-xl font-semibold text-naviblue">
                        {exhibitorData?.salesPersonName}
                      </h3>
                      <p className="text-gray-500 text-sm text-center">
                        {exhibitorData?.designation} at{" "}
                        {exhibitorData?.companyName}
                      </p>
                      <p className="text-gray-600 text-center">
                        Hi! My name is {exhibitorData?.salesPersonName}. It's
                        nice to meet you.
                      </p>

                      <button
                        onClick={() => setActiveTab("company")}
                        className="px-6 py-2 bg-naviblue text-white rounded-lg shadow-sm hover:bg-naviblue/90 transition duration-200"
                      >
                        Connect with Me
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === "company" && (
                  <div
                    className="p-4 rounded-lg bg-gray-50"
                    id="company"
                    role="tabpanel"
                    aria-labelledby="company-tab"
                  >
                    <div className="">
                      <h3 className="text-[24px] text-naviblue font-semibold my-2 text-center">
                        {exhibitorData?.salesPersonName} <br />
                        <span className="text-[16px] text-gray-600">
                          {exhibitorData?.companyName}
                        </span>
                      </h3>
                      <p className="text-[10px] whitespace-normal md:text-[16px] lg:text-[14px] text-gray-600 text-justify">
                        {exhibitorData?.about}
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 space-x-2 md:space-x-1 mt-5">
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveContact}
                            className="bg-naviblue w-[83px] sm:w-[120px] text-white rounded-[10px] border-0 cursor-pointer justify-center flex items-center h-8 sm:h-10"
                          >
                            <div className="flex items-center justify-center space-x-1 px-2">
                              <img
                                src="/icon/save-contact.svg"
                                alt="Contact"
                                className="w-4 h-4"
                              />
                              <span className="text-[10px] sm:text-[16px]">
                                Save
                              </span>
                            </div>
                          </button>

                          <button
                            onClick={handleConnect}
                            className="bg-naviblue w-[83px] sm:w-[120px] text-white rounded-[10px] border-0 cursor-pointer justify-center flex items-center h-8 sm:h-10"
                          >
                            <div className="flex items-center justify-center space-x-1 px-2">
                              <img
                                src="/icon/whatsapp.svg"
                                alt="Whatsapp"
                                className="w-4 h-4"
                              />
                              <span className="text-[10px] sm:text-[16px]">
                                Whatsapp
                              </span>
                            </div>
                          </button>

                          <button
                            onClick={handleEmail}
                            className="bg-naviblue w-[83px] sm:w-[120px] text-white rounded-[10px] border-0 cursor-pointer justify-center flex items-center h-8 sm:h-10"
                          >
                            <div className="flex items-center justify-center space-x-1 px-2">
                              <img
                                src="/icon/mail-light.svg"
                                alt="Email"
                                className="w-5 h-5"
                              />
                              <span className="text-[10px] sm:text-[16px]">
                                Inquiry
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>

                      <div className="sm:mt-4 mt-4 space-y-3">
                        <div className="flex items-center space-x-2">
                          <img
                            src="/icon/phone.svg"
                            alt="Phone"
                            className="w-4 h-4 md:w-6 md:h-6"
                          />
                          <p className="text-[10px] md:text-[16px] text-naviblue">
                            <a
                              className="text-gray-400 no-underline hover:underline"
                              href={
                                exhibitorData
                                  ? `tel:${exhibitorData.phoneNumber}`
                                  : "#"
                              }
                            >
                              {exhibitorData?.phoneNumber}
                            </a>
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <img
                            src="/icon/email.svg"
                            alt="Email"
                            className="w-4 h-4 md:w-6 md:h-6"
                          />
                          <p className="text-[10px] md:text-[16px] text-naviblue">
                            <a
                              className="text-gray-400 no-underline hover:underline"
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
                            className="w-4 h-4 md:w-6 md:h-6"
                          />
                          <p className="text-[10px] md:text-[16px] text-gray-400">
                            {exhibitorData?.address}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <img
                            src="/icon/web.svg"
                            alt="Website"
                            className="w-4 h-4 md:w-6 md:h-6"
                          />
                          {exhibitorData?.website && (
                            <p className="text-[10px] whitespace-nowrap md:text-[16px] text-naviblue">
                              <a
                                className="text-gray-400 hover:underline"
                                href={"https://" + exhibitorData?.website}
                              >
                                {exhibitorData?.website}
                              </a>
                            </p>
                          )}

                          {exhibitorData?.website && (
                            <div className="flex justify-end items-center w-full h-[10px]">
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
                          )}
                        </div>
                        <div className="flex  items-center justify-center gap-4">
                          {exhibitorData?.facebookProfile && (
                            <a
                              href={exhibitorData?.facebookProfile}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                src="/icon/facebook.svg"
                                alt="Facebook"
                                className="w-5 h-6"
                              />
                            </a>
                          )}
                          {exhibitorData?.linkedinProfile && (
                            <a
                              href={exhibitorData?.linkedinProfile}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                src="/icon/linkedin.svg"
                                alt="Linkedin"
                                className="w-7 h-7"
                              />
                            </a>
                          )}
                          {exhibitorData?.instagramProfile && (
                            <a
                              href={exhibitorData?.instagramProfile}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                src="/icon/instagram.svg"
                                alt="Instagram"
                                className="w-6 h-6"
                              />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "gallery" && (
                  <div className="w-[90vw] sm:w-full">
                    <div
                      className="p- rounded-lg bg-gray-50"
                      id="about"
                      role="tabpanel"
                      aria-labelledby="about-tab"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {exhibitorData?.gallery.map((image, index) => (
                          <div key={index} className="relative mx-auto">
                            {loadingImages[index] && (
                              <div className="flex items-center justify-center p-4">
                                <Loader />
                              </div>
                            )}
                            <img
                              onClick={() => {
                                setViewImageModal(true);
                                setModalImage(image);
                              }}
                              src={image}
                              alt="Gallery"
                              className={`w-[130px] cursor-pointer h-[130px] md:h-[200px] md:w-[200px] rounded-lg object-cover ${
                                loadingImages[index] ? "hidden" : "block"
                              }`}
                              onLoad={() => handleImageLoad(index)}
                            />
                            {viewImageModal && (
                              <ProfileImageViewModal
                                onClose={() => setViewImageModal(false)}
                                companyName={exhibitorData?.companyName}
                                initialData={modalImage}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-center items-end mt-5 text-gray-400">
                  <small className="text-center">
                    Powered By HashBaze © 2024. All rights reserved.
                  </small>
                </div>
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
