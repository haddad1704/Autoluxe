# Importation de la classe de configuration des applications Django
from django.apps import AppConfig  


# Définition de la configuration pour l’application "Order"
class OrderConfig(AppConfig):
    # Définit le type de clé primaire par défaut (ici BigAutoField = entier 64 bits auto-incrémenté)
    default_auto_field = "django.db.models.BigAutoField"  
    
    # Nom de l’application tel qu’elle est déclarée dans INSTALLED_APPS
    name = "Order"  
