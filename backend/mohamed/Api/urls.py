"""
Routes (urls.py) de l'application Api.

Expose les endpoints principaux de l'API (authentification, véhicules, réservations)
en agrégeant les vues des autres applications.
"""

from django.urls import path  
from Account.views import *  
from Vehicle.views import *  
from Order.views import *  
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  
    TokenRefreshView,TokenVerifyView
)
from rest_framework import routers 

router = routers.SimpleRouter()  # Routeur DRF basique 
router.register(r'category',VehicleCategoryViewSet)  # CRUD catégories
router.register(r'vehicle',VehicleViewSet)  # CRUD véhicules
router.register(r'booking',BookingViewSet)  # CRUD réservations


urlpatterns = [
    
    path('register/',register_view,name='register'),  # Inscription utilisateur  
    path("token/", MyTokenObtainPairView.as_view(),name='MyTokenObtainPairView'),  # JWT obtenir  
    path("token/refresh/", TokenRefreshView.as_view(),name='TokenRefreshView'),   # JWT rafraîchir  
    path('all-categories/',VehicleCategoryListAPIView.as_view(),name='VehicleCategoryListAPIView'),  # Liste publique catégories
    path('all-cars/',VehicleListAPIView.as_view(),name='VehicleListAPIView'),  # Liste publique véhicules
    path('car/<id>',VehicleRetrieveAPIView.as_view(),name='VehicleRetrieveAPIView'),  # Détail véhicule

    path('all-booked/',BookingListAPIView.as_view(),name='BookingListAPIView'),
    path('see-all-booked/',SeeBookingListAPIView.as_view(),name='SeeBookingListAPIView'),
    

    path('booking/<int:vehicle_id>/payment/', BookingPaymentView.as_view(), name='booking_payment'),  # Init paiement
    path('purchase/<payment_data>/<data>/', purchase, name="purchase"),  # Post-paiement
    path('status/', complete, name="complete"),  # Callback paiement
]+router.urls  # Inclut les routes du routeur
