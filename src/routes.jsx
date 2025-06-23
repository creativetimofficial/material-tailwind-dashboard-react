import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  CogIcon,
  BeakerIcon,
  Square2StackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, PaidPlans, Simulation , MoleculeViewer, Molecule2D} from "@/pages/dashboard";



import { SignIn, SignUp } from "@/pages/auth";
import { EyeIcon, GiftIcon } from "@heroicons/react/24/outline";


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
  { 
        icon: <GiftIcon {...icon} />,
        name: "paidplans",
        path: "/paidplans",
        element: <PaidPlans />,
      },
{ 
        icon: <EyeIcon {...icon} />,
        name: "simulation",
        path: "/simulation",
        element: <Simulation />,
      },      { 
        icon: <BeakerIcon {...icon} />,
        name: "molecule viewer",
        path: "/moleculeviewer",
        element: <MoleculeViewer />,
      },
      { 
        icon: <Square2StackIcon {...icon} />,
        name: "2D molecule viewer",
        path: "/molecule2d",
        element: <Molecule2D />,
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