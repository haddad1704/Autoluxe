# 🚗 RideReady - Plateforme de Location et Réservation de Véhicules

Une plateforme moderne et complète de location et réservation de véhicules construite avec un frontend React.js et une API backend Django REST. Cette application permet aux utilisateurs de parcourir, réserver et gérer des locations de véhicules tout en fournissant aux propriétaires de véhicules des outils pour lister et gérer leurs véhicules.

## ✨ Fonctionnalités

### 🚀 Fonctionnalités Principales
- **Authentification et Autorisation des Utilisateurs** - Système d'authentification sécurisé basé sur JWT
- **Navigation des Véhicules** - Parcourir les véhicules disponibles avec des informations détaillées
- **Système de Réservation** - Réserver des véhicules avec sélection de date et heure
- **Intégration de Paiement** - Intégration de la passerelle de paiement SSL Commerz
- **Tableau de Bord Administrateur** - Interface d'administration Django pour la gestion de la plateforme
- **Design Responsive** - Interface utilisateur responsive mobile-first utilisant Bootstrap et Reactstrap

### 🔐 Fonctionnalités Utilisateur
- Inscription et connexion des utilisateurs
- Recherche et filtrage de véhicules
- Gestion des réservations
- Traitement des paiements
- Historique des réservations et suivi du statut
- Gestion du profil utilisateur

### 🚗 Fonctionnalités Propriétaire de Véhicule
- Listing et gestion des véhicules
- Gestion des demandes de réservation
- Gestion de la disponibilité des véhicules
- Suivi des revenus

## 🏗️ Architecture

### Frontend (React.js)
- **React 18** avec composants fonctionnels et hooks
- **Redux Toolkit** pour la gestion d'état
- **React Router** pour la navigation
- **Reactstrap** pour les composants UI
- **Formik** pour la gestion des formulaires
- **Axios** pour la communication API
- **React Toastify** pour les notifications

### Backend (Django)
- **Django 5.0.4** framework web
- **Django REST Framework** pour le développement d'API
- **Authentification JWT** avec Simple JWT
- **Base de données SQLite** (configurable pour la production)
- **Support CORS** pour l'intégration frontend
- **Documentation Swagger/OpenAPI**
- **Intégration de paiement SSL Commerz**

## 📁 Structure du Projet

```
CDA/
├── backend/                          # Backend Django
│   └── mohamed/
│       ├── setting/                  # Configuration et paramètres Django
│       ├── Api/                      # Points de terminaison et vues API
│       ├── Account/                  # Authentification et gestion des utilisateurs
│       ├── Vehicle/                  # Gestion des véhicules
│       ├── Order/                    # Gestion des réservations et commandes
│       ├── manage.py                 # Script de gestion Django
│       └── requirements.txt          # Dépendances Python
├── src/                              # Source frontend React
│   ├── components/                   # Composants React
│   │   ├── Auth/                     # Composants d'authentification
│   │   ├── Book/                     # Composants de réservation
│   │   ├── Category/                 # Composants de catégorie de véhicules
│   │   ├── Footer/                   # Composant pied de page
│   │   ├── Header/                   # Composant en-tête
│   │   ├── Home/                     # Composants de la page d'accueil
│   │   ├── Loading/                  # Composants de chargement
│   │   ├── Notification/             # Composants de notification
│   │   ├── Payment/                  # Composants de paiement
│   │   ├── Store/                    # Composants d'affichage du magasin/véhicules
│   │   └── Vehicle/                  # Composants de gestion des véhicules
│   ├── redux/                        # Store et actions Redux
│   ├── App.js                        # Composant App principal
│   └── index.js                      # Point d'entrée de l'application
├── public/                           # Assets statiques
├── package.json                      # Dépendances Node.js
└── README.md                         # Ce fichier
```

## 🚀 Démarrage Rapide

### Prérequis
- **Node.js** (v16 ou supérieur)
- **Python** (v3.8 ou supérieur)
- **pip** (gestionnaire de paquets Python)
- **Git**

### Configuration Frontend

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Démarrer le serveur de développement :**
   ```bash
   npm start
   ```

3. **Construire pour la production :**
   ```bash
   npm run build
   ```

### Configuration Backend

1. **Naviguer vers le répertoire backend :**
   ```bash
   cd backend/mohamed
   ```

