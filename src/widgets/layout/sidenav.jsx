import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 h-16 flex items-center justify-between px-6 shadow-md ${
        sidenavType === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* home으로 가는 버튼 */}
      {/* 왼쪽 브랜드 로고 */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={brandImg} alt="Brand Logo" className="h-8 w-auto" />
          <Typography variant="h6">{brandName}</Typography>
        </Link>
      </div>
      <div className="flex-grow flex justify-start gap-4 ml-8">
        {routes.map(({ layout, pages }) =>
          pages.map(({ icon, name, path }) => (
            <NavLink key={name} to={`/${layout}${path}`}>
              {({ isActive }) => (
                <Button
                  variant={isActive ? "gradient" : "text"}
                  color={isActive ? "blue-gray" : "gray"} // ✅ "dark" → "gray"로 변경
                  className={`flex items-center gap-2 capitalize ${
                    isActive ? "bg-gray-900 text-white" : ""
                  }`}>
                  {icon}
                  <Typography color="inherit" className="font-medium">
                    {name}
                  </Typography>
                </Button>
              )}
            </NavLink>
          ))
        )}
      </div>
    </nav>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/metroAptLogo.png",
  brandName: "Metro APT",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  sidenavType: PropTypes.string, // ✅ sidenavType을 props로 받도록 추가
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
