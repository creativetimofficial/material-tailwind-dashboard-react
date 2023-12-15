import { Routes, Route } from "react-router-dom";
import { Sidenav, DashboardNavbar, Configurator, Footer } from "@/widgets/layout";
import routes from "@/routes";
import appLogo from "@/assets/img/appLogo.png";
import useAuth from "@/hooks/useAuth";
import { useSignal } from "@dilane3/gx";
import { AuthState } from "@/gx/signals/auth.signal";
import LoadingPage from "@/components/molecules/LoadingPage";
import useLoadFaculties from "@/hooks/useLoadFaculties";

export function Dashboard() {
  // Global state
  const { loaded, loading } = useSignal<AuthState>("auth");

  // Hooks

  // This hooks gets the current user from the API
  useAuth();
  useLoadFaculties();

  // Check if the user is authenticated
  if (!loaded && loading) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav routes={routes} brandImg={appLogo} />
      <div className="ml-12 p-4 xl:ml-80">
        <DashboardNavbar />

        {/* <Configurator /> */}

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
