
# Importation de la gestion de suppression des relations (CASCADE, SET_NULL, etc.)
import django.db.models.deletion  

# Importation de la librairie pour générer des identifiants uniques (UUID)
import uuid  

# Importation des paramètres du projet (ici pour récupérer AUTH_USER_MODEL)
from django.conf import settings  

# Importation des classes nécessaires pour créer une migration
from django.db import migrations, models  


# Classe représentant la migration
class Migration(migrations.Migration):

    # Indique que c’est une migration initiale
    initial = True  

    # Dépendances de cette migration (application Vehicle et modèle utilisateur)
    dependencies = [
        ("Vehicle", "0001_initial"),  # Dépend de la migration initiale de l’app Vehicle
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),  # Dépend du modèle utilisateur personnalisé
    ]

    # Opérations effectuées par la migration
    operations = [
        # Création du modèle Booking
        migrations.CreateModel(
            name="Booking",
            fields=[
                # Champ ID auto-généré (clé primaire)
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                # Champ pour la date de début de réservation
                ("start_date", models.DateField()),  

                # Champ pour la date de fin de réservation
                ("end_date", models.DateField()),  

                # Champ pour stocker le numéro de téléphone du client
                ("phone", models.IntegerField()),  

                # Champ indiquant la date de création de la réservation
                ("created_at", models.DateTimeField(auto_now_add=True)),  

                # Champ indiquant la dernière modification de la réservation
                ("modified_at", models.DateTimeField(auto_now=True)),  

                # Identifiant unique généré automatiquement (UUID)
                (
                    "uuid",
                    models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
                ),

                # Identifiant du paiement (optionnel)
                ("paymentId", models.CharField(blank=True, max_length=264, null=True)),  

                # Identifiant de commande (optionnel)
                ("orderId", models.CharField(blank=True, max_length=200, null=True)),  

                # Données complètes du paiement (JSON ou texte brut)
                ("full_payment_data", models.TextField(blank=True, null=True)),  

                # Statut du paiement (True = payé, False = non payé)
                ("payment_status", models.BooleanField(default=False)),  

                # Coût total de la réservation (optionnel, nombre décimal)
                (
                    "cost",
                    models.DecimalField(
                        blank=True, decimal_places=2, max_digits=10, null=True
                    ),
                ),

                # Relation avec l’utilisateur client (clé étrangère vers AUTH_USER_MODEL)
                (
                    "client",
                    models.ForeignKey(
                        limit_choices_to={"user_type": "client"},  # Limité aux utilisateurs de type "client"
                        on_delete=django.db.models.deletion.CASCADE,  # Suppression en cascade si l’utilisateur est supprimé
                        related_name="bookings",  # Nom utilisé pour accéder aux réservations depuis le client
                        to=settings.AUTH_USER_MODEL,  # Référence au modèle utilisateur défini dans settings
                    ),
                ),

                # Relation avec le véhicule (clé étrangère vers Vehicle)
                (
                    "vehicle",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,  # Suppression en cascade si le véhicule est supprimé
                        to="Vehicle.vehicle",  # Référence au modèle Vehicle
                    ),
                ),
            ],
        ),
    ]
