import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  FlagIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  TagIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import {
  Home,
  Profile,
  Tables,
  Notifications,
  Categories,
  Complain,
  ComplainList,
  Welcome,
} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};
export const routes = [
  {
    layout: "dashboard",
    pages: [
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "dashboard",
      //   path: "/home",
      //   element: <Home />,
      // },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
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
      {
        icon: <FlagIcon {...icon} />,
        name: "hide",
        path: "/",
        element: <Welcome />,
      },
      {
        icon: <FlagIcon {...icon} />,
        name: "complain",
        path: "/complain",
        element: <Complain />,
      },
      {
        icon: <BookmarkIcon {...icon} />,
        name: "Your Complain",
        path: "/complain-list",
        element: <ComplainList />,
      },
      // {
      //   icon: <TagIcon {...icon} />,
      //   name: "Categories",
      //   path: "/categories",
      //   element: <Categories />,
      // },
    ],
  },
  // {
  //   title: "Login/Logout",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ArrowRightOnRectangleIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <UserPlusIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
];

export default routes;
