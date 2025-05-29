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
import type { ReactNode, JSX } from 'react'; // Import ReactNode and JSX

// Define interfaces for the route structures
interface PageRoute {
  icon: JSX.Element; // The icons are JSX elements e.g. <HomeIcon ... />
  name: string;
  path: string;
  element: ReactNode; // Components like <Home /> are ReactNode or JSX.Element
}

interface RouteGroup {
  layout: string;
  pages: PageRoute[];
  title?: string; // title is optional
}

const icon = { // This object is spread onto Heroicon components
  className: "w-5 h-5 text-inherit",
};

// Apply the RouteGroup[] type to the routes array
export const routes: RouteGroup[] = [
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
];

export default routes;
