from django.contrib import admin  # Interface d'administration Django
from django.urls import path,include,re_path  # Routage des URLs
from django.conf import settings  # Accès aux paramètres
from django.conf.urls.static import static  # Fichiers médias en dev


from drf_yasg import openapi  # Génération de schéma OpenAPI/Swagger
from drf_yasg.views import get_schema_view  # Vues de documentation
from rest_framework import permissions  # Permissions DRF

schema_view = get_schema_view(
    openapi.Info(
        title="RideReady API",  # Titre de la doc
        default_version='v1',  # Version
        description="RideReady est une API de location de voitures permettant aux clients de réserver des véhicules, et aux propriétaires d'en publier.",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,  # Doc publique
    permission_classes=(permissions.AllowAny,),  # Accès libre
)





urlpatterns = [
    path("admin/", admin.site.urls),  # Admin
    path("", include('Account.urls')),  # Routes d'authentification/compte
    path("api/", include('Api.urls')),  # Routes API principales
    path('api/v1/',  # Documentation OpenAPI/Swagger/Redoc
         include([
                path('swagger.json/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
                path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
                path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
         ])
         
         )
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # Sert les médias en dev