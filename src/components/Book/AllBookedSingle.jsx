import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle } from "reactstrap";
import { baseUrl } from "../../redux/baseUrls";

const AllBookedSingle = ({ vehicle, onDelete }) => {
  const token = useSelector((state) => state.token);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);
      const url = baseUrl + `api/booking/${vehicle.vehicle.id}/payment/`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const data = {
        client: vehicle.client, // backend ignores client, uses token user
        vehicle: vehicle.vehicle.id,
        start_date: vehicle.start_date,
        end_date: vehicle.end_date,
        phone: vehicle.phone,
      };
      const response = await axios.post(url, data, config);
      const gatewayUrl = response?.data?.GatewayPageURL;
      if (gatewayUrl) {
        window.location.href = gatewayUrl;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) {
      try {
        setDeleteLoading(true);
        const url = baseUrl + `api/booking/${vehicle.id}/`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(url, config);
        if (onDelete) {
          onDelete(vehicle.id);
        }
      } catch (err) {
        console.error("Erreur lors de la suppression:", err);
        alert("Erreur lors de la suppression de la réservation");
      } finally {
        setDeleteLoading(false);
      }
    }
  };

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
        <div className="mt-3 d-flex gap-2">
          {vehicle.payment_status ? (
            <div className="text-success">Payé</div>
          ) : (
            <button className="btn btn-primary" onClick={handlePay} disabled={loading}>
              {loading ? "Redirection..." : "Payer maintenant"}
            </button>
          )}
          <button 
            className="btn btn-danger" 
            onClick={handleDelete} 
            disabled={deleteLoading}
          >
            {deleteLoading ? "Suppression..." : "Supprimer la réservation"}
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

export default AllBookedSingle;
