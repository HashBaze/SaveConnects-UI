import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminRegister from "./components/AdminRegister";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Attendees from "./components/Attendees";
import FogotPossword from "./components/FogotPossword";
import ResetPossword from "./components/ResetPassword";
import NotFound from "./components/NotFound";

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
        { index: true, element: <Landing /> },
        { path: "signup", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "admin", element: <AdminRegister /> },
        { path: ":companyNameKey", element: validCompanyKey ? <Dashboard /> : <NotFound /> },
        { path: "attendees", element: <Attendees /> },
        { path: "forgot-password", element: <FogotPossword /> },
        { path: "reset-password", element: <ResetPossword /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
