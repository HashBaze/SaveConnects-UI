import axios from "axios";

const accessToken = localStorage.getItem("accesstoken");

const api = axios.create({
  baseURL: import.meta.env.VITE_SAVECONNECTS_SERVER_URL,
});

const LoginRequest = async (email: string, password: string) => {
  const response = await api.post("/user/login", {
    email,
    password,
  });
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
  const response = await api.get("/exhibitor/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
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
) => {
  await api.put(
    "/exhibitor/edit",
    {
      _id,
      salesPersonName,
      companyName,
      email: companyEmail,
      phoneNumber,
      address: companyAddress,
      website,
      about,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const EditCoverImage = async (_id: string, coverImage: string) => {
  await api.put(
    "/exhibitor/cover-image",
    {
      _id,
      coverImage,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const EditGalleryImage = async (_id: string, image: string) => {
  await api.put(
    "/exhibitor/add-gallery-image",
    {
      _id,
      image,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

const FogotPosswordRequest = async (email: string) => {
  const response = await api.post("/user/forgot-password", {
    email,
  });
  return response;
}

const ResetPasswordRequest = async (token: string, password: string) => {
  const response = await api.put("/user/reset-password", {
    token,
    password
  })
  return response;
}

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
};
