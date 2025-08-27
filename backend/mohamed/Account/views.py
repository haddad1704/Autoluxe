# Importation de la fonction render (souvent utilisée pour afficher des templates, même si ici ce n’est pas utilisé)
from django.shortcuts import render  

# Importation de tous les serializers définis dans serializers.py
from .serializers import *  

# Importation du décorateur api_view pour créer des vues basées sur des fonctions dans DRF
from rest_framework.decorators import api_view  

# Importation de la classe Response pour renvoyer des réponses HTTP JSON
from rest_framework.response import Response  

# Importation des vues génériques (CreateAPIView, ListAPIView, etc.)
from rest_framework import generics  

# Importation des permissions pour sécuriser les endpoints
from rest_framework.permissions import *  

# Importation de status (codes HTTP) et permissions
from rest_framework import status, permissions  

# Importation de la vue par défaut de JWT pour obtenir des tokens
from rest_framework_simplejwt.views import TokenObtainPairView  

# Importation du serializer JWT par défaut
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer  

# Importation des paramètres globaux du projet Django
from django.conf import settings  


# Création d’une vue API pour l’enregistrement des utilisateurs
@api_view(['POST'])  # Cette vue accepte uniquement la méthode POST
def register_view(request):  
     if request.method == 'POST':  # Vérifie que la requête est bien POST
          serializers = RegisterSerializer(data = request.data)  # On instancie le serializer avec les données envoyées
          data = {}  # Dictionnaire pour stocker la réponse
          
          if serializers.is_valid(raise_exception=True):  # Vérifie si les données sont valides, sinon lève une exception
               user = serializers.save()  # Sauvegarde l’utilisateur dans la base
               data['response'] = "Successfully Registered"  # Message de succès
               data['username'] = f'{user}'  # Récupère le nom de l’utilisateur
               data['email'] = serializers.data['email']  # Retourne l’email
               data['user_id'] = user.id  # Retourne l’ID utilisateur
               data['user_type'] = serializers.data['user_type']  # Retourne le type d’utilisateur
          else:
               data = serializers.errors  # Si invalide, renvoyer les erreurs
          return Response(data)  # Retourne la réponse JSON
     
     
# Création d’un serializer personnalisé pour ajouter plus d’infos dans le token JWT
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):  
     def validate(self, attrs):  # Fonction de validation appelée lors de la génération du token
        data = super().validate(attrs)  # Appelle la validation par défaut
        refresh = self.get_token(self.user)  # Crée un token de rafraîchissement JWT
        data['refresh'] = str(refresh)  # Ajoute le token refresh
        data['access'] = str(refresh.access_token)  # Ajoute le token access
        data['type'] = 'Bearer'  # Type de token
        data['lifetime'] = str(settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].days) + ' days'  
        # Durée de vie du token en jours
        
        # Ajout de données supplémentaires concernant l’utilisateur connecté
        data['user_id'] = self.user.id  # ID utilisateur
        data['user_email'] = self.user.email  # Email utilisateur
        data['user_username'] = self.user.username  # Nom d’utilisateur
        data['user_type'] = self.user.user_type  # Type d’utilisateur
        
        return data  # Retourne toutes les données du token et infos utilisateur
        

# Création d’une vue personnalisée pour utiliser notre serializer MyTokenObtainPairSerializer
class MyTokenObtainPairView(TokenObtainPairView):  
     serializer_class = MyTokenObtainPairSerializer  # On remplace le serializer par le nôtre
