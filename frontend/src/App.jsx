import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CourseSearchPage from "./pages/CourseSearchPage";
import VoiceCommandButton from "./components/VoiceCommandButton";

function App() {
  return (
    <div className="">
      <main className="">
        {/* <VoiceCommandButton />*/}
        <Routes>
          {/* --- Rutas Públicas --- */}
          <Route path="/" element={<HomePage />} />

          {/* --- Rutas que antes eran Protegidas --- */}
          <Route path="/courses" element={<CourseSearchPage />} />

          {/* Redirige cualquier ruta no encontrada a la página de inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
