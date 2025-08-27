# Importation des serializers de Django REST Framework
from rest_framework import serializers  
# Importation du modèle User défini dans models.py
from .models import User  
# Importation du validateur pour vérifier l’unicité d’un champ
from rest_framework.validators import UniqueValidator  
# Importation de la validation des mots de passe fournie par Django
from django.contrib.auth.password_validation import validate_password  
# Importation du module random pour générer des valeurs aléatoires
import random  
# Importation du module string pour utiliser des ensembles de caractères (ex : lettres)
import string  


# Serializer pour l’inscription d’un utilisateur
class RegisterSerializer(serializers.ModelSerializer):  
    # Champ email avec validation d’unicité
    email = serializers.EmailField(  
            required=True,  # Champ obligatoire
            validators=[UniqueValidator(queryset=User.objects.all())]  # Vérifie que l’email est unique
            )  

    # Champ mot de passe (non lisible, obligatoire, validé par le système Django)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])  
    # Champ de confirmation du mot de passe
    passwordConfirm = serializers.CharField(write_only=True, required=False)  

    # Définition des métadonnées du serializer
    class Meta:  
        # Modèle lié au serializer
        model = User  
        # Champs pris en compte lors de l’inscription
        fields = ('password', 'passwordConfirm', 'email', 'user_type')  
        # Paramètres supplémentaires (ici laissés vides mais personnalisables)
        extra_kwargs = {  
            # Exemple (commenté) : rendre un champ non obligatoire
            # 'passwordConfirm': {'required': False},
            # 'last_name': {'required': False}
        }  

    # Validation personnalisée (vérifie que les deux mots de passe correspondent)
    def validate(self, attrs):  
        if attrs['password'] != attrs['passwordConfirm']:  # Si les mots de passe sont différents
            raise serializers.ValidationError({"password": "Les mots de passe ne correspondent pas."})  
        return attrs  # Retourne les données validées

    # Méthode privée pour générer un mot aléatoire
    def _generate_random_word(self, length=4):  
        return ''.join(random.choices(string.ascii_lowercase, k=length))  # Retourne une chaîne aléatoire

    # Méthode pour créer un nouvel utilisateur
    def create(self, validated_data):  
        # Récupération de l’email depuis les données validées
        email = validated_data['email']  
        # Récupération du type d’utilisateur
        user_type = validated_data['user_type']  
        # Génération d’un mot aléatoire
        random_word = self._generate_random_word()  
        # Création d’un username basé sur l’email + mot aléatoire
        username = email.split('@')[0] + '_' + email.split('@')[1].split('.')[0] + '_' + random_word  
        
        # Création de l’objet utilisateur avec email, username et type
        user = User.objects.create(  
            username=username,  
            email=validated_data['email'],  
            user_type=user_type,  
        )  

        # Définition du mot de passe de manière sécurisée
        user.set_password(validated_data['password'])  
        # Sauvegarde de l’utilisateur en base de données
        user.save()  

        # Retourne l’utilisateur nouvellement créé
        return user  
    

# Serializer pour afficher les informations d’un utilisateur
class UserSerializer(serializers.ModelSerializer):  
    
    class Meta:  
        # Modèle lié
        model = User  
        # Champs affichés dans les réponses de l’API
        fields = ['email', 'username', 'user_type']  
