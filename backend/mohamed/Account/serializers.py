"""
Sérialiseurs (serializers.py) de l'application Account.

- RegisterSerializer: valide et crée un utilisateur avec mot de passe, e-mail unique,
  et type d'utilisateur. Génère un username à partir de l'e-mail + suffixe aléatoire.
- UserSerializer: expose un sous-ensemble de champs de l'utilisateur.
"""

from rest_framework import serializers  # Base des sérialiseurs DRF
from .models import User  # Modèle utilisateur custom
from rest_framework.validators import UniqueValidator  # Validation d'unicité
from django.contrib.auth.password_validation import validate_password  # Validateur de mots de passe
import random  # Utilisé pour la génération du suffixe aléatoire
import string  # Alphabet pour le suffixe aléatoire




class RegisterSerializer(serializers.ModelSerializer):  # Formulaire d'inscription API
    email = serializers.EmailField(  # Champ e-mail avec contrainte d'unicité
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])  # Mot de passe
    passwordConfirm = serializers.CharField(write_only=True, required=False)  # Confirmation de mot de passe

    class Meta:  # Options du sérialiseur
        model = User  # Modèle ciblé
        fields = ( 'password', 'passwordConfirm','email','user_type')  # Champs acceptés
        extra_kwargs = {  # Espace pour options additionnelles si besoin
           
        }

    def validate(self, attrs):  # Validation croisée des champs
        if attrs['password'] != attrs['passwordConfirm']:  # Les mots de passe doivent correspondre
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs  # Retourne les attributs validés
   
    def _generate_random_word(self, length=4):  # Génère un petit suffixe aléatoire
        return ''.join(random.choices(string.ascii_lowercase, k=length))

    def create(self, validated_data):  # Création de l'utilisateur après validations
        email = validated_data['email']  # E-mail validé
        user_type = validated_data['user_type']  # Type d'utilisateur choisi
        random_word = self._generate_random_word()  # Suffixe pour éviter collisions de username
        username = email.split('@')[0] + '_' + email.split('@')[1].split('.')[0] + '_' + random_word  # Base + suffixe
        user = User.objects.create(  # Création de l'utilisateur
            username=username,
            email=validated_data['email'],
            user_type=user_type,
        )

        
        user.set_password(validated_data['password'])  # Hash du mot de passe
        user.save()  # Persistance en base

        return user  # Retourne l'objet créé
    
    
class UserSerializer(serializers.ModelSerializer):  # Sérialiseur simple de lecture
    
    class Meta:
        model = User  # Modèle visé
        fields = ['email','username','user_type']  # Champs exposés à l'API