import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CourseSearchPage from "./pages/CourseSearchPage";
import TutorDashboardPage from "./pages/TutorDashboardPage";

// ⬇️ Guard de rol (asegurate de tener el archivo src/components/RequireRole.jsx como te pasé)
import RequireRole from "./components/RequireRole";
import CreateCoursePage from "./pages/CreateCoursePage";
import TutorCoursesPage from "./pages/TutorCoursesPage";
import LearningStyleTestPage from "./pages/LearningStyleTestPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import MyCoursesPage from "./pages/MyCoursesPage";
import RecommendedCoursesPage from "./pages/RecommendedCoursesPage";

function App() {
  return (
    <div className="">
      <Navbar />
      <main className="">
        {/* <VoiceCommandButton /> */}

        <Routes>
          {/* --- Rutas Públicas --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CourseSearchPage />} />

          {/* --- Rutas Protegidas por rol --- */}
          <Route
            path="/tutor-dashboard"
            element={
              <RequireRole roles={["tutor"]}>
                <TutorDashboardPage />
              </RequireRole>
            }
          />

          <Route
            path="/create-course"
            element={
              <RequireRole roles={["tutor"]}>
                <CreateCoursePage />
              </RequireRole>
            }
          />

          <Route
            path="/tutor-courses"
            element={
              <RequireRole roles={["tutor"]}>
                <TutorCoursesPage />
              </RequireRole>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RequireRole roles={["student"]}>
                <StudentDashboardPage />
              </RequireRole>
            }
          />

          <Route
            path="/my-courses"
            element={
              <RequireRole roles={["student"]}>
                <MyCoursesPage />
              </RequireRole>
            }
          />

          <Route
            path="/recommended-courses"
            element={
              <RequireRole roles={["student"]}>
                <RecommendedCoursesPage />
              </RequireRole>
            }
          />
          <Route path="/learning-styles" element={<LearningStyleTestPage />} />
          {/* --- 404: Redirige cualquier ruta no encontrada al home --- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
