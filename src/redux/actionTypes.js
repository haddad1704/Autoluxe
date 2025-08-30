/**
Ce fichier définit toutes les constantes de types d’actions Redux utilisées
dans l’application. Ces constantes permettent d’éviter les fautes de frappe,
de centraliser les types d’actions et de faciliter la maintenance du code.
Chaque export représente une action spécifique (succès, échec, requête, etc.).
*/

export const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS" // Succès lors de la création d’une catégorie
export const CREATE_CATEGORY_FAILURE = "CREATE_CATEGORY_FAILURE"

export const FETCH_CATEGORY_REQUEST = "FETCH_CATEGORY_REQUEST" // Début de la récupération d’une catégorie
export const FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS"
export const FETCH_CATEGORY_FAILURE = "FETCH_CATEGORY_FAILURE"

export const FETCH_ALL_CATEGORY_REQUEST = "FETCH_ALL_CATEGORY_REQUEST" // Début de la récupération de toutes les catégories
export const FETCH_ALL_CATEGORY_SUCCESS = "FETCH_ALL_CATEGORY_SUCCESS"
export const FETCH_ALL_CATEGORY_FAILURE = "FETCH_ALL_CATEGORY_FAILURE"

export const FETCH_VEHICLE_REQUEST = "FETCH_VEHICLE_REQUEST" // Début de la récupération des véhicules (protégé)
export const FETCH_VEHICLE_SUCCESS = "FETCH_VEHICLE_SUCCESS"
export const FETCH_VEHICLE_FAILURE = "FETCH_VEHICLE_FAILURE"

export const CREATE_VEHICLE_SUCCESS = "CREATE_VEHICLE_SUCCESS" // Succès lors de la création/mise à jour/suppression d’un véhicule
export const CREATE_VEHICLE_FAILURE = "CREATE_VEHICLE_FAILURE"

export const DELETE_VEHICLE_SUCCESS = "CREATE_VEHICLE_SUCCESS" // Constantes réutilisées pour l’état de succès
export const DELETE_VEHICLE_FAILURE = "CREATE_VEHICLE_FAILURE" // Constantes réutilisées pour l’état d’échec

export const FETCH_ALL_VEHICLE_REQUEST = "FETCH_ALL_VEHICLE_REQUEST" // Début récupération de tous les véhicules (public)
export const FETCH_ALL_VEHICLE_SUCCESS = "FETCH_ALL_VEHICLE_SUCCESS"
export const FETCH_ALL_VEHICLE_FAILURE = "FETCH_ALL_VEHICLE_FAILURE"

export const FETCH_ALL_SEE_VEHICLE_REQUEST = "FETCH_ALL_SEE_VEHICLE_REQUEST" // Début récupération vue "see all booked"
export const FETCH_ALL_SEE_VEHICLE_SUCCESS = "FETCH_ALL_SEE_VEHICLE_SUCCESS"
export const FETCH_ALL_SEE_VEHICLE_FAILURE = "FETCH_ALL_SEE_VEHICLE_FAILURE"

export const FETCH_ALL_BOOKED_VEHICLE_REQUEST = "FETCH_ALL_BOOKED_VEHICLE_REQUEST" // Début récupération des véhicules réservés
export const FETCH_ALL_BOOKED_VEHICLE_SUCCESS = "FETCH_ALL_BOOKED_VEHICLE_SUCCESS"
export const FETCH_ALL_BOOKED_VEHICLE_FAILURE = "FETCH_ALL_BOOKED_VEHICLE_FAILURE"



export const AUTH_SUCCESS = "AUTH_SUCCESS"; // Connexion/authentification réussie
export const AUTH_FAILED = "AUTH_FAILED"; // Échec de l’authentification
export const AUTH_LOADING = "AUTH_LOADING"; // Indique le chargement en cours d’auth
export const AUTH_LOGOUT = "AUTH_LOGOUT"; // Déconnexion de l’utilisateur



export const REMOVE_AUTH_MESSAGE = "REMOVE_AUTH_MESSAGE"; // Nettoie les messages d’authentification