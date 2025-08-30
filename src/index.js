// Ce fichier est le point d'entrée principal de l'application React.
// Il monte (render) le composant racine <App /> dans la page HTML (div avec l’id "root").
// Il active aussi le mode strict pour détecter des problèmes potentiels en développement
// et lance la fonction reportWebVitals() pour mesurer les performances de l'application.

import React from 'react'; // Importation de React, nécessaire pour utiliser JSX
import ReactDOM from 'react-dom/client'; // Importation de ReactDOM pour rendre l'application dans le DOM
import './index.css'; // Importation du fichier CSS global de l'application
import App from './App'; // Importation du composant principal App
import reportWebVitals from './reportWebVitals'; // Importation de la fonction qui permet de mesurer les performances

// Création de la racine React à partir de la div avec l'id "root" dans index.html
const root = ReactDOM.createRoot(document.getElementById('root')); 

// Rendu de l'application dans le DOM
root.render(
  <React.StrictMode> {/* Active des vérifications supplémentaires en mode développement */}
    <App /> {/* Monte le composant principal App, point de départ de l'application */}
  </React.StrictMode>
);

// Exécution de la fonction pour mesurer et enregistrer les performances (optionnel)
reportWebVitals();
