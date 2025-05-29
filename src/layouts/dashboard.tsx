import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout"; // Sidenav, DashboardNavbar etc. will be typed later
import routes from "@/routes"; // Will be typed when @/routes is migrated
import { useMaterialTailwindController, setOpenConfigurator } from "@/context"; // Context functions

import { ReactNode, Dispatch } from 'react'; // Added for types

// Tentative types for the imported 'routes' structure (consistent with auth.tsx)
interface PageConfig {
  path: string;
  element: ReactNode;
  name?: string;
  icon?: any; // Simplified for now
  // other properties if they exist
}

interface RouteConfig {
  layout: string;
  pages: PageConfig[];
  name?: string;
  icon?: any; // Simplified for now
  // other properties if they exist
}

// Simplified types for MaterialTailwindController context
interface MaterialTailwindState {
  sidenavType: "dark" | "white" | string; // Assuming sidenavType can be one of these
  openConfigurator: boolean;
  // Add other relevant state properties from the context if known
  // e.g., fixedNavbar: boolean, sidenavColor: string etc.
}

// Define action types used by this component or relevant to it
type MaterialTailwindAction =
  | { type: "OPEN_CONFIGURATOR"; value: boolean }
  | { type: "SIDENAV_TYPE"; value: "dark" | "white" }
  // Add other action types if they are used by setOpenConfigurator or affect controller state used here
  | { type: string; value?: any }; // Fallback for other actions

type MaterialTailwindDispatch = Dispatch<MaterialTailwindAction>;


export function Dashboard() {
  // Assume useMaterialTailwindController returns state and dispatch matching these types
  const [controller, dispatch] = useMaterialTailwindController() as [MaterialTailwindState, MaterialTailwindDispatch];
  const { sidenavType } = controller; // sidenavType is now typed

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes as RouteConfig[]} // Cast routes for Sidenav
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)} // dispatch is now typed
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {(routes as RouteConfig[]).map( // Cast routes to expected type
            ({ layout, pages }, key: number) => // Added key for map
              layout === "dashboard" &&
              pages.map(({ path, element }: PageConfig, pageKey: number) => ( // Added key and type for page
                <Route key={`${layout}-${pageKey}`} path={path} element={element} /> // Key added
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layouts/dashboard.tsx"; // Updated display name

export default Dashboard;
