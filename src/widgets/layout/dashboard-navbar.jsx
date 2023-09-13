import { useLocation, Link } from "react-router-dom";
import {
  Avatar,
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Input
} from "@material-tailwind/react";
import {
  Bars3Icon, SunIcon, MagnifyingGlassIcon
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/context";



export function DashboardNavbar({ brandImg }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav, sidenavType } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >

      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            {/* TREE PAGE */}
            <Link to = {`/Noticias`}>
              <Typography
                variant = "small"            
                color = {
                  sidenavType === "white"
                  ? "red"
                  : "green"
                }
                className="font-normal opacity-50 transition-all hover:text-gray-500 hover:opacity-100"
              >
                {layout} SAT Móvil
              </Typography>
            </Link>
            
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>

          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input             
              label  ="Buscar en el gestor" 
              color = { sidenavType === "white" ? "red" : "green" }                        
            />
          </div>

          {/* SEARCH BUTTON */}
          <div className="mr-auto md:mr-4 md:w-5">
            <MagnifyingGlassIcon
              strokeWidth = {3}
              className = "h-6 w-6 text-blue-gray-500"
              onClick = { () => {
                alert("Buscar")
                }
              }
            />
          </div> 
          
          {/* SUN BUTTON */}
          <div className = "mr-auto md:mr-4 md:w-5">
            <SunIcon
              strokeWidth = {3}
              className = "h-6 w-6 text-blue-gray-500"
              onClick  = { () => {
                alert("Dark Mode")
                }
              }
            />
          </div> 

          {/* AVATAR */}
          <div className = "mr-auto md:mr-4 md:w-25">
            <Avatar
              src = "../public/img/avatar.png"
              size = "md"          
              style = {{
                padding: "2px",
                backgroundColor: "white",
                fill: "gray",            
                borderRadius: "50%",
                border: "2px solid white" 
              }}
              onClick  = { () => {
                alert("Avatar")
                }
              }
            />
          </div>
          
          
          {/* MOVILE - BURGUER MENU */}
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>


        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
