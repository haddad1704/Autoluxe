/**
 * Formulaire `VehicleForm`.
 * Permet de créer un véhicule avec upload d’image et sélection de catégorie.
 */
import React, { useEffect, useState } from "react"; // Hooks React
import { connect } from "react-redux"; // Connexion Redux
import { Button, Form, FormGroup, Label, Input } from "reactstrap"; // Composants UI
import { createVehicle, fetchAllCategory } from "../../redux/actions"; // Actions


const mapStateToProps = (state) => ({ // Sélecteurs
  token: state.token,
  userId: state.userId,
  categories: state.all_category,
});

const mapDispatchToProps = (dispatch) => ({ // Mappe actions en props
  fetchAllCategory: () => dispatch(fetchAllCategory()),
  createVehicle: (vehicleData, token) => dispatch(createVehicle(vehicleData, token)),
});

const VehicleForm = ({ // Définition du composant
  token,
  toggle,
  userId,
  categories,
  fetchAllCategory,
  createVehicle,
  mode,
  notify

}) => {
  const [allCategoried, setAllCategoried] = useState([]); // Options de catégories

  useEffect(() => { // Charge les catégories au montage
    fetchAllCategory();
  }, [fetchAllCategory]);

  
  const [formData, setFormData] = useState({ // État du formulaire
    make: "",
    model: "",
    year:  "" ,
    price_per_day:  "" ,
    image: null,
    description:  "" ,
    category:  "",
  });
useEffect(() => { // Synchronise la liste des catégories
  setAllCategoried(categories);
}, [categories]);


  const handleChange = (e) => { // Mise à jour des champs texte/select
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
  };

  const handleFileChange = (e) => { // Mise à jour du fichier image
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => { // Soumission du formulaire
  e.preventDefault();
  try {
    const vehicleData = {
      make: formData.make,
      model: formData.model,
      year: formData.year,
      price_per_day: formData.price_per_day,
      description: formData.description,
      owner: localStorage.getItem("userId"),
      category: formData.category,
      image:formData.image
    };

    createVehicle(vehicleData, token); // Dispatch création
    notify('Vehicle Created successfully','success') // Notification succès
    toggle(); // Ferme la modale
    
    setFormData({ // Réinitialise le formulaire
      make: "",
      model: "",
      year: "",
      price_per_day: "",
      image: null,
      description: "",
      category: "",
    });
  } catch (error) {
    notify("Vehicle does not create", "error"); // Notification échec
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
            onChange={handleFileChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="description"
            cols="50"
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

export default connect(mapStateToProps, mapDispatchToProps)(VehicleForm);
