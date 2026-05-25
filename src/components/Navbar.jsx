import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);

  return (
    <nav>
      <ul className="flex justify-around pt-[10px] pb-[10px] mb-[10px] bg-[#D8D5CF]">
        <li>
          <p>My Portfolio</p>
        </li>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/projects">Projets</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <Link to="/login">Connexion</Link>
          </li>
        )}
      </ul>
      {isAuthenticated && <button onClick={logout}>Déconnexion</button>}
    </nav>
  );
};

export default Navbar;
