import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom"; 
import { IconButton, Navbar, Typography, Breadcrumbs } from "@material-tailwind/react";
import { ArrowRightOnRectangleIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

// ✨ URL'den gelen teknik ismi şık bir başlığa çeviren harita
const pageNamesMap = {
    "arac-siralari": "Araç Sıraları",
    "sira-yonetimi": "Sıra Yönetimi",
    "ozel-gorev": "Özel Görev",
    "kullanici-ayarlari": "Kullanıcılar",
    "arac-listesi": "Araçlar",
    "guzergahlar": "Güzergahlar",
};

export function DashboardNavbar() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { fixedNavbar, openSidenav } = controller;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // URL'yi parçalayıp layout (dashboard) ve sayfa (path) kısımlarını alıyoruz
    const pathParts = pathname.split("/").filter((el) => el !== "");
    const layout = pathParts[0];
    const urlPath = pathParts[1];
    
    // Eşleştirme listesinden Türkçe ismi çek, yoksa ham halini göster
    const currentPageName = pageNamesMap[urlPath] || urlPath; 

    const handleLogout = () => {
        localStorage.removeItem("authToken"); 
        localStorage.removeItem("userRole");  
        navigate("/auth/giris"); // Yeni login path'imize yönlendiriyoruz
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
            <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-6 px-4">
              <div className="capitalize">
                  {/* Sayfa Yolu (Breadcrumbs) */}
                  <Breadcrumbs className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""}`}>
                      <Link to={`/${layout}/arac-siralari`}>
                          <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                          >
                              Anasayfa
                          </Typography>
                      </Link>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                          {currentPageName}
                      </Typography>
                  </Breadcrumbs>
                  
                  {/* Büyük Sayfa Başlığı */}
                  <Typography variant="h6" color="blue-gray">
                      {currentPageName}
                  </Typography>
              </div>

                {/* Sağ Taraf: Mobil Menü ve Çıkış Butonu */}
                <div className="flex items-center gap-4">
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="grid xl:hidden"
                        onClick={() => setOpenSidenav(dispatch, !openSidenav)}
                    >
                        <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
                    </IconButton>

                    <IconButton
                        variant="text"
                        color="red"
                        onClick={handleLogout} 
                        className="rounded-full hover:bg-red-50 transition-colors"
                        title="Güvenli Çıkış"
                    >
                        <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-500" />
                    </IconButton>
                </div>
            </div>
        </Navbar>
    );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;