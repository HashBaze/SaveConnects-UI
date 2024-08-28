import React, { useState, useRef, useEffect } from "react";
import { IExhibitor, IProfileModal } from "../interface/Interface";
import ProfileModal from "../model/ProfileModel";
import LoadingModal from "../model/LoadingModel";
import QRGenerateModal from "../model/QRGenerateModel";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { analytics } from "../firebase/firebase";
import { toast } from "react-toastify";
import {
  EditCoverImage,
  EditGalleryImage,
  GetExhibitorProfile,
  EditExhibitorProfile,
} from "../utils/ApiRequest";

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [exhibitorData, setExhibitorData] = useState<IExhibitor | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenQRModal = () => setIsQRModalOpen(true);
  const handleCloseQRModal = () => setIsQRModalOpen(false);

  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accesstoken");
    if (accessToken) {
      const fetchExhibitorData = async () => {
        try {
          const response = await GetExhibitorProfile();
          setExhibitorData({
            _id: response.data.exhibitor._id,
            email: response.data.exhibitor.email,
            salesPersonName: response.data.exhibitor.salesPersonName,
            companyName: response.data.exhibitor.companyName,
            companyNameKey: response.data.exhibitor.companyNameKey,
            coverImage: response.data.exhibitor.coverImage,
            companyCategory: response.data.exhibitor.companyCategory,
            phoneNumber: response.data.exhibitor.phoneNumber,
            website: response.data.exhibitor.website,
            address: response.data.exhibitor.address,
            about: response.data.exhibitor.about,
            gallery: response.data.exhibitor.gallery,
          });
        } catch (err) {
          console.error(err);
        }
      };

      fetchExhibitorData();
    }
  }, []);

  const uploadImageToFirebase = async (file: File, path: string) => {
    const storageRef = ref(analytics, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleEditCoverImageClick = () => {
    if (coverImageInputRef.current) {
      coverImageInputRef.current.click();
    }
  };

  const handleGalleryAddClick = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.click();
    }
  };

  const handleCoverImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && exhibitorData?._id) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadImageToFirebase(
          file,
          `cover-images/${file.name}`
        );

        await EditCoverImage(exhibitorData._id, imageUrl);

        setExhibitorData((prevData) => ({
          ...prevData!,
          coverImage: imageUrl,
        }));
      } catch (error) {
        console.error("Error uploading cover image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleGalleryImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && exhibitorData?._id) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadImageToFirebase(
          file,
          `gallery-images/${file.name}`
        );

        await EditGalleryImage(exhibitorData._id, imageUrl);

        setExhibitorData((prevData) => ({
          ...prevData!,
          gallery: [...prevData!.gallery, imageUrl],
        }));
      } catch (error) {
        console.error("Error uploading gallery image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSaveProfile = async (newData: IProfileModal) => {
    try {
      await EditExhibitorProfile(
        exhibitorData?._id,
        newData.salesPersonName,
        newData.companyName,
        newData.companyEmail,
        newData.phoneNumber,
        newData.companyAddress,
        newData.about,
        newData.website
      );
      toast.success("Profile updated successfully");
      setExhibitorData((prevData) => ({
        ...prevData!,
        salesPersonName: newData.salesPersonName,
        companyName: newData.companyName,
        email: newData.companyEmail,
        phoneNumber: newData.phoneNumber,
        address: newData.companyAddress,
        about: newData.about,
        website: newData.website,
      }));
    } catch (err) {
      toast.error("Failed to update profile");
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full h-[200px] lg:h-[300px] md:h-[250px] bg-gray-300 rounded-2xl relative">
        {exhibitorData?.coverImage && (
          <img
            src={exhibitorData.coverImage}
            alt="Cover Image"
            className="w-full h-full object-cover rounded-2xl"
          />
        )}
        <div
          className="absolute flex items-center justify-center bg-white w-8 h-8 rounded-lg top-[20px] right-[20px] cursor-pointer"
          onClick={handleEditCoverImageClick}
        >
          <img src="/icon/edit.svg" alt="Edit" className="w-6 h-6" />
        </div>
        <input
          type="file"
          ref={coverImageInputRef}
          className="hidden"
          onChange={handleCoverImageChange}
          accept="image/*"
        />
      </div>
      <div className="flex flex-col w-[calc(100%-10px)] py-2 mt-[-20px] bg-white rounded-2xl shadow-lg relative">
        <div className="flex flew-row justify-between">
          <div className="text-[22px] font-bold text-naviblue px-8 mt-4">
            {exhibitorData?.salesPersonName}
          </div>
          <div
            className="flex items-center justify-center bg-naviblue w-8 h-8 rounded-lg cursor-pointer mt-4 mr-4"
            onClick={handleOpenModal}
          >
            <img
              src="/icon/edit.svg"
              alt="Edit"
              className="w-6 h-6"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        </div>
        <div className="text-[16px] font-medium px-8 mt-1">
          {exhibitorData?.companyCategory}
        </div>
        <div className="flex flex-col px-8 mt-4 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 lg:flex lg:flex-row lg:space-x-[150px]">
          <div className="flex flex-row space-x-2">
            <img
              src="/icon/web.svg"
              alt="URL"
              className="w-6 lg:w-8 h-6 lg:h-8"
            />
            <div className="text-sm lg:text-lg">{exhibitorData?.website}</div>
          </div>
          <div className="flex flex-row space-x-2">
            <img
              src="/icon/email.svg"
              alt="Email"
              className="w-6 lg:w-8 h-6 lg:h-8"
            />
            <div className="text-sm lg:text-lg">{exhibitorData?.email}</div>
          </div>
          <div className="flex flex-row space-x-2">
            <img
              src="/icon/phone.svg"
              alt="Phone"
              className="w-6 lg:w-8 h-6 lg:h-8"
            />
            <div className="text-sm lg:text-lg">
              {exhibitorData?.phoneNumber}
            </div>
          </div>
          <div className="flex flex-row space-x-2">
            <img
              src="/icon/location.svg"
              alt="Location"
              className="w-6 lg:w-8 h-6 lg:h-8"
            />
            <div className="text-sm lg:text-lg">{exhibitorData?.address}</div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 mt-6 px-8 mb-4">
          <div className="text-[16px] font-medium">About</div>
          <div className="text-justify text-sm lg:text-lg">
            {exhibitorData?.about}
          </div>
        </div>
        <div className="flex items-center justify-center lg:justify-start px-8 mb-4">
          <button
            onClick={handleOpenQRModal}
            className="flex items-center justify-center bg-naviblue w-[200px] h-[50px] rounded-lg cursor-pointer hover:bg-naviblue/90 border border-naviblue"
          >
            <img
              src="/icon/qrcode.svg"
              alt="QR Code"
              className="w-10 h-10"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="text-white text-base text-[20px] ml-2">
              Generate QR
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-col w-[calc(100%-10px)] h-[auto] py-2 mt-[40px] bg-white rounded-2xl shadow-lg">
        <div className="text-[22px] font-bold text-naviblue px-8 mt-4">
          Gallery Section
        </div>
        <div className="text-[16px] text-gray-500 font-medium px-8 mt-1">
          Best Products
        </div>
        <div className="flex flex-col items-center justify-center lg:justify-start px-8 mt-4 mb-4 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid lg:grid-cols-5 lg:gap-8">
          {exhibitorData?.gallery.map((image, index) => (
            <div
              className="flex flex-col items-center justify-center bg-naviblue w-[300px] h-[300px] rounded-[20px] cursor-pointer hover:bg-naviblue/90 border border-naviblue shadow-lg"
              key={index}
            >
              <img
                src={image}
                alt="Gallery"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
          <div
            className="flex flex-col items-center justify-center bg-gray-200 w-[300px] h-[300px] rounded-[20px] cursor-pointer hover:bg-gray-300 border border-gray-300 shadow-lg"
            onClick={handleGalleryAddClick}
          >
            <img src="/icon/image.svg" alt="Add Image" className="w-16 h-16" />
            <span className="mt-2 text-gray-600">Add Image</span>
          </div>
        </div>
        <input
          type="file"
          ref={galleryInputRef}
          className="hidden"
          onChange={handleGalleryImageChange}
          accept="image/*"
          multiple
        />
      </div>
      <ProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProfile}
        initialData={exhibitorData}
      />
      <QRGenerateModal
        isOpen={isQRModalOpen}
        onClose={handleCloseQRModal}
        companyKey={exhibitorData?.companyNameKey}
      />
      {isUploading && <LoadingModal />}
    </div>
  );
};

export default Dashboard;
