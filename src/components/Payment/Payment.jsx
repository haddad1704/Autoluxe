import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { baseUrl } from "../../redux/baseUrls";
import Loading from "../Loading/Loading";
import BookingForm from "../Book/BookingForm";

const Payment = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = baseUrl + "api/car/" + id;
    const fetchCar = async () => {
      try {
        const response = await axios.get(url);
        setCar(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const noop = () => {};

  if (loading) {
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container">
        <div className="alert alert-danger mt-3">Voiture introuvable.</div>
        <Link to="/" className="btn btn-secondary mt-2">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-md-7">
          <img src={car.image} alt={car.model} className="img-fluid rounded" />
        </div>
        <div className="col-md-5">
          <h3 className="mb-2">{car.make} {car.model} ({car.year})</h3>
          <p className="mb-1"><strong>Catégorie:</strong> {car.category?.name}</p>
          <p className="mb-3"><strong>Prix par jour:</strong> $ {car.price_per_day}</p>

          <div className="card p-3">
            <h5 className="mb-3">Finalisez votre réservation</h5>
            <BookingForm car={car} toggle={noop} />
          </div>
          <Link to={`/car/${car.id}`} className="btn btn-link mt-2 p-0">Retour aux détails</Link>
        </div>
      </div>
    </div>
  );
};

export default Payment;


