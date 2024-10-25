import React, { useState, useRef, useEffect } from "react";
import { IExhibitor, IProfileModal } from "../interface/Interface";
import ProfileModal from "../model/ProfileModel";
import LoadingModal from "../model/LoadingModel";
import QRGenerateModal from "../model/QRGenerateModel";
import Loading from "./Loading";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { analytics } from "../firebase/firebase";
import { toast } from "react-toastify";
import {
  EditCoverImage,
  EditGalleryImage,
  CompanyKeyExistsRequest,
  EditExhibitorProfile,
  editGalleryList,
} from "../utils/ApiRequest";
import CoverImageDeleteModel from "../model/CoverImageDeleteModel";
import GalleryImageRemoveModel from "../model/GalleryImageRemoveModel";
import { useAppContext } from "../context/AppProvider";

const Dashboard: React.FC = () => {
  const { setSelsePersonName } = useAppContext();

  const path = window.location.pathname.split("/").pop() || "/";

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteAllOpen, setDeleteAllOpen] = useState<boolean>(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [exhibitorData, setExhibitorData] = useState<IExhibitor | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [isGalleryRemoveAlertOpen, setIsGalleryRemoveAlertOpen] =
    useState<boolean>(false);
  const [removeUrl, setRemoveUrl] = useState<string>("");
  const [galleryImageArray, setGalleryImageArray] = useState<any[]>();
  const [base64array, setBase64array] = useState<string[]>();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenQRModal = () => setIsQRModalOpen(true);
  const handleCloseQRModal = () => setIsQRModalOpen(false);

  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

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
      setIsLoading(true);
      const fetchExhibitorData = async () => {
        try {
          const { data } = await CompanyKeyExistsRequest(path);

          setSelsePersonName(data.data.salesPersonName.split(" ")[0]);

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
          });
        } catch (err) {
          console.error("Failed to fetch exhibitor data:", err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchExhibitorData();
    }
  }, [path, galleryImageArray]);

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
    setIsGalleryRemoveAlertOpen(false);
  };

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
    if (exhibitorData && exhibitorData?.gallery.length < 4) {
      const selectedFiles = Array.from(event.target.files || []);

      setGalleryImageArray((prevArray) => [
        ...(prevArray || []),
        ...selectedFiles,
      ]);

      const base64Promises = selectedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      try {
        const base64Images: string[] = (await Promise.all(
          base64Promises
        )) as string[];
        setBase64array((prevArray) => [...(prevArray || []), ...base64Images]);
      } catch (error) {
        console.error("Error converting files to base64", error);
      }
    }

    // if (exhibitorData && exhibitorData?.gallery.length >= 4) {
    //   const files = Array.from(event.target.files || []);

    //   if (files && exhibitorData?._id) {
    //     setIsUploading(true);
    //     try {
    //       const imageUrls: string[] = await Promise.all(
    //         files.map(async (file) => {
    //           const imageUrl = await uploadImageToFirebase(
    //             file,
    //             `gallery-images/${file.name}`
    //           );
    //           return imageUrl;
    //         })
    //       );
    //       await EditGalleryImage(exhibitorData._id, imageUrls);
    //       setExhibitorData((prevData) => ({
    //         ...prevData!,
    //         gallery: [...prevData!.gallery, ...imageUrls],
    //       }));
    //     } catch (error) {
    //       console.error("Error uploading gallery image:", error);
    //     } finally {
    //       setIsUploading(false);
    //     }
    //   }
    // }
  };

  const upload4GalleryImages = async () => {
    if (galleryImageArray && exhibitorData?._id) {
      setIsUploading(true);
      try {
        const imageUrls: string[] = await Promise.all(
          galleryImageArray.map(async (file) => {
            const imageUrl = await uploadImageToFirebase(
              file,
              `gallery-images/${file.name}`
            );
            return imageUrl;
          })
        );

        EditGalleryImage(exhibitorData._id, imageUrls).then(() => {
          setExhibitorData((prevData) => ({
            ...prevData!,
            gallery: [...prevData!.gallery, ...imageUrls],
          }));
          setGalleryImageArray([]);
          setBase64array([]);
        });
      } catch (error) {
        console.error("Error uploading gallery image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleGalleryImageRemove = async () => {
    const imageUrlList: string[] = exhibitorData?.gallery.filter(
      (url) => url !== removeUrl
    ) as string[];

    if (imageUrlList && exhibitorData?._id) {
      try {
        await editGalleryList(exhibitorData._id, imageUrlList);
        setExhibitorData((prevData) => ({
          ...prevData!,
          gallery: [...imageUrlList],
        }));
        setIsGalleryRemoveAlertOpen(false);
      } catch (error) {
        console.error("Error uploading gallery image:", error);
      } finally {
        setIsUploading(false);
        setIsGalleryRemoveAlertOpen(false);
      }
    }
  };

  const removeAllGalleryImages = async () => {
    setIsUploading(true);
    try {
      if (exhibitorData?._id != null) {
        await editGalleryList(exhibitorData._id, []);
        setExhibitorData((prevData) => ({
          ...prevData!,
          gallery: [],
        }));
      }
      setDeleteAllOpen(false);
    } catch (error) {
      console.error("Error uploading gallery image:", error);
    } finally {
      setIsUploading(false);
      setDeleteAllOpen(false);
    }
  };

  const handleRemoveCoverImage = async () => {
    if (exhibitorData?._id) {
      setIsUploading(true);
      try {
        await EditCoverImage(exhibitorData._id, null);
        setIsAlertOpen(false);
        setExhibitorData((prevData) => ({
          ...prevData!,
          coverImage: "",
        }));
      } catch (error) {
        console.error("Error uploading cover image:", error);
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
        newData.website,
        newData.designation
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
    <>
      {isLoading ? (
        <div className="flex-grow w-screen h-[100%]">
          <Loading />
        </div>
      ) : (
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
            {exhibitorData?.coverImage === null ? null : (
              <button
                type="button"
                className="absolute border-red-400 flex items-center justify-center bg-red-400 w-8 h-8 rounded-lg top-[60px] right-[20px] cursor-pointer"
                onClick={openAlert}
              >
                <img src="/icon/delete.svg" alt="Edit" className="w-6 h-6" />
              </button>
            )}
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
            <div className="flex flex-wrap flex-col px-8 mt-4 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-2 lg:flex lg:flex-row lg:space-x-[70px]">
              <div className="flex flex-row space-x-2">
                <img
                  src="/icon/web.svg"
                  alt="URL"
                  className="w-6 lg:w-8 h-6 lg:h-8"
                />
                <div className="text-sm lg:text-lg">
                  <a
                    href={exhibitorData?.website}
                    className="text-gray-600 hover:text-blue-800 transition-colors duration-300 no-underline"
                    target="_blank"
                  >
                    {exhibitorData?.website}
                  </a>
                </div>
              </div>
              <div className="flex flex-row space-x-2">
                <img
                  src="/icon/email.svg"
                  alt="Email"
                  className="w-6 lg:w-8 h-6 lg:h-8"
                />
                <div className="text-sm lg:text-lg">
                  <a
                    href={`mailto:${exhibitorData?.email}`}
                    className="text-gray-600 hover:text-blue-800 transition-colors duration-300 no-underline"
                  >
                    {exhibitorData?.email}
                  </a>
                </div>
              </div>
              <div className="flex flex-row space-x-2">
                <img
                  src="/icon/phone.svg"
                  alt="Phone"
                  className="w-6 lg:w-8 h-6 lg:h-8"
                />
                <div className="text-sm lg:text-lg">
                  <a
                    href={`tel:${exhibitorData?.phoneNumber}`}
                    className="text-gray-600 hover:text-blue-800 transition-colors duration-300 no-underline whitespace-nowrap"
                  >
                    {exhibitorData?.phoneNumber}
                  </a>
                </div>
              </div>
              <div className="flex flex-row space-x-2">
                <img
                  src="/icon/location.svg"
                  alt="Location"
                  className="w-6 lg:w-8 h-6 lg:h-8"
                />
                <div className="text-sm lg:text-lg">
                  {exhibitorData?.address}
                </div>
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
            <section className="flex justify-between p-3">
              <div>
                <div className="text-[22px] font-bold text-naviblue px-8 mt-4">
                  Gallery Section
                </div>
                <div className="text-[16px] text-gray-500 font-medium px-8 mt-1">
                  Best Products
                </div>
              </div>
              {/* <div className="mt-4">
                {exhibitorData && exhibitorData?.gallery.length === 4 ? (
                  <button
                    onClick={() => {
                      setDeleteAllOpen(true);
                    }}
                    className="flex items-center justify-center bg-red-400 w-8 h-8 rounded-lg cursor-pointer mt-4 mr-4"
                  >
                    <img
                      src="/icon/delete.svg"
                      alt="Delete"
                      className="w-6 h-6"
                    />
                  </button>
                ) : null}
              </div> */}
            </section>
            <section className="overflow-scroll custom-scrollbar">
              <div className="flex relative flex-wrap flex-row items-center justify-center lg:justify-start px-8 mt-4 mb-4 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid lg:grid-cols-5 lg:gap-8">
                {exhibitorData?.gallery.map((image, index) => (
                  <div
                    className="flex relative flex-col items-center justify-center bg-naviblue w-[300px] h-[300px] rounded-[20px] cursor-pointer hover:bg-naviblue/90 border border-naviblue shadow-lg"
                    key={index}
                  >
                    {exhibitorData.gallery.length >= 1 ? (
                      <button
                        onClick={() => {
                          setIsGalleryRemoveAlertOpen(true);
                          setRemoveUrl(image);
                        }}
                        className="flex top-0 left-3 absolute items-center justify-center bg-white w-8 h-8 rounded-lg cursor-pointer mt-4 mr-4"
                      >
                        <img
                          src="/icon/delete.svg"
                          alt="Delete"
                          className="w-6 h-6"
                        />
                      </button>
                    ) : null}

                    <img
                      src={image}
                      alt="Gallery"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}

                {base64array?.map((image, index) => (
                  <div
                    className="flex relative flex-col items-center justify-center bg-naviblue w-[300px] h-[300px] rounded-[20px] cursor-pointer hover:bg-naviblue/90 border border-naviblue shadow-lg"
                    key={index}
                  >
                    <img
                      src={image}
                      alt="Gallery"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}

                {exhibitorData?.gallery && exhibitorData.gallery.length >= 1 ? (
                  <div
                    className={`flex z-10 flex-col items-center justify-center bg-gray-200 sm:w-[300px] sm:h-[300px] w-[100px] h-[100px] rounded-[20px] cursor-pointer hover:bg-gray-300 border border-gray-300 shadow-lg ${
                      galleryImageArray && galleryImageArray?.length >= 1
                        ? "hidden"
                        : ""
                    }`}
                    onClick={handleGalleryAddClick}
                  >
                    <img
                      src="/icon/image.svg"
                      alt="Add Image"
                      className="w-8 h-8 sm:w-16 sm:h-16"
                    />
                    <span className="mt-2 text-[10px] sm:text-[16px] text-gray-600">
                      Add Image
                    </span>
                  </div>
                ) : (
                  <div
                    className={`flex z-10 flex-col items-center justify-center bg-gray-200 sm:w-[300px] sm:h-[300px] w-[100px] h-[100px] rounded-[20px] cursor-pointer hover:bg-gray-300 border border-gray-300 shadow-lg ${
                      galleryImageArray && galleryImageArray?.length > 1
                        ? "hidden"
                        : ""
                    }`}
                    onClick={
                      galleryImageArray?.length === 1
                        ? upload4GalleryImages
                        : handleGalleryAddClick
                    }
                  >
                    <img
                      src="/icon/image.svg"
                      alt="Add Image"
                      className="w-8 h-8 sm:w-16 sm:h-16"
                    />
                    <span className="mt-2 text-[10px] sm:text-[16px] text-gray-600">
                      {galleryImageArray?.length === 1
                        ? "Upload"
                        : "Select image"}
                    </span>
                  </div>
                )}
              </div>

              {galleryImageArray?.length === 1 ? (
                <button
                  onClick={upload4GalleryImages}
                  className="flex text-white items-center ms-4 justify-center bg-naviblue w-[150px] h-[40px] rounded-lg cursor-pointer hover:bg-naviblue/90 border border-naviblue"
                >
                  Upload
                </button>
              ) : null}
            </section>
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
          {isAlertOpen ? (
            <CoverImageDeleteModel
              message={"Are you sure you want to delete?"}
              onClose={closeAlert}
              onConfirm={handleRemoveCoverImage}
            />
          ) : undefined}

          {isGalleryRemoveAlertOpen ? (
            <GalleryImageRemoveModel
              onClose={closeAlert}
              onConfirm={handleGalleryImageRemove}
              message={"Are you sure you want to delete?"}
            />
          ) : undefined}

          {isDeleteAllOpen ? (
            <GalleryImageRemoveModel
              onClose={() => {
                setDeleteAllOpen(false);
              }}
              onConfirm={removeAllGalleryImages}
              message={"Are you sure you want to delete All Gallery Images ?"}
            />
          ) : undefined}

          {isUploading && <LoadingModal />}
        </div>
      )}
    </>
  );
};

export default Dashboard;
