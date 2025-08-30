/**
 * Composant racine `Main`.
 * Il vérifie l’authentification au montage, configure le système de notifications
 * (toasts) et déclare toutes les routes de l’application, avec des variantes
 * selon que l’utilisateur est connecté ou non.
 */
import React, { useEffect } from "react"; // React + hook pour effets de bord
import Header from "./Header/Header"; // Barre de navigation
import Footer from "./Footer/Footer"; // Pied de page
import { Route, Routes, Navigate } from "react-router-dom"; // Déclaration des routes
import Auth from "./Auth/Auth"; // Page d’authentification
import Logout from "./Auth/Logout"; // Déconnexion
import { connect, useDispatch, useSelector } from "react-redux"; // Connexion Redux + hooks
import Home from "./Home/Home"; // Page d’accueil
import { authCheck, remove_auth_message } from "../redux/authActionCreators"; // Actions auth
import "react-toastify/dist/ReactToastify.css"; // Styles pour les toasts
import Categories from "./Category/Categories"; // Page catégories
import Vehicles from "./Vehicle/Vehicles"; // Page véhicules
import CarDetail from "./Store/CarDetail"; // Détail d’un véhicule
import AllBooked from "./Book/AllBooked"; // Réservations (client)
import SeeBookedVehicle from "./Vehicle/SeeBookedVehicle"; // Voir toutes les réservations (proprio)
import Payment from "./Payment/Payment"; // Paiement

import { ToastContainer, toast } from "react-toastify"; // Composants de toast
import "react-toastify/dist/ReactToastify.css"; // Styles toasts (doublon intentionnel pour garantir le chargement)
  
const mapStateToProps = (state) => ({ // Sélection des props depuis le store Redux
  token: state.token,
  successMsg: state.successMsg,
  authCheckResponse: state.authCheckResponse,
});

const mapDispatchToProps = (dispatch) => ({ // Fonctions qui dispatchent des actions
  authCheck: () => dispatch(authCheck()),
});

const Main = ({ token, authCheck, successMsg }) => { // Composant principal
    const authFailedMsg = useSelector((state) => state.authFailedMsg); // Message d’échec auth
    const authSuccessMsg = useSelector((state) => state.authSuccessMsg); // Message de succès auth
    const dispatch = useDispatch(); // Pour envoyer des actions

  useEffect(() => { // Vérifie l’état de connexion au montage
    authCheck()
  }, [authCheck]);


  let routes = null; // Recevra l’ensemble des routes selon auth
  const notify = (message, type) => { // Helper pour afficher les toasts
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "info":
        toast.info(message);
        break;
      default:
        break;
    }
  };
  useEffect(() => { // Affiche et nettoie les messages d’auth
    if (authSuccessMsg) {
      notify(authSuccessMsg, "info"); // Affiche info
      dispatch(remove_auth_message()); // Nettoie
    }
    if (authFailedMsg) {
      notify(authFailedMsg, "error"); // Affiche erreur
      dispatch(remove_auth_message()); // Nettoie
    }
  }, [authSuccessMsg, authFailedMsg, dispatch]);
  if (token) {
    routes = ( // Routes visibles si connecté
      <Routes>
        <Route path="/" element={<Home notify={notify} />} />
        <Route path="/category" element={<Categories notify={notify} />} />
        <Route path="/vehicle" element={<Vehicles notify={notify} />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/all-booked" element={<AllBooked notify={notify} />} />
        <Route
          path="/see-all-booked"
          element={<SeeBookedVehicle notify={notify} />}
        />
        <Route path="/logout" element={<Logout notify={notify} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  } else {

    routes = ( // Routes visibles si non connecté
      <Routes>
        <Route path="/" element={<Home notify={notify} />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/signin" element={<Auth notify={notify} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <div>
      <Header notify={notify} /> {/* En-tête de l’application */}
      <ToastContainer /> {/* Conteneur des notifications (toasts) */}
      
      {routes}
      <Footer /> {/* Pied de page */}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
