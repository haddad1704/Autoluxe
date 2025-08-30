/**
 * Page `CarDetail`.
 * Charge les détails d’un véhicule et propose des actions selon le rôle de
 * l’utilisateur et l’état de réservation (réserver/aller au paiement).
 */
import axios from "axios"; // Client HTTP
import React, { useState, useEffect } from "react"; // Hooks React
import { useParams, Link } from "react-router-dom"; // Accès paramètre d’URL + navigation
import { baseUrl } from "../../redux/baseUrls"; // URL de base API
import Loading from "../Loading/Loading"; // Indicateur de chargement
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"; // Composants UI
import BookingForm from "../Book/BookingForm"; // Formulaire de réservation
import { connect, useSelector } from "react-redux"; // Connexion Redux + hook selector

const mapStateToProps = (state) => ({ // Sélection de champs du store
  user_type: state.user_type,
  token: state.token,
  userId: state.userId,
});


const CarDetail = ({ user_type, token }) => { // Composant CarDetail
  const { id } = useParams(); // ID du véhicule
  const [car, setCar] = useState(null); // Données du véhicule
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const url = baseUrl + "api/car/" + id; // URL de récupération
  const [isModalOpen, setIsModalOpen] = useState(false); // État modale réservation
  const userId = useSelector((state) => state.userId); // ID utilisateur courant

  useEffect(() => { // Charge le véhicule au montage/changement d’URL
    const fetchCar = async () => {
      try {
        const response = await axios.get(url); // Appel API
        setCar(response.data); // Enregistre les données
        setLoading(false);
      } catch (error) {
        console.log(error); // Log l’erreur
        setLoading(false);
      }
    };

    fetchCar();
  }, [url]);

  const openModal = () => { // Ouvre la modale de réservation
    setIsModalOpen(true);
  };

  const closeModal = () => { // Ferme la modale de réservation
    setIsModalOpen(false);
  };

  let context = null; // Bloc d’actions selon état
  if (token ) { // Utilisateur connecté
    if (car) {
      if (user_type === "car_owner") { // Propriétaire → pas de réservation
        context = <p>Veuillez vous connecter en tant que client pour réserver une voiture.</p>;
      } else if (car.check_booked === false) { // Réservable
        context = (
          <>
            <Button color="primary my-2" onClick={openModal}>
              Réserver
            </Button>
            <Link to={`/payment/${car.id}`} className="btn btn-outline-primary my-2 ms-2">
              Aller à la page de paiement
            </Link>
          </>
        );
      } else if (car.check_booked === true) { // Déjà réservé
        context = <div className="text-info">Déjà réservé</div>;
      } else { // État par défaut
        context = <div className="text-success">Vous pouvez réserver</div>;
      }
    }
  } else { // Non connecté
    context = <div>Veuillez vous connecter en tant que client.</div>;
  }

  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : car ? (
        <div className="py-4">
          <div className="row">
            <div className="col-md-8">
              <h2 className="text-2xl font-bold mb-2">{car.make} {car.model} <span className="text-gray-600">({car.year})</span></h2>
              <p className="text-gray-600 mb-2">Catégorie: <b>{car.category.name}</b></p>
              <p className="mb-3">Prix par jour: € <b>{car.price_per_day}</b></p>
            </div>
            <div className="col-md-4 text-end">
              {context}
              <Modal isOpen={isModalOpen} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>Réserver</ModalHeader>
                <ModalBody>
                  <BookingForm car={car} toggle={closeModal} />
                </ModalBody>
              </Modal>
            </div>
          </div>
          <div className="mt-3">
            <img
              src={car.image}
              className="w-100 rounded"
              style={{ maxHeight: 500, objectFit: 'cover' }}
              alt={`${car.make} ${car.model}`}
            />
          </div>
          <div className="mt-3">
            <h4 className="text-xl font-semibold mb-2">Description</h4>
            <p className="text-gray-700">{car.description}</p>
          </div>
        </div>
      ) : (
        <div>Error: Car not found</div>
      )}
    </div>
  );
};

export default connect(mapStateToProps)(CarDetail);
