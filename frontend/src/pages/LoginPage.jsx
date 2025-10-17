import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const { signin, isAuthenticated, errors: authErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full">
      {/* Título y descripción */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Iniciar Sesión
        </h1>
        <p className="text-slate-600">
          Accede a tu cuenta para continuar tu journey de aprendizaje
        </p>
      </div>

      {/* Errores de autenticación */}
      {authErrors &&
        authErrors.map((error, i) => (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm"
            key={i}
          >
            {error}
          </div>
        ))}

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Campo Email */}
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

        {/* Campo Contraseña */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-slate-700 text-sm font-medium">
              Contraseña
            </label>
            <button
              type="button"
              className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
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

        {/* Botón de submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-slate-700 to-slate-900 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 shadow-inner"
        >
          Iniciar Sesión
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-slate-300"></div>
        <span className="px-4 text-slate-500 text-sm">o continúa con</span>
        <div className="flex-1 border-t border-slate-300"></div>
      </div>

      {/* Botones de redes sociales */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          className="flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="#000000" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022.8-.223 1.65-.334 2.5-.34.85.006 1.7.117 2.5.34 1.91-1.291 2.75-1.022 2.75-1.022.544 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.335-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          GitHub
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
