/**
 * Page `Payment`.
 * Récupère la voiture ciblée, affiche ses informations et intègre le
 * formulaire de réservation pour finaliser l’opération.
 */
import React, { useEffect, useState } from "react"; // Hooks React
import axios from "axios"; // Client HTTP
import { useParams, Link } from "react-router-dom"; // Accès aux paramètres de route + lien
import { baseUrl } from "../../redux/baseUrls"; // URL de base API
import Loading from "../Loading/Loading"; // Indicateur de chargement
import BookingForm from "../Book/BookingForm"; // Formulaire de réservation

const Payment = () => { // Composant Payment
  const { id } = useParams(); // Identifiant du véhicule à charger
  const [car, setCar] = useState(null); // Données du véhicule
  const [loading, setLoading] = useState(true); // Flag de chargement

  useEffect(() => { // Charge la voiture cible par son id
    const url = baseUrl + "api/car/" + id; // Compose l’URL
    const fetchCar = async () => {
      try {
        const response = await axios.get(url); // Appel API
        setCar(response.data); // Renseigne les données
      } catch (error) {
        console.log(error); // Log l’erreur
      } finally {
        setLoading(false); // Arrête le loader
      }
    };
    fetchCar();
  }, [id]);

  const noop = () => {}; // Callback neutre (non utilisé ici)

  if (loading) { // Pendant le chargement
    return (
      <div className="container">
        <Loading />
      </div>
    );
  }

  if (!car) { // Cas d’erreur: véhicule non trouvé
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
          <p className="mb-3"><strong>Prix par jour:</strong> € {car.price_per_day}</p>

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


