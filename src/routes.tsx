import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  AcademicCapIcon,
  PencilIcon,
  PrinterIcon,
  RectangleGroupIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import { Home, PersonalInfo, Profile } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Students from "./pages/dashboard/students";
import { ReactNode } from "react";
import Export from "./layouts/exports";
import AddStudent from "./components/addStudent";
import { Faculties } from "./pages/dashboard/faculty";
import { Sectors } from "./pages/dashboard/sector";
import AcademicYear from "./pages/dashboard/academicYear";
import Agents from "./pages/dashboard/agents";

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
        icon: <RectangleGroupIcon {...icon} />,
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
        icon: <AcademicCapIcon {...icon} />,
        name: "agents",
        path: "/agents",
        element: <Agents />,
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
      {
        icon: <PrinterIcon {...icon} />,
        name: "export card",
        path: "/export-card",
        element: <Export />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "add student",
        path: "/add-student",
        element: <AddStudent />,
      },
      {
        icon: <AcademicCapIcon {...icon} />,
        name: "faculty",
        path: "/faculty",
        element: <Faculties />,
      },
      {
        icon: <AcademicCapIcon {...icon} />,
        name: "sector",
        path: "/sector",
        element: <Sectors />,
      },
      {
        icon: <CalendarDaysIcon {...icon} />,
        name: "academic year",
        path: "/academic-year",
        element: <AcademicYear />,
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
      // {
      //   icon: <UserPlusIcon {...icon} />,
      //   name: "sign up",
      //   path: "/sign-up",
      //   element: <SignUp />,
      // },
    ],
  },
];

export default routes;
