import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenSidenav,
  setAuthStatus,
} from "@/context";
import { useNavigate } from "react-router-dom";

export function Sidenav({ brandImg, brandName, routes, onCollapse }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav, isAuthenticated } = controller;
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Gửi trạng thái collapse ra ngoài nếu cần dùng bên ngoài
  useEffect(() => {
    if (onCollapse) onCollapse(collapsed);
  }, [collapsed]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc muốn đăng xuất?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      setAuthStatus(dispatch, false);
      navigate("/auth/sign-in");
    }
  };

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  const visibleRoutes = isAuthenticated
    ? routes.filter(({ title }) => title?.toLowerCase() !== "auth pages")
    : routes;

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-y-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] ${
        collapsed ? "w-20" : "w-60"
      } rounded-xl transition-all duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className="relative">
        <Link to="/" className="py-6 px-4 text-center block">
          <Typography
            color="inherit"
            className={`font-medium text-lg transition-all duration-300 ${
              collapsed ? "hidden" : "block"
            }`}
          >
            Admin Farm
          </Typography>
        </Link>

        <IconButton
          variant="text"
          color="blue-gray"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 m-2"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRightIcon className="h-5 w-5 text-blue-gray-700" />
          ) : (
            <ChevronLeftIcon className="h-5 w-5 text-blue-gray-700" />
          )}
        </IconButton>
      </div>

      <div className="m-4">
        {visibleRoutes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && !collapsed && (
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
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      }
                      className={`flex items-center gap-4 capitalize transition-all duration-200 ${
                        collapsed ? "justify-center p-3" : "px-4"
                      }`}
                      fullWidth
                    >
                      {icon}
                      {!collapsed && (
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      )}
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {isAuthenticated && (
        <div className="m-4">
          <Button
            variant="text"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className={`w-full flex items-center gap-4 capitalize ${
              collapsed ? "justify-center p-3" : "px-4"
            }`}
            fullWidth
            onClick={handleLogout}
          >
            {/* icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 12H9m0 0l3-3m-3 3l3 3"
              />
            </svg>

            {!collapsed && (
              <Typography color="inherit" className="font-medium">
                Log out
              </Typography>
            )}
          </Button>
        </div>
      )}
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCollapse: PropTypes.func, // optional callback
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
