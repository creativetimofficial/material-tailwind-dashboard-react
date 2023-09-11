import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Noticias, Indicadores, Calendario, Mensajes } from "@/pages/dashboard";

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
        element: <Noticias/>,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Indicadores",
        path: "/indicadores",
        element: <Indicadores/>,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Calendario",
        path: "/calendario",
        element: <Calendario/>,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Mensajes",
        path: "/mensajes",
        element: <Mensajes/>,
      },
    ],
  }
  
];

export default routes;
