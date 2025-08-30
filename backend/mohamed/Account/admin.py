"""
Configuration de l'administration Django (admin.py) pour l'application Account.

Déclare un `CustomUserAdmin` afin de personnaliser l'affichage et l'édition
du modèle `User` dans l'interface d'administration.
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *


class CustomUserAdmin(UserAdmin):  # Personnalisation de l'admin pour le modèle User
    model = User  # Modèle géré par cet admin
    
    list_display =('email','username','is_active','is_staff')  # Colonnes visibles dans la liste
    list_display_links =('email',)  # Lien cliquable principal
    ordering = ('-id',)  # Tri descendant par identifiant
    
    filter_horizontal = (
        "groups",
        "user_permissions",
    )
    
    search_fields = ("username", "first_name", "last_name", "email")  # Recherche rapide
    list_filter = ("is_staff", "is_superuser", "is_active", "groups")  # Filtres latéraux
    
    fieldsets = (
        (None, {'fields': ('username', 'password',)}),  # Identifiants
        ('Personal info', {'fields': ('first_name', 'last_name', 'email','user_type',)}),  # Infos persos
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions',)}),  # Droits
        ('Important dates', {'fields': ("last_login", "date_joined")}),  # Dates clés
    )
    
admin.site.register(User,CustomUserAdmin)