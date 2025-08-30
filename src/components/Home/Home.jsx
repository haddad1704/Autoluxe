/**
 * Page d’accueil `Home`.
 * Charge les voitures et catégories, offre recherche, tri et filtrage par
 * catégorie, puis affiche une grille de véhicules disponibles.
 */
import React, { useEffect, useMemo, useState } from "react"; // Hooks React
import { connect } from "react-redux"; // Connexion Redux
import { fetchAllVehicle, fetchAllCategory } from "../../redux/actions"; // Actions données
import Loading from "../Loading/Loading"; // Indicateur de chargement
import Car from "../Store/Car"; // Carte d’un véhicule


const mapStateToProps = (state) => ({ // Sélecteurs de l’état global
  token: state.token,
  user_type: state.user_type,
  all_cars: state.all_cars,
  isLoading: state.isLoading,
  all_category: state.all_category,
});

const mapDispatchToProps = (dispatch) => ({ // Dispatchers d’actions
  fetchAllVehicle: () => dispatch(fetchAllVehicle()),
  fetchAllCategory: () => dispatch(fetchAllCategory()),
});

const Home = ({ fetchAllVehicle, fetchAllCategory, all_cars, isLoading ,notify, all_category }) => { // Composant Home
  const [searchQuery, setSearchQuery] = useState(""); // Terme de recherche
  const [sortOption, setSortOption] = useState("none"); // Option de tri
  const [filteredCars, setFilteredCars] = useState([]); // Liste filtrée/triée
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]); // Catégories sélectionnées

  useEffect(() => { // Charge les données initiales
    fetchAllVehicle();
    fetchAllCategory();
  }, [fetchAllVehicle, fetchAllCategory]);

  useEffect(() => { // Met à jour la liste affichée quand all_cars change
    setFilteredCars(all_cars);
  }, [all_cars]);

  const applyFilterAndSort = useMemo(() => { // Fabrique une fonction pure de filtrage/tri
    return (cars, query, sortBy, selectedIds) => {
      const normalizedQuery = (query || "").toLowerCase();
      let working = Array.isArray(cars) ? [...cars] : [];

      if (normalizedQuery) {
        working = working.filter((car) => {
          const model = (car?.model || "").toLowerCase();
          const make = (car?.make || "").toLowerCase();
          return model.includes(normalizedQuery) || make.includes(normalizedQuery);
        });
      }

      if (Array.isArray(selectedIds) && selectedIds.length > 0) {
        const idSet = new Set(selectedIds);
        working = working.filter((car) => idSet.has(car?.category?.id));
      }

      if (sortBy === "name_az") {
        working.sort((a, b) => (a?.model || "").localeCompare(b?.model || ""));
      } else if (sortBy === "price_asc") {
        working.sort((a, b) => parseFloat(a?.price_per_day || 0) - parseFloat(b?.price_per_day || 0));
      } else if (sortBy === "price_desc") {
        working.sort((a, b) => parseFloat(b?.price_per_day || 0) - parseFloat(a?.price_per_day || 0));
      }

      return working; // Retourne la liste transformée
    };
  }, []);

  useEffect(() => { // Recalcule la vue à chaque changement pertinent
    setFilteredCars(applyFilterAndSort(all_cars, searchQuery, sortOption, selectedCategoryIds));
  }, [all_cars, searchQuery, sortOption, selectedCategoryIds, applyFilterAndSort]);

  const handleSearchChange = (e) => { // MAJ recherche
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => { // MAJ option de tri
    setSortOption(e.target.value);
  };

  const toggleCategory = (categoryId) => { // Ajoute/Retire une catégorie du filtre
    setSelectedCategoryIds((prev) => {
      const exists = prev.includes(categoryId);
      if (exists) {
        return prev.filter((id) => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  const clearCategories = () => { // Réinitialise le filtre catégories
    setSelectedCategoryIds([]);
  };

  let all_car_show = null; // Contenu de la grille principale
  if (isLoading) {
    all_car_show = <Loading />; // Affiche le loader
  } else {
    const visibleCars = (filteredCars || []).filter((c) => c?.check_booked === false); // Filtre véhicules non réservés
    all_car_show = visibleCars.map((item) => <Car key={item.id} car={item} />); // Rend les cartes
  }
   
  return (
    <div className="container">
      <div className="hero-image h-72 flex items-center justify-center text-white rounded my-3">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold mb-2">Trouvez la voiture parfaite</h1>
          <p className="text-lg mb-3">Louez des véhicules de qualité à des prix compétitifs</p>
        </div>
      </div>
      <div className="row my-3 align-items-end">
        <div className="col-md-8 mb-2">
          <label htmlFor="home_search" className="form-label">Recherche</label>
          <input
            id="home_search"
            type="text"
            className="form-control"
            placeholder="Rechercher par modèle ou marque"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="col-md-4 mb-2">
          <label htmlFor="home_sort" className="form-label">Trier</label>
          <select
            id="home_sort"
            className="form-select"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="none">Par défaut</option>
            <option value="name_az">Nom A–Z</option>
            <option value="price_asc">Prix: du plus bas au plus élevé</option>
            <option value="price_desc">Prix: du plus élevé au plus bas</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <div className="d-flex flex-wrap gap-2 align-items-center">
          <button
            type="button"
            className={`btn btn-sm ${selectedCategoryIds.length === 0 ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={clearCategories}
          >
            Toutes
          </button>
          {all_category && all_category.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`btn btn-sm ${selectedCategoryIds.includes(cat.id) ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => toggleCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
        {selectedCategoryIds.length > 0 && (
          <div className="mt-2 d-flex flex-wrap gap-2">
            {selectedCategoryIds.map((cid) => {
              const cat = (all_category || []).find((c) => c.id === cid);
              return (
                <span key={cid} className="badge bg-primary">
                  {cat ? cat.name : cid}
                  <button
                    type="button"
                    className="btn-close btn-close-white btn-sm ms-2"
                    aria-label="Close"
                    onClick={() => toggleCategory(cid)}
                    style={{ filter: 'invert(1)' }}
                  />
                </span>
              );
            })}
          </div>
        )}
      </div>
      <h2 className="text-center text-2xl font-bold my-3">Véhicules en vedette</h2>
      <div className="row mb-3">
        {all_car_show}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
