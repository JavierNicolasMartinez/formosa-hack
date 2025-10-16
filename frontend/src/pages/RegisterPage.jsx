import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const { signup, isAuthenticated, errors: authErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-3xl font-bold text-white mb-4">Registro</h1>

        {authErrors &&
          authErrors.map((error, i) => (
            <div
              className="bg-red-500 p-2 text-white text-center my-2 rounded-md"
              key={i}
            >
              {error}
            </div>
          ))}

        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", {
              required: "El nombre de usuario es requerido",
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre de usuario"
          />
          {formErrors.username && (
            <p className="text-red-500">{formErrors.username.message}</p>
          )}

          <input
            type="email"
            {...register("email", { required: "El email es requerido" })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {formErrors.email && (
            <p className="text-red-500">{formErrors.email.message}</p>
          )}

          <input
            type="password"
            {...register("password", {
              required: "La contraseña es requerida",
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {formErrors.password && (
            <p className="text-red-500">{formErrors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md my-3 hover:bg-green-600 transition-colors"
          >
            Registrarse
          </button>
        </form>
        <p className="flex gap-x-2 justify-between mt-4 text-white">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-sky-400 hover:underline">
            ¡Inicia Sesión!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
