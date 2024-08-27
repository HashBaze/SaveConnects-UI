import { IMenuItem } from "../interface/Interface";

export const getMenuItems = (companyNameKey: string | null): IMenuItem[] => [
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
