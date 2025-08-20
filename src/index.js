import React from 'react'; // Bibliothèque React
import ReactDOM from 'react-dom/client'; // API de rendu React 18
import './index.css'; // Styles globaux
import App from './App'; // Composant racine de l'application
import reportWebVitals from './reportWebVitals'; // Mesure des performances (optionnelle)

const root = ReactDOM.createRoot(document.getElementById('root')); // Récupère le conteneur DOM
root.render(
  <React.StrictMode> {/* Active des vérifications supplémentaires en dev */}
    <App /> {/* Monte l'application */}
  </React.StrictMode>
);

// Pour mesurer les performances, passer une fonction (ex: reportWebVitals(console.log))
// ou envoyer vers une plateforme d'analytics. Plus d'infos: https://bit.ly/CRA-vitals
reportWebVitals();
