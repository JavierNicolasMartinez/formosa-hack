function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md text-white text-center">
        <h1 className="text-4xl font-bold mb-4">¡Bienvenido!</h1>
        <p className="text-lg mb-6">
          Esta es tu plantilla de inicio. ¡Ahora a construir algo increíble!
        </p>
        <p className="text-md">
          Navega a las páginas de registro o login para comenzar.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
