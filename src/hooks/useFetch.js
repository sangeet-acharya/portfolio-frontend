// ➜ options = {} Contient les options de fetch.
// Exemple :
// {
//   method: "POST",
//   body: JSON.stringify(data)
// }
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";

// Le = {} évite une erreur si aucune option n’est envoyée.
export function useFetch() {
  const { logout } = useContext(AuthContext);

  async function apiFetch(endpoint, options = {}) {
    const baseUrl = import.meta.env.VITE_API_URL;

    const token = localStorage.getItem("token");

    // Les headers donnent des informations à l’API.
    const headers = {
      //j’envoie du JSON
      "Content-type": "application/json",
      //Si token existe :
      //{
      //  Authorization: "Bearer eyJ..."
      // }
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      // ➜ Le ...
      // Fusionne l’objet dans headers.
      // ➜ Résultat final
      // headers = {
      // "Content-Type": "application/json",
      // Authorization: "Bearer eyJ..."
      // }
      ...options.headers,
    };
    // 📌 Construction de l’URL
    // baseUrl = "http://localhost:3001/api"
    // endpoint = "/auth/login"
    const response = await fetch(`${baseUrl}${endpoint}`, {
      // ajoute : method, body, mode, credentials ect
      ...options,
      //remplace les anciens headers par ceux constuits
      headers,
    });
    //vaut true pour 200, 201, 204 et false pour 400, 401, 403, 404, 500
    if (!response.ok) {
      // errorData = { message : "Emailou mdp incorrect"}
      const errorData = await response.json();
      if (response.status === 401) {
        logout();
      }
      //throw = stop la fonction exemple errorData = { message : "Emailou mdp incorrect"}
      throw new Error(errorData.message || "Erreur API");
    }
    if (response.status === 204) {
      return null;
    }
    // return res.json ({ token : "", user: ""})
    return response.json();
  }
  return apiFetch;
}
