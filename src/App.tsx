import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Auth, Dashboard } from "@/layouts";
import { CurrentUserProvider } from "./provider/currentUser";
import { ExportProvider } from "./provider/export";
import ModalProvider from "./provider/modalProvider";
import GXProvider from "@dilane3/gx";
import store from "./gx/store";
import { MaterialTailwindControllerProvider } from "./context";
import { ThemeProvider } from "@material-tailwind/react";
import StudentProvider from "./provider/students";

function App() {
  return (
    <GXProvider store={store}>
      <ThemeProvider>
        <ModalProvider>
          <BrowserRouter>
            <CurrentUserProvider>
              <MaterialTailwindControllerProvider>
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
              </MaterialTailwindControllerProvider>
            </CurrentUserProvider>
          </BrowserRouter>
        </ModalProvider>
      </ThemeProvider>
    </GXProvider>
  );
}

export default App;
