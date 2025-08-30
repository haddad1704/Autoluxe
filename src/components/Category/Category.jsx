/**
 * Élément `Category`.
 * Affiche le nom de la catégorie et fournit des actions pour la mettre à jour
 * ou la supprimer via des modales.
 */
import React, { useState } from "react"; // Hook d’état local
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"; // Composants UI
import CategoryForm from "./CategoryForm"; // Formulaire d’édition/ajout
import DeleteCategory from "./DeleteCategory"; // Composant de confirmation de suppression


const Category = ({ category, notify }) => { // Composant fonctionnel avec props
  const [isModalOpen, setIsModalOpen] = useState(false); // Modale de mise à jour
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false); // Modale de suppression

  const openModal = () => { // Ouvre la modale de mise à jour
    setIsModalOpen(true);
  };

  const closeModal = () => { // Ferme la modale de mise à jour
    setIsModalOpen(false);
  };

  const openModalDelete = () => { // Ouvre la modale de suppression
    setIsModalOpenDelete(true);
  };

  const closeModalDelete = () => { // Ferme la modale de suppression
    setIsModalOpenDelete(false);
  };

  return (
    <div className="row" key={category.id}>
      <div className="col-md-6" key={category.id}>
        {category.name}
      </div>
      <div className="col-md-6">
        <Button color="danger m-2" onClick={openModalDelete}>
          Supprimer la catégorie
        </Button>

        <Modal isOpen={isModalOpenDelete} toggle={closeModalDelete}>
          <ModalHeader toggle={closeModalDelete}>Supprimer la catégorie</ModalHeader>
          <ModalBody>
            <DeleteCategory
              category={category}
              notify={notify}
              toggle={closeModalDelete}
            />
          </ModalBody>
        </Modal>

        <Button color="primary my-2" onClick={openModal}>
          Mettre à jour la catégorie
        </Button>

        <Modal isOpen={isModalOpen} toggle={closeModal}>
          <ModalHeader toggle={closeModal}>Mettre à jour la catégorie</ModalHeader>
          <ModalBody>
            <CategoryForm
              closeModal={closeModal}
              mode="update"
              category={category}
              notify={notify}
            />
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
};

export default Category;
