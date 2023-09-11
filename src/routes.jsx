import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Noticias",
        path: "/noticias",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Indicadores",
        path: "/indicadores",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Calendario",
        path: "/calendario",
        element: <Tables />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Mensajes",
        path: "/mensajes",
        element: <Notifications />,
      },
    ],
  }
  
];

export default routes;
