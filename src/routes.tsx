import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminRegister from "./components/AdminRegister";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Attendees from "./components/Attendees";

// Define and export routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "signup",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "admin",
        element: <AdminRegister />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "attendees",
        element: <Attendees />,
      },
    ],
  },
]);

export default router;
