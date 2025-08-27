# Importation des outils de sérialisation de Django REST Framework
from rest_framework import serializers  

# Importation des sérialiseurs liés aux véhicules
from Vehicle.serializers import VehicleSerializer, VehicleCategorySerializer, VehicleDetailSerializer  

# Importation du modèle Booking
from .models import Booking  

# Importation pour manipuler les dates
from datetime import datetime  

# Importation du sérialiseur utilisateur
from Account.serializers import UserSerializer  


# Sérialiseur basique pour le modèle Booking (tous les champs)
class BookingSerializer(serializers.ModelSerializer):  
     class Meta:
          # Modèle utilisé
          model = Booking  
          # Inclure tous les champs du modèle
          fields = '__all__'  


# Sérialiseur enrichi pour Booking (inclut infos véhicule et coût total)
class BookingModelSerializer(serializers.ModelSerializer):  
     # Sérialisation imbriquée du véhicule
     vehicle = VehicleSerializer()  

     # Champ calculé pour renvoyer le coût total
     total_cost = serializers.SerializerMethodField()  
     
     class Meta:
          # Modèle utilisé
          model = Booking  
          # Inclure tous les champs + total_cost
          fields = '__all__'  


     # Méthode pour calculer le coût total (jours * prix par jour)
     def get_total_cost(self, obj):  
        # Conversion de la date de début en string
        start_date = str(obj.start_date)  

        # Conversion de la date de fin en string
        end_date = str(obj.end_date)  

        # Transformation en objet datetime
        date1 = datetime.strptime(start_date, '%Y-%m-%d')  
        date2 = datetime.strptime(end_date, '%Y-%m-%d')  

        # Calcul du nombre total de jours
        total_days = date2 - date1  

        # Récupération du prix par jour du véhicule
        price_per_day = obj.vehicle.price_per_day  

        # Extraction du nombre entier de jours
        total_days = total_days.days  

        # Calcul du coût total
        total_cost = total_days * price_per_day  

        return total_cost
   

# Sérialiseur pour les propriétaires (inclut infos véhicule et client)
class SeeBookingModelSerializer(serializers.ModelSerializer):  
     # Sérialisation imbriquée du véhicule
     vehicle = VehicleSerializer()  

     # Sérialisation imbriquée du client
     client  = UserSerializer()  
     
     class Meta:
          # Modèle utilisé
          model = Booking  
          # Inclure tous les champs
          fields = '__all__'  


# Sérialiseur pour le paiement (utilisé lors de l’initiation d’un paiement)
class BookingSerializerPayment(serializers.ModelSerializer):  
     class Meta:
          # Modèle utilisé
          model = Booking  
          # Inclure tous les champs
          fields = '__all__'  
