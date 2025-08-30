/**
 * Page `Categories`.
 * Affiche la liste des catégories d’un propriétaire, permet d’ouvrir un
 * formulaire pour en ajouter, et gère le chargement depuis l’API via Redux.
 */
import React, { useEffect, useState } from "react"; // Hooks React
import { useDispatch, useSelector } from "react-redux"; // Hooks Redux
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"; // Composants UI (reactstrap)
import Loading from "../Loading/Loading"; // Loader
import Category from "./Category"; // Élément visuel d’une catégorie
import "react-toastify/dist/ReactToastify.css"; // Styles toasts
import CategoryForm from "./CategoryForm"; // Formulaire catégorie
import { fetchCategory } from "../../redux/actions"; // Action pour récupérer les catégories


const Categories = ({ notify }) =>
  {
    const [categoryData, setCategoryData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const category = useSelector((state) => state.category);
    const isLoading = useSelector((state) => state.isLoading);
   
    const token = useSelector((state) => state.token);

    const dispatch = useDispatch();

    useEffect(() => { // Charge les catégories au montage/au changement de token
      dispatch(fetchCategory(token));
    }, [dispatch, token]);
    useEffect(() => { // Synchronise le state local avec Redux
      setCategoryData(category);
    }, [category]);

    let category_show = null; // Zone d’affichage des catégories
    if (isLoading) {
      category_show = <Loading />; // Loader
    } else {
      category_show = categoryData.map((cat) => (
        <Category key={cat.id} notify={notify} category={cat} /> // Carte catégorie
      ));
    }

    const openModal = () => { // Ouvre la modale d’ajout
      setIsModalOpen(true);
    };

    const closeModal = () => { // Ferme la modale d’ajout
      setIsModalOpen(false);
    };

    return (
      <div className="container">
        <h3>Mes catégories:</h3>

        {category_show}
        <Button color="primary my-2" onClick={openModal}>
          Ajouter une catégorie
        </Button>

        <Modal isOpen={isModalOpen} toggle={closeModal}>
          <ModalHeader toggle={closeModal}>Ajouter une catégorie</ModalHeader>
          <ModalBody>
            <CategoryForm closeModal={closeModal} notify={notify} />
          </ModalBody>
        </Modal>
      </div>
    );
  };

export default Categories;
