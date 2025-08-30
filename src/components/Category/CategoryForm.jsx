/**
 * Formulaire `CategoryForm`.
 * Permet de créer ou mettre à jour une catégorie selon le `mode` fourni.
 * Déclenche les actions Redux correspondantes et remonte des notifications.
 */
import React, { useState, useEffect } from "react"; // Hooks React
import { connect } from "react-redux"; // Connexion Redux
import { Button, Form, FormGroup, Label, Input } from "reactstrap"; // Composants UI
import { createCategory, updateCategory } from "../../redux/actions"; // Actions


const mapStateToProps = (state) => ({ // Sélection de props depuis le store
  token: state.token,
  userId: state.userId,
  successMsg: state.successMsg,
});

const mapDispatchToProps = (dispatch) => ({ // Mappe actions à des props
  createCategory: (categoryName, userId, token) =>
    dispatch(createCategory(categoryName, userId, token)),
  updateCategory: (categoryName, userId, token, id) =>
    dispatch(updateCategory(categoryName, userId, token, id)),
});

const CategoryForm = ({ // Définition du composant
  token,
  userId,
  createCategory,
  updateCategory,
  closeModal,
  mode,
  category,
  notify,
}) => {
  const [categoryName, setCategoryName] = useState(""); // État du champ nom

  useEffect(() => { // Pré-remplit en mode mise à jour
    if (mode === "update") {
      setCategoryName(category.name);
    }
  }, [mode, category]);

  const handleChange = (e) => { // Gère la saisie du nom
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => { // Soumet le formulaire (création/màj)
    e.preventDefault();

    if (mode === "update") { // Mise à jour
      try {
        await updateCategory(categoryName, userId, token, category.id);
        setCategoryName(""); // Reset champ
        closeModal(); // Ferme modale
        notify("Catégorie mise à jour avec succès", "success");
      } catch (error) {
        closeModal();
        notify("La catégorie n'a pas été mise à jour", "error");
        console.error("Error updating category:", error);
      }
    } else { // Création
      try {
        await createCategory(categoryName, userId, token);
        setCategoryName("");
        notify("Catégorie créée avec succès", "success");
        closeModal();
      } catch (error) {
        notify("Désolé, une erreur s'est produite", "error");
        closeModal();
        console.error("Error creating category:", error);
      }
    }
  };


  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="categoryName">Nom de la catégorie</Label>
          <Input
            type="text"
            name="categoryName"
            id="categoryName"
            placeholder="Entrez le nom de la catégorie"
            value={categoryName}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Valider
        </Button>
      </Form>
      
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
