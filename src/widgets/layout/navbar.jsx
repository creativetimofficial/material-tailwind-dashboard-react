import React from "react";
import PropTypes from "prop-types";
import {
  Navbar as MTNavbar,
  MobileNav,
} from "@material-tailwind/react";

export function Navbar({ action }) {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (

    <MTNavbar className="p-3">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        {React.cloneElement(action, {
          className: "hidden lg:inline-block",
        })}
      </div>

      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {React.cloneElement(action, {
            className: "w-full block lg:hidden",
          })}
        </div>
      </MobileNav>

    </MTNavbar>
  );
}

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
