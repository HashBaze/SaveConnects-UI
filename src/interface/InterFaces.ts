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
  setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSideBar: () => void;
  companyKey: string;
  setCompanyKey: React.Dispatch<React.SetStateAction<string>>;
  exhibitor: IExhibitor;
  setExhibitor: React.Dispatch<React.SetStateAction<IExhibitor>>;
  salesPersonName: string;
  setSelsePersonName: (name: string) => void;
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
  isEnabled?: boolean;
  designation: string;
  facebookProfile: string;
  linkedinProfile: string;
  instagramProfile: string;
  services: string[];
}

export interface IAttendee {
  _id?: string;
  name: string;
  email: string;
  contactNumber: string;
  companyName: string;
  note: string;
}

export interface IProfileModal {
  salesPersonName: string;
  companyName: string;
  companyEmail: string;
  phoneNumber: string;
  companyAddress: string;
  about: string;
  website: string;
  designation: string;
  facebookProfile: string;
  linkedinProfile: string;
  instagramProfile: string;
  services: string[];
}

export interface ICategory {
  _id?: string;
  name: string;
}

export interface ExhibitorHederData {
  companyName: string;
  role: string;
}
