/**
 * Ce fichier définit le composant `Auth`, qui gère l'authentification des utilisateurs
 * (connexion et inscription). 
 * Il propose un formulaire permettant de saisir l'email, le mot de passe, 
 * et éventuellement la confirmation de mot de passe et le type d’utilisateur. 
 * Le composant utilise Redux pour gérer l’état global d’authentification et affiche
 * un spinner lors du chargement. 
 * Il contient aussi des validations de formulaire (email invalide, mot de passe trop court, 
 * mots de passe non concordants) et permet de basculer entre les modes "Connexion" 
 * et "Inscription".
 */
import React, { useState } from "react"; // Importation de React et du hook useState pour gérer l'état local
import { useDispatch, useSelector } from "react-redux"; // Importation de hooks Redux : dispatch (actions) et selector (état global)
import { auth } from "../../redux/authActionCreators"; // Importation de l'action d'authentification
import Spinner from "../Loading/Loading"; // Importation du composant Spinner (chargement)
import "./Auth.css"; // Importation du fichier CSS pour le style du composant

// Définition du composant Auth qui reçoit une fonction notify en props
const Auth = ({ notify }) => {
  // Gestion du mode : "Login" (connexion) ou "Inscription"
  const [mode, setMode] = useState("Login");
  // Gestion de l'affichage du mot de passe (caché par défaut)
  const [showPassword, setShowPassword] = useState(true);
  // États du formulaire (email, mot de passe, confirmation, type utilisateur)
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    user_type: "client", // Par défaut, le type d’utilisateur est "client"
  });
  // Gestion des erreurs de validation
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch(); // Hook Redux pour dispatcher des actions
  const authLoading = useSelector((state) => state.authLoading); // Lecture de l'état global pour savoir si auth est en cours

  // Fonction pour changer entre mode connexion et inscription
  const switchModeHandler = () => {
    setMode((prevMode) => (prevMode === "Inscription" ? "Login" : "Inscription"));
  };

  // Fonction pour afficher/masquer le mot de passe
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Fonction pour gérer la saisie dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues, // On garde les anciennes valeurs
      [name]: value, // On met à jour uniquement le champ modifié
    });
  };

  // Fonction de validation du formulaire
  const validate = () => {
    const errors = {};
    // Vérification email
    if (!formValues.email) {
      errors.email = "Requis";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)
    ) {
      errors.email = "Adresse e-mail invalide";
    }
    // Vérification mot de passe
    if (!formValues.password) {
      errors.password = "Requis";
    } else if (formValues.password.length < 4) {
      errors.password = "Doit comporter au moins 4 caractères";
    }
    // Vérification confirmation mot de passe en mode inscription
    if (mode === "Inscription") {
      if (!formValues.passwordConfirm) {
        errors.passwordConfirm = "Requis";
      } else if (formValues.password !== formValues.passwordConfirm) {
        errors.passwordConfirm = "Les mots de passe ne correspondent pas";
      }
    }

    return errors;
  };

  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const validationErrors = validate(); // On lance la validation
    setErrors(validationErrors); // On enregistre les erreurs trouvées
    // Si aucune erreur, on envoie l'action d'authentification à Redux
    if (Object.keys(validationErrors).length === 0) {
      dispatch(
        auth(
          formValues.email,
          formValues.password,
          formValues.passwordConfirm,
          formValues.user_type,
          mode // On précise si c'est une connexion ou une inscription
        )
      );
    }
  };

  return (
    <div className="auth-container">
      {authLoading ? ( // Si chargement : on affiche le spinner
        <Spinner />
      ) : (
        <div className="auth-form">
          {/* Bouton pour changer de mode */}
          <div className="auth-switch">
            <button
              className="auth-switch-btn"
              onClick={switchModeHandler}
            >
              Passer à {mode === "Inscription" ? "Connexion" : "Inscription"}
            </button>
          </div>
          {/* Formulaire d'authentification */}
          <form onSubmit={handleSubmit} className="auth-form-inner">
            {/* Champ Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Entrez votre e-mail"
                className="form-control"
                value={formValues.email}
                onChange={handleChange}
              />
              <span className="error">{errors.email}</span>
            </div>
            {/* Champ Mot de passe */}
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type={showPassword ? "password" : "text"}
                name="password"
                placeholder="Mot de passe"
                className="form-control"
                value={formValues.password}
                onChange={handleChange}
              />
              <span className="error">{errors.password}</span>
              <div className="show-password">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onClick={handleShowPassword}
                  checked={!showPassword}
                />
                <label>Afficher le mot de passe</label>
              </div>
            </div>
            {/* Champs supplémentaires en mode inscription */}
            {mode === "Inscription" && (
              <div>
                {/* Confirmation mot de passe */}
                <div className="form-group">
                  <label htmlFor="passwordConfirm">Confirmer le mot de passe</label>
                  <input
                    type={showPassword ? "password" : "text"}
                    name="passwordConfirm"
                    placeholder="Confirmer le mot de passe"
                    className="form-control"
                    value={formValues.passwordConfirm}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.passwordConfirm}</span>
                </div>
                {/* Sélecteur type utilisateur */}
                <div className="form-group">
                  <label htmlFor="user_type">Type d'utilisateur</label>
                  <select
                    name="user_type"
                    className="form-select"
                    value={formValues.user_type}
                    onChange={handleChange}
                  >
                    <option value="client">Client</option>
                    <option value="car_owner">Propriétaire</option>
                  </select>
                </div>
              </div>
            )}
            {/* Bouton de soumission */}
            <button type="submit" className="btn btn-primary">
              {mode === "Inscription" ? "Inscription" : "Connexion"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Auth; // Export du composant
