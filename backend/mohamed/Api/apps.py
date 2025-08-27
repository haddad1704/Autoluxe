# importation de la classe AppConfig de django.apps
from django.apps import AppConfig

# définition de la classe ApiConfig
class ApiConfig(AppConfig):
    # définition du champ auto_field par défaut
    default_auto_field = "django.db.models.BigAutoField"
    # définition du nom de l'application
    name = "Api"
