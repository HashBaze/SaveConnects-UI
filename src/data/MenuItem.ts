import { IMenuItem } from "../interface/InterFace";

export const getMenuItems = (companyNameKey: string | null): IMenuItem[] => {
  const role = localStorage.getItem("role");

  if (role === "Admin") {
    return [
      {
        label: "Categories",
        icon: "./icon/dashboard.svg",
        link: "/categories",
        alt: "Categories",
      },
      {
        label: "Exhibitors",
        icon: "./icon/attendees.svg",
        link: "/exhibitors",
        alt: "Exhibitors",
      },
      {
        label: "Sign Out",
        icon: "./icon/logout.svg",
        link: "",
        alt: "Sign Out",
      },
    ];
  } else if (role === "Exhibitor") {
    return [
      {
        label: "Dashboard",
        icon: "./icon/dashboard.svg",
        link: companyNameKey ? `/${companyNameKey}` : "/dashboard",
        alt: "Dashboard",
      },
      {
        label: "Attendees",
        icon: "./icon/attendees.svg",
        link: "/attendees",
        alt: "Attendees",
      },
      {
        label: "Sign Out",
        icon: "./icon/logout.svg",
        link: "",
        alt: "Sign Out",
      },
    ];
  } else {
    return [];
  }
};
