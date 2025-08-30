"""
Configuration de l'administration Django (admin.py) pour l'application Order.

Enregistre le modèle Booking afin de le gérer depuis l'admin.
"""

from django.contrib import admin
from .models import *

admin.site.register(Booking)  # Enregistre le modèle Booking dans l'admin
