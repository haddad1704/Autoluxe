import React from "react";

import { Card, CardBody, CardTitle } from "reactstrap";

const AllBookedSingle = ({ vehicle }) => {
  return (
    <Card >
      <img src={vehicle.vehicle.image} alt="" height="300px" width="100%" />
      <CardBody>
        <CardTitle>
          <h4>

          Marque: {vehicle.vehicle.make} <br />
          Modèle: {vehicle.vehicle.model} <br />
          Année: {vehicle.vehicle.year} <br />
          </h4>
        </CardTitle>
        Date de début: {vehicle.start_date} <br />
        Date de fin: {vehicle.end_date} <br />
        Coût total: ${vehicle.total_cost} <br />
        ID: <b>{vehicle.uuid}</b> <br />
        ID de transaction: <b>{vehicle.paymentId}</b> <br />
        ID de commande: <b>{vehicle.orderId}</b> <br />
      </CardBody>
    </Card>
  );
};

export default AllBookedSingle;
