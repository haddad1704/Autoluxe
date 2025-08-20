import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import CategoryForm from "./CategoryForm";
import DeleteCategory from "./DeleteCategory";


const Category = ({ category, notify }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalDelete = () => {
    setIsModalOpenDelete(true);
  };

  const closeModalDelete = () => {
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
