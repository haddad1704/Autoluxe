"""
Modèles (models.py) de l'application Order.

Contient le modèle de réservation `Booking` qui relie un client à un véhicule,
les dates, le statut de paiement et des métadonnées de transaction.
"""

from django.db import models  
from Account.models import User  
from Vehicle.models import Vehicle  
import uuid  
from datetime import datetime  


class Booking(models.Model):  
    # Client qui effectue la réservation (doit être de type 'client')
    client = models.ForeignKey(  
        User,
        on_delete=models.CASCADE,  
        related_name='bookings',  
        limit_choices_to={'user_type': 'client'}  
    )
    # Véhicule réservé
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)  
    # Période de location
    start_date = models.DateField()  
    end_date = models.DateField()  
    # Coordonnée de contact
    phone = models.IntegerField()  
    # Horodatages
    created_at = models.DateTimeField(auto_now_add=True)  
    modified_at = models.DateTimeField(auto_now=True)  
    # Identifiant unique de commande côté serveur
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)  
    # Informations de paiement (références)
    paymentId = models.CharField(max_length=264, blank=True, null=True)  
    orderId = models.CharField(max_length=200, blank=True, null=True)  
    full_payment_data = models.TextField(blank=True, null=True)  
    payment_status = models.BooleanField(default=False) 
    # Coût total calculé et persistant
    cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  

    def __str__(self): 
        return f'Booking for {self.vehicle} by {self.client.username}'
 
    