import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Navbar, Footer } from "@/widgets/layout"; // These will be typed later
import routes from "@/routes"; // This will be typed when @/routes is migrated

import { ForwardRefExoticComponent, SVGProps, ReactNode } from 'react'; // Added ReactNode for element

// Type for Heroicon components
type HeroIconType = ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string, titleId?: string }>;

interface NavbarRoute {
  name: string;
  path: string;
  icon: HeroIconType;
}

// Tentative types for the imported 'routes' structure
interface PageConfig {
  path: string;
  element: ReactNode; // JSX.Element or React.ReactNode should work
  name?: string; // Optional, based on common patterns
  icon?: HeroIconType | JSX.Element; // Optional
}

interface RouteConfig {
  layout: string;
  pages: PageConfig[];
  name?: string; // Optional
  icon?: HeroIconType | JSX.Element; // Optional
}

export function Auth() {
  // The 'routes' import is expected to be RouteConfig[]
  // For now, we'll assume it matches this structure.
  // If not, TypeScript will complain when routes.js is converted or when this is used.

  const navbarRoutes: NavbarRoute[] = [
    {
      name: "dashboard",
      path: "/dashboard/home",
      icon: ChartPieIcon,
    },
    {
      name: "profile",
      path: "/dashboard/home",
      icon: UserIcon,
    },
    {
      name: "sign up",
      path: "/auth/sign-up",
      icon: UserPlusIcon,
    },
    {
      name: "sign in",
      path: "/auth/sign-in",
      icon: ArrowRightOnRectangleIcon,
    },
  ];

  return (
    <div className="relative min-h-screen w-full">
      {/* The Navbar and Footer are commented out in the original auth.jsx, so no props to worry about here yet */}
      {/* <Navbar routes={navbarRoutes} /> */}
      {/* <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4"></div> */}
      <Routes>
        {(routes as RouteConfig[]).map( // Cast routes to expected type for now
          ({ layout, pages }, key: number) => // Added key for map
            layout === "auth" &&
            pages.map(({ path, element }: PageConfig, pageKey: number) => ( // Added key and type for page
              <Route key={`${layout}-${pageKey}`} path={path} element={element} /> // Key added to Route
            ))
        )}
      </Routes>
      {/* <div className="container absolute bottom-0 left-2/4 z-10 mx-auto -translate-x-2/4">
        <Footer />
      </div> */}
    </div>
  );
}

Auth.displayName = "/src/layouts/Auth.tsx"; // Updated display name

export default Auth;
