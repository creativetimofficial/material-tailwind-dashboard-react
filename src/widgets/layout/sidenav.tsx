import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react"; // Avatar removed as brandImg is not used for an Avatar here
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import type { ReactNode, Dispatch } from 'react';

// Define types for props and context
interface SidenavPage {
  icon: ReactNode;
  name: string;
  path: string;
}

interface SidenavRouteGroup {
  layout: string;
  title?: string;
  pages: SidenavPage[];
}

interface SidenavProps {
  brandImg?: string; // Kept for API consistency, though not used in this component's JSX
  brandName?: string;
  routes: SidenavRouteGroup[];
}

// Types for MaterialTailwindController context
type SidenavType = "dark" | "white" | "transparent"; // More specific

interface MaterialTailwindState {
  sidenavColor: string; // Or MaterialColor if applicable
  sidenavType: SidenavType;
  openSidenav: boolean;
  // other state properties...
}

type MaterialTailwindAction =
  | { type: "OPEN_SIDENAV"; value: boolean }
  | { type: string; value?: any };

type MaterialTailwindDispatch = Dispatch<MaterialTailwindAction>;

const defaultBrandName = "Material Tailwind React";
// const defaultBrandImg = "/img/logo-ct.png"; // Not directly used in this component's render

export function Sidenav({
  // brandImg = defaultBrandImg, // Default parameter for unused prop
  brandName = defaultBrandName,
  routes,
}: SidenavProps) {
  const [controller, dispatch] = useMaterialTailwindController() as [MaterialTailwindState, MaterialTailwindDispatch];
  const { sidenavColor, sidenavType, openSidenav } = controller;

  const sidenavTypes: Record<SidenavType, string> = { // Typed the sidenavTypes object
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType] || sidenavTypes.white} ${ // Fallback to white if type is unexpected
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className="relative">
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white" // This color might need adjustment based on sidenavType for visibility
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className={`h-5 w-5 ${sidenavType === "dark" ? "text-white" : "text-blue-gray-900"}`} />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }: SidenavRouteGroup, key: number) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }: SidenavPage) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={ // Type for sidenavColor should be compatible with Button color prop
                        isActive
                          ? (sidenavColor as any) // Cast if sidenavColor is general string
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

// PropTypes and defaultProps are removed.

Sidenav.displayName = "/src/widgets/layout/sidenav.tsx"; // Corrected typo and extension

export default Sidenav;
