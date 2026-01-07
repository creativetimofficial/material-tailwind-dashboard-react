import { Home, Profile, Notifications } from './pages/dashboard';
import { ProjectsPage } from './pages/ProjectsPage';
import { SignIn, SignUp } from './pages/auth';
import {
  HomeIcon,
  UserCircleIcon,
  FolderIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid';

const icon = {
  className: 'w-5 h-5 text-inherit',
};

export const routes = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: 'dashboard',
        path: '/home',
        element: <Home />,
      },
      {
        icon: <FolderIcon {...icon} />,
        name: 'projects',
        path: '/projects',
        element: <ProjectsPage />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: 'profile',
        path: '/profile',
        element: <Profile />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: 'notifications',
        path: '/notifications',
        element: <Notifications />,
      },
    ],
  },
  {
    title: 'auth pages',
    layout: 'auth',
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: 'sign in',
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: 'sign up',
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
