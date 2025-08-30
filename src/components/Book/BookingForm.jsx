/**
 * Formulaire `BookingForm`.
 * Crée une réservation pour un véhicule en envoyant les dates et le téléphone.
 * Redirige ensuite l’utilisateur vers la page de ses réservations.
 */
import React, { useState } from "react"; // Hook d’état local
import axios from "axios"; // Client HTTP
import { connect } from "react-redux"; // Connexion Redux
import { baseUrl } from "../../redux/baseUrls"; // URL de base API
import { useNavigate } from "react-router-dom"; // Navigation programmée


const mapStateToProps = (state) => ({ // Sélection des infos d’auth
  user_type: state.user_type,
  token: state.token,
  userId: state.userId,
});


const BookingForm = ({ toggle,token,userId,user_type,car  }) => { // Définition du composant
  const navigate = useNavigate(); // Hook de navigation

  const [formData, setFormData] = useState({ // État des champs du formulaire
    client: userId,
    vehicle: car.id,
    start_date: "",
    end_date: "",
    phone: "",
  });

  const handleChange = (e) => { // Mise à jour d’un champ
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 const handleSubmit = async (e) => { // Soumission de la réservation
   e.preventDefault();

   try {
     const url = baseUrl + "api/booking/"; // Endpoint de réservation
     const config = {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
     };
     await axios.post(url, formData, config); // Envoi des données
     toggle(); // Ferme la modale (si présente)
     navigate("/all-booked"); // Redirection vers la liste des réservations
   } catch (error) {
     console.error("Error submitting booking:", error);
   }
 };

  const today = new Date().toISOString().split("T")[0]; // Date du jour (format YYYY-MM-DD)

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="start_date">Date de début:</label>
        <input
          className="form-control"
          type="date"
          id="start_date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="end_date">Date de fin:</label>
        <input
          className="form-control"
          type="date"
          id="end_date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          min={today}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Téléphone:</label>
        <input
          className="form-control"
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary my-3">
        Réserver maintenant
      </button>
    </form>
  );
};

export default connect(mapStateToProps)(BookingForm);
