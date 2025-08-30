/**
 * Composant `Footer`.
 * Affiche un simple pied de page avec la marque et l’année.
 */

import React from "react"; // Bibliothèque React
import "./Footer.css"; // Styles du footer

const Footer = () => { // Définition du composant
  return (
    <footer className="bg-white border-t mt-8"> {/* Conteneur du pied de page */}
      <div className="container py-4 text-center text-gray-600"> {/* Contenu centré */}
        © 2025 Autoluxe
      </div>
    </footer>
  );
};

export default Footer;