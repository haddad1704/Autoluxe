/**
Réducteur Redux principal de l’application.
Il centralise l’état global relatif aux catégories, véhicules, réservations
et à l’authentification. Chaque case du switch répond à une action et retourne
un nouvel état de manière immuable.
*/

import * as actionTypes from './actionTypes'; // Import des types d’actions

const initialState = { // État initial de l’application

     all_category:[],
     all_booked_vehicle: [],
     see_all_booked_vehicle:[],
     category:[],
     vehicles:[],
     all_cars:[],
     isLoading: false,


     authFailedMsg: null,
     authSuccessMsg: null,
     successMsg:null,
     errorMsg:null,
     infoMsg:null,
     warningMsg: null,

     token: null,
     user_type:"",
     userId: null,
     authLoading: false,
     error: null,
     authCheckResponse:false,
     lengthRoom: 0,
     lengthRoomBooked: 0,
     lengthRoomLeft: 0,
     bookedRooms:[]
}; // Fin de l’état initial

const reducer = (state = initialState, action) => { // Réducteur principal
     switch (action.type) { // Choisit la transformation selon le type d’action
          case actionTypes.CREATE_CATEGORY_SUCCESS:
               return {
                    ...state,
                    isLoading: false,
                    successMsg: `Successfully (${action.payload.categoryList.name}) created.`, // Message de succès
                    category: action.payload.categoryList,
                    errorMsg: null
               };
          case actionTypes.CREATE_CATEGORY_FAILURE:
               return {
                    ...state,
                    isLoading: false,
                    successMsg: null,
                    errorMsg: action.payload
               };

          case actionTypes.FETCH_ALL_CATEGORY_REQUEST: // Début de chargement des catégories
               return {
                    ...state,
                    isLoading: true,
                    error: null
               }


          case actionTypes.FETCH_ALL_CATEGORY_SUCCESS: // Succès: toutes les catégories
               return {
                    ...state,
                    isLoading: false,
                    all_category: action.payload,
                    error: null,
               }

          case actionTypes.FETCH_ALL_CATEGORY_FAILURE: // Échec: catégories
               return {
                    ...state,
                    isLoading: false,
                    error: action.payload
               }



          case actionTypes.FETCH_CATEGORY_REQUEST: // Début de chargement d’une catégorie
               return {
                    ...state,
                    isLoading: true,
                    error: null
               }


          case actionTypes.FETCH_CATEGORY_SUCCESS: // Succès: une catégorie
               return {
                    ...state,
                    isLoading: false,
                    category: action.payload,
                    error: null,
               }

          case actionTypes.FETCH_CATEGORY_FAILURE: // Échec: une catégorie
               return {
                    ...state,
                    isLoading: false,
                    error: action.payload
               }

          case actionTypes.FETCH_VEHICLE_REQUEST: // Début: véhicules (protégé)
               return {
                    ...state,
                    isLoading: true,
                    error: null
               }


          case actionTypes.FETCH_VEHICLE_SUCCESS: // Succès: véhicules (protégé)
               return {
                    ...state,
                    isLoading: false,
                    vehicles: action.payload,
                    error: null,
               }

          case actionTypes.FETCH_VEHICLE_FAILURE: // Échec: véhicules (protégé)
               return {
                    ...state,
                    isLoading: false,
                    error: action.payload
               }

          case actionTypes.FETCH_ALL_VEHICLE_REQUEST: // Début: tous véhicules (public)
               return {
                    ...state,
                    isLoading: true,
                    error: null
               }


          case actionTypes.FETCH_ALL_VEHICLE_SUCCESS: // Succès: tous véhicules (public)
               return {
                    ...state,
                    isLoading: false,
                    all_cars: action.payload,
                    error: null,
               }

          case actionTypes.FETCH_ALL_VEHICLE_FAILURE: // Échec: tous véhicules (public)
               return {
                    ...state,
                    isLoading: false,
                    error: action.payload
               }


          case actionTypes.FETCH_ALL_BOOKED_VEHICLE_REQUEST: // Début: véhicules réservés
               return {
                    ...state,
                    isLoading: true,
                    error: null
               }


          case actionTypes.FETCH_ALL_BOOKED_VEHICLE_SUCCESS: // Succès: véhicules réservés
               return {
                    ...state,
                    isLoading: false,
                    all_booked_vehicle: action.payload,
                    error: null,
               }

          case actionTypes.FETCH_ALL_BOOKED_VEHICLE_FAILURE: // Échec: véhicules réservés
               return {
                    ...state,
                    isLoading: false,
                    error: action.payload
               }


          case actionTypes.FETCH_ALL_SEE_VEHICLE_REQUEST: // Début: vue voir tous les réservés
               return {
                    ...state,
                    isLoading: true,
                    error: null
               }


          case actionTypes.FETCH_ALL_SEE_VEHICLE_SUCCESS: // Succès: vue voir tous les réservés
               return {
                    ...state,
                    isLoading: false,
                    see_all_booked_vehicle: action.payload,
                    error: null,
               }

          case actionTypes.FETCH_ALL_SEE_VEHICLE_FAILURE: // Échec: vue voir tous les réservés
               return {
                    ...state,
                    isLoading: false,
                    error: action.payload
               }



          case actionTypes.CREATE_VEHICLE_SUCCESS: // Succès: création/màj/suppression véhicule
               return {
                    ...state,
                    isLoading: false,
                    successMsg: "Successfully created.",
                    vehicles: action.payload.data,
                    errorMsg: null
               };
          case actionTypes.CREATE_VEHICLE_FAILURE:
               return {
                    ...state,
                    isLoading: false,
                    successMsg: null,
                    errorMsg: action.payload
               };

          
          case actionTypes.AUTH_SUCCESS: // Succès d’authentification
               return {
                    ...state,
                    token: action.payload.token,
                    userId: action.payload.userId,
                    user_type: action.payload.user_type,
                    authSuccessMsg: "Successfully Login",
                    authCheckResponse: true,
               };


          case actionTypes.AUTH_LOGOUT: // Déconnexion
               return {
                    ...state,
                    token: null,
                    userId: null,
                    user_type:"",
                    authSuccessMsg:"Successfully Logout",
                    authCheckResponse:false,
               }
          case actionTypes.AUTH_LOADING: // Flag de chargement auth
               return {
                    ...state,
                    authLoading: action.payload,
               }
          case actionTypes.AUTH_FAILED: // Message d’échec auth
               return {
                    ...state,
                    authFailedMsg: action.payload,
               }
          case actionTypes.REMOVE_AUTH_MESSAGE: // Nettoyage des messages auth
               return {
                    ...state,
                    authFailedMsg:null,
                    authSuccessMsg: null,
               }

          default:
               return state;
     }
};

export default reducer;
