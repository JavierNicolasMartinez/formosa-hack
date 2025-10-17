// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthModal from "./AuthModal";
import {
  User,
  ChevronDown,
  BookOpen,
  Settings,
  LogOut,
  GraduationCap,
  Video,
} from "lucide-react";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [userRole, setUserRole] = useState("student");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar modal cuando se autentica
  useEffect(() => {
    if (isAuthenticated && modalType) setModalType(null);
  }, [isAuthenticated, modalType]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setModalType(null);
    setUserDropdownOpen(false);
    setMenuOpen(false);
  };

  const closeOverlays = () => {
    setUserDropdownOpen(false);
    setMenuOpen(false);
  };

  const UserDropdown = () => (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
        className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors border border-slate-200"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-slate-200" />
        </div>
        <span className="text-slate-700 font-medium max-w-32 truncate">
          {user?.username}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-500 transition-transform ${userDropdownOpen ? "rotate-180" : ""}`}
        />
      </button>

      {userDropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
          {/* Header del dropdown */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
            <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-slate-200" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 truncate">
                {user?.username}
              </p>
              <p className="text-sm text-slate-500 capitalize">
                {user?.role || "student"}
              </p>
            </div>
          </div>

          {/* Navegación principal */}
          <div className="py-2">
            <Link
              to={user?.role === "tutor" ? "/tutor-dashboard" : "/dashboard"}
              className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
              onClick={closeOverlays}
            >
              <Settings className="w-4 h-4" />
              <span>Mi Dashboard</span>
            </Link>

            {/* 🔹 Mis Cursos → para tutor va a /tutor-courses, para alumno a /my-courses */}
            <Link
              to={user?.role === "tutor" ? "/tutor-courses" : "/my-courses"}
              className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
              onClick={closeOverlays}
            >
              <BookOpen className="w-4 h-4" />
              <span>Mis Cursos</span>
            </Link>

            {user?.role === "tutor" ? (
              <Link
                to="/create-course"
                className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={closeOverlays}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Crear Curso</span>
              </Link>
            ) : (
              <Link
                to="/recommended-courses"
                className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={closeOverlays}
              >
                <Video className="w-4 h-4" />
                <span>Cursos Recomendados</span>
              </Link>
            )}
          </div>

          {/* Footer del dropdown */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-800 rounded-lg flex items-center justify-center shadow-inner">
                  <span className="text-slate-200 font-bold text-sm">AL</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                  AdaptaLearn
                </span>
              </Link>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/courses"
                className="font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Explorar Cursos
              </Link>

              {/* 🔹 Links exclusivos para tutor */}
              {isAuthenticated && user?.role === "tutor" && (
                <>
                  <Link
                    to="/tutor-courses"
                    className="font-medium text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    Mis Cursos
                  </Link>
                  <Link
                    to="/create-course"
                    className="font-medium text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    Crear Curso
                  </Link>
                </>
              )}

              <Link
                to="/learning-styles"
                className="font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Test de Estilos
              </Link>
            </div>

            {/* Botones Desktop */}
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <UserDropdown />
              ) : (
                <>
                  <button
                    onClick={() => setModalType("login")}
                    className="bg-gradient-to-r from-slate-600 to-slate-800 text-slate-100 px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all shadow-inner"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => setModalType("register")}
                    className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all"
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-2xl text-slate-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`${menuOpen ? "flex" : "hidden"} md:hidden flex-col mt-4 space-y-4 pb-4 border-t border-slate-200 pt-4`}
          >
            {isAuthenticated ? (
              <>
                {/* Header mobile autenticado */}
                <div className="flex items-center gap-3 px-2 py-3 bg-slate-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-800 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-200" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      {user?.username}
                    </p>
                    <p className="text-sm text-slate-500 capitalize">
                      {user?.role || "student"}
                    </p>
                  </div>
                </div>

                <Link
                  to={
                    user?.role === "tutor" ? "/tutor-dashboard" : "/dashboard"
                  }
                  className="flex items-center gap-3 px-2 py-2 text-slate-700 hover:bg-slate-50 transition-colors rounded-lg"
                  onClick={closeOverlays}
                >
                  <Settings className="w-5 h-5" />
                  <span>Mi Dashboard</span>
                </Link>

                {/* 🔹 Mis Cursos: tutor → /tutor-courses | alumno → /my-courses */}
                <Link
                  to={user?.role === "tutor" ? "/tutor-courses" : "/my-courses"}
                  className="flex items-center gap-3 px-2 py-2 text-slate-700 hover:bg-slate-50 transition-colors rounded-lg"
                  onClick={closeOverlays}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Mis Cursos</span>
                </Link>

                {user?.role === "tutor" ? (
                  <>
                    <Link
                      to="/create-course"
                      className="flex items-center gap-3 px-2 py-2 text-slate-700 hover:bg-slate-50 transition-colors rounded-lg"
                      onClick={closeOverlays}
                    >
                      <GraduationCap className="w-5 h-5" />
                      <span>Crear Curso</span>
                    </Link>
                    <Link
                      to="/tutor-courses"
                      className="flex items-center gap-3 px-2 py-2 text-slate-700 hover:bg-slate-50 transition-colors rounded-lg"
                      onClick={closeOverlays}
                    >
                      <GraduationCap className="w-5 h-5" />
                      <span>Gestionar Cursos</span>
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/recommended-courses"
                    className="flex items-center gap-3 px-2 py-2 text-slate-700 hover:bg-slate-50 transition-colors rounded-lg"
                    onClick={closeOverlays}
                  >
                    <Video className="w-5 h-5" />
                    <span>Cursos Recomendados</span>
                  </Link>
                )}

                <Link
                  to="/courses"
                  className="flex items-center gap-3 px-2 py-2 text-slate-700 hover:bg-slate-50 transition-colors rounded-lg"
                  onClick={closeOverlays}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Explorar Cursos</span>
                </Link>

                <Link
                  to="/learning-styles"
                  className="flex items-center gap-3 px-2 py-2 text-slate-700 hover:bg-slate-50 transition-colors rounded-lg"
                  onClick={closeOverlays}
                >
                  <Settings className="w-5 h-5" />
                  <span>Test de Estilos</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-2 py-2 text-red-600 hover:bg-red-50 transition-colors rounded-lg text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Cerrar Sesión</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/courses"
                  className="hover:text-slate-600 transition-colors font-medium"
                  onClick={closeOverlays}
                >
                  Explorar Cursos
                </Link>
                <Link
                  to="/learning-styles"
                  className="hover:text-slate-600 transition-colors font-medium"
                  onClick={closeOverlays}
                >
                  Test de Estilos
                </Link>
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => setModalType("login")}
                    className="bg-gradient-to-r from-slate-600 to-slate-800 text-slate-100 px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all shadow-inner"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => setModalType("register")}
                    className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                  >
                    Registrarse
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* MODAL */}
      {modalType && (
        <AuthModal
          modalType={modalType}
          setModalType={setModalType}
          userRole={userRole}
          setUserRole={setUserRole}
          onClose={() => setModalType(null)}
        />
      )}
    </>
  );
}
