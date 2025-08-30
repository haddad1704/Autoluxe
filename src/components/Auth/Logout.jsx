/**
 * Composant `Logout`.
 * Ce composant déclenche la déconnexion de l’utilisateur dès son montage,
 * puis redirige vers la page d’accueil. Il peut également afficher une
 * notification si `notify` est fourni en prop.
 */
import React, { useEffect } from "react"; // Import de React et du hook useEffect
import { useNavigate } from "react-router-dom"; // Hook pour naviguer/programmer une redirection
import { useDispatch } from "react-redux"; // Hook pour dispatcher des actions Redux
import { logout } from "../../redux/authActionCreators"; // Action créatrice pour se déconnecter

const Logout = ({ notify }) => { // Définition du composant Logout avec prop optionnelle notify
  const dispatch = useDispatch(); // Récupère la fonction dispatch de Redux
  const navigate = useNavigate(); // Récupère la fonction de navigation

  useEffect(() => { // Exécuté au montage du composant
    dispatch(logout()); // Envoie l’action de déconnexion pour nettoyer l’état et le storage
    if (notify) { // Si une fonction de notification est fournie
      notify("Déconnexion réussie", "success"); // Affiche un message de succès
    }
    navigate("/"); // Redirige l’utilisateur vers la page d’accueil
  }, [dispatch, navigate, notify]); // Dépendances du hook (éviter les re-exécutions inutiles)

  return <div></div>; // Ne rend aucun contenu visible (composant de transition)
};

export default Logout;
