"""
Ce fichier (views.py) contient les vues de l’application Vehicle.
Les vues permettent de gérer les requêtes API concernant les véhicules
et leurs catégories (CRUD, liste, détail...).

On utilise Django REST Framework (viewsets et generics) pour faciliter
la création d’API RESTful.
"""

# -------------------- IMPORTS -------------------- #

from django.shortcuts import render  
# Import de render (non utilisé ici, mais utile pour retourner des templates HTML classiques).

from rest_framework import viewsets, generics, parsers  
# viewsets : permet de créer rapidement des vues CRUD (Create, Read, Update, Delete).
# generics : permet d’utiliser des vues génériques déjà prêtes (liste, détail...).
# parsers : permet de gérer les types de données envoyées (Form, JSON, fichiers...).

from .models import *  
# Importation de tous les modèles de l’application Vehicle (Vehicle, VehicleCategory).

from .serializers import *  
# Importation de tous les sérialiseurs de l’application Vehicle.

from rest_framework import permissions  
# Importation du module permissions (pour gérer l’accès : authentification requise, etc.)


# -------------------- VUE : VehicleCategoryViewSet -------------------- #

class VehicleCategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour gérer les catégories de véhicules.
    Permet toutes les opérations CRUD (liste, création, modification, suppression).
    Accessible uniquement aux utilisateurs authentifiés.
    """

    queryset = VehicleCategory.objects.all()  
    # Définit le queryset par défaut → toutes les catégories.

    serializer_class = VehicleCategorySerializer  
    # Sérialiseur utilisé pour transformer les objets en JSON (et inversement).

    permission_classes = [permissions.IsAuthenticated]  
    # Restreint l’accès : seul un utilisateur connecté peut utiliser cette API.

    def get_queryset(self):
        """
        Redéfinit le queryset pour que l’utilisateur ne voie
        que les catégories qui lui appartiennent.
        """
        user = self.request.user   # Récupère l’utilisateur connecté.
        queryset = VehicleCategory.objects.filter(user__id=user.id)  
        # Filtre les catégories où l’utilisateur est le propriétaire.
        return queryset  # Retourne le queryset personnalisé.


# -------------------- VUE : VehicleViewSet -------------------- #

class VehicleViewSet(viewsets.ModelViewSet):
    """
    ViewSet pour gérer les véhicules.
    Permet toutes les opérations CRUD.
    Accessible uniquement aux utilisateurs authentifiés.
    """

    queryset = Vehicle.objects.all()  
    # Définit le queryset par défaut → tous les véhicules.

    serializer_class = VehicleSerializer  
    # Sérialiseur utilisé pour transformer les objets Vehicle en JSON.

    permission_classes = [permissions.IsAuthenticated]  
    # Restreint l’accès : seul un utilisateur connecté peut utiliser cette API.

    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser)  
    # Définit les types de données que l’API peut recevoir :
    # - FormParser : formulaires classiques (x-www-form-urlencoded)
    # - MultiPartParser : formulaires contenant des fichiers (upload image, etc.)
    # - JSONParser : données JSON.

    def get_queryset(self):
        """
        Redéfinit le queryset pour que l’utilisateur ne voie
        que ses propres véhicules (ceux dont il est le propriétaire).
        """
        user = self.request.user   # Récupère l’utilisateur connecté.
        queryset = Vehicle.objects.filter(owner__id=user.id)  
        # Filtre les véhicules par propriétaire (owner).
        return queryset  # Retourne le queryset personnalisé.


# -------------------- VUE : VehicleCategoryListAPIView -------------------- #

class VehicleCategoryListAPIView(generics.ListAPIView):
    """
    API qui renvoie la liste de toutes les catégories de véhicules.
    (Utilise une vue générique DRF : ListAPIView).
    """
    queryset = VehicleCategory.objects.all()  
    # Toutes les catégories disponibles.

    serializer_class = VehicleCategorySerializer  
    # Sérialiseur utilisé pour transformer les catégories en JSON.


# -------------------- VUE : VehicleListAPIView -------------------- #

class VehicleListAPIView(generics.ListAPIView):
    """
    API qui renvoie la liste de tous les véhicules.
    Utilise AllVehicleSerializer (qui inclut les infos de catégorie et de réservation).
    """
    queryset = Vehicle.objects.all()  
    # Tous les véhicules disponibles.

    serializer_class = AllVehicleSerializer  
    # Sérialiseur utilisé pour renvoyer la liste avec détails supplémentaires.


# -------------------- VUE : VehicleRetrieveAPIView -------------------- #

class VehicleRetrieveAPIView(generics.RetrieveAPIView):
    """
    API qui renvoie le détail d’un véhicule précis.
    Utilise VehicleDetailSerializer (inclut infos de catégorie + réservation).
    """
    queryset = Vehicle.objects.all()  
    # Tous les véhicules (on filtrera par id avec lookup_field).

    serializer_class = VehicleDetailSerializer  
    # Sérialiseur utilisé pour afficher le détail du véhicule.

    lookup_field = 'id'  
    # Spécifie que la recherche d’un véhicule se fait par son champ "id".
