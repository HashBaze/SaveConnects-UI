import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminRegister from "./components/AdminRegister";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Attendees from "./components/Attendees";
import NotFound from "./components/NotFound";

const AppRoutes: React.FC = () => {
  const [routes, setRoutes] = useState<RouteObject[]>([]);

  useEffect(() => {
    const companyNameKey = localStorage.getItem("companyNameKey") || "dashboard";

    const newRoutes: RouteObject[] = [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <Landing /> },
          { path: "signup", element: <Register /> },
          { path: "login", element: <Login /> },
          { path: "admin", element: <AdminRegister /> },
          { path: companyNameKey, element: <Dashboard /> },
          { path: "attendees", element: <Attendees /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ];

    setRoutes(newRoutes);
  }, []);

  if (routes.length === 0) {
    return null;
  }

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default AppRoutes;