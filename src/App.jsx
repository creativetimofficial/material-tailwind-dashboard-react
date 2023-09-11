import { Routes, Route, Navigate } from "react-router-dom";
import { Gestor, Auth } from "@/layouts";

function App() {
  return (
    <Routes>
      <Route path="/gestor/*" element={<Gestor />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/gestor/Noticias" replace />} />
    </Routes>
  );
}

export default App;
