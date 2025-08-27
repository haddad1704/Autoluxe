from pathlib import Path  # Gérer les chemins de fichiers/dossiers de manière portable
import os  # Interagir avec le système de fichiers
from datetime import timedelta  # Gérer les durées (ici pour JWT)

# Définition des chemins de base du projet
BASE_DIR = Path(__file__).resolve().parent.parent  # Racine du projet Django
TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')  # Dossier contenant les templates HTML
STATIC_DIR = os.path.join(BASE_DIR, 'static')  # Dossier contenant les fichiers statiques (CSS, JS…)
MEDIA_DIR = os.path.join(BASE_DIR, 'media')  # Dossier contenant les fichiers uploadés (images, docs…)

# Sécurité et configuration basique
SECRET_KEY = "django-insecure-06mgknabmwz8k&*%xt2n_++_mf^%lj-zt36x525(%x2&kv#k*x"  # Clé secrète utilisée par Django (changer en prod)
DEBUG = True  # Mode debug activé (ne jamais laisser True en production)
ALLOWED_HOSTS = []  # Liste des hôtes/domaines autorisés à accéder au projet

# Applications installées dans le projet
INSTALLED_APPS = [
    "django.contrib.admin",  # Interface d'administration
    "django.contrib.auth",  # Gestion des utilisateurs et permissions
    "django.contrib.contenttypes",  # Gestion des types de contenu
    "django.contrib.sessions",  # Gestion des sessions utilisateurs
    "django.contrib.messages",  # Gestion des messages temporaires
    "django.contrib.staticfiles",  # Gestion des fichiers statiques

    # Applications internes du projet
    "Account",
    "Api",
    "Vehicle",
    "Order",

    # Applications tierces (externes)
    'rest_framework',  # Django REST Framework (API)
    'rest_framework_simplejwt',  # Authentification JWT
    "corsheaders",  # Gérer les requêtes Cross-Origin (frontend-backend)
    'drf_yasg',  # Documentation automatique Swagger pour l’API
]

# Middleware (traitements automatiques exécutés sur chaque requête/réponse)
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # Autoriser les CORS
    "django.middleware.security.SecurityMiddleware",  # Sécurité basique (headers HTTP, etc.)
    "django.contrib.sessions.middleware.SessionMiddleware",  # Sessions utilisateurs
    "django.middleware.common.CommonMiddleware",  # Middleware générique (réponses par défaut, etc.)
    "django.middleware.csrf.CsrfViewMiddleware",  # Protection CSRF
    "django.contrib.auth.middleware.AuthenticationMiddleware",  # Authentification utilisateur
    "django.contrib.messages.middleware.MessageMiddleware",  # Gestion des messages
    "django.middleware.clickjacking.XFrameOptionsMiddleware",  # Protection contre le clickjacking
]

# Fichier principal qui définit les URLs du projet
ROOT_URLCONF = "setting.urls"

# Configuration des templates
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",  # Moteur de templates Django
        "DIRS": [],  # Dossiers additionnels de templates (vide ici)
        "APP_DIRS": True,  # Autoriser les templates intégrés aux apps
        "OPTIONS": {
            "context_processors": [  # Variables disponibles dans tous les templates
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# Point d'entrée WSGI (déploiement classique)
WSGI_APPLICATION = "setting.wsgi.application"

# Base de données (ici SQLite par défaut)
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",  # Utilise SQLite
        "NAME": BASE_DIR / "db.sqlite3",  # Nom et chemin de la base de données
    }
}

# Validation des mots de passe
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},  # Vérifie similarité avec les infos user
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},  # Vérifie longueur minimale
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},  # Vérifie contre mots de passe courants
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},  # Refuse mot de passe uniquement numérique
]

# Paramètres de langue et fuseau horaire
LANGUAGE_CODE = "en-us"  # Langue du projet
TIME_ZONE = "UTC"  # Fuseau horaire par défaut
USE_I18N = True  # Activer internationalisation
USE_TZ = True  # Activer gestion des fuseaux horaires

# Fichiers statiques et médias
STATIC_URL = "static/"  # URL pour accéder aux fichiers statiques
STATICFILES_DIRS = [STATIC_DIR]  # Répertoire additionnel de fichiers statiques
MEDIA_ROOT = MEDIA_DIR  # Emplacement des fichiers médias (uploadés)
MEDIA_URL = "/media/"  # URL publique des fichiers médias

# Utilisateur personnalisé
AUTH_USER_MODEL = 'Account.User'  # On remplace le modèle User par un modèle custom

# URL de login par défaut
LOGIN_URL = "/account/login/"

# Type de clé primaire par défaut
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Configuration Django REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',  # Authentification JWT
    )
}

# Configuration des tokens JWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=30),  # Durée de vie du token d'accès
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),  # Durée de vie du token de rafraîchissement
    "ROTATE_REFRESH_TOKENS": False,  # Ne pas régénérer le refresh token
    "BLACKLIST_AFTER_ROTATION": False,  # Pas de liste noire après rotation
    "UPDATE_LAST_LOGIN": False,  # Ne pas mettre à jour la dernière connexion

    "ALGORITHM": "HS256",  # Algorithme de cryptage du token
    "VERIFYING_KEY": "",  # Clé de vérification (vide ici)
    "AUDIENCE": None,
    "ISSUER": None,
    "JSON_ENCODER": None,
    "JWK_URL": None,
    "LEEWAY": 0,

    "AUTH_HEADER_TYPES": ("Bearer",),  # Préfixe du header d’authentification
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",  # Nom de l'en-tête HTTP
    "USER_ID_FIELD": "id",  # Champ identifiant utilisateur
    "USER_ID_CLAIM": "user_id",  # Nom du claim stocké dans le token
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",

    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),  # Types de tokens utilisés
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",

    "JTI_CLAIM": "jti",  # Identifiant unique du token

    # Tokens "sliding" (optionnels)
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),

    # Sérializers utilisés
    "TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainPairSerializer",
    "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
    "TOKEN_VERIFY_SERIALIZER": "rest_framework_simplejwt.serializers.TokenVerifySerializer",
    "TOKEN_BLACKLIST_SERIALIZER": "rest_framework_simplejwt.serializers.TokenBlacklistSerializer",
    "SLIDING_TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer",
    "SLIDING_TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer",

    'USER_ID_FIELD': 'id',  # Champ identifiant user
    'USER_ID_CLAIM': 'user_id',  # Claim dans le token
}

# Autoriser les requêtes depuis ces origines (CORS)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Frontend en local
    "http://localhost:3001",
    "http://127.0.0.1:3000",
]

# URL du frontend
FRONTEND_URL = "http://localhost:3000/"

# Configuration SSLCommerz (paiement en ligne)
SSL_STORE_ID = 'md64076ccf6a3aa'  # Identifiant du store
SSL_API_KEY = 'md64076ccf6a3aa@ssl'  # Clé API du store
