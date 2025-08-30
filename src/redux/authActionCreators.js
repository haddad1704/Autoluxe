/**
Actions créateurs pour l’authentification.
Ce fichier gère l’inscription, la connexion, la vérification du token,
la déconnexion et la gestion des messages liés à l’auth. Les appels réseau
se font via Axios et le token JWT est décodé pour extraire l’identifiant
utilisateur et la date d’expiration.
*/

import * as actionTypes from './actionTypes'; // Import des types d’actions
import axios from 'axios'; // Client HTTP pour appeler l’API
import { jwtDecode } from 'jwt-decode'; // Décodage du JWT pour lire ses claims
import { baseUrl } from './baseUrls'; // URL de base des endpoints API


export const authSuccess = (token, userId, user_type) => { // Action créatrice pour succès d’auth
     return {
          type: actionTypes.AUTH_SUCCESS,
          payload: {
               token: token,
               userId: userId,
               user_type: user_type,
          },
     };
};

export const authLoading = isLoading => { // Action pour indiquer l’état de chargement
     return {
          type: actionTypes.AUTH_LOADING,
          payload: isLoading,
     }
}


export const authFailedMsg = errorMsg => { // Action pour enregistrer un message d’échec
     return {
          type: actionTypes.AUTH_FAILED,
          payload: errorMsg,
     }
}


const saveTokenDataGetUserId = (access, user_type) => { // Sauvegarde le token et retourne l’ID utilisateur
               const access_token = access // Conserve le token d’accès JWT
               const token = jwtDecode(access_token) // Décode le JWT pour récupérer les claims
               localStorage.setItem('token', access_token); // Stocke le token pour persistance
               localStorage.setItem('user_type', user_type); // Stocke le type d’utilisateur
               localStorage.setItem('userId', token.user_id); // Stocke l’ID utilisateur
               const expirationTime = new Date( token.exp * 1000); // Convertit l’exp en date JS
               localStorage.setItem('expirationTime', expirationTime); // Sauvegarde l’expiration
               return token.user_id // Retourne l’identifiant utilisateur

}


export const auth = (email, password, passwordConfirm, user_type, mode) => dispatch => { // Action asynchrone d’inscription/connexion
     dispatch(authLoading(true)) // Active le loader d’auth
     const authData = {
          email: email, // Email saisi par l’utilisateur
          password: password, // Mot de passe saisi
          passwordConfirm: passwordConfirm, // Confirmation de mot de passe (inscription)
          user_type: user_type, // Rôle/type d’utilisateur
     }
     let authUrl = null; // URL d’authentification à utiliser
     if (mode === "Sign Up" || mode === "Inscription") { // Branche inscription
          authUrl = baseUrl + "api/register/"; // Endpoint d’inscription
          axios
               .post(authUrl, authData) // Envoie des données d’inscription
               .then(() => { // À la réussite, on enchaîne par la connexion
                    const data = {
                         email: authData.email, // Email pour la connexion
                         password: authData.password, // Mot de passe pour la connexion
                    };
                    return axios.post(baseUrl + "api/token/", data); // Récupération des tokens JWT
               })
               .then(response => { // Réception des tokens
                    const access_token = response.data.access; // Token d’accès
                    const returned_user_type = response.data.user_type; // Type d’utilisateur retourné
                    const user_id = saveTokenDataGetUserId(access_token, returned_user_type); // Sauvegarde et récupération userId
                    dispatch(authSuccess(access_token, user_id, returned_user_type)); // Dispatch succès
               })
               .catch(error => { // Gestion des erreurs
                    const resp = error && error.response ? error.response : null; // Réponse d’erreur
                    let message = "Erreur réseau. Veuillez réessayer."; // Message par défaut
                    if (resp && resp.data) { // Si le backend renvoie des détails
                         const firstKey = Object.keys(resp.data)[0]; // Première clé d’erreur
                         const errVal = resp.data[firstKey]; // Valeur de l’erreur
                         message = `(${firstKey}) ${errVal}`; // Message formaté
                    }
                    dispatch(authFailedMsg(message)); // Dispatch échec
               })
               .finally(() => {
                    dispatch(authLoading(false)); // Stoppe le loader
               });
     } else { // Branche connexion
          authUrl = baseUrl + "api/token/"; // Endpoint de connexion
          const data = {
               email: authData.email, // Email
               password: authData.password // Mot de passe
          }
          axios
               .post(authUrl, data) // Requête de connexion
               .then(response => { // Réponse avec tokens
                    const access_token = response.data.access; // Token d’accès
                    const returned_user_type = response.data.user_type; // Type utilisateur
                    const user_id = saveTokenDataGetUserId(access_token, returned_user_type); // Sauvegarde + userId
                    dispatch(authSuccess(access_token, user_id, returned_user_type)); // Dispatch succès
               })
               .catch(error => { // Gestion d’erreur
                    const detail = error && error.response && error.response.data && error.response.data.detail
                         ? error.response.data.detail
                         : "Échec de connexion. Veuillez vérifier vos identifiants."; // Message fallback
                    dispatch(authFailedMsg(detail)); // Dispatch échec
               })
               .finally(() => {
                    dispatch(authLoading(false)); // Stoppe le loader
               });
     }

}

export const logout = () => { // Déconnecte l’utilisateur et nettoie le stockage
     localStorage.removeItem('token'); // Supprime le token
     localStorage.removeItem('expirationTime'); // Supprime l’expiration
     localStorage.removeItem('userId'); // Supprime l’ID utilisateur
     localStorage.removeItem('user_type'); // Supprime le type utilisateur
     return {
          type: actionTypes.AUTH_LOGOUT, // Action de déconnexion
     }
}

export const remove_auth_message = () => { // Efface les messages d’auth (erreur/succès)
     return {
          type: actionTypes.REMOVE_AUTH_MESSAGE,
     }
}



export const authCheck = () => dispatch => { // Vérifie si l’utilisateur est encore authentifié
     const token = localStorage.getItem('token'); // Récupère le token
     if (!token) { // Aucun token → déconnexion
          dispatch(logout());
     } else {
          const expirationTime = new Date(localStorage.getItem('expirationTime')); // Récupère l’expiration
          if (expirationTime <= new Date()) { // Expiré → déconnexion
               dispatch(logout());
          } else { // Toujours valide → restaure l’état auth
               const userId = localStorage.getItem('userId'); // ID utilisateur
               const user_type = localStorage.getItem('user_type'); // Type utilisateur
               dispatch(authSuccess(token, userId, user_type)); // Dispatch succès pour rehydrater
          }
     }
}


