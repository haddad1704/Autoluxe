/**
 * Formulaire `VehicleFormUpdate`.
 * Permet de mettre à jour un véhicule existant et éventuellement son image.
 */
import React, { useEffect, useState } from "react"; // Hooks React
import { connect } from "react-redux"; // Connexion Redux
import { fetchAllCategory, updateVehicle } from "../../redux/actions"; // Actions
import { Button, Form, FormGroup, Label, Input } from "reactstrap"; // Composants UI

const mapStateToProps = (state) => ({ // Sélecteurs
  all_category: state.all_category,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({ // Mappe actions
  fetchAllCategory: () => dispatch(fetchAllCategory()),
  updateVehicle: (vehicleData, token, id) =>
    dispatch(updateVehicle(vehicleData, token, id)),
});

const VehicleFormUpdate = ({ // Définition du composant
  fetchAllCategory,
  token,
  toggle,
  updateVehicle,
  all_category,
  vehicle,
  notify
}) => {
  const [allCategoried, setAllCategoried] = useState([]); // Options catégories
  const [imageForm, setImageForm] = useState(null); // Fichier image sélectionné


  const [formData, setFormData] = useState({ // État du formulaire pré-rempli
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    price_per_day: vehicle.price_per_day,
    image: vehicle.image,
    description: vehicle.description,
    category: vehicle.category,
  });

  useEffect(() => { // Synchronise liste catégories
    setAllCategoried(all_category);
  }, [all_category]);


  const handleChange = (e) => { // Mise à jour champs texte/select
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => { // Soumission de la mise à jour
    e.preventDefault();
    try {
      const vehicleData = {
        make: formData.make,
        model: formData.model,
        year: formData.year,
        price_per_day: formData.price_per_day,
        description: formData.description,
        owner: localStorage.getItem("userId"),
        category: formData.category.id,
      };
      if (imageForm!==null) {
        vehicleData.image = imageForm; // Ajoute le fichier image si présent
      }

      if (formData.category !== "") {
        vehicleData.category = formData.category; // Écrase si catégorie choisie
      }

      updateVehicle(vehicleData, token,vehicle.id); // Dispatch mise à jour
      notify("Vehicle updated successfully", "success");
      toggle(); // Ferme la modale

      setFormData({ // Reset formulaire
        make: "",
        model: "",
        year: "",
        price_per_day: "",
        image: null,
        description: "",
        category: "",
      });
    } catch (error) {
      notify("Vehicle does not updted successfully", "error");
      console.error("Error creating vehicle:", error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="category">Catégorie</Label>
          <select
            className="form-select"
            required={true}
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Sélectionnez une catégorie</option>

            {allCategoried.map((category, index) => (
              <option
                key={category.id}
                value={category.id}
                selected={index === 0} 
              >
                {category.name}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup>
          <Label for="make">Marque</Label>
          <Input
            type="text"
            name="make"
            id="make"
            value={formData.make}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="model">Modèle</Label>
          <Input
            type="text"
            name="model"
            id="model"
            value={formData.model}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="year">Année</Label>
          <Input
            type="date"
            name="year"
            id="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="price_per_day">Prix par jour</Label>
          <Input
            type="number"
            name="price_per_day"
            id="price_per_day"
            value={formData.price_per_day}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="image">Image</Label>
          <Input
            type="file"
            name="image"
            id="image"
            onChange={(e) => {
              setImageForm(e.target.files[0]);
            }}
          />
          See Image:
          <a href={formData.image} target="_blank" rel="noopener noreferrer">
            <img src={formData.image} alt="" height="100px" className="my-2" />
          </a>
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Valider
        </Button>
      </Form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleFormUpdate);
