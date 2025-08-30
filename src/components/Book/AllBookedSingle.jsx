/**
 * Carte `AllBookedSingle`.
 * Affiche les détails d’une réservation et permet de payer via redirection
 * ou de supprimer la réservation après confirmation.
 */
import React, { useState } from "react"; // Hook d’état local
import axios from "axios"; // Client HTTP
import { useSelector } from "react-redux"; // Accès au token
import { Card, CardBody, CardTitle } from "reactstrap"; // UI carte
import { baseUrl } from "../../redux/baseUrls"; // URL base API

const AllBookedSingle = ({ vehicle, onDelete }) => { // Composant fonctionnel
  const token = useSelector((state) => state.token); // Token pour auth
  const [loading, setLoading] = useState(false); // Chargement paiement
  const [deleteLoading, setDeleteLoading] = useState(false); // Chargement suppression

  const handlePay = async () => { // Démarre le paiement via l’API
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
        client: vehicle.client,
        vehicle: vehicle.vehicle.id,
        start_date: vehicle.start_date,
        end_date: vehicle.end_date,
        phone: vehicle.phone,
      };
      const response = await axios.post(url, data, config); // Requête paiement
      const gatewayUrl = response?.data?.GatewayPageURL; // URL du prestataire
      if (gatewayUrl) {
        window.location.href = gatewayUrl; // Redirection vers le paiement
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => { // Supprime la réservation (avec confirmation)
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) {
      try {
        setDeleteLoading(true);
        const url = baseUrl + `api/booking/${vehicle.id}/`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(url, config); // Appel suppression
        if (onDelete) {
          onDelete(vehicle.id); // Informe le parent de retirer l’élément
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
        Coût total: €{vehicle.total_cost} <br />
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
