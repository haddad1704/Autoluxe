from django.contrib import admin  # Importe l'interface d'administration Django (panneau admin par défaut)
from django.urls import path, include, re_path  # Outils pour gérer le routage des URLs (path, include, regex)
from django.conf import settings  # Permet d'accéder aux paramètres du projet (settings.py)
from django.conf.urls.static import static  # Sert les fichiers statiques/médias en mode développement


from drf_yasg import openapi  # Outil pour générer un schéma OpenAPI (documentation d’API)
from drf_yasg.views import get_schema_view  # Crée les vues pour Swagger et Redoc
from rest_framework import permissions  # Gestion des permissions avec DRF (Django Rest Framework)


# Définition de la vue qui génère la documentation Swagger/OpenAPI
schema_view = get_schema_view(
    openapi.Info(
        title="RideReady API",  # Nom du projet dans la documentation
        default_version='v1',  # Version de l’API
        description="RideReady est une API de location de voitures permettant aux clients de réserver des véhicules, et aux propriétaires d'en publier.",  # Description affichée
        terms_of_service="https://www.google.com/policies/terms/",  # Lien vers les CGU
        contact=openapi.Contact(email="contact@snippets.local"),  # Email de contact du projet
        license=openapi.License(name="BSD License"),  # Type de licence du projet
    ),
    public=True,  # Rend la documentation publique (accessible sans authentification)
    permission_classes=(permissions.AllowAny,),  # Tout le monde peut consulter la doc
)


# Liste des routes principales du projet
urlpatterns = [
    path("admin/", admin.site.urls),  # URL de l’admin Django : /admin/
    path("", include('Account.urls')),  # Inclut les routes de l’application "Account"
    path("api/", include('Api.urls')),  # Inclut les routes de l’application "Api"

    # Groupe de routes pour la documentation Swagger/OpenAPI
    path('api/v1/',
         include([
            # Fournit le schéma brut JSON de l’API
            path('swagger.json/', schema_view.without_ui(cache_timeout=0), name='schema-json'),

            # Interface Swagger (UI interactive pour tester l’API)
            path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

            # Interface Redoc (autre UI de documentation d’API)
            path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
         ])
    )
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  
# Ajoute la gestion des fichiers médias (images, vidéos, etc.) 
# en développement → ex : http://localhost:8000/media/<fichier>
