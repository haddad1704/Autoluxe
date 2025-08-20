from django.urls import path  # Routage
from Account.views import *  # Vues compte/utilisateur
from Vehicle.views import *  # Vues véhicule
from Order.views import *  # Vues réservation/paiement
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  # Non utilisé car personnalisé
    TokenRefreshView,TokenVerifyView
)
from rest_framework import routers  # Router pour ViewSets

router = routers.SimpleRouter()  # Déclare les ViewSets
router.register(r'category',VehicleCategoryViewSet)
router.register(r'vehicle',VehicleViewSet)
router.register(r'booking',BookingViewSet)


urlpatterns = [
    # Authentification
    path('register/',register_view,name='register'),  # Inscription
    path("token/", MyTokenObtainPairView.as_view(),name='MyTokenObtainPairView'),  # Login (JWT) personnalisé
    path("token/refresh/", TokenRefreshView.as_view(),name='TokenRefreshView'),    # Refresh token
    
    # Catalogue public
    path('all-categories/',VehicleCategoryListAPIView.as_view(),name='VehicleCategoryListAPIView'),
    path('all-cars/',VehicleListAPIView.as_view(),name='VehicleListAPIView'),
    path('car/<id>',VehicleRetrieveAPIView.as_view(),name='VehicleRetrieveAPIView'),
    
    # Réservations (client et propriétaire)
    path('all-booked/',BookingListAPIView.as_view(),name='BookingListAPIView'),
    path('see-all-booked/',SeeBookingListAPIView.as_view(),name='SeeBookingListAPIView'),
    
    # Paiement
    path('booking/<int:vehicle_id>/payment/', BookingPaymentView.as_view(), name='booking_payment'),
    path('purchase/<payment_data>/<data>/', purchase, name="purchase"),
    path('status/', complete, name="complete"),
]+router.urls  # Ajoute les routes des ViewSets
