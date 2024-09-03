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
import ProfileCardPage from "./pages/ProfileCardPage";
import CategoryPage from "./pages/CategoryPage";
import ExhibitorsPage from "./pages/ExhibitorsPage";

import { CompanyKeyExistsRequest } from "./utils/ApiRequest";

const AppRoutes: React.FC = () => {
  const [validCompanyKey, setValidCompanyKey] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const path = window.location.pathname.split("/").pop() || "/";
  useEffect(() => {
    const checkCompanyKey = async () => {
      const availableRoutes = [
        "signup",
        "login",
        "admin",
        "forgot-password",
        "reset-password",
        "attendees",
        "categories",
        "exhibitors",
      ];

      if (!availableRoutes.includes(path)) {
        try {
          const response = await CompanyKeyExistsRequest(path);

          if (response.status === 200 && response.data.data.isEnabled === true) {
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

    const checkIfSignedIn = async () => {
      const accesstoken = localStorage.getItem("accesstoken");
      const companyNameKey = localStorage.getItem("companyNameKey");

      if (accesstoken && companyNameKey && companyNameKey === path) {
        setIsSignedIn(true);
      }
    };

    checkIfSignedIn();
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
        {
          path: ":companyNameKey",
          element: validCompanyKey ? (
            isSignedIn ? (
              <DashboardPage />
            ) : (
              <ProfileCardPage />
            )
          ) : (
            <NotFoundPage />
          ),
        },
        { path: "attendees", element: <AttendeePage /> },
        { path: "forgot-password", element: <FogotPasswordPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
        { path: "categories", element: <CategoryPage /> },
        { path: "exhibitors", element: <ExhibitorsPage /> },
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
