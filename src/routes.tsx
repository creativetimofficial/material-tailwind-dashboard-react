import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  AcademicCapIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Home, PersonalInfo, Profile } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Students from "./pages/dashboard/students";
import { ReactNode } from "react";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export type RouteType = {
  title?: string;
  layout: string;
  pages: Array<{
    icon: ReactNode;
    name: string;
    path: string;
    element: ReactNode;
  }>;
};

export const routes: Array<RouteType> = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <AcademicCapIcon {...icon} />,
        name: "students",
        path: "/students",
        element: <Students />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <PencilIcon {...icon} />,
        name: "personal info",
        path: "/personal-info",
        element: <PersonalInfo />,
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "notifactions",
      //   path: "/notifactions",
      //   element: <Notifications />,
      // },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
