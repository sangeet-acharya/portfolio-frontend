import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);

  return (
    <header
      className="
        sticky
        top-0
        z-50
        backdrop-blur-xl
        bg-[#0B0F19]/80
        border-b
        border-white/10
      "
    >
      <nav
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          items-center
          justify-between
        "
      >
        {/* LOGO */}
        <Link
          to="/"
          className="
            text-2xl
            font-bold
            text-white
            tracking-tight
          "
        >
          MyPortfolio
        </Link>

        {/* LINKS */}
        <ul className="flex items-center gap-8">
          <li>
            <Link
              to="/"
              className="
                text-gray-300
                hover:text-blue-400
                transition-colors
                duration-300
              "
            >
              Accueil
            </Link>
          </li>

          <li>
            <Link
              to="/projects"
              className="
                text-gray-300
                hover:text-blue-400
                transition-colors
                duration-300
              "
            >
              Projets
            </Link>
          </li>

          {isAuthenticated && (
            <>
              <li>
                <Link
                  to="/admin"
                  className="
                    text-gray-300
                    hover:text-blue-400
                    transition-colors
                    duration-300
                  "
                >
                  Admin
                </Link>
              </li>

              <li>
                <button
                  onClick={logout}
                  className="
                    border
                    border-gray-700
                    hover:border-red-500
                    hover:text-red-400
                    text-gray-300
                    px-5
                    py-2
                    rounded-xl
                    transition-all
                    duration-300
                  "
                >
                  Déconnexion
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
