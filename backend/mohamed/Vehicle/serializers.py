"""
Sérialiseurs (serializers.py) de l'application Vehicle.

- VehicleCategorySerializer: sérialise une catégorie de véhicule.
- VehicleSerializer / AllVehicleSerializer / VehicleDetailSerializer: exposent les champs du véhicule
  et fournissent des champs calculés indiquant si le véhicule est réservé et par qui.
"""

from rest_framework import serializers  # Outils de sérialisation DRF
from .models import Vehicle, VehicleCategory  # Modèles de l'app Vehicle
from Order.models import Booking  # Modèle Booking pour calculs de réservation
from datetime import date  # Date actuelle pour comparer les fins de réservation


class VehicleCategorySerializer(serializers.ModelSerializer):  # Sérialiseur simple de catégorie
    class Meta:  # Options du sérialiseur
        model = VehicleCategory  # Modèle cible
        fields = '__all__'  # Expose tous les champs du modèle
          
class VehicleSerializer(serializers.ModelSerializer):  # Sérialiseur principal de Vehicle
    check_booked = serializers.SerializerMethodField()  # Champ calculé: véhicule actuellement réservé ?
    get_booked_userId = serializers.SerializerMethodField()  # Champ calculé: id client de la dernière résa

    class Meta:  # Options du sérialiseur
        model = Vehicle  # Modèle cible
        fields = '__all__'  # Expose tous les champs


    def get_check_booked(self,obj):  # Calcule si une réservation en cours existe
        check_booked = False  # Par défaut, non réservé
        try:  # Protège des erreurs (ex: absence de réservation)
            check = Booking.objects.filter(vehicle__id = obj.id).order_by('-id')  # Dernières résas
            if  check :  # S'il existe au moins une réservation
                latest_booking = check[0]  # Prend la plus récente
                if latest_booking.end_date >= date.today():  # Fin dans le futur/présent => occupé
                    check_booked = True
        except:
            pass  # En cas d'erreur, on conserve False
            
        return check_booked  # Retourne le booléen
    
    def get_get_booked_userId(self,obj):  # Récupère l'id client de la dernière réservation
        check_booked = False  # False si aucune réservation
        try:
            check = Booking.objects.filter(vehicle__id = obj.id)  # Toutes les résas de ce véhicule
            if check:
                check_booked = check[0].client.id  # Id du client de la première résa trouvée
        except:
            pass  # Reste False
            
        return check_booked  # Peut être un int (id) ou False
    
          
          
class AllVehicleSerializer(serializers.ModelSerializer):  # Liste publique avec catégorie imbriquée
    category = VehicleCategorySerializer()  # Sérialise la catégorie liée
    check_booked = serializers.SerializerMethodField()  # Même logique que ci-dessus
    get_booked_userId = serializers.SerializerMethodField()  # Id client si réservé

    class Meta:
        model = Vehicle  # Modèle cible
        fields = '__all__'  # Expose tous les champs


    def get_check_booked(self,obj):  # Duplique la logique de réservation
        check_booked = False
        try:
            check = Booking.objects.filter(vehicle__id = obj.id).order_by('-id')
            if  check :
                latest_booking = check[0]
                if latest_booking.end_date >= date.today():
                    check_booked = True
        except:
            pass
            
        return check_booked
    
    def get_get_booked_userId(self,obj):  # Id client de la dernière résa (si existe)
        check_booked = False
        try:
            check = Booking.objects.filter(vehicle__id = obj.id)
            if check:
                check_booked = check[0].client.id
        except:
            pass
            
        return check_booked
          
class VehicleDetailSerializer(serializers.ModelSerializer):  # Détail public d'un véhicule
    category = VehicleCategorySerializer()  # Catégorie imbriquée
    check_booked = serializers.SerializerMethodField()  # Réservé ?
    get_booked_userId = serializers.SerializerMethodField()  # Id du client

    class Meta:
        model = Vehicle  # Modèle cible
        fields = '__all__'  # Tous les champs


    def get_check_booked(self,obj):  # Réservation en cours ?
        check_booked = False
        try:
            check = Booking.objects.filter(vehicle__id = obj.id).order_by('-id')
            if  check :
                latest_booking = check[0]
                if latest_booking.end_date >= date.today():
                    check_booked = True
        except:
            pass
            
        return check_booked
    
    def get_get_booked_userId(self,obj):  # Id du client de la dernière résa
        check_booked = False
        try:
            check = Booking.objects.filter(vehicle__id = obj.id)
            if check:
                check_booked = check[0].client.id
        except:
            pass
            
        return check_booked