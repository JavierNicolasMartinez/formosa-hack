import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-zinc-800 my-3 flex justify-between py-5 px-10 rounded-lg text-white">
      <Link
        to={isAuthenticated ? "/dashboard" : "/"}
        className="text-2xl font-bold"
      >
        App
      </Link>
      <ul className="flex items-center gap-x-4">
        {isAuthenticated ? (
          <>
            <li className="hidden sm:block">Bienvenido, {user.username}!</li>
            <li>
              <Link
                to="/login"
                onClick={() => logout()}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition-colors"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md transition-colors"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition-colors"
              >
                Registro
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
