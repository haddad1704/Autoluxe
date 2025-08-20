import * as actionTypes from './actionTypes'; // Types d'actions disponibles


const initialState = { // État global initial de l'application

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
     // expirationTime:0,
     user_type:"",
     userId: null,
     authLoading: false,
     error: null,
     authCheckResponse:false,
     lengthRoom: 0,
     lengthRoomBooked: 0,
     lengthRoomLeft: 0,
     bookedRooms:[]
};

const reducer = (state = initialState, action) => { // Réducteur principal
     switch (action.type) {
          case actionTypes.CREATE_CATEGORY_SUCCESS:
               return {
                    ...state,
                    isLoading: false,
                    successMsg: `Successfully (${action.payload.categoryList.name}) created.`,
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

          // Récupération des catégories
          case actionTypes.FETCH_ALL_CATEGORY_REQUEST:
               return {
                    ...state,
                    isLoading: true,
                    error: null
               }


          case actionTypes.FETCH_ALL_CATEGORY_SUCCESS:
               return {
                    ...state,
                    isLoading: false,
                    all_category: action.payload,
                    error: null,
               }

          case actionTypes.FETCH_ALL_CATEGORY_FAILURE:
               return {
                    ...state,
                    isLoading: false,
                    error: action.payload
               }



          // Récupération des catégories (propriétaire)
          case actionTypes.FETCH_CATEGORY_REQUEST:
               return {
                    ...state,
                    isLoading: true,
                    error: null
               }


          case actionTypes.FETCH_CATEGORY_SUCCESS:
               return {
                    ...state,
                    isLoading: false,
                    category: action.payload,
                    error: null,
               }

          case actionTypes.FETCH_CATEGORY_FAILURE:
               return {
                    ...state,
                    isLoading: false,
                    error: action.payload
               }

          // Récupération des véhicules (propriétaire)
          case actionTypes.FETCH_VEHICLE_REQUEST:
               return {
                    ...state,
                    isLoading: true,
                    error: null
               }


          case actionTypes.FETCH_VEHICLE_SUCCESS:
               return {
                    ...state,
                    isLoading: false,
                    vehicles: action.payload,
                    error: null,
               }

          case actionTypes.FETCH_VEHICLE_FAILURE:
               return {
                    ...state,
                    isLoading: false,
                    error: action.payload
               }

          // Tous les véhicules (public)
          case actionTypes.FETCH_ALL_VEHICLE_REQUEST:
               return {
                    ...state,
                    isLoading: true,
                    error: null
               }


          case actionTypes.FETCH_ALL_VEHICLE_SUCCESS:
               return {
                    ...state,
                    isLoading: false,
                    all_cars: action.payload,
                    error: null,
               }

          case actionTypes.FETCH_ALL_VEHICLE_FAILURE:
               return {
                    ...state,
                    isLoading: false,
                    error: action.payload
               }


          // Réservations du client
          case actionTypes.FETCH_ALL_BOOKED_VEHICLE_REQUEST:
               return {
                    ...state,
                    isLoading: true,
                    error: null
               }


          case actionTypes.FETCH_ALL_BOOKED_VEHICLE_SUCCESS:
               return {
                    ...state,
                    isLoading: false,
                    all_booked_vehicle: action.payload,
                    error: null,
               }

          case actionTypes.FETCH_ALL_BOOKED_VEHICLE_FAILURE:
               return {
                    ...state,
                    isLoading: false,
                    error: action.payload
               }


          // Réservations côté propriétaire (voir toutes)
          case actionTypes.FETCH_ALL_SEE_VEHICLE_REQUEST:
               return {
                    ...state,
                    isLoading: true,
                    error: null
               }


          case actionTypes.FETCH_ALL_SEE_VEHICLE_SUCCESS:
               return {
                    ...state,
                    isLoading: false,
                    see_all_booked_vehicle: action.payload,
                    error: null,
               }

          case actionTypes.FETCH_ALL_SEE_VEHICLE_FAILURE:
               return {
                    ...state,
                    isLoading: false,
                    error: action.payload
               }


          // Création/Mise à jour/Suppression véhicule: met à jour la liste locale

          case actionTypes.CREATE_VEHICLE_SUCCESS:
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

          
          // Authentification
          case actionTypes.AUTH_SUCCESS:
               return {
                    ...state,
                    token: action.payload.token,
                    userId: action.payload.userId,
                    user_type: action.payload.user_type,
                    authSuccessMsg: "Successfully Login",
                    authCheckResponse: true,
                    // errorMsg: "There is no error",
               };


          case actionTypes.AUTH_LOGOUT:
               return {
                    ...state,
                    token: null,
                    userId: null,
                    user_type:"",
                    authSuccessMsg:"Successfully Logout",
                    authCheckResponse:false,
               }
          case actionTypes.AUTH_LOADING:
               return {
                    ...state,
                    authLoading: action.payload,
               }
          case actionTypes.AUTH_FAILED:
               return {
                    ...state,
                    authFailedMsg: action.payload,
               }
          case actionTypes.REMOVE_AUTH_MESSAGE:
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
