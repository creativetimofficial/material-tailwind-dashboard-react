import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  TruckIcon,
  MapIcon,
  Squares2X2Icon,
  QueueListIcon, // 1. YENİ: Sıra Yönetimi sayfası için gerekli ikonu import edelim
} from "@heroicons/react/24/solid";

// 1. YENİ: Yeni sayfa bileşenimizi de diğerlerinin yanına import edelim
import {
  Home,
  Profile,
  Tables,
  Notifications,
  QueueManagementPage
} from "@/pages/dashboard";


import { SignIn } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <Squares2X2Icon {...icon} />,
        name: "Araç Sıraları",
        path: "/home",
        element: <Home />,
      },
      // 2. YENİ: "Sıra Yönetimi" sayfasını menüye ekleyelim
      // Bu, feature branch'inden gelen ana özelliktir.
      {
        icon: <QueueListIcon {...icon} />,
        name: "Sıra Yönetimi",
        path: "/queue-management",
        element: <QueueManagementPage />,
        roles: ['admin'], // Sadece adminler görebilir
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Kullanıcılar",
        path: "/profile",
        element: <Profile />,
        roles: ['admin'],
      },
      {
        icon: <TruckIcon {...icon} />,
        name: "Araçlar",
        path: "/tables",
        element: <Tables />,
        roles: ['admin'],
      },
      {
        icon: <MapIcon {...icon} />,
        name: "Güzergahlar",
        path: "/notifications",
        element: <Notifications />,
        roles: ['admin'],
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
    ],
  },
];

export default routes;