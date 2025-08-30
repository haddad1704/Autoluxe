/*
Ce fichier `App.js` est le point d'entrée principal de l'application React.  
Il gère la configuration globale comme :  
- L'intégration de Redux pour la gestion de l'état global.  
- La persistance des données via `redux-persist`.  
- La gestion du routage avec `react-router-dom`.  
- L'affichage des notifications avec `react-toastify`.  
- L'utilisation de Bootstrap pour le style et les composants.  

En résumé, il définit la structure générale de l'application en enveloppant le composant principal `Main` 
dans différents providers (Redux, Persist, Router) et ajoute le support des notifications et du design Bootstrap.
*/

import './App.css'; // Importation du fichier de style global App.css
import Main from './components/Main'; // Importation du composant principal Main
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation du style Bootstrap
import { Provider } from 'react-redux';  // Importation du Provider pour rendre le store Redux disponible dans toute l’application
import { PersistGate } from 'redux-persist/integration/react'; // Importation du composant PersistGate pour gérer la persistance du store
import { store, persistor } from './redux/store';  // Importation du store Redux et du persistor configurés
import { BrowserRouter } from 'react-router-dom'; // Importation du composant BrowserRouter pour gérer le routage
import React from 'react'; // Importation de la bibliothèque React
import { ToastContainer } from "react-toastify"; // Importation du conteneur de notifications
import "react-toastify/dist/ReactToastify.css"; // Importation des styles pour les notifications Toastify
import 'bootstrap/dist/css/bootstrap.min.css'; // Ré-importation de Bootstrap CSS (doublon inutile, déjà importé)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importation du JavaScript de Bootstrap (animations, modals, etc.)
import 'react-toastify/dist/ReactToastify.css'; // Ré-importation du CSS Toastify (doublon inutile, déjà importé)

function App() {
  return (
    <div className="App"> {/* Conteneur principal avec une classe CSS */}
      <React.Fragment> {/* Utilisation de React.Fragment pour grouper plusieurs éléments */}
        <ToastContainer /> {/* Conteneur global pour afficher les notifications */}

        <Provider store={store}> {/* Fournit le store Redux à toute l'application */}
          <PersistGate loading={null} persistor={persistor}> {/* Active la persistance du store Redux */}
            <BrowserRouter> {/* Active le routage basé sur l’URL */}
              <Main/> {/* Appel du composant principal Main */}
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </React.Fragment>
    </div>
  );
}

export default App; // Exportation du composant App pour qu’il soit utilisé ailleurs

