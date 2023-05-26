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
  ArrowPathIcon,
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
  Employee,
  Users,
} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { useEffect, useState } from "react";

const icon = {
  className: "w-5 h-5 text-inherit",
};
const userRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [routes, setroutes] = useState([]);

  const conditionalRoutes = () => {
    if (user?.role === "Resident") {
      setroutes([
        {
          layout: "dashboard",
          pages: [
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
            {
              icon: <FlagIcon {...icon} />,
              name: "hide",
              path: "/",
              element: <Welcome />,
            },
          ],
        },
      ]);
      return;
    }
    if (user?.role === "admin") {
      setroutes([
        {
          layout: "dashboard",
          pages: [
            {
              icon: <FlagIcon {...icon} />,
              name: "hide",
              path: "/",
              element: <Welcome />,
            },
            {
              icon: <BookmarkIcon {...icon} />,
              name: "Complains",
              path: "/complain-list",
              element: <ComplainList admin={true} />,
            },
            {
              icon: <TagIcon {...icon} />,
              name: "Categories",
              path: "/categories",
              element: <Categories />,
            },
            {
              icon: <UserPlusIcon {...icon} />,
              name: "Employees",
              path: "/employee",
              element: <Employee />,
            },
            {
              icon: <UserCircleIcon {...icon} />,
              name: "Users",
              path: "/users",
              element: <Users />,
            },
          ],
        },
      ]);
      return;
    }
  };

  useEffect(() => {
    conditionalRoutes();
  }, []);

  return routes;
};

// export const routes = [
//   {
//     layout: "dashboard",
//     // pages: newConditionalRoutes,
//     pages: [
//       // {
//       //   icon: <HomeIcon {...icon} />,
//       //   name: "dashboard",
//       //   path: "/home",
//       //   element: <Home />,
//       // },
//       // {
//       //   icon: <UserCircleIcon {...icon} />,
//       //   name: "profile",
//       //   path: "/profile",
//       //   element: <Profile />,
//       // },
//       // {
//       //   icon: <TableCellsIcon {...icon} />,
//       //   name: "tables",
//       //   path: "/tables",
//       //   element: <Tables />,
//       // },
//       // {
//       //   icon: <BellIcon {...icon} />,
//       //   name: "notifactions",
//       //   path: "/notifactions",
//       //   element: <Notifications />,
//       // },
//       {
//         icon: <FlagIcon {...icon} />,
//         name: "hide",
//         path: "/",
//         element: <Welcome />,
//       },
//       {
//         icon: <FlagIcon {...icon} />,
//         name: "complain",
//         path: "/complain",
//         element: <Complain />,
//       },
//       {
//         icon: <BookmarkIcon {...icon} />,
//         name: "Your Complain",
//         path: "/complain-list",
//         element: <ComplainList />,
//       },
//       // {
//       //   icon: <TagIcon {...icon} />,
//       //   name: "Categories",
//       //   path: "/categories",
//       //   element: <Categories />,
//       // },
//     ],
//   },
//   // {
//   //   title: "Login/Logout",
//   //   layout: "auth",
//   //   pages: [
//   //     {
//   //       icon: <ArrowRightOnRectangleIcon {...icon} />,
//   //       name: "sign in",
//   //       path: "/sign-in",
//   //       element: <SignIn />,
//   //     },
//   //     {
//   //       icon: <UserPlusIcon {...icon} />,
//   //       name: "sign up",
//   //       path: "/sign-up",
//   //       element: <SignUp />,
//   //     },
//   //   ],
//   // },
// ];
export default userRoutes;
