/**
 * Page `Vehicles` (propriétaire).
 * Liste les véhicules du propriétaire, propose l’ajout via une modale,
 * et affiche l’état de chargement.
 */
import React, { useState, useEffect } from "react"; // Hooks React
import { connect } from "react-redux"; // Connexion Redux
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,

} from "reactstrap"; // Composants UI
import VehicleForm from "./VehicleForm"; // Formulaire d’ajout de véhicule
import { fetchVehicle } from "../../redux/actions"; // Action de récupération des véhicules
import Vehicle from "./Vehicle"; // Carte d’un véhicule
import Loading from "../Loading/Loading"; // Loader

const mapStateToProps = (state) => ({ // Sélecteurs
  token: state.token,
  vehicles: state.vehicles,
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ // Mappe les actions
  fetchVehicle: (token) => dispatch(fetchVehicle(token)),
});

const Vehicles = ({ token, vehicles, fetchVehicle, isLoading, notify }) => { // Composant Vehicles
  const [modal, setModal] = useState(false); // État d’ouverture de la modale
  const [fetchedVehicles, setFetchedVehicles] = useState([]); // Copie locale des véhicules

  useEffect(() => { // Charge les véhicules quand le token change
    fetchVehicle(token);
  }, [fetchVehicle, token]);

  useEffect(() => { // Synchronise l’état local
    setFetchedVehicles(vehicles);
  }, [vehicles]);

  const toggleModal = () => { // Bascule la modale d’ajout
    setModal(!modal);
  };

  let vehicle_show = null; // Zone d’affichage
  if (isLoading) {
    vehicle_show = <Loading />; // Loader
  } else {
    vehicle_show = fetchedVehicles.map((vehicle) => (
      <div className="" key={vehicle.id}>
        <Vehicle notify={notify} vehicle={vehicle} />
      </div>
    ));
  }
  return (
    <div className="container">
      <h3>Mes véhicules:</h3>
      <Button color="primary" onClick={toggleModal}>
        Ajouter un véhicule
      </Button>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Ajouter un véhicule</ModalHeader>
        <ModalBody>
          <VehicleForm notify={notify} toggle={toggleModal} />
        </ModalBody>
      </Modal>

      <div className="mt-4">{vehicle_show}</div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Vehicles);
