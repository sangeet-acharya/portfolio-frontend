//Il sert à créer une variable qui peut changer pendant l’exécution du composant
// ici Sert à afficher les erreurs venant de l’API.
import { useContext, useState } from "react";
//Sert à changer de page après connexion.
import { useNavigate } from "react-router-dom";
//Il sert à faire les requêtes vers ton backend.
import { useFetch } from "../hooks/useFetch.js";
//Librairie très utilisée pour gérer les formulaires React
import { useForm } from "react-hook-form";
//Le contexte partage les informations
//utilisateur(token, fonction logout/login, utilisateur connecté) dans toute l’application.
import { AuthContext } from "../context/AuthContext.js";

const LoginPage = () => {
  const navigate = useNavigate();

  const apiFetch = useFetch();

  const { login } = useContext(AuthContext);

  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (formData) => {
    try {
      setApiError("");

      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      login(data.token);

      navigate("/admin");
    } catch (error) {
      setApiError(error.message);
    }
  };

  return (
    <div>
      <h1>Page De Connexion</h1>
      {apiError && <p>{apiError}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex">
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            className="p-[5px] text-center"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Le champ email est requis",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email invalide",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}

          <label htmlFor="password">Mot De Passe</label>
          <input
            className="p-[5px] text-center"
            type="password"
            placeholder="Mot de passe"
            {...register("password", {
              required: "Mot de passe Manquant",
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </fieldset>
        <button
          type="submit"
          className="bg-[#D8D5CF] rounded-md p-[5px] text-center"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
