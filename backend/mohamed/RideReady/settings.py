from pathlib import Path  # Outils chemin de fichiers
import os  # Système de fichiers
from datetime import timedelta  # Durées pour JWT

# from .info import *
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent  # Racine du projet Django
TEMPLATES_DIR = os.path.join(BASE_DIR,'templates')  # Dossier templates
STATIC_DIR = os.path.join(BASE_DIR,'static')  # Dossier statiques
MEDIA_DIR = os.path.join(BASE_DIR,'media')  # Dossier médias

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-06mgknabmwz8k&*%xt2n_++_mf^%lj-zt36x525(%x2&kv#k*x"  # Clé secrète dev (à protéger en prod)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []  # Hôtes autorisés (vider ou configurer en prod)


# Application definition

INSTALLED_APPS = [  # Applications installées
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
    
    'rest_framework',
    'rest_framework_simplejwt',
    "corsheaders",
    'drf_yasg',
]

MIDDLEWARE = [  # Middleware (ordre important)
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "RideReady.urls"  # Point d'entrée URLs

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
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

WSGI_APPLICATION = "RideReady.wsgi.application"  # Entrée WSGI


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {  # BDD par défaut (sqlite3 pour dev)
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [  # Validations mots de passe
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"  # Langue

TIME_ZONE = "UTC"  # Fuseau horaire

USE_I18N = True  # Internationalisation

USE_TZ = True  # Timezone aware


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/


STATIC_URL = "static/"  # URL des assets statiques
STATICFILES_DIRS = [STATIC_DIR]  # Répertoires statiques additionnels


# Media
MEDIA_ROOT = MEDIA_DIR  # Répertoire fichiers médias
MEDIA_URL = "/media/"  # URL publique des médias

AUTH_USER_MODEL = 'Account.User'  # Utilisateur custom

LOGIN_URL = "/account/login/"  # URL login par défaut
# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"  # PK par défaut


REST_FRAMEWORK = {  # Config DRF
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}


SIMPLE_JWT = {  # Paramètres JWT (durées, algorithmes...)
    "ACCESS_TOKEN_LIFETIME": timedelta(days=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": False,

    "ALGORITHM": "HS256",
    # "SIGNING_KEY": settings.SECRET_KEY,
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
    
    
    'USER_ID_FIELD': 'id', # model property to attempt claims for
    'USER_ID_CLAIM': 'user_id', # actual keyword in token data
}


CORS_ALLOWED_ORIGINS = [  # Frontends autorisés
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
]

FRONTEND_URL = "http://localhost:3000/"  # Base URL du frontend (redir. après paiement)

# SSLCommerz (paiement)

SSL_STORE_ID = 'md64076ccf6a3aa'
SSL_API_KEY = 'md64076ccf6a3aa@ssl'