import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import PrivateRoute from "../src/component/PrivateRoute";
import TVQueuePage from "./pages/dashboard/TVQueuePage";

function App() {
  return (




    <Routes>
      <Route
        path="/anasayfa/*"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route path="/tv/monitor" element={<TVQueuePage />} />
      {/* Auth sayfaları (giriş, kayıt) herkes görebilir */}
      <Route path="/auth/*" element={<Auth />} />
      {/* Varsayılan yönlendirme */}
      <Route path="*" element={<Navigate to="/auth/giris" replace />} />
    </Routes>
  );
}

export default App;
