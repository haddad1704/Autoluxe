# Importation de l’interface d’administration Django
from django.contrib import admin  

# Importation de tous les modèles du fichier models.py de l’application courante
from .models import *  

# Enregistrement du modèle Booking dans l’interface d’administration Django
admin.site.register(Booking)  
