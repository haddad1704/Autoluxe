"""
Configuration de l'administration Django (admin.py) pour l'application Vehicle.

Enregistre les modèles VehicleCategory et Vehicle afin de les gérer depuis l'admin.
"""

from django.contrib import admin
from .models import *


admin.site.register(VehicleCategory)
admin.site.register(Vehicle)