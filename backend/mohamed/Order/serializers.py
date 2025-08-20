from rest_framework import serializers  # Outils de sérialisation DRF
from Vehicle.serializers import VehicleSerializer,VehicleCategorySerializer,VehicleDetailSerializer  # Sérialiseurs véhicule
from .models import Booking  # Modèle Booking
from datetime import datetime  # Pour calcul de durée
from Account.serializers import UserSerializer  # Sérialiseur utilisateur

class BookingSerializer(serializers.ModelSerializer):  # CRUD standard sur Booking
     class Meta:
          model = Booking  # Modèle ciblé
          fields = '__all__'  # Tous les champs

class BookingModelSerializer(serializers.ModelSerializer):  # Sérialiseur enrichi
     vehicle = VehicleSerializer()  # Imbrique les infos véhicule
     total_cost = serializers.SerializerMethodField()  # Champ calculé côté API
     
     class Meta:
          model = Booking
          fields = '__all__'  # Expose tous les champs + total_cost


     def get_total_cost(self, obj):  # Calcule le coût total = jours * prix/jour
        start_date = str(obj.start_date)  # Date début (str)
        end_date = str(obj.end_date)  # Date fin (str)
        date1 = datetime.strptime(start_date, '%Y-%m-%d')  # -> datetime
        date2 = datetime.strptime(end_date, '%Y-%m-%d')  # -> datetime
        total_days = date2 - date1  # Timedelta
        price_per_day = obj.vehicle.price_per_day  # Prix par jour
        total_days = total_days.days  # Nombre de jours
        total_cost = total_days * price_per_day  # Calcul
        return total_cost
   
   
   


class SeeBookingModelSerializer(serializers.ModelSerializer):  # Pour les propriétaires
     vehicle = VehicleSerializer()  # Détails véhicule
     client  = UserSerializer()  # Détails client
     
     class Meta:
          model = Booking
          fields = '__all__'

class BookingSerializerPayment(serializers.ModelSerializer):  # Pour initier paiement
     class Meta:
          model = Booking
          fields = '__all__'
