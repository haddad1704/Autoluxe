/**
 * Grille `AllCar`.
 * Récupère toutes les voitures disponibles et les affiche sous forme de cartes.
 */
import React, { useEffect, useState } from "react"; // Hooks React
import { connect } from "react-redux"; // Connexion Redux
import { fetchAllVehicle } from "../../redux/actions"; // Action de chargement des véhicules
import Loading from "../Loading/Loading"; // Indicateur de chargement
import Car from "./Car"; // Carte d’un véhicule

const mapStateToProps = (state) => ({ // Sélecteurs
  token: state.token,
  user_type: state.user_type,
  all_cars: state.all_cars,
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ // Mappe l’action en prop
  fetchAllVehicle: () => dispatch(fetchAllVehicle()),
});

const AllCar = ({ fetchAllVehicle, all_cars, isLoading }) => { // Composant AllCar
  const [allCars, setallCars] = useState([]); // État local des voitures

  useEffect(() => { // Charge toutes les voitures au montage
    fetchAllVehicle();
  }, [fetchAllVehicle]);

  useEffect(() => { // Synchronise l’état local avec Redux
    setallCars(all_cars);
  }, [all_cars]);

  let all_car_show = null; // Zone d’affichage
  if (isLoading) {
    all_car_show = <Loading />; // Loader
  } else {
    all_car_show = allCars.map((item) => (
      <div className="col-md-4" key={item.id}>
        <Car car={item} />
      </div>
    ));
  }

  return (
    <div className="">
      
      <div className="row">{all_car_show}</div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCar);
