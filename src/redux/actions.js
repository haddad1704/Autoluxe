/**
Ce fichier contient toutes les actions Redux liées aux catégories et aux véhicules.
Il définit des actions synchrones et asynchrones pour :
- Récupérer toutes les catégories et une catégorie spécifique.
- Créer, modifier et supprimer une catégorie.
- Récupérer tous les véhicules et un véhicule spécifique.
- Créer, modifier et supprimer un véhicule.
- Récupérer tous les véhicules réservés (all booked vehicles).
Chaque fonction utilise Axios pour effectuer des appels HTTP vers une API REST 
et envoie des actions Redux (REQUEST, SUCCESS, FAILURE) pour mettre à jour le store.
*/

import axios from 'axios'; // Importation de la bibliothèque axios pour faire des requêtes HTTP

// Importation des types d’actions (constantes)
import * as actionTypes from './actionTypes';

// Importation de l’URL de base de l’API
import { baseUrl } from './baseUrls';


/* ==================== CATÉGORIES ==================== */

// Action pour indiquer le début du fetch de toutes les catégories
export const fetchAllCategoryRequest = () => ({
     type: actionTypes.FETCH_ALL_CATEGORY_REQUEST
})

// Action pour indiquer le succès du fetch de toutes les catégories
export const fetchAllCategorySuccess = (categories) => ({
     type: actionTypes.FETCH_ALL_CATEGORY_SUCCESS,
     payload: categories
})

// Action pour indiquer l’échec du fetch de toutes les catégories
export const fetchAllCategoryFailure = (error) => ({
     type: actionTypes.FETCH_ALL_CATEGORY_FAILURE,
     payload: error
})

// Fonction asynchrone pour récupérer toutes les catégories
export const fetchAllCategory = () => {
     return async (dispatch) => {
          dispatch(fetchAllCategoryRequest()) // Envoi de l’action REQUEST
          try {
               // Requête GET vers l’API pour récupérer toutes les catégories
               const response = await axios.get(baseUrl + 'api/all-categories/');
               dispatch(fetchAllCategorySuccess(response.data)); // Envoi de SUCCESS avec les données
          } catch (error) {
               dispatch(fetchAllCategoryFailure(error)); // Envoi de FAILURE en cas d’erreur
          }
     }
}

// Action REQUEST pour une seule catégorie
export const fetchCategoryRequest = () => ({
     type: actionTypes.FETCH_CATEGORY_REQUEST
})

// Action SUCCESS pour une seule catégorie
export const fetchCategorySuccess = (category) => ({
     type: actionTypes.FETCH_CATEGORY_SUCCESS,
     payload: category
})

// Action FAILURE pour une seule catégorie
export const fetchCategoryFailure = (error) => ({
     type: actionTypes.FETCH_CATEGORY_FAILURE,
     payload: error
})

// Fonction asynchrone pour récupérer une seule catégorie (avec token pour authentification)
export const fetchCategory = (token) => {
     return async (dispatch) => {
          dispatch(fetchCategoryRequest())
          try {
               const config = {
                    headers: { Authorization: `Bearer ${token}` },
               };
               const response = await axios.get(baseUrl + 'api/category/', config);
               dispatch(fetchCategorySuccess(response.data));
          } catch (error) {
               dispatch(fetchCategoryFailure(error));
          }
     }
}


// Action SUCCESS après création d’une catégorie
export const createCategorySuccess = (newData, categoryList) => ({
     type: actionTypes.CREATE_CATEGORY_SUCCESS,
     payload: { newData, categoryList }
});

// Action FAILURE après échec de création d’une catégorie
export const createCategoryFailure = (errorMsg) => ({
     type: actionTypes.CREATE_CATEGORY_FAILURE,
     payload: errorMsg
});

// Fonction asynchrone pour créer une nouvelle catégorie
export const createCategory = (categoryName, userId, token) => {
     return async (dispatch) => {
          const data = { name: categoryName, user: userId };
          const config = { headers: { Authorization: `Bearer ${token}` } };

          try {
               const response = await axios.post(baseUrl + 'api/category/', data, config);
               const fetchResponse = await axios.get(baseUrl + 'api/category/', config);
               dispatch(createCategorySuccess(response.data, fetchResponse.data));
          } catch (error) {
               dispatch(createCategoryFailure(error.response.data));
          }
     };
};

