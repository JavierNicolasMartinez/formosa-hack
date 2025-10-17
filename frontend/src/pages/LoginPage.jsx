// src/pages/LoginPage.jsx
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage({ prefillEmail = "" }) {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({ defaultValues: { email: prefillEmail } });

  const { signin, isAuthenticated, user, errors: authErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
  });

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // Reglas de redirección post-login:
    // Si es student y no tiene resultado o está pendiente => ir al test
    let shouldGoToTest = false;
    try {
      const pending = JSON.parse(
        localStorage.getItem("learningStyle.pending") || "{}",
      );
      const hasResult = !!localStorage.getItem("learningStyle.result");
      if (
        user.role === "student" &&
        (pending?.required === true || !hasResult)
      ) {
        shouldGoToTest = true;
      }
    } catch {
      if (user.role === "student") shouldGoToTest = true;
    }

    if (user.role === "student" && shouldGoToTest) {
      navigate("/learning-styles", { replace: true });
    } else if (user.role === "tutor") {
      navigate("/tutor-dashboard", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Iniciar Sesión
        </h1>
        <p className="text-slate-600">
          Accede a tu cuenta para continuar tu journey
        </p>
      </div>

      {authErrors?.map((error, i) => (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm"
          key={i}
        >
          {error}
        </div>
      ))}

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-slate-700 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: "El email es requerido" })}
            className={`w-full px-4 py-3 rounded-lg border ${
              formErrors.email ? "border-red-500" : "border-slate-300"
            } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all`}
            placeholder="tu@email.com"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-2">
              {formErrors.email.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-slate-700 text-sm font-medium">
              Contraseña
            </label>
            <button
              type="button"
              className="text-sm text-slate-600 hover:text-slate-800"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <input
            type="password"
            {...register("password", {
              required: "La contraseña es requerida",
            })}
            className={`w-full px-4 py-3 rounded-lg border ${
              formErrors.password ? "border-red-500" : "border-slate-300"
            } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all`}
            placeholder="Ingresa tu contraseña"
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-2">
              {formErrors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-slate-700 to-slate-900 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 shadow-inner"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
