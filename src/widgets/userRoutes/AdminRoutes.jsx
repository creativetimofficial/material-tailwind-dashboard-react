import {
  Categories,
  ComplainList,
  Employee,
  Users,
  Welcome,
} from "@/pages/dashboard";
import {
  BookmarkIcon,
  FlagIcon,
  TagIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
const icon = {
  className: "w-5 h-5 text-inherit",
};
const AdminRoutes = {
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
      element: <ComplainList admin />,
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
};
export default AdminRoutes;