2. **Créer l'environnement virtuel :**
   ```bash
   python -m venv venv
   ```

3. **Activer l'environnement virtuel :**
   - **Windows :**
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux :**
     ```bash
     source venv/bin/activate
     ```

4. **Installer les dépendances Python :**
   ```bash
   pip install -r requirements.txt
   ```

5. **Exécuter les migrations de base de données :**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Créer un superutilisateur (optionnel) :**
   ```bash
   python manage.py createsuperuser
   ```

7. **Démarrer le serveur de développement Django :**
   ```bash
   python manage.py runserver
   ```

## 🌐 Documentation API

La documentation de l'API est disponible via Swagger UI :

- **Swagger UI :** `http://localhost:8000/api/v1/swagger/`
- **ReDoc :** `http://localhost:8000/api/v1/redoc/`
- **Schéma JSON :** `http://localhost:8000/api/v1/swagger.json/`

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier `.env` dans le répertoire backend avec les variables suivantes :

```env
DEBUG=True
SECRET_KEY=votre-clé-secrète-ici
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Configuration de la Base de Données

Le projet utilise SQLite par défaut. Pour la production, vous pouvez configurer PostgreSQL ou MySQL dans `backend/mohamed/setting/settings.py`.

## 📱 Scripts Disponibles

### Frontend
- `npm start` - Démarrer le serveur de développement
- `npm build` - Construire pour la production
- `npm test` - Exécuter les tests
- `npm eject` - Éjecter de Create React App

### Backend
- `python manage.py runserver` - Démarrer le serveur de développement
- `python manage.py makemigrations` - Créer les migrations de base de données
- `python manage.py migrate` - Appliquer les migrations de base de données
- `python manage.py collectstatic` - Collecter les fichiers statiques
- `python manage.py createsuperuser` - Créer un utilisateur administrateur

## 🗄️ Modèles de Base de Données

### Modèles Principaux
- **User** - Authentification et informations de profil utilisateur
- **Vehicle** - Détails et spécifications des véhicules
- **VehicleCategory** - Catégories et types de véhicules
- **Booking** - Informations de réservation et de réservation
- **Payment** - Enregistrements des transactions de paiement

## 🔒 Fonctionnalités de Sécurité

- Authentification basée sur JWT
- Configuration CORS
- Protection CSRF
- Validation sécurisée des mots de passe
- Assainissement et validation des entrées

## 🎨 Fonctionnalités UI/UX

- Design responsive pour tous les appareils
- Composants modernes inspirés du Material Design
- Notifications toast pour le retour utilisateur
- États de chargement et gestion des erreurs
- Navigation intuitive et flux utilisateur

## 🚀 Déploiement

### Déploiement Frontend
- Construire le projet : `npm run build`
- Déployer le dossier `build/` vers votre service d'hébergement
- Configurer les variables d'environnement pour la production

### Déploiement Backend
- Définir `DEBUG=False` en production
- Configurer la base de données de production
- Configurer la gestion des fichiers statiques
- Configurer CORS pour le domaine de production
- Configurer SSL/HTTPS

## 🤝 Contribution

1. Fork du dépôt
2. Créer une branche de fonctionnalité : `git checkout -b nom-fonctionnalité`
3. Commiter vos modifications : `git commit -am 'Ajouter fonctionnalité'`
4. Pousser vers la branche : `git push origin nom-fonctionnalité`
5. Soumettre une pull request

## 📄 Licence

Ce projet est sous licence BSD - voir le fichier LICENSE pour plus de détails.

## 👥 Équipe

- **Développement Frontend** - React.js, Redux, Bootstrap
- **Développement Backend** - Django, Django REST Framework
- **Conception de Base de Données** - SQLite avec Django ORM
- **Intégration de Paiement** - SSL Commerz
- **Documentation API** - Swagger/OpenAPI

## 📞 Support

Pour le support et les questions :
- Créer un problème dans le dépôt GitHub
- Contact : contact@snippets.local

## 🔄 Historique des Versions

- **v0.1.0** - Version initiale avec fonctionnalités de base
  - Système d'authentification utilisateur
  - Navigation et réservation de véhicules
  - Intégration de paiement
  - Tableau de bord administrateur

---

**Note :** Ce projet a été renommé de "RideReady" à "setting" pendant le développement. Toutes les références ont été mises à jour en conséquence.


