import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = {
  "eng": [
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
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
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
  ],
  "fa": [
    {
      layout: "dashboard",
      pages: [
        {
          icon: <HomeIcon {...icon} />,
          name: "داشبورد",
          path: "/home",
          element: <Home />,
        },
        {
          icon: <UserCircleIcon {...icon} />,
          name: "پروفایل",
          path: "/profile",
          element: <Profile />,
        },
        {
          icon: <TableCellsIcon {...icon} />,
          name: "جداول",
          path: "/tables",
          element: <Tables />,
        },
        {
          icon: <InformationCircleIcon {...icon} />,
          name: "اعلانات",
          path: "/notifications",
          element: <Notifications />,
        },
      ],
    },
    {
      title: "auth pages",
      layout: "auth",
      pages: [
        {
          icon: <ServerStackIcon {...icon} />,
          name: "ورود به سیستم",
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          icon: <RectangleStackIcon {...icon} />,
          name: "ثبت نام",
          path: "/sign-up",
          element: <SignUp />,
        },
      ],
    },
  ]
};

export default routes;
