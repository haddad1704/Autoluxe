// Ce fichier est un fichier de test généré par défaut dans une application React créée avec Create React App.
// Il utilise la librairie de test React Testing Library pour vérifier que certains éléments s’affichent correctement dans le composant principal App.

import { render, screen } from '@testing-library/react'; // Importation des outils de test : render (pour afficher un composant en test) et screen (pour accéder aux éléments de la page)
import App from './App'; // Importation du composant principal App qui sera testé

// Définition d’un test unitaire nommé "renders learn react link"
test('renders learn react link', () => {
  render(<App />); // On affiche (render) le composant App en mémoire pour le tester
  const linkElement = screen.getByText(/learn react/i); // On cherche dans l’écran un élément contenant le texte "learn react" (insensible à la casse grâce à /i)
  expect(linkElement).toBeInTheDocument(); // On vérifie avec une assertion que cet élément est bien présent dans le document (DOM virtuel)
});
