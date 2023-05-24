import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./pages/auth/PrivateRoute";
function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const User = true;
  return (
    <>
      <Toaster />
    
      <Routes>
        {/* <Route path="/dashboard/*" element={<Dashboard />} /> */}
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/dashboard/*" element={<PrivateRoute element={Dashboard} />} />
        {/* <Route path="*" element={<Navigate to="/dashboard/home" replace />} /> */}
      </Routes>
    </>
  );
}

export default App;