// Fonction asynchrone pour mettre à jour une catégorie existante
export const updateCategory = (categoryName, userId, token, id) => {
     return async (dispatch) => {
          const data = { name: categoryName, user: userId };
          const config = { headers: { Authorization: `Bearer ${token}` } };

          try {
               const response = await axios.put(baseUrl + 'api/category/' + id + '/', data, config);
               const fetchResponse = await axios.get(baseUrl + 'api/category/', config);
               dispatch(createCategorySuccess(response.data, fetchResponse.data));
          } catch (error) {
               dispatch(createCategoryFailure(error.response.data));
          }
     };
};

// Fonction asynchrone pour supprimer une catégorie
export const deleteCategory = (token, id) => {
     return async (dispatch) => {
          const config = { headers: { Authorization: `Bearer ${token}` } };

          try {
               const response = await axios.delete(baseUrl + 'api/category/' + id + '/', config);
               const fetchResponse = await axios.get(baseUrl + 'api/category/', config);
               dispatch(createCategorySuccess(response.data, fetchResponse.data));
          } catch (error) {
               dispatch(createCategoryFailure(error.response.data));
          }
     };
};


/* ==================== VÉHICULES ==================== */

// Action REQUEST pour les véhicules
export const fetchVehicleRequest = () => ({
     type: actionTypes.FETCH_VEHICLE_REQUEST
})

// Action SUCCESS pour les véhicules
export const fetchVehicleSuccess = (category) => ({
     type: actionTypes.FETCH_VEHICLE_SUCCESS,
     payload: category
})

// Action FAILURE pour les véhicules
export const fetchVehicleFailure = (error) => ({
     type: actionTypes.FETCH_VEHICLE_FAILURE,
     payload: error
})

// Fonction asynchrone pour récupérer tous les véhicules (auth requis)
export const fetchVehicle = (token) => {
     return async (dispatch) => {
          dispatch(fetchVehicleRequest())
          try {
               const config = { headers: { Authorization: `Bearer ${token}` } };
               const url = `${baseUrl}api/vehicle/`
               const response = await axios.get(url, config);
               dispatch(fetchVehicleSuccess(response.data));
          } catch (error) {
               dispatch(fetchVehicleFailure(error));
          }
     }
}

// Action SUCCESS après création d’un véhicule
export const createVehicleSuccess = (successMsg, data) => ({
     type: actionTypes.CREATE_VEHICLE_SUCCESS,
     payload: { successMsg, data }
});

// Action FAILURE après échec de création d’un véhicule
export const createVehicleFailure = (errorMsg) => ({
     type: actionTypes.CREATE_VEHICLE_FAILURE,
     payload: errorMsg
});

// Fonction asynchrone pour créer un véhicule (avec upload d’image → multipart/form-data)
export const createVehicle = (vehicleData, token) => {
     return async (dispatch) => {
          try {
               const config = {
                    headers: {
                         "Content-Type": "multipart/form-data",
                         Authorization: `Bearer ${token}`,
                    },
               };
               const response = await axios.post(`${baseUrl}api/vehicle/`, vehicleData, config);
               const fetchResponse = await axios.get(`${baseUrl}api/vehicle/`, config);
               dispatch(createVehicleSuccess(response.data.message, fetchResponse.data));
          } catch (error) {
               dispatch(createVehicleFailure(error.response.data.message));
          }
     };
};

// Fonction asynchrone pour mettre à jour un véhicule
export const updateVehicle = (vehicleData, token, id) => {
     return async (dispatch) => {
          try {
               const config = {
                    headers: {
                         'Content-Type': 'multipart/form-data',
                         Authorization: `Bearer ${token}`
                    }
               };
               const response = await axios.put(`${baseUrl}api/vehicle/${id}/`, vehicleData, config);
               const fetchResponse = await axios.get(`${baseUrl}api/vehicle/`, config);
               dispatch(createVehicleSuccess(response.data.message, fetchResponse.data));
          } catch (error) {
               dispatch(createVehicleFailure(error.response.data.message));
          }
     };
};

