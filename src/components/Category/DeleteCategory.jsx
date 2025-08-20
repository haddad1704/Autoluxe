import React from "react";
import { connect } from "react-redux";
import { deleteCategory } from "../../redux/actions";


const mapStateToProps = (state) => ({
  token: state.token,
});


const mapDispatchToProps = (dispatch) => ({
  deleteCategory: (token, id) => dispatch(deleteCategory(token, id)),
});

const DeleteCategory = ({ category, deleteCategory, toggle,token,notify }) => {
  
  const handleDelete = () => {
    deleteCategory(token, category.id);
    notify('Supprimé avec succès','warning')
    toggle(); 
  };

  return (
    <div>
      <p>
        Êtes-vous sûr de vouloir supprimer <b> {category.name}</b> ?
      </p>
      <button className="btn btn-danger me-1" onClick={handleDelete}>
        Supprimer
      </button>
      <button onClick={toggle} className="btn btn-primary">
        Annuler
      </button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCategory);
