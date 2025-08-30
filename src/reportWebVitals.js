// Définition de la fonction reportWebVitals qui prend en paramètre un callback (onPerfEntry)
const reportWebVitals = onPerfEntry => {
  
  // Vérifie si un callback a été fourni ET que c'est bien une fonction
  if (onPerfEntry && onPerfEntry instanceof Function) {
    
    // Importation dynamique de la librairie "web-vitals" (chargée uniquement si nécessaire)
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      
      // Exécution de chaque mesure de performance,
      // en transmettant les résultats au callback fourni (ex: console.log ou un tracker externe)
      getCLS(onPerfEntry);  // Mesure du décalage cumulé de mise en page (stabilité visuelle)
      getFID(onPerfEntry);  // Mesure du délai de la première interaction utilisateur
      getFCP(onPerfEntry);  // Mesure du temps d'affichage du premier contenu visible
      getLCP(onPerfEntry);  // Mesure du temps d'affichage du contenu principal
      getTTFB(onPerfEntry); // Mesure du délai avant réception du premier octet du serveur
    });
  }
};

// Exportation par défaut de la fonction pour qu'elle soit utilisée dans index.js
export default reportWebVitals;
