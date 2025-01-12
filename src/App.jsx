import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth,Terms} from "@/layouts";
import { useAuth } from "./hooks/Auth";
import NotFound from "./pages/NotFound";

function App() {
  const {account} = useAuth()
  return (
    <Routes>
      {account ? <Route path="/dashboard/*" element={<Dashboard />} /> :
      <Route path="/auth/*" element={<Auth />} />}
      <Route path="/terms/*" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
