import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function Sidenav({ brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav, userRole } = controller;
  const activeButtonColor =
    sidenavColor === "dark"
      ? "gray"
      : sidenavColor === "white"
      ? "blue-gray"
      : sidenavColor;

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <>
      {/* Arka Plan Karartma (Overlay) */}
      <div
        className={`fixed inset-0 z-[999] bg-black/50 transition-opacity duration-300 xl:hidden ${
          openSidenav
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpenSidenav(dispatch, false)}
      />

      <aside
        className={`${sidenavTypes[sidenavType]} ${
          openSidenav ? "translate-x-0" : "-translate-x-72"
        } fixed inset-0 z-[1000] my-4 ml-4 h-[calc(100vh-32px)] w-60 rounded-xl border border-blue-gray-100 transition-transform duration-300 focus:outline-none xl:translate-x-0`}
      >
        <div className="relative">
          <div className="flex select-none flex-col items-center px-5 py-5 text-center">
            <img
              src="/img/klogo.png"
              alt="Logo"
              className="mb-0 h-24 w-24 object-contain"
            />
          </div>
        </div>

        <div className="m-3">
          {routes &&
            routes
              .filter((route) => route.layout === "anasayfa")
              .map(({ layout, pages }, key) => (
                <ul key={key} className="mb-4 flex flex-col gap-1">
                  {pages &&
                    pages
                      .filter((page) => !page.hidden) // hidden olan route'ları menüden çıkar
                      .filter(
                        (page) => !page.roles || page.roles.includes(userRole),
                      )
                      .map(({ icon, name, path }) => (
                        <li key={name}>
                          <NavLink
                            to={`/${layout}${path}`}
                            onClick={() => {
                              if (window.innerWidth < 1200) {
                                setOpenSidenav(dispatch, false);
                              }
                            }}
                          >
                            {({ isActive }) => (
                              <Button
                                variant={isActive ? "gradient" : "text"}
                                color={
                                  isActive
                                    ? activeButtonColor
                                    : sidenavType === "dark"
                                    ? "white"
                                    : "blue-gray"
                                }
                                className="flex items-center gap-3 px-3 capitalize"
                                fullWidth
                              >
                                {icon}
                                <Typography
                                  color="inherit"
                                  className="text-sm font-medium capitalize"
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
    </>
  );
}

Sidenav.defaultProps = {
  brandName: "S.S. 75 NO'LU KOOP",
};

Sidenav.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.array.isRequired,
};

export default Sidenav;
