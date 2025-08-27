from django.urls import path  # Importation pour gérer les routes d'URL
from Account.views import *  # Importation des vues liées aux comptes/utilisateurs
from Vehicle.views import *  # Importation des vues liées aux véhicules
from Order.views import *  # Importation des vues liées aux réservations et paiements
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  # Vue pour obtenir un token JWT (non utilisée ici car personnalisée)
    TokenRefreshView,     # Vue pour rafraîchir un token JWT
    TokenVerifyView       # Vue pour vérifier un token JWT
)
from rest_framework import routers  # Importation du router pour gérer les ViewSets

router = routers.SimpleRouter()  # Création du routeur pour les ViewSets
router.register(r'category',VehicleCategoryViewSet)  # Route pour gérer les catégories de véhicules
router.register(r'vehicle',VehicleViewSet)  # Route pour gérer les véhicules
router.register(r'booking',BookingViewSet)  # Route pour gérer les réservations

urlpatterns = [
    # Authentification
    path('register/',register_view,name='register'),  # Route pour l'inscription d'un utilisateur
    path("token/", MyTokenObtainPairView.as_view(),name='MyTokenObtainPairView'),  # Route pour la connexion (JWT personnalisé)
    path("token/refresh/", TokenRefreshView.as_view(),name='TokenRefreshView'),    # Route pour rafraîchir le token
    
    # Catalogue public
    path('all-categories/',VehicleCategoryListAPIView.as_view(),name='VehicleCategoryListAPIView'),  # Route pour afficher toutes les catégories de véhicules
    path('all-cars/',VehicleListAPIView.as_view(),name='VehicleListAPIView'),  # Route pour afficher tous les véhicules
    path('car/<id>',VehicleRetrieveAPIView.as_view(),name='VehicleRetrieveAPIView'),  # Route pour afficher un véhicule par son ID
    
    # Réservations
    path('all-booked/',BookingListAPIView.as_view(),name='BookingListAPIView'),  # Route pour lister toutes les réservations faites
    path('see-all-booked/',SeeBookingListAPIView.as_view(),name='SeeBookingListAPIView'),  # Route pour voir toutes les réservations
    
    # Paiement
    path('booking/<int:vehicle_id>/payment/', BookingPaymentView.as_view(), name='booking_payment'),  # Route pour effectuer un paiement pour une réservation
    path('purchase/<payment_data>/<data>/', purchase, name="purchase"),  # Route pour effectuer un achat avec des données de paiement
    path('status/', complete, name="complete"),  # Route pour vérifier l’état d’un paiement
]+router.urls  # Ajout des routes générées automatiquement par le router (ViewSets)
