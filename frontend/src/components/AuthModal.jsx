import {
  BookOpen,
  Target,
  Users,
  GraduationCap,
  X,
  CheckCircle,
  Search,
  Lightbulb,
} from "lucide-react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { useState, useEffect } from "react";

const AuthModal = ({
  modalType,
  setModalType,
  userRole,
  setUserRole,
  onClose,
}) => {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [countdown, setCountdown] = useState(3);

  // ✅ Cuando hay registro exitoso → mostrar mensaje → luego login
  useEffect(() => {
    if (registerSuccess) {
      setCountdown(3);
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        setModalType("login");
        setRegisterSuccess(false);
        setRegisteredEmail("");
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [registerSuccess, setModalType]);

  const handleRegisterSuccess = (email) => {
    setRegisteredEmail(email);
    setRegisterSuccess(true);
    console.log("✅ Registro exitoso detectado");
  };

  const handleClose = () => {
    setRegisterSuccess(false);
    setRegisteredEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] my-auto">
        {/* PANEL LATERAL (Desktop) */}
        {!registerSuccess && (
          <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-slate-700 to-slate-900 text-white p-6 flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4">
                {modalType === "login"
                  ? "Bienvenido de vuelta"
                  : "Comienza tu journey"}
              </h2>

              {/* Selector de rol Desktop */}
              {modalType === "register" && (
                <RoleSelectorDesktop
                  userRole={userRole}
                  setUserRole={setUserRole}
                />
              )}

              {/* Información lateral */}
              <div className="space-y-3">
                {modalType === "login" ? (
                  <>
                    <InfoItem
                      color="bg-cyan-500/20"
                      icon={<BookOpen className="w-3 h-3 text-cyan-300" />}
                      text="Continúa tu progreso"
                    />
                    <InfoItem
                      color="bg-emerald-500/20"
                      icon={<Target className="w-3 h-3 text-emerald-300" />}
                      text="Cursos personalizados"
                    />
                  </>
                ) : userRole === "student" ? (
                  <>
                    <InfoItem
                      color="bg-cyan-500/20"
                      icon={<Search className="w-3 h-3 text-cyan-300" />}
                      text="Descubre tu estilo"
                    />
                    <InfoItem
                      color="bg-emerald-500/20"
                      icon={<BookOpen className="w-3 h-3 text-emerald-300" />}
                      text="Cursos adaptados"
                    />
                  </>
                ) : (
                  <>
                    <InfoItem
                      color="bg-cyan-500/20"
                      icon={<Target className="w-3 h-3 text-cyan-300" />}
                      text="Estudiantes comprometidos"
                    />
                    <InfoItem
                      color="bg-emerald-500/20"
                      icon={<Lightbulb className="w-3 h-3 text-emerald-300" />}
                      text="Herramientas adaptativas"
                    />
                  </>
                )}
              </div>
            </div>

            {/* Toggle login/register */}
            <div className="text-slate-300 text-sm">
              {modalType === "login"
                ? "¿Primera vez aquí?"
                : "¿Ya tienes una cuenta?"}
              <button
                onClick={() =>
                  setModalType(modalType === "login" ? "register" : "login")
                }
                className="text-white font-medium hover:underline ml-1"
              >
                {modalType === "login" ? "Regístrate" : "Inicia Sesión"}
              </button>
            </div>
          </div>
        )}

        {/* PANEL PRINCIPAL */}
        <div
          className={`w-full ${
            registerSuccess ? "lg:w-full" : "lg:w-3/5"
          } p-6 overflow-y-auto`}
        >
          {/* Botón cerrar */}
          <div className="flex justify-end mb-6">
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Selector de rol (Mobile) */}
          {modalType === "register" && !registerSuccess && (
            <RoleSelectorMobile userRole={userRole} setUserRole={setUserRole} />
          )}

          {/* Contenido principal */}
          {registerSuccess ? (
            <SuccessMessage countdown={countdown} />
          ) : modalType === "login" ? (
            <LoginPage prefillEmail={registeredEmail} />
          ) : (
            <RegisterPage
              userRole={userRole}
              onRegisterSuccess={handleRegisterSuccess}
            />
          )}

          {/* Toggle inferior (Mobile) */}
          {!registerSuccess && (
            <div className="text-center mt-6 lg:hidden border-t border-slate-200 pt-4">
              <p className="text-slate-600 text-sm">
                {modalType === "login"
                  ? "¿Primera vez aquí?"
                  : "¿Ya tienes una cuenta?"}
                <button
                  onClick={() =>
                    setModalType(modalType === "login" ? "register" : "login")
                  }
                  className="text-slate-800 font-medium hover:underline ml-1"
                >
                  {modalType === "login" ? "Regístrate" : "Inicia Sesión"}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ✅ Subcomponentes reutilizables

const InfoItem = ({ color, icon, text }) => (
  <div className="flex items-center space-x-3">
    <div
      className={`w-6 h-6 ${color} rounded-full flex items-center justify-center`}
    >
      {icon}
    </div>
    <span className="text-sm">{text}</span>
  </div>
);

const SuccessMessage = ({ countdown }) => (
  <div className="text-center py-8 flex flex-col justify-center items-center animate-fade-in">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <CheckCircle className="w-8 h-8 text-green-600" />
    </div>
    <h3 className="text-2xl font-bold text-slate-800 mb-2">
      ¡Registro Exitoso!
    </h3>
    <p className="text-slate-600 mb-2">Tu cuenta fue creada correctamente.</p>
    <p className="text-slate-500 text-sm">
      Redirigiendo al inicio de sesión en{" "}
      <span className="font-semibold text-slate-700">{countdown}</span>{" "}
      segundos...
    </p>
  </div>
);

// ✅ Selector de rol (desktop)
const RoleSelectorDesktop = ({ userRole, setUserRole }) => (
  <div className="flex space-x-2 mb-4 bg-slate-600/30 rounded-lg p-1">
    <button
      onClick={() => setUserRole("student")}
      className={`flex-1 py-2 rounded text-sm font-medium transition-all flex items-center justify-center space-x-1 ${
        userRole === "student"
          ? "bg-white text-slate-800 shadow-lg"
          : "text-slate-200 hover:text-white"
      }`}
    >
      <GraduationCap className="w-4 h-4" />
      <span>Estudiante</span>
    </button>
    <button
      onClick={() => setUserRole("tutor")}
      className={`flex-1 py-2 rounded text-sm font-medium transition-all flex items-center justify-center space-x-1 ${
        userRole === "tutor"
          ? "bg-white text-slate-800 shadow-lg"
          : "text-slate-200 hover:text-white"
      }`}
    >
      <Users className="w-4 h-4" />
      <span>Tutor</span>
    </button>
  </div>
);

// ✅ Selector de rol (mobile)
const RoleSelectorMobile = ({ userRole, setUserRole }) => (
  <div className="flex space-x-2 mb-6 bg-slate-100 rounded-lg p-1 lg:hidden">
    <button
      onClick={() => setUserRole("student")}
      className={`flex-1 py-2 rounded text-sm font-medium transition-all flex items-center justify-center space-x-1 ${
        userRole === "student"
          ? "bg-white text-slate-800 shadow-lg"
          : "text-slate-600 hover:text-slate-800"
      }`}
    >
      <GraduationCap className="w-4 h-4" />
      <span>Estudiante</span>
    </button>
    <button
      onClick={() => setUserRole("tutor")}
      className={`flex-1 py-2 rounded text-sm font-medium transition-all flex items-center justify-center space-x-1 ${
        userRole === "tutor"
          ? "bg-white text-slate-800 shadow-lg"
          : "text-slate-600 hover:text-slate-800"
      }`}
    >
      <Users className="w-4 h-4" />
      <span>Tutor</span>
    </button>
  </div>
);

export default AuthModal;
