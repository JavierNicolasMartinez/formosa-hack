import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

function RegisterPage({ userRole }) {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    watch,
    reset,
  } = useForm();
  const { signup, errors: authErrors } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const password = watch("password");

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      const dataWithRole = { ...values, role: userRole };
      const success = await signup(dataWithRole);

      if (success) {
        setRegisterSuccess(true);
        reset(); // limpia los campos
      }
    } catch (error) {
      console.error("Error en el registro:", error);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="w-full">
      {/* Mensaje de éxito */}
      {registerSuccess ? (
        <div className="text-center py-8 flex flex-col justify-center items-center animate-fade-in">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">
            ¡Registro Exitoso!
          </h3>
          <p className="text-slate-600">
            Tu cuenta ha sido creada correctamente.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Ahora puedes iniciar sesión desde el menú principal.
          </p>
        </div>
      ) : (
        <>
          {/* Título y descripción */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Crear Cuenta
            </h1>
            <p className="text-slate-600">
              Únete como {userRole === "student" ? "estudiante" : "tutor"} y
              comienza tu journey
            </p>
          </div>

          {/* Badge de rol */}
          <div className="flex justify-center mb-6">
            <div
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                userRole === "student"
                  ? "bg-cyan-100 text-cyan-700 border border-cyan-300"
                  : "bg-amber-100 text-amber-700 border border-amber-300"
              }`}
            >
              {userRole === "student" ? "👨‍🎓 Modo Estudiante" : "👨‍🏫 Modo Tutor"}
            </div>
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
            {/* Campo Username */}
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-2">
                Nombre de Usuario
              </label>
              <input
                type="text"
                {...register("username", {
                  required: "El nombre de usuario es requerido",
                  minLength: {
                    value: 3,
                    message: "Debe tener al menos 3 caracteres",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  formErrors.username ? "border-red-500" : "border-slate-300"
                } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all`}
                placeholder="Elige un nombre de usuario"
              />
              {formErrors.username && (
                <p className="text-red-500 text-sm mt-2">
                  {formErrors.username.message}
                </p>
              )}
            </div>

            {/* Campo Email */}
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "El email es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
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
              <label className="block text-slate-700 text-sm font-medium mb-2">
                Contraseña
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 6,
                    message: "Debe tener al menos 6 caracteres",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  formErrors.password ? "border-red-500" : "border-slate-300"
                } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all`}
                placeholder="Crea una contraseña segura"
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {formErrors.password.message}
                </p>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="block text-slate-700 text-sm font-medium mb-2">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirma tu contraseña",
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  formErrors.confirmPassword
                    ? "border-red-500"
                    : "border-slate-300"
                } focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all`}
                placeholder="Repite tu contraseña"
              />
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  {formErrors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Términos */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "Debes aceptar los términos y condiciones",
                })}
                className="mt-1 rounded border-slate-300 text-slate-600 focus:ring-slate-500"
              />
              <label className="text-sm text-slate-600">
                Acepto los{" "}
                <button
                  type="button"
                  className="text-slate-800 font-medium hover:underline"
                >
                  términos y condiciones
                </button>{" "}
                y la{" "}
                <button
                  type="button"
                  className="text-slate-800 font-medium hover:underline"
                >
                  política de privacidad
                </button>
              </label>
            </div>
            {formErrors.terms && (
              <p className="text-red-500 text-sm">{formErrors.terms.message}</p>
            )}

            {/* Botón */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default RegisterPage;
