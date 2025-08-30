/**
 * Composant `Notification`.
 * Surveille les messages de succès/erreur dans le store et affiche des toasts.
 */
import React, { useEffect } from "react"; // Hooks React
import { connect } from "react-redux"; // Connexion Redux
import { ToastContainer, toast } from "react-toastify"; // API toasts
import "react-toastify/dist/ReactToastify.css"; // Styles toasts

const mapStateToProps = (state) => ({ // Sélecteur des messages
  successMsg: state.successMsg,
  errorMsg: state.errorMsg,
});


const Notification = ({ successMsg, errorMsg }) => { // Composant fonctionnel
  useEffect(() => { // Affiche les toasts quand les messages changent
    if (successMsg) {
      toast.success(successMsg, { autoClose: 5000 });
    }
    if (errorMsg) {
      toast.error(errorMsg, { autoClose: 5000 });
    }
  }, [successMsg, errorMsg]);

  return <div>
      <ToastContainer /> {/* Conteneur des notifications */}
  </div>;
};

export default connect(mapStateToProps)(Notification);
