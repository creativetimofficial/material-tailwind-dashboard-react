import { Routes, Route } from "react-router-dom";
import { Sidenav, DashboardNavbar, Configurator, Footer } from "@/widgets/layout";
import routes from "@/routes";
import appLogo from "@/assets/img/appLogo-dark.png";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav routes={routes} brandImg={appLogo} />
      <div className="ml-12 p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route path={path} element={element} />
              )),
          )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.tsx";

export default Dashboard;
