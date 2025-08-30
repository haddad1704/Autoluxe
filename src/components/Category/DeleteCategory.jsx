/**
 * Composant `DeleteCategory`.
 * Affiche une confirmation et déclenche la suppression d’une catégorie.
 */
import React from "react"; // React
import { connect } from "react-redux"; // Connexion Redux
import { deleteCategory } from "../../redux/actions"; // Action de suppression


const mapStateToProps = (state) => ({ // Sélectionne le token depuis le store
  token: state.token,
});


const mapDispatchToProps = (dispatch) => ({ // Mappe la suppression en prop
  deleteCategory: (token, id) => dispatch(deleteCategory(token, id)),
});

const DeleteCategory = ({ category, deleteCategory, toggle,token,notify }) => { // Props du composant
  const handleDelete = () => { // Valide la suppression
    deleteCategory(token, category.id); // Dispatch suppression
    notify('Supprimé avec succès','warning') // Notifie l’utilisateur
    toggle(); // Ferme la modale
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
