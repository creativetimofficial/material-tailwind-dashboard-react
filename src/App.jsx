import { Routes, Route } from "react-router-dom";
import { Dashboard } from "@/layouts";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
