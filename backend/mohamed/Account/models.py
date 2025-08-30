"""
Fichier modèle (models.py) de l'application Account.

Ce fichier définit le modèle utilisateur personnalisé `User` qui hérite de
`AbstractUser`. Les e-mails servent d'identifiant principal, et un champ
`user_type` distingue les rôles (propriétaire de voiture vs client).
"""

import random  # Génération de valeurs aléatoires pour construire un username
import string  # Alphabet utilisé pour le username aléatoire

from django.db import models  # Base des modèles Django
from django.contrib.auth.models import AbstractUser  # Modèle de base d'utilisateur


class User(AbstractUser):  # Modèle utilisateur personnalisé basé sur AbstractUser
    USER_TYPES = (
        ('car_owner', 'Car Owner'),  # Propriétaire de voiture
        ('client', 'Client'),        # Client classique
    )

    # Identifiant visible et unique (sera auto-généré si absent)
    username = models.CharField(verbose_name='Username', max_length=150, unique=True)
    # E-mail unique, utilisé comme identifiant de connexion
    email = models.EmailField(verbose_name='Email address', unique=True, null=False, blank=False)
    # Type d'utilisateur (choix limités)
    user_type = models.CharField(verbose_name='User Type', max_length=20, choices=USER_TYPES, default='client')

    # Configuration d'authentification: l'e-mail devient le champ principal
    USERNAME_FIELD = 'email'  # Utilisé pour s'authentifier
    EMAIL_FIELD = 'email'  # Champ e-mail natif
    REQUIRED_FIELDS = ['username']  # Champs supplémentaires exigés par createsuperuser

    def _generate_random_word(self, length=4):  # Génère un suffixe aléatoire court
        return ''.join(random.choices(string.ascii_lowercase, k=length))

    def save(self, *args, **kwargs):  # Surcharge de l'enregistrement pour auto-créer un username si absent
        if not self.username:
            random_word = self._generate_random_word()
            username = self.email.split('@')[0] + '_' + self.email.split('@')[1].split('.')[0] + '_' + random_word
            self.username = username
        super().save(*args, **kwargs)
