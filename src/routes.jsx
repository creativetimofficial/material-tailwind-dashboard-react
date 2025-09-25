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

} from "@heroicons/react/24/solid";

import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";

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

        // roles eklenmediği için giriş yapan herkes görebilir.

        // İsterseniz roles: ['admin', 'user'] de ekleyebilirsiniz.

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

        roles: ['admin'], // YENİ: Sadece adminler görebilir.

      },

      {

        icon: <MapIcon {...icon} />,

        name: "Güzergahlar",

        path: "/notifications",

        element: <Notifications />,

        roles: ['admin'], // YENİ: Sadece adminler görebilir.

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