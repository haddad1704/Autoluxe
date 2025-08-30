/**
 * Composant `Loading`.
 * Affiche un indicateur de chargement centré.
 */
import React from 'react' // Bibliothèque React
import './Loading.css' // Styles du loader


const Loading = () => { // Définition du composant
  return (
    <div className='d-flex justify-content-center'> {/* Conteneur centré */}
      <span className="loader"></span> {/* Élément visuel du loader */}
    </div>
  );
}

export default Loading
