export interface IMenuItem {
  label: string;
  icon: string;
  link: string;
  alt: string;
}

export interface Breadcrumb {
  breadcrumb: string;
}

export interface AppContextType {
  sideBarOpen: boolean;
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggleSideBar: () => void;
}

export interface IExhibitor {
  _id: string;
  email: string;
  salesPersonName: string;
  companyName: string;
  companyNameKey: string;
  coverImage: string;
  companyCategory: string;
  phoneNumber: string;
  website: string;
  address: string;
  about: string;
  gallery: string[];
}

export interface IProfileModal {
  companyName: string;
  companyEmail: string;
  phoneNumber: string;
  companyAddress: string;
  about: string;
}
