"""
Modèles (models.py) de l'application Vehicle.

- VehicleCategory: catégories créées par les propriétaires pour classer leurs véhicules.
- Vehicle: véhicule proposé à la location avec prix, image, description et propriétaire.
"""

from django.db import models  # Base des modèles Django
from Account.models import User  # Référence au modèle utilisateur


class VehicleCategory(models.Model):  # Catégorie de véhicules appartenant à un propriétaire
     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='vehicle_category' ,  # Propriétaire de la catégorie
                              limit_choices_to={'user_type': 'car_owner'})  # Limité aux utilisateurs de type "car_owner"
     name = models.CharField(verbose_name='Category Name', max_length=100,null=False,blank=False,unique=True)  # Nom unique
     
     created_at = models.DateTimeField(auto_now_add=True)  # Date de création auto
     modified_at = models.DateTimeField(auto_now=True)     # Dernière modification auto

     def __str__(self):  # Représentation lisible (admin, shell, etc.)
        return self.name
   
class Vehicle(models.Model):  # Véhicule mis en location par un propriétaire
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_vehicles' ,  # Propriétaire du véhicule
                              limit_choices_to={'user_type': 'car_owner'})  # Seuls les propriétaires peuvent être liés
    category = models.ForeignKey(VehicleCategory, on_delete=models.CASCADE)  # Catégorie à laquelle appartient le véhicule
    make = models.CharField(verbose_name='Vehicle Make',null=False,blank=False, max_length=100)  # Marque (ex: Toyota)
    model = models.CharField(verbose_name='Vehicle Model', max_length=100,null=False,blank=False)  # Modèle (ex: Corolla)
    year = models.CharField( max_length=50)  # Année (stockée en chaîne pour flexibilité)
    price_per_day = models.DecimalField(verbose_name='Price per Day', max_digits=1000, decimal_places=2,)  # Prix journalier
    image = models.ImageField( upload_to='images/vehicle/',default='default/vehicle.jpg',null=True,blank=True)  # Photo du véhicule
    description = models.TextField(default='car description')  # Description libre
    
    created_at = models.DateTimeField(auto_now_add=True)  # Création automatique
    modified_at = models.DateTimeField(auto_now=True)  # Mise à jour automatique

    def __str__(self):  # Représentation textuelle
        return f'{self.make} {self.model} ({self.year})'
    
    
    