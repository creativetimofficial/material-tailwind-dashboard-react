import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController } from "@/context";
import { RouteType } from "@/routes";

type SideNavProps = {
  brandImg: string;
  routes: RouteType[];
};

export function Sidenav({ brandImg, routes }: SideNavProps) {
  const [controller, _] = useMaterialTailwindController();
  const { sidenavColor, sidenavType } = controller;

  return (
    <aside
      className={`fixed inset-0 z-50 h-full w-max bg-primary  transition-transform duration-300 xl:w-72 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link to="/" className={`flex items-center gap-4 py-6 px-2 xl:px-8`}>
          <Avatar src={brandImg} size="sm" />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className="hidden xl:block"
          >
            {"Students Card"}
          </Typography>
        </Link>
      </div>
      <div className="m-2 xl:m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mt-4 mb-2 hidden xl:mx-3.5 xl:block">
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
                      color={isActive ? "white" : "white"}
                      className={`${ isActive ? "bg-white text-primary" : "text-white"} flex items-center gap-4 pl-2 pr-0 capitalize xl:px-4`}
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className={`${isActive ? "text-primary" : "text-white"} hidden font-medium capitalize xl:block`}
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

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.tsx";

export default Sidenav;
