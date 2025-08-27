# Importation du module d’administration de Django
from django.contrib import admin  
# Importation de la classe UserAdmin fournie par Django pour personnaliser l’affichage des utilisateurs
from django.contrib.auth.admin import UserAdmin  
# Importation de tous les modèles définis dans models.py
from .models import *  


# Définition d’une classe personnalisée pour gérer le modèle User dans l’administration
class CustomUserAdmin(UserAdmin):  
    # Définition du modèle utilisé (notre modèle User personnalisé)
    model = User  
    
    # Liste des colonnes affichées dans l’interface d’administration
    list_display = ('email', 'username', 'is_active', 'is_staff')  
    
    # Définition des champs cliquables (permettent d’ouvrir la fiche de l’utilisateur)
    list_display_links = ('email',)  
    
    # Ordre d’affichage par défaut (du plus récent au plus ancien selon l’id)
    ordering = ('-id',)  
    
    # Permet d’afficher des cases à cocher horizontales pour sélectionner plusieurs groupes et permissions
    filter_horizontal = (  
        "groups",  # Groupes d’utilisateurs
        "user_permissions",  # Permissions attribuées
    )  
    
    # Champs utilisés pour la barre de recherche dans l’administration
    search_fields = ("username", "first_name", "last_name", "email")  
    
    # Filtres disponibles dans la colonne droite de l’administration
    list_filter = ("is_staff", "is_superuser", "is_active", "groups")  
    
    # Organisation des champs dans la fiche de l’utilisateur
    fieldsets = (  
        # Première section : champs principaux
        (None, {'fields': ('username', 'password',)}),  
        # Deuxième section : informations personnelles
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'user_type',)}),  
        # Troisième section : gestion des permissions
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions',)}),  
        # Quatrième section : dates importantes
        ('Important dates', {'fields': ("last_login", "date_joined")}),  
    )  
    

# Enregistrement du modèle User et de la configuration CustomUserAdmin dans le site d’administration
admin.site.register(User, CustomUserAdmin)  
