import { Complain, ComplainList, Welcome } from "@/pages/dashboard";
import { BookmarkIcon, FlagIcon } from "@heroicons/react/24/solid";
const icon = {
  className: "w-5 h-5 text-inherit",
};
const ResidentRoutes = {
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
};
export default ResidentRoutes;
