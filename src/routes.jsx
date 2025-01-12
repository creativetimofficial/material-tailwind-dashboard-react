import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  WalletIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, Courses, CourseManager, PackagesManager, Packages, Course, Player, Signals } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { Terms } from "@/pages/terms";
import { Boxes, GraduationCap, Handshake, Headset, SignalHigh, Video } from "lucide-react";
import ContactUs from "./pages/terms/ContactUs";
import { useAuth } from "./hooks/Auth";
import ViewPackage from "./pages/dashboard/Package";
import MyCourses from "./pages/dashboard/MyCourses";
import MyPackages from "./pages/dashboard/MyPackages";
import { AgentSupportDashboard } from "./components/Support";
import WalletDashboard from "./pages/dashboard/Wallet";
import AdminDashboardPage from "./pages/dashboard/AdminWallet";
import CourseUploader from "./pages/dashboard/uploadCourses";

const icon = {
  className: "w-5 h-5 text-inherit",
};


export const routes = [
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
        icon: <Headset {...icon} />,
        name: "Support",
        path: "/support",
        element: <AgentSupportDashboard />,
        role: "support"
      },
      
      {
        icon: <GraduationCap {...icon} />,
        name: "Courses",
        path: "/courses",
        element: <Courses />,
      },
      {
        icon: <GraduationCap {...icon} />,
        name: "My Courses",
        path: "/my-courses",
        element: <MyCourses />,
        role: "user"
      },
      {
        icon: <GraduationCap {...icon} />,
        name: "Course",
        path: "/course/:id",
        element: <Course />,
      },
      // {
      //   icon: <GraduationCap {...icon} />,
      //   name: "Course uploader",
      //   path: "/courseUploader",
      //   element: <CourseUploader />,
      //   role:'admin',
      // },
      {
        icon: <GraduationCap {...icon} />,
        name: "Courses Manager",
        path: "/courses-manager",
        element: <CourseUploader />,
        role: "admin"
      },
      {
        icon: <Boxes {...icon} />,
        name: "Packages",
        path: "/packages",
        element: <Packages />,
      },
      {
        icon: <Boxes {...icon} />,
        name: "My Packages",
        path: "/my-packages",
        element: <MyPackages />,
        role: "user"
      },
      {
        icon: <GraduationCap {...icon} />,
        name: "Package",
        path: "/package/:id",
        element: <ViewPackage />,
      },
      {
        icon: <Boxes {...icon} />,
        name: "Packages Manager",
        path: "/packages-manager",
        element: <PackagesManager />,
        role: "admin"
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
        role: "user"
      },
        {
        icon: <WalletIcon {...icon} />,
        name: "wallet",
        path: "/wallet",
        element: <WalletDashboard />,
        role: "user"
      },
      {
        icon: <WalletIcon {...icon} />,
        name: "adminWallet",
        path: "/adminWallet",
        element: <AdminDashboardPage />,
        role: "admin"
      },
      {
        icon: <SignalHigh {...icon} />,
        name: "signals",
        path: "/signals",
        element: <Signals />,
        role: "admin"
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      {
        icon: <Headset {...icon} />,
        name: "Contact Us",
        path: "/contact-us",
        element: <ContactUs />,
      },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
      {
        icon: <Video {...icon} />,
        name: "lesson",
        path: "/lesson/:id/course/:courseId",
        element: <Player />,
      }
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    title: "terms and conditions",
    layout: "terms",
    pages: [
      {
        icon: <Handshake {...icon} />,
        name: "terms and conditions",
        path: "/terms-and-conditions",
        element: <Terms />,
      },

    ]
  },
];

export default routes;
