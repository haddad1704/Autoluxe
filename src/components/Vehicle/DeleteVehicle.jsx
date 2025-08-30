/**
 * Composant `DeleteVehicle`.
 * Demande confirmation et déclenche la suppression d’un véhicule.
 */
import React from "react"; // React
import { connect } from "react-redux"; // Connexion Redux
import {deleteVehicle } from "../../redux/actions"; // Action de suppression


const mapStateToProps = (state) => ({ // Sélection du token
  token: state.token,
});


const mapDispatchToProps = (dispatch) => ({ // Mappe l’action en prop
  deleteVehicle: (id, token) => dispatch(deleteVehicle(id, token)),
});

const DeleteVehicle = ({ vehicle, toggle, token, deleteVehicle, notify }) => { // Composant fonctionnel
  const handleDelete = () => { // Valide la suppression
    deleteVehicle(vehicle.id, token); // Dispatch suppression
    notify("Vehicle deleted successfully", "warning"); // Notifie l’utilisateur
    toggle(); // Ferme la modale
  };

  return (
    <div>
      <p>Are you sure you want to delete ?</p>

      <button className="btn btn-danger me-1" onClick={handleDelete}>
        Delete
      </button>
      <button onClick={toggle} className="btn btn-primary">
        Cancel
      </button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteVehicle);
