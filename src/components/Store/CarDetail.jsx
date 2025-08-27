import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { baseUrl } from "../../redux/baseUrls";
import Loading from "../Loading/Loading";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import BookingForm from "../Book/BookingForm";
import { connect, useSelector } from "react-redux";

const mapStateToProps = (state) => ({
  user_type: state.user_type,
  token: state.token,
  userId: state.userId,
});


const CarDetail = ({ user_type, token }) => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = baseUrl + "api/car/" + id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(url);
        setCar(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchCar();
  }, [url]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  let context = null;
  if (token ) {
    if (car) {
      if (user_type === "car_owner") {
        context = <p>Veuillez vous connecter en tant que client pour réserver une voiture.</p>;
      } else if (car.check_booked === false) {
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
      } else if (car.check_booked === true) {
        context = <div className="text-info">Déjà réservé</div>;
      } else {
        context = <div className="text-success">Vous pouvez réserver</div>;
      }
    }
  } else {
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
