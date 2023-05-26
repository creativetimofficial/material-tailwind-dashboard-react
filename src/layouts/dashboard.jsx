import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
// import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useUserContext } from "@/context/UserContext";
import welcome2 from "/img/welcome2.svg";
import userRoutes from "@/routes";

export function Dashboard() {
  const routes = userRoutes();
  console.log(routes, "Routes From Dashboard");

  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { user } = useUserContext();
  return (
    <div className="min-h-screen  bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/awt_logo.png" : "/img/awt_logo.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        {/* <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>{" "} */}
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
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

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
