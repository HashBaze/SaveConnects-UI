import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import AttendeePage from "./pages/AttendeePage";
import FogotPasswordPage from "./pages/FogotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import LoadingPage from "./pages/LoadingPage";

import { companyKeyExistsRequest } from "./utils/ApiRequest";

const AppRoutes: React.FC = () => {
  const [validCompanyKey, setValidCompanyKey] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const path = window.location.pathname.split("/").pop() || "/";
  useEffect(() => {
    const checkCompanyKey = async () => {
      const availableRoutes = ["signup", "login", "admin", "forgot-password", "reset-password", "attendees"];

      if (!availableRoutes.includes(path)) {
        try {
          const response = await companyKeyExistsRequest(path);

          if (response.status === 200) {
            setValidCompanyKey(path);
          } else {
            setValidCompanyKey(null);
          }
        } catch (error) {
          setValidCompanyKey(null);
          console.error(error);
        }
      }

      setLoading(false);
    };

    checkCompanyKey();
  });

  const routes: RouteObject[] = [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "signup", element: <RegisterPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "admin", element: <AdminRegisterPage /> },
        { path: ":companyNameKey", element: validCompanyKey ? <DashboardPage /> : <NotFoundPage /> },
        { path: "attendees", element: <AttendeePage /> },
        { path: "forgot-password", element: <FogotPasswordPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
      ],
    },
    { path: "*", element: <NotFoundPage /> },
  ];

  if (loading) {
    return <LoadingPage />;
  }

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
