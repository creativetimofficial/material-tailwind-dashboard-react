import { Routes, Route } from "react-router-dom";
import {
  ChartPieIcon,
  UserIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Navbar, Footer } from "@/widgets/layout";
import userRoutes from "@/routes";

export function Auth() {
  const routes = userRoutes();
  const navbarRoutes = [
    // {
    //   name: "dashboard",
    //   path: "/dashboard/home",
    //   icon: ChartPieIcon,
    // },
    // {
    //   name: "profile",
    //   path: "/dashboard/home",
    //   icon: UserIcon,
    // },
    {
      name: "sign up",
      path: "/register",
      icon: UserPlusIcon,
    },
    {
      name: "sign in",
      path: "/login",
      icon: ArrowRightOnRectangleIcon,
    },
  ];

  return (
    <div className="relative  min-h-screen w-full">
      <div className="container relative z-40 mx-auto p-4">
        <Navbar routes={navbarRoutes} />
      </div>
      {/* <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages?.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes> */}
      <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <Footer />
      </div>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
