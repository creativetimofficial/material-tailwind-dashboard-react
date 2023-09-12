import {
  NewspaperIcon,
  PresentationChartBarIcon,
  CalendarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CodeBracketSquareIcon,
  UsersIcon
} from "@heroicons/react/24/solid";
import { Noticias, Indicadores, Calendario, Mensajes, Aplicaciones, Acerca } from "@/pages/gestor";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "gestor",
    pages: [
      {
        icon: <NewspaperIcon {...icon} />,
        name: "Noticias",
        path: "/noticias",
        element: <Noticias/>,
      },
      {
        icon: <PresentationChartBarIcon {...icon} />,
        name: "Indicadores",
        path: "/indicadores",
        element: <Indicadores/>,
      },
      {
        icon: <CalendarIcon {...icon} />,
        name: "Calendario",
        path: "/calendario",
        element: <Calendario/>,
      },
      {
        icon: <ChatBubbleOvalLeftEllipsisIcon {...icon} />,
        name: "Mensajes",
        path: "/mensajes",
        element: <Mensajes/>,
      },
      {
        icon: <CodeBracketSquareIcon {...icon} />,
        name: "Otras Aplicaciones",
        path: "/aplicaciones",
        element: <Aplicaciones/>,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Acerca de",
        path: "/acerca",
        element: <Acerca/>,
      },
    ],
  }
  
];

export default routes;
