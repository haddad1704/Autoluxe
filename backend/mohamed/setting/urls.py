"""
Routage principal (urls.py) du projet.

Inclut les routes d'admin, les routes de l'app `Api` et expose la documentation Swagger/Redoc.
"""

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static

from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Setting API",
        default_version='v1',
        description="Setting est une API de location de voitures permettant aux clients de réserver des véhicules, et aux propriétaires d'en publier.",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [  # Routing principal
    path("admin/", admin.site.urls),  # Interface d'administration
    path("", include('Account.urls')),  # (placeholder) routes Account
    path("api/", include('Api.urls')),  # Routes API agrégées
    path('api/v1/',  # Documentation de l'API
         include([
                path('swagger.json/', schema_view.without_ui(cache_timeout=0), name='schema-json'),  # JSON brut
                path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),  # UI Swagger
                path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),  # UI Redoc
         ])
         )
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # Fichiers média en dev
