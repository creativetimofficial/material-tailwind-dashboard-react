import { ComplainList, Welcome, Worker } from "@/pages/dashboard";
import { BookmarkIcon, FlagIcon } from "@heroicons/react/24/solid";
const icon = {
  className: "w-5 h-5 text-inherit",
};
const OfficialRoutes = {
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
      name: "Assigned Complains",
      path: "/complain-list",
      element: <ComplainList admin />,
    },
    {
      icon: <BookmarkIcon {...icon} />,
      name: "Workers",
      path: "/worker",
      element: <Worker />,
    },
  ],
};
export default OfficialRoutes;
