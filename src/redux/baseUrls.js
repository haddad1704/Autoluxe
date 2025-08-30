/**
Définitions des constantes globales pour l’URL de base de l’API et
la durée d’affichage des notifications. Ces valeurs sont importées
dans les autres modules pour éviter la duplication et simplifier
les changements de configuration.
*/

export const baseUrl = 'http://127.0.0.1:8000/' // URL de base de l’API Django/DRF
export const notificationTime = 3000 // Durée (ms) d’affichage des notifications