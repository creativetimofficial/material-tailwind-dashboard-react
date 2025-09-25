import { ArrowRightOnRectangleIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { IconButton, Input, Navbar, Typography, Breadcrumbs } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useLocation, Link, useNavigate } from "react-router-dom"; // 🔹 useNavigate eklendi

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  

  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("authToken"); // Token sil
  localStorage.removeItem("userRole");  // varsa rol bilgisini de sil
  navigate("/auth/sign-in"); // Login ekranına yönlendir
};


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
      <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-6">
        {/* Breadcrumbs ve sayfa başlığı */}
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""}`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout || "Home"}
              </Typography>
            </Link>
            <Typography variant="small" color="blue-gray" className="font-normal">
              {page || "Dashboard"}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray" className="capitalize">
            {page || "Dashboard"}
          </Typography>
        </div>

        {/* Arama ve ikonlar */}
        <div className="flex items-center gap-4">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" className="rounded-lg" />
          </div>

          {/* Sidenav toggle */}
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>

          {/* Çıkış butonu */}
          <IconButton
            variant="text"
            color="red"
            onClick={handleLogout} // 🔹 logout çağrıldı
            className="rounded-full hover:bg-red-100 transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}
