"""
Paramétrage (settings.py) du projet Django.

Configure les applications, la base de données, l'authentification JWT, CORS et des
constantes spécifiques comme l'URL du frontend et les identifiants du prestataire de paiement.
"""

from pathlib import Path
import os
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent
TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')
STATIC_DIR = os.path.join(BASE_DIR, 'static')
MEDIA_DIR = os.path.join(BASE_DIR, 'media')

SECRET_KEY = "django-insecure-06mgknabmwz8k&*%xt2n_++_mf^%lj-zt36x525(%x2&kv#k*x"  # Clé secrète (ne pas exposer en prod)

DEBUG = True  # Mode développement

ALLOWED_HOSTS = []  # Hôtes autorisés

INSTALLED_APPS = [  # Applications activées
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "Account",
    "Api",
    "Vehicle",
    "Order",
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "drf_yasg",
]

MIDDLEWARE = [  # Middleware enchaînés
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",  # ✅ Ajouté pour i18n
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "setting.urls"  # Module URLs racine

TEMPLATES = [  # Moteur de templates
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [TEMPLATES_DIR],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "setting.wsgi.application"  # Entrée WSGI

DATABASES = {  # Configuration base de données
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = [  # Politiques de mot de passe
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ✅ Internationalisation
LANGUAGE_CODE = "fr"  # Langue par défaut : Français
TIME_ZONE = "Europe/Paris"  # Fuseau horaire français
USE_I18N = True  # Activer i18n
USE_L10N = True  # Activer formats locaux
USE_TZ = True  # Temps aware

# ✅ Langues disponibles
LANGUAGES = [
    ("fr", "Français"),
    ("en", "English"),
]

# ✅ Dossier de traductions (si besoin pour vos propres fichiers .po)
LOCALE_PATHS = [
    os.path.join(BASE_DIR, "locale"),
]

STATIC_URL = "static/"  # URL des fichiers statiques
STATICFILES_DIRS = [STATIC_DIR]  # Dossiers statiques

MEDIA_ROOT = MEDIA_DIR  # Dossier média
MEDIA_URL = "/media/"  # URL média

AUTH_USER_MODEL = "Account.User"  # Modèle utilisateur custom
LOGIN_URL = "/account/login/"  # URL de login
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"  # Type d'ID par défaut

REST_FRAMEWORK = {  # Configuration DRF
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    )
}

SIMPLE_JWT = {  # Paramètres JWT
    "ACCESS_TOKEN_LIFETIME": timedelta(days=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": False,
    "ALGORITHM": "HS256",
    "VERIFYING_KEY": "",
    "AUDIENCE": None,
    "ISSUER": None,
    "JSON_ENCODER": None,
    "JWK_URL": None,
    "LEEWAY": 0,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",
    "JTI_CLAIM": "jti",
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
    "TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainPairSerializer",
    "TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSerializer",
    "TOKEN_VERIFY_SERIALIZER": "rest_framework_simplejwt.serializers.TokenVerifySerializer",
    "TOKEN_BLACKLIST_SERIALIZER": "rest_framework_simplejwt.serializers.TokenBlacklistSerializer",
    "SLIDING_TOKEN_OBTAIN_SERIALIZER": "rest_framework_simplejwt.serializers.TokenObtainSlidingSerializer",
    "SLIDING_TOKEN_REFRESH_SERIALIZER": "rest_framework_simplejwt.serializers.TokenRefreshSlidingSerializer",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
}

CORS_ALLOWED_ORIGINS = [  # Frontends autorisés
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
]

FRONTEND_URL = "http://localhost:3000/"  # Redirection post-achat

SSL_STORE_ID = "md64076ccf6a3aa"  # Identifiant boutique PSP
SSL_API_KEY = "md64076ccf6a3aa@ssl"  # Clé API PSP
