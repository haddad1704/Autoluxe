import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; 
import { Button } from "reactstrap";

const Car = ({ car }) => {
  const userId = useSelector((state) => state.userId);
  const user_type = useSelector((state) => state.user_type);

  let context = null;
  if (car) {
    if (car.check_booked === false) {
      context = <div className="text-success">Vous pouvez réserver</div>;
    }  else {
      context = <div className="text-info">Déjà réservé</div>;
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
                <p className="text-gray-600 mb-0">Make: {car.make}</p>
                <p className="text-gray-600 mb-2">Year: {car.year}</p>
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
