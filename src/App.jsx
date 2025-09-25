import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import PrivateRoute from "../src/component/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Dashboard'u sadece giriş yapmış kullanıcı görecek */}
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Auth sayfaları (giriş, kayıt) herkes görebilir */}
      <Route path="/auth/*" element={<Auth />} />

      {/* Varsayılan yönlendirme */}
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;
