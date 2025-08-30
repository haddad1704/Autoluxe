/**
 * Composant `Header`.
 * Barre de navigation responsive affichant des liens différents selon
 * l’état de connexion et le type d’utilisateur (client/propriétaire).
 */
import React, { useState } from "react"; // React + hook pour l’état local (menu mobile)
import { Link, NavLink } from "react-router-dom"; // Liens de navigation
import "./Header.css"; // Styles du header
import { connect } from "react-redux"; // Connexion au store Redux

const mapStateToProps = (state) => { // Récupère les infos d’auth depuis le storage
  return {
    token: localStorage.getItem("token"),
    user_type: localStorage.getItem("user_type"),
  };
};

const Header = (props) => { // Définition du composant Header
  const [isOpen, setIsOpen] = useState(false); // État d’ouverture du menu mobile

  const toggle = () => setIsOpen(!isOpen); // Bascule l’état du menu mobile
  let links; // Zone pour stocker les liens à afficher
  if (props.token) { // Si connecté
    if (props.user_type === `client`) {
      links = (
        <div className="flex items-center space-x-4">
          <NavLink className="text-gray-600 hover:text-blue-600" to="/all-booked">Toutes les réservations</NavLink>
          <NavLink className="bg-blue-600 text-white px-4 py-2 rounded-md" to="/logout">Déconnexion</NavLink>
        </div>
      );
    } else {
      links = (
        <div className="flex items-center space-x-4">
          <NavLink className="text-gray-600 hover:text-blue-600" to="/category">Catégorie</NavLink>
          <NavLink className="text-gray-600 hover:text-blue-600" to="/vehicle">Véhicule</NavLink>
          <NavLink className="text-gray-600 hover:text-blue-600" to="/see-all-booked">Voir les réservations</NavLink>
          <NavLink className="bg-blue-600 text-white px-4 py-2 rounded-md" to="/logout">Déconnexion</NavLink>
        </div>
      );
    }
  } else {
    links = (
      <Link className="bg-blue-600 text-white px-4 py-2 rounded-md" to="/signin">
        Se connecter
      </Link>
    );
  }
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <i className="fas fa-car text-blue-600 text-2xl mr-2"></i>
              <span className="text-xl font-bold text-blue-600">Autoluxe</span>
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center">
            {links}
          </div>
          <div className="sm:hidden flex items-center">
            <button onClick={toggle} className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="sm:hidden py-2 border-t">
            <div className="space-y-2">
              <Link to="/" className="block text-gray-700" onClick={toggle}>Accueil</Link>
              {props.token ? (
                props.user_type === 'client' ? (
                  <>
                    <Link to="/all-booked" className="block text-gray-700" onClick={toggle}>Toutes les réservations</Link>
                    <Link to="/logout" className="block text-gray-700" onClick={toggle}>Déconnexion</Link>
                  </>
                ) : (
                  <>
                    <Link to="/category" className="block text-gray-700" onClick={toggle}>Catégorie</Link>
                    <Link to="/vehicle" className="block text-gray-700" onClick={toggle}>Véhicule</Link>
                    <Link to="/see-all-booked" className="block text-gray-700" onClick={toggle}>Voir les réservations</Link>
                    <Link to="/logout" className="block text-gray-700" onClick={toggle}>Déconnexion</Link>
                  </>
                )
              ) : (
                <Link to="/signin" className="block text-gray-700" onClick={toggle}>Se connecter</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default connect(mapStateToProps)(Header);