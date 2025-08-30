/**
 * Liste condensée de catégories `AllCategory`.
 * Récupère les catégories depuis le store, propose un bouton "All" et
 * un menu déroulant pour sélectionner une catégorie spécifique.
 */
import React, { useEffect, useState } from "react"; // Hooks React
import { connect } from "react-redux"; // Connexion Redux
import { fetchAllCategory } from "../../redux/actions"; // Action de chargement des catégories
import Loading from "../Loading/Loading"; // Indicateur de chargement

const mapStateToProps = (state) => ({ // Sélectionne les données du store
  token: state.token,
  all_category: state.all_category,
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ // Mappe les actions en props
  fetchAllCategory: () => dispatch(fetchAllCategory()),
});

const AllCategory = ({ // Composant fonctionnel
  all_category, // Liste des catégories
  fetchAllCategory, // Action pour récupérer toutes les catégories
  isLoading, // Indicateur de chargement
  onSelectCategory, // Callback pour sélectionner une catégorie
}) => {
  useEffect(() => { // Charge les catégories au montage
    fetchAllCategory();
  }, [fetchAllCategory]);

  const [showAll, setShowAll] = useState(false); // État du menu déroulant

  const toggleShowAll = () => { // Bascule l’affichage du menu
    setShowAll(!showAll);
  };

  return (
    <div>
      <h2>All Categories</h2> {/* Titre de section */}
      {isLoading ? (
        <Loading /> // Affiche le loader lors du chargement
      ) : (
        <div>
          <div
            className="btn btn-primary my-2"
            onClick={() => onSelectCategory(0)} // Sélectionne « toutes » les catégories
          >
            All
          </div>
          <div className="dropdown"> {/* Menu déroulant */}
            <div
              className="btn btn-primary dropdown-toggle my-2"
              onClick={toggleShowAll} // Ouvre/ferme la liste
            >
              Show All
            </div>
            <div className={`dropdown-menu ${showAll ? "show" : ""}`}> {/* Corps du menu */}
              {all_category.map((category) => (
                <div
                  className="dropdown-item"
                  key={category.id}
                  onClick={() => onSelectCategory(category.id)} // Sélectionne une catégorie spécifique
                >
                  {category.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCategory);
