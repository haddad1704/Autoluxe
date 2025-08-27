# Importation de la classe AppConfig qui permet de configurer une application Django
from django.apps import AppConfig  


# Définition de la classe de configuration de l’application Account
class AccountConfig(AppConfig):  
    # Définition du type de champ auto-incrémenté par défaut (ici BigAutoField pour les identifiants)
    default_auto_field = "django.db.models.BigAutoField"  
    
    # Nom de l’application (doit correspondre au nom du dossier de l’app)
    name = "Account"  
