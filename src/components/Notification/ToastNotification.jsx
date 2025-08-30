/**
 * Composant utilitaire `ToastNotification`.
 * Affiche un toast en fonction du type et du message fournis, et rend le
 * conteneur des toasts. À utiliser comme helper ponctuel.
 */
import React from "react"; // React
import { ToastContainer,toast } from "react-toastify"; // API de notifications
import { notificationTime } from "../../redux/baseUrls"; // Paramètre de durée


const ToastNotification = ({ message, type }) => { // Définition du composant
  console.log('===================================='); // Séparateur console (debug)
  console.log(message); // Log du message
  console.log('===================================='); // Séparateur console (debug)
  switch (type) { // Choisit le type de toast
    case 'success':
      toast(message, notificationTime); // Affiche un toast de succès
      break;
  
    default:
      break;
  }
  
  return (
    <div className="p-3 my-2 rounded"> {/* Conteneur visuel */}
      <ToastContainer /> {/* Conteneur des toasts */}
    </div>
  );
};

export default ToastNotification;
