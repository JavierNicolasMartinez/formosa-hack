import { useAuth } from "../hooks/useAuth";

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <h2 className="text-2xl">
          ¡Bienvenido de nuevo, {user?.name || "Usuario"}!
        </h2>
        <p className="mt-4">
          Esta es tu página privada. Desde aquí puedes empezar a construir las
          funcionalidades principales de tu aplicación.
        </p>
      </div>
    </div>
  );
}

export default DashboardPage;
