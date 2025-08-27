from django.db import models  # Import du module ORM de Django pour définir des modèles
from Account.models import User  # Import du modèle utilisateur personnalisé
from Vehicle.models import Vehicle  # Import du modèle véhicule
import uuid  # Import pour générer des identifiants uniques
from datetime import datetime  # Import pour manipuler les dates

class Booking(models.Model):  # Modèle de réservation
    client = models.ForeignKey(  # Lien vers l'utilisateur (client)
        User,
        on_delete=models.CASCADE,  # Supprime les réservations si l'utilisateur est supprimé
        related_name='bookings',  # Nom de la relation inverse (user.bookings)
        limit_choices_to={'user_type': 'client'}  # Restreint aux utilisateurs de type client
    )
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)  # Véhicule réservé
    start_date = models.DateField()  # Date de début de location
    end_date = models.DateField()  # Date de fin de location
    phone = models.IntegerField()  # Téléphone du client
    created_at = models.DateTimeField(auto_now_add=True)  # Date de création automatique
    modified_at = models.DateTimeField(auto_now=True)  # Date de modification automatique
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)  # Identifiant unique de réservation
    paymentId = models.CharField(max_length=264, blank=True, null=True)  # ID de transaction paiement (gateway)
    orderId = models.CharField(max_length=200, blank=True, null=True)  # ID de commande paiement (gateway)
    full_payment_data = models.TextField(blank=True, null=True)  # Données complètes retour passerelle
    payment_status = models.BooleanField(default=False)  # Statut du paiement (réussi ou non)
    cost = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Coût total calculé

    def __str__(self):  # Représentation lisible de l'objet
        return f'Booking for {self.vehicle} by {self.client.username}'

    