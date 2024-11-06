import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SAVECONNECTS_SERVER_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accesstoken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const LoginRequest = async (email: string, password: string) => {
  const response = await api.post("/user/login", { email, password });
  return response;
};

const RegisterRequest = async (
  companyName: string,
  companyCategory: string,
  email: string,
  password: string
) => {
  const response = await api.post("/exhibitor/register", {
    companyName,
    companyCategory,
    email,
    password,
  });
  return response;
};

const AdminRegisterRequest = async (email: string, password: string) => {
  const response = await api.post("/admin/register", {
    email,
    password,
  });
  return response;
};

const GetExhibitorProfile = async () => {
  const response = await api.get("/exhibitor/profile");
  return response;
};

const EditExhibitorProfile = async (
  _id: string | undefined,
  salesPersonName: string,
  companyName: string,
  companyEmail: string,
  phoneNumber: string,
  companyAddress: string,
  about: string,
  website: string,
  designation: string,
  facebookProfile: string,
  linkedinProfile: string,
  instagramProfile: string,
  services: string[],

) => {
  await api.put("/exhibitor/edit", {
    _id,
    salesPersonName,
    companyName,
    email: companyEmail,
    phoneNumber,
    address: companyAddress,
    website,
    about,
    designation,
    facebookProfile,
    linkedinProfile,
    instagramProfile,
    services
  });
};

const EditCoverImage = async (_id: any, coverImage: any) => {
  if (!coverImage) {
    await api.put("/exhibitor/cover-image", {
      _id,
      coverImage: null,
    });
    return;
  }

  await api.put("/exhibitor/cover-image", {
    _id,
    coverImage,
  });
};

const EditGalleryImage = async (_id: string, images: string[]) => {
  await api.post("/exhibitor/add-gallery-image", {
    _id,
    images,
  });
};

const editGalleryList = async (_id: string, images: string[]) => {
  await api.put("/exhibitor/edit-gallery-list", {
    _id,
    images,
  });
};

const FogotPosswordRequest = async (email: string) => {
  const response = await api.post("/user/forgot-password", { email });
  return response;
};

const ResetPasswordRequest = async (token: string, password: string) => {
  const response = await api.put("/user/reset-password", { token, password });
  return response;
};

const CompanyKeyExistsRequest = async (companyNameKey: string) => {
  const response = await api.post("/exhibitor/check-company-name-key", {
    companyNameKey,
  });
  return response;
};

const AddAttendee = async (
  _id: string,
  name: string,
  email: string,
  contactNumber: string,
  companyName: string,
  note: string
) => {
  const response = await api.post("/exhibitor/add-attendee", {
    _id,
    name,
    companyName,
    contactNumber,
    email,
    note,
  });
  return response;
};

const EditAttendee = async (
  _id: string,
  attendeeId: string | undefined,
  name: string,
  email: string,
  contactNumber: string,
  companyName: string,
  note: string
) => {
  const response = await api.put("/exhibitor/edit-attendee", {
    _id,
    attendeeId,
    name,
    companyName,
    contactNumber,
    email,
    note,
  });
  return response;
};

const DeleteAttendee = async (_id: string, attendeeId: string | undefined) => {
  const response = await api.delete("/exhibitor/delete-attendee", {
    data: {
      _id,
      attendeeId,
    },
  });
  return response;
};

const SendInquiryEmail = async (
  name: string,
  from: string,
  to: string,
  message: string,
  contact: string
) => {
  const response = await api.post("/mail/send-inquiry-email", {
    name,
    from,
    to,
    message,
    contact
  });
  return response;
};

const GetAllExhibitors = async () => {
  const response = await api.get("/admin/get-all-exhibitors");
  return response;
};

const ExhibitorStatusChange = async (email: string, status: boolean) => {
  const response = await api.post("/admin/change-exhibitor-status", {
    email,
    status,
  });
  return response;
};

const CreateCategory = async (name: string) => {
  const response = await api.post("/category/create", {
    name,
  });
  return response;
};

const GetAllCategories = async () => {
  const response = await api.get("/category/all");
  return response;
};

const DeleteCategory = async (name: string) => {
  const response = await api.delete("/category/delete", {
    data: {
      name,
    },
  });
  return response;
};

export {
  LoginRequest,
  RegisterRequest,
  AdminRegisterRequest,
  GetExhibitorProfile,
  EditCoverImage,
  EditGalleryImage,
  EditExhibitorProfile,
  FogotPosswordRequest,
  ResetPasswordRequest,
  CompanyKeyExistsRequest,
  AddAttendee,
  EditAttendee,
  DeleteAttendee,
  SendInquiryEmail,
  GetAllExhibitors,
  ExhibitorStatusChange,
  CreateCategory,
  GetAllCategories,
  DeleteCategory,
  editGalleryList,
};
