"""
Ce fichier (models.py) définit les modèles de l’application Vehicle.
Un modèle correspond à une table dans la base de données.

On y trouve :
- VehicleCategory : représente une catégorie de véhicules (SUV, Berline, Camion…).
- Vehicle : représente un véhicule précis, lié à une catégorie et à un propriétaire.

Chaque modèle hérite de django.db.models.Model, ce qui permet à Django de gérer
automatiquement la création des tables et leurs relations.
"""

# -------------------- IMPORTS -------------------- #

from django.db import models  
# Importation des outils Django pour définir les modèles (équivalents des tables en base de données).

from Account.models import User  
# Importation du modèle User personnalisé depuis l’application Account.
# Ce modèle est utilisé pour relier un véhicule ou une catégorie à un utilisateur (propriétaire).


# -------------------- MODÈLE : VehicleCategory -------------------- #

class VehicleCategory(models.Model):
    """
    Représente une catégorie de véhicules (exemple : SUV, Berline, Camion).
    Chaque catégorie appartient à un utilisateur de type 'car_owner'.
    """

    user = models.ForeignKey(
        User,                                      # Relation avec le modèle User
        on_delete=models.CASCADE,                  # Si le User est supprimé → supprime ses catégories
        related_name='vehicle_category',           # Permet d’accéder aux catégories depuis l’utilisateur : user.vehicle_category.all()
        limit_choices_to={'user_type': 'car_owner'}# Seuls les utilisateurs de type 'car_owner' peuvent être liés
    )

    name = models.CharField(
        verbose_name='Category Name',  # Nom affiché lisiblement dans l’admin
        max_length=100,                # Taille max du champ
        null=False,                    # Ne peut pas être NULL en base de données
        blank=False,                   # Ne peut pas être laissé vide dans un formulaire
        unique=True                    # Doit être unique (pas deux catégories avec le même nom)
    )

    created_at = models.DateTimeField(auto_now_add=True)  
    # Date et heure de création, automatiquement remplie lors de la création.

    modified_at = models.DateTimeField(auto_now=True)  
    # Date et heure de dernière modification, mise à jour automatiquement.

    def __str__(self):
        """
        Méthode qui définit la représentation texte de l’objet.
        Exemple affiché dans l’admin : "SUV".
        """
        return self.name


# -------------------- MODÈLE : Vehicle -------------------- #

class Vehicle(models.Model):
    """
    Représente un véhicule appartenant à un utilisateur (car_owner).
    Contient ses caractéristiques principales (marque, modèle, année...).
    """

    owner = models.ForeignKey(
        User,                                     # Relation avec le modèle User
        on_delete=models.CASCADE,                 # Si le propriétaire est supprimé → supprime ses véhicules
        related_name='owned_vehicles',            # Permet d’accéder aux véhicules depuis l’utilisateur : user.owned_vehicles.all()
        limit_choices_to={'user_type': 'car_owner'} # Seuls les utilisateurs de type 'car_owner' peuvent posséder un véhicule
    )

    category = models.ForeignKey(
        VehicleCategory,                          # Relation avec une catégorie
        on_delete=models.CASCADE                  # Si la catégorie est supprimée → supprime les véhicules liés
    )

    make = models.CharField(
        verbose_name='Vehicle Make',   # Marque (ex: Toyota)
        null=False,                    # Obligatoire en base
        blank=False,                   # Obligatoire dans les formulaires
        max_length=100                 # Taille max = 100 caractères
    )

    model = models.CharField(
        verbose_name='Vehicle Model',  # Modèle (ex: Corolla)
        null=False,                    # Obligatoire
        blank=False,                   # Obligatoire
        max_length=100                 # Taille max = 100 caractères
    )

    year = models.CharField(
        max_length=50  # Année de fabrication (ex: "2020")
    )

    price_per_day = models.DecimalField(
        verbose_name='Price per Day',  # Prix journalier de location
        max_digits=1000,               # Nombre total de chiffres max
        decimal_places=2               # 2 chiffres après la virgule
    )

    image = models.ImageField(
        upload_to='images/vehicle/',   # Répertoire de stockage des images
        default='default/vehicle.jpg', # Image par défaut si aucune fournie
        null=True,                     # Peut être NULL en base
        blank=True                     # Peut être laissé vide dans un formulaire
    )

    description = models.TextField(
        default='car description'      # Description par défaut si non remplie
    )

    created_at = models.DateTimeField(auto_now_add=True)  
    # Date de création (remplie automatiquement à l’ajout).

    modified_at = models.DateTimeField(auto_now=True)  
    # Date de dernière modification (mise à jour automatiquement).

    def __str__(self):
        """
        Représentation texte de l’objet (lisible dans l’admin).
        Exemple : "Toyota Corolla (2020)".
        """
        return f'{self.make} {self.model} ({self.year})'
