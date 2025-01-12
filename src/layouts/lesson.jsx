import { Routes, Route } from "react-router-dom";
import routes from "@/routes";

export function Lesson() {

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "lesson" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

Lesson.displayName = "/src/layout/Lesson.jsx";

export default Lesson;
