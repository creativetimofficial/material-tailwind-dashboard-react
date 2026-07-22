import { Routes, Route, Navigate } from "react-router-dom"; // 👈 Navigate eklendi
import {
  Sidenav,
  DashboardNavbar,
  Footer,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController } from "@/context";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-64">
        <DashboardNavbar />
        
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "anasayfa" &&
              pages.map(({ path, element }) => (
                <Route  key={path} path={path} element={element} />
              ))
          )}

          {/* 🚀 BURASI SİHİRLİ DOKUNUŞ: 
              Kullanıcı panel ana dizinine geldiğinde veya 
              bulunmayan bir sayfaya gittiğinde 'arac-siralar' açılsın. */}
          <Route path="/" element={<Navigate to="/anasayfa/arac-siralari" replace />} />
          <Route path="*" element={<Navigate to="/anasayfa/arac-siralari" replace />} />
        </Routes>

        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
