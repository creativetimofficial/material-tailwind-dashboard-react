import { Routes, Route } from "react-router-dom";
import routes from "@/routes";

export function Terms() {

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "terms" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

Terms.displayName = "/src/layout/Terms.jsx";

export default Terms;
