import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import Loading from "../Loading/Loading";
import Category from "./Category";
import "react-toastify/dist/ReactToastify.css";
import CategoryForm from "./CategoryForm";
import { fetchCategory } from "../../redux/actions";


const Categories = ({ notify }) =>


  {
    const [categoryData, setCategoryData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const category = useSelector((state) => state.category);
    const isLoading = useSelector((state) => state.isLoading);
   
    const token = useSelector((state) => state.token);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchCategory(token));
    }, [dispatch, token]);
    useEffect(() => {
      setCategoryData(category);
    }, [category]);

    let category_show = null;
    if (isLoading) {
      category_show = <Loading />;
    } else {
      category_show = categoryData.map((cat) => (
        <Category key={cat.id} notify={notify} category={cat} />
      ));
    }

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
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
