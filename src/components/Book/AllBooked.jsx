/**
 * Page `AllBooked`.
 * Affiche toutes les réservations du client et permet la suppression locale
 * d’une réservation de la liste après confirmation.
 */
import React, { useEffect, useState } from "react"; // Hooks React
import { connect } from "react-redux"; // Connexion Redux
import { fetchAllBookedVehicle } from "../../redux/actions"; // Action de récupération
import Loading from "../Loading/Loading"; // Loader
import AllBookedSingle from "./AllBookedSingle"; // Carte d’une réservation

const mapStateToProps = (state) => ({ // Sélecteurs
  isLoading: state.isLoading,
  all_booked_vehicle: state.all_booked_vehicle,
  successMsg: state.successMsg,
  errorMsg: state.errorMsg,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({ // Mappe action en prop
  fetchAllBookedVehicle: (token) => dispatch(fetchAllBookedVehicle(token)),
});

const AllBooked = ({ // Définition du composant
  fetchAllBookedVehicle,
  all_booked_vehicle,
  isLoading,
  token,
}) => {
  const [allBooked, setAllBooked] = useState(null); // État local des réservations

  useEffect(() => { // Charge les réservations au montage
    fetchAllBookedVehicle(token);
  }, [fetchAllBookedVehicle, token]);

  useEffect(() => { // Synchronise l’état local
    setAllBooked(all_booked_vehicle);
  }, [all_booked_vehicle]);

  const handleDelete = (deletedId) => { // Retire une réservation de la vue locale
    setAllBooked(prev => prev.filter(booking => booking.id !== deletedId));
  };


  return (
    <div className="container">
      <h2>Toutes les réservations</h2>
      {isLoading ? (
        <Loading />
      ) : allBooked && allBooked.length > 0 ? (
        <div className="row">
          {allBooked.map((vehicle) => (
            <div key={vehicle.id} className="mb-2">
              <AllBookedSingle vehicle={vehicle} onDelete={handleDelete}/>
            </div>
          ))}
        </div>
      ) : (
        <div>Aucune réservation trouvée.</div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AllBooked);
