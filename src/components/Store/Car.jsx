/**
 * Carte `Car`.
 * Affiche un résumé du véhicule (image, modèle, marque, année, prix, catégorie)
 * et l’état de réservation.
 */
import React from "react"; // React
import { useSelector } from "react-redux"; // Lecture d’informations utilisateur
import { Link } from "react-router-dom"; // Lien vers la page de détail
import { Button } from "reactstrap"; // (non utilisé ici mais importé auparavant)

const Car = ({ car }) => { // Composant fonctionnel Car
  const userId = useSelector((state) => state.userId); // ID utilisateur (éventuel)
  const user_type = useSelector((state) => state.user_type); // Type utilisateur

  let context = null; // Message d’état de réservation
  if (car) {
    if (car.check_booked === false) {
      context = <div className="text-success">Vous pouvez réserver</div>;
    }  else {
      context = <div className="text-danger">Vous ne pouvez pas réserver</div>;
    }
  }

  return (
    <div className="col-md-3 my-2">
      <Link to={`/car/${car.id}`} className="text-decoration-none text-dark">
        <div className="bg-white rounded-lg overflow-hidden shadow car-card transition duration-300 h-100">
          <img src={car.image} className="w-100" alt={car.model} style={{ height: 180, objectFit: 'cover' }} />
          <div className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <h5 className="text-lg font-bold mb-1">{car.model}</h5>
                <p className="text-gray-600 mb-0">Marque: {car.make}</p>
                <p className="text-gray-600 mb-0">Année: {car.year}</p>
                <p className="text-gray-800 font-semibold mb-2">Prix/jour: €{car.price_per_day}</p>
                <p className="text-sm"><span className="text-gray-600">Catégorie:</span> <b>{car.category.name}</b></p>
              </div>
            </div>
            <div className="mt-2 text-sm">{context}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Car;
