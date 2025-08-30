from rest_framework import serializers  # Outils de sérialisation DRF 
from Vehicle.serializers import VehicleSerializer,VehicleCategorySerializer,VehicleDetailSerializer  # Réutilisation des sérialiseurs Vehicle 
from .models import Booking  # Modèle Booking 
from datetime import datetime  # Manipulation de dates 
from Account.serializers import UserSerializer  # Sérialiseur utilisateur imbriqué 

class BookingSerializer(serializers.ModelSerializer):  # Sérialiseur basique pour CRUD
     class Meta:  # Options du sérialiseur
          model = Booking  # Modèle ciblé 
          fields = '__all__'  # Expose tous les champs  

class BookingModelSerializer(serializers.ModelSerializer):  # Détail d'une réservation avec véhicule
     vehicle = VehicleSerializer()  # Sérialise le véhicule lié 
     total_cost = serializers.SerializerMethodField()  # Calcule le coût total (jours * prix/jour)
     
     class Meta:  # Options du sérialiseur
          model = Booking  # Modèle ciblé
          fields = '__all__'  # Tous les champs 


     def get_total_cost(self, obj):  # Implémentation du champ calculé
        start_date = str(obj.start_date)  # Convertit la date début en chaîne  
        end_date = str(obj.end_date)  # Convertit la date fin en chaîne  
        date1 = datetime.strptime(start_date, '%Y-%m-%d')  # Parse la chaîne en date 
        date2 = datetime.strptime(end_date, '%Y-%m-%d')  # Parse la chaîne en date 
        total_days = date2 - date1  # Différence de dates (timedelta)
        price_per_day = obj.vehicle.price_per_day  # Prix à la journée 
        total_days = total_days.days  # Nombre de jours entiers 
        total_cost = total_days * price_per_day  # Calcul du coût 
        return total_cost  # Retourne un Decimal
   
   
   


class SeeBookingModelSerializer(serializers.ModelSerializer):  # Vue propriétaire: inclut véhicule et client 
     vehicle = VehicleSerializer()  # Détail du véhicule
     client  = UserSerializer()  # Détail du client  
     
     class Meta:  # Options
          model = Booking  # Modèle ciblé
          fields = '__all__'  # Tous les champs

class BookingSerializerPayment(serializers.ModelSerializer):  # Payload pour initier paiement  
     class Meta:  # Options
          model = Booking  # Modèle ciblé
          fields = '__all__'  # Tous les champs
