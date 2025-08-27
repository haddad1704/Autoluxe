# Importation du module random pour générer des valeurs aléatoires
import random  
# Importation du module string pour utiliser des ensembles de caractères (ex : lettres)
import string  

# Importation des classes nécessaires pour définir des modèles dans Django
from django.db import models  
# Importation de la classe AbstractUser pour personnaliser le modèle utilisateur par défaut de Django
from django.contrib.auth.models import AbstractUser  


# Définition de notre modèle personnalisé User basé sur AbstractUser
class User(AbstractUser):  
    # Définition des types d’utilisateurs possibles
    USER_TYPES = (  
        ('car_owner', 'Car Owner'),  # Propriétaire de voiture
        ('client', 'Client'),  # Client
    )  

    # Champ username personnalisé (nom d’utilisateur, unique)
    username = models.CharField(verbose_name='Username', max_length=150, unique=True)  
    
    # Champ email obligatoire et unique (utilisé pour l’authentification)
    email = models.EmailField(verbose_name='Email address', unique=True, null=False, blank=False)  
    
    # Champ indiquant le type d’utilisateur (choix limité à USER_TYPES)
    user_type = models.CharField(verbose_name='User Type', max_length=20, choices=USER_TYPES, default='client')  

    # Indique que l’authentification se fera avec l’email au lieu du username
    USERNAME_FIELD = 'email'  
    
    # Champ utilisé comme adresse email de référence
    EMAIL_FIELD = 'email'  
    
    # Champs supplémentaires requis lors de la création d’un utilisateur
    REQUIRED_FIELDS = ['username']  

    # Méthode privée pour générer un mot aléatoire de longueur donnée
    def _generate_random_word(self, length=4):  
        return ''.join(random.choices(string.ascii_lowercase, k=length))  # Retourne une chaîne de lettres aléatoires

    # Méthode de sauvegarde personnalisée
    def save(self, *args, **kwargs):  
        # Vérifie si le champ username n’est pas rempli
        if not self.username:  
            # Génération d’un mot aléatoire
            random_word = self._generate_random_word()  
            # Construction d’un username basé sur l’email + un mot aléatoire
            username = self.email.split('@')[0] + '_' + self.email.split('@')[1].split('.')[0] + '_' + random_word  
            # Attribution du username généré
            self.username = username  
        # Appel à la méthode save() de la classe parente (AbstractUser)
        super().save(*args, **kwargs)  
