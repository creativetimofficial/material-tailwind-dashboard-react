import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { StudentProvider } from "./provider/students";
import { CurrentUserProvider } from "./provider/currentUser";
import { ExportProvider } from "./provider/export";
import ModalProvider from "./provider/modalProvider";

function App() {
  return (
        <ModalProvider>
    <CurrentUserProvider>
      <StudentProvider>
        <ExportProvider>
          <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route
              path="*"
              element={<Navigate to="/dashboard/home" replace />}
              />
          </Routes>
        </ExportProvider>
      </StudentProvider>
    </CurrentUserProvider>
              </ModalProvider>
  );
}

export default App;
