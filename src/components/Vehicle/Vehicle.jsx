import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import VehicleFormUpdate from "./VehicleFormUpdate";
import DeleteVehicle from "./DeleteVehicle";


const Vehicle = ({ vehicle, notify }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setisModalOpenUpdate] = useState(false);

  const openModalUpdate = () => {
    setisModalOpenUpdate(true);
  };

  const closeModalDelete = () => {
    setisModalOpenUpdate(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Card key={vehicle.id} className="mb-3">
        <CardBody>
          <div className="row">
            <div className="col-md-8">
              <img src={vehicle.image} alt="" width="600px" />
              <CardTitle tag="h5">
                Modèle: <b>{vehicle.model}</b> <br />
                Marque: <b>{`${vehicle.make}`}</b>
              </CardTitle>
              <CardText>
                <strong>Année:</strong> {vehicle.year}
              </CardText>
              <CardText>
                <strong>Prix par jour:</strong> €{vehicle.price_per_day}
              </CardText>
            </div>
            <div className="col-md-4">
              <Button color="primary me-2" onClick={openModalUpdate}>
                Mettre à jour
              </Button>

              <Modal isOpen={isModalOpenUpdate} toggle={closeModalDelete}>
                <ModalHeader toggle={closeModalDelete}>
                  Mettre à jour
                </ModalHeader>
                <ModalBody>
                  <VehicleFormUpdate
                    notify={notify}
                    toggle={closeModalDelete}
                    vehicle={vehicle}
                  />
                </ModalBody>
              </Modal>

              <Button color="danger my-2" onClick={openModal}>
                Supprimer
              </Button>

              <Modal isOpen={isModalOpen} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>Supprimer le véhicule</ModalHeader>
                <ModalBody>
                  <DeleteVehicle
                    notify={notify}
                    vehicle={vehicle}
                    toggle={closeModal}
                  />
                </ModalBody>
              </Modal>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Vehicle;
