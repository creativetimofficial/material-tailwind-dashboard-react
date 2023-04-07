import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  ComputerDesktopIcon
} from "@heroicons/react/24/solid";
import { Home, Profile, Notifications } from "@/pages/dashboard";
import WorkerList from "@/pages/dashboard/worker/List";
import WorkerDetail from "@/pages/dashboard/worker/Detail";
import ConnectOption from "@/pages/dashboard/order/connectOption";

import { SignIn, SignUp } from "@/pages/auth";

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
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "notifactions",
        path: "/notifactions",
        element: <Notifications />,
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "worker",
        path: "/worker",
        element: <WorkerList />,
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "details",
        path: "/worker/:id",
        element: <WorkerDetail />,
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "connect",
        path: "/connect",
        element: <ConnectOption />,
      },
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
