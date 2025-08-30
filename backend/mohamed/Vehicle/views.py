"""
Vues (views.py) de l'application Vehicle.

- VehicleCategoryViewSet: CRUD sur les catégories appartenant à l'utilisateur connecté.
- VehicleViewSet: CRUD sur les véhicules de l'utilisateur connecté (upload d'image inclus).
- VehicleCategoryListAPIView / VehicleListAPIView / VehicleRetrieveAPIView: endpoints publics de lecture.
"""

from django.shortcuts import render  # Utilitaires de rendu (non utilisés ici pour API JSON)
from rest_framework import viewsets ,generics,parsers  # Vues génériques et parseurs
from .models import *  # Modèles Vehicle et VehicleCategory
from .serializers import *  # Sérialiseurs correspondants
from rest_framework import permissions  # Gestion des permissions



class VehicleCategoryViewSet(viewsets.ModelViewSet):  # ViewSet CRUD pour les catégories de véhicules
    queryset = VehicleCategory.objects.all()  # Jeu de requête de base (écrasé par get_queryset)
    serializer_class = VehicleCategorySerializer  # Sérialiseur utilisé pour validation/formatage
    permission_classes = [permissions.IsAuthenticated]  # Authentification requise (JWT)
    
    def get_queryset(self):  # Restreint aux catégories du propriétaire connecté
         user = self.request.user 
         queryset = VehicleCategory.objects.filter(user__id = user.id)
         return queryset
        

    
    
class VehicleViewSet(viewsets.ModelViewSet):  # ViewSet CRUD pour les véhicules
    queryset = Vehicle.objects.all()  # Jeu de requête de base (écrasé par get_queryset)
    serializer_class = VehicleSerializer  # Sérialiseur de véhicule
    permission_classes = [permissions.IsAuthenticated]  # JWT requis pour accéder
    parser_classes = (parsers.FormParser,parsers.MultiPartParser, parsers.JSONParser)  # Gère JSON et multipart (images)
        
    def get_queryset(self):  # Restreint aux véhicules du propriétaire connecté
         user = self.request.user 
         queryset = Vehicle.objects.filter(owner__id = user.id)
         return queryset
        
        




class VehicleCategoryListAPIView(generics.ListAPIView):  # Liste publique de toutes les catégories
    queryset = VehicleCategory.objects.all()  # Toutes les catégories, non filtrées par utilisateur
    serializer_class = VehicleCategorySerializer  # Sérialiseur de catégorie
    
    
class VehicleListAPIView(generics.ListAPIView):  # Liste publique de tous les véhicules
    queryset = Vehicle.objects.all()  # Tous les véhicules, non filtrés
    serializer_class = AllVehicleSerializer  # Sérialiseur avec champs calculés
    



class VehicleRetrieveAPIView(generics.RetrieveAPIView):  # Détail public d'un véhicule spécifique
    queryset = Vehicle.objects.all()  # Base de recherche
    serializer_class = VehicleDetailSerializer  # Détail avec catégorie et champs calculés
    
    lookup_field = 'id'  # Utilise le champ 'id' dans l'URL au lieu de 'pk'