// Fonction asynchrone pour supprimer un véhicule
export const deleteVehicle = (id, token) => {
     return async (dispatch) => {
          try {
               const config = {
                    headers: {
                         'Content-Type': 'multipart/form-data',
                         Authorization: `Bearer ${token}`
                    }
               };
               const response = await axios.delete(`${baseUrl}api/vehicle/${id}/`, config);
               const fetchResponse = await axios.get(`${baseUrl}api/vehicle/`, config);
               dispatch(createVehicleSuccess(response.data, fetchResponse.data));
          } catch (error) {
               dispatch(createVehicleFailure(error.response.data.message));
          }
     };
};


/* ==================== TOUS LES VÉHICULES ==================== */

// Action REQUEST pour récupérer tous les véhicules (public)
export const fetchAllVehicleRequest = () => ({
     type: actionTypes.FETCH_ALL_VEHICLE_REQUEST
})

// Action SUCCESS pour récupérer tous les véhicules (public)
export const fetchAllVehicleSuccess = (vehicles) => ({
     type: actionTypes.FETCH_ALL_VEHICLE_SUCCESS,
     payload: vehicles
})

// Action FAILURE pour récupérer tous les véhicules
export const fetchAllVehicleFailure = (error) => ({
     type: actionTypes.FETCH_ALL_VEHICLE_FAILURE,
     payload: error
})

// Fonction asynchrone pour récupérer tous les véhicules disponibles (sans token)
export const fetchAllVehicle = () => {
     return async (dispatch) => {
          dispatch(fetchAllVehicleRequest())
          try {
               const response = await axios.get(baseUrl + 'api/all-cars/');
               dispatch(fetchAllVehicleSuccess(response.data));
          } catch (error) {
               dispatch(fetchAllVehicleFailure(error));
          }
     }
}


/* ==================== VÉHICULES RÉSERVÉS ==================== */

// Action REQUEST pour récupérer tous les véhicules réservés
export const fetchAllBookedVehicleRequest = () => ({
     type: actionTypes.FETCH_ALL_BOOKED_VEHICLE_REQUEST
})

// Action SUCCESS pour véhicules réservés
export const fetchAllBookedVehicleSuccess = (all_booked_vehicle) => ({
     type: actionTypes.FETCH_ALL_BOOKED_VEHICLE_SUCCESS,
     payload: all_booked_vehicle
})

// Action FAILURE pour véhicules réservés
export const fetchAllBookedVehicleFailure = (error) => ({
     type: actionTypes.FETCH_ALL_BOOKED_VEHICLE_FAILURE,
     payload: error
})

// Fonction asynchrone pour récupérer tous les véhicules réservés (token obligatoire)
export const fetchAllBookedVehicle = (token) => {
     return async (dispatch) => {
          dispatch(fetchAllBookedVehicleRequest())
          try {
               const config = { headers: { Authorization: `Bearer ${token}` } };
               let url = baseUrl + "api/all-booked/";
               const response = await axios.get(url, config);
               dispatch(fetchAllBookedVehicleSuccess(response.data));
          } catch (error) {
               dispatch(fetchAllBookedVehicleFailure(error));
          }
     }
}


/* ==================== CONSULTER VÉHICULES RÉSERVÉS ==================== */

// Action REQUEST pour voir tous les véhicules réservés (vue différente)
export const fetchAllSeeBookedVehicleRequest = () => ({
     type: actionTypes.FETCH_ALL_SEE_VEHICLE_REQUEST
})

// Action SUCCESS pour voir tous les véhicules réservés
export const fetchAllSeeBookedVehicleSuccess = (all_booked_vehicle) => ({
     type: actionTypes.FETCH_ALL_SEE_VEHICLE_SUCCESS,
     payload: all_booked_vehicle
})

// Action FAILURE pour voir tous les véhicules réservés
export const fetchAllSeeBookedVehicleFailure = (error) => ({
     type: actionTypes.FETCH_ALL_SEE_VEHICLE_FAILURE,
     payload: error
})

// Fonction asynchrone pour voir tous les véhicules réservés (API see-all-booked)
export const fetchAllSeeBookedVehicle = (token) => {
     return async (dispatch) => {
          dispatch(fetchAllSeeBookedVehicleRequest())
          try {
               const config = { headers: { Authorization: `Bearer ${token}` } };
               let url = baseUrl + "api/see-all-booked/";
               const response = await axios.get(url, config);
               dispatch(fetchAllSeeBookedVehicleSuccess(response.data));
          } catch (error) {
               dispatch(fetchAllSeeBookedVehicleFailure(error));
          }
     }
}
