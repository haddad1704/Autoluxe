// Configuration du store Redux avec persistance et middleware thunk.
// Ce fichier crée et exporte le store et le persistor pour l’hydratation.

import {
     createStore,
     applyMiddleware
} from "redux"; // Import des APIs Redux pour créer le store et appliquer des middlewares
import {
     persistStore,
     persistReducer
} from "redux-persist"; // Outils pour persister l’état Redux
import storage from "redux-persist/lib/storage"; // Stockage par défaut (localStorage sur web)
import {
     thunk
} from 'redux-thunk'; // Middleware pour gérer les actions asynchrones
import reducer from './reducers'; // Réducteur racine de l’application

const persistConfig = {
     key: "root", // Clé utilisée pour stocker l’état dans le storage
     storage, // Mécanisme de stockage (localStorage)
};

const persistedReducer = persistReducer(persistConfig, reducer); // Combine le reducer avec la persistance

export const store = createStore(
     persistedReducer, // Réducteur persistant
     applyMiddleware(thunk) // Ajout du middleware thunk
);

export const persistor = persistStore(store); // Crée le persistor lié au store

const storeConfig = {
     store, // Instance du store Redux
     persistor // Instance du persistor pour rehydrater l’état
};

export default storeConfig;
