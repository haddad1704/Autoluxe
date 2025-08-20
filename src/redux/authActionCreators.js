import * as actionTypes from './actionTypes'; // Types d'actions
import axios from 'axios'; // Client HTTP
import { jwtDecode } from 'jwt-decode'; // Décodage JWT côté client
import { baseUrl } from './baseUrls'; // URL API



export const authSuccess = (token, userId, user_type) => { // Action: authentification réussie
     return {
          type: actionTypes.AUTH_SUCCESS,
          payload: {
               token: token,
               userId: userId,
               user_type: user_type,
          },
     };
};

export const authLoading = isLoading => { // Action: état de chargement auth
     return {
          type: actionTypes.AUTH_LOADING,
          payload: isLoading,
     }
}


export const authFailedMsg = errorMsg => { // Action: erreur d'auth
     return {
          type: actionTypes.AUTH_FAILED,
          payload: errorMsg,
     }
}


const saveTokenDataGetUserId = (access, user_type) => { // Sauvegarde token + extrait user_id
               const access_token = access
               const token = jwtDecode(access_token)
               localStorage.setItem('token', access_token);
               localStorage.setItem('user_type', user_type);
               localStorage.setItem('userId', token.user_id);
               const expirationTime = new Date( token.exp * 1000);
               localStorage.setItem('expirationTime', expirationTime);
               return token.user_id

}


export const auth = (email, password, passwordConfirm, user_type, mode) => dispatch => { // Login/Inscription
     dispatch(authLoading(true))
     const authData = {
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
          user_type: user_type,
          // returnSecureToken: true,
     }
     let authUrl = null;
     if (mode === "Sign Up" || mode === "Inscription") {
          authUrl = baseUrl + "api/register/";
          axios
               .post(authUrl, authData)
               .then(() => {
                    const data = {
                         email: authData.email,
                         password: authData.password,
                    };
                    return axios.post(baseUrl + "api/token/", data);
               })
               .then(response => {
                    const access_token = response.data.access;
                    const returned_user_type = response.data.user_type;
                    const user_id = saveTokenDataGetUserId(access_token, returned_user_type);
                    dispatch(authSuccess(access_token, user_id, returned_user_type));
               })
               .catch(error => {
                    const resp = error && error.response ? error.response : null;
                    let message = "Erreur réseau. Veuillez réessayer.";
                    if (resp && resp.data) {
                         const firstKey = Object.keys(resp.data)[0];
                         const errVal = resp.data[firstKey];
                         message = `(${firstKey}) ${errVal}`;
                    }
                    dispatch(authFailedMsg(message));
               })
               .finally(() => {
                    dispatch(authLoading(false));
               });
     } else {
          authUrl = baseUrl + "api/token/";
          const data = {
               email: authData.email,
               password: authData.password
          }
          axios
               .post(authUrl, data)
               .then(response => {
                    const access_token = response.data.access;
                    const returned_user_type = response.data.user_type;
                    const user_id = saveTokenDataGetUserId(access_token, returned_user_type);
                    dispatch(authSuccess(access_token, user_id, returned_user_type));
               })
               .catch(error => {
                    const detail = error && error.response && error.response.data && error.response.data.detail
                         ? error.response.data.detail
                         : "Échec de connexion. Veuillez vérifier vos identifiants.";
                    dispatch(authFailedMsg(detail));
               })
               .finally(() => {
                    dispatch(authLoading(false));
               });
     }

}

export const logout = () => { // Action de déconnexion + nettoyage localStorage
     localStorage.removeItem('token');
     localStorage.removeItem('expirationTime');
     localStorage.removeItem('userId');
     localStorage.removeItem('user_type');
     return {
          type: actionTypes.AUTH_LOGOUT,
     }
}

export const remove_auth_message = () => { // Efface les messages d'auth
     return {
          type: actionTypes.REMOVE_AUTH_MESSAGE,
     }
}



export const authCheck = () => dispatch => { // Restaure la session si token valide
     
     const token = localStorage.getItem('token');
     if (!token) {
          dispatch(logout());
     } else {
          const expirationTime = new Date(localStorage.getItem('expirationTime'));
          if (expirationTime <= new Date()) {
               // Logout
               dispatch(logout());
          } else {
               const userId = localStorage.getItem('userId');
               const user_type = localStorage.getItem('user_type');
               dispatch(authSuccess(token, userId, user_type));
          }
     }
}


