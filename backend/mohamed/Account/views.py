"""
Vues (views.py) de l'application Account.

- register_view: endpoint d'inscription qui valide et crée un utilisateur.
- MyTokenObtainPairView/MyTokenObtainPairSerializer: émet un JWT d'accès et de rafraîchissement
  avec quelques informations utilisateur additionnelles.
"""

from django.shortcuts import render  # Utilitaires de rendu (non utilisé ici pour l'API JSON)
from .serializers import *  # Sérialiseurs de l'application
from rest_framework.decorators import api_view  # Décorateur pour vues basées fonction
from rest_framework.response import Response  # Réponses HTTP au format JSON
from rest_framework import generics  # Vues génériques (non utilisées directement ici)
from rest_framework.permissions import *  # Permissions DRF
from rest_framework import status,permissions  # Statuts HTTP et permissions
from rest_framework_simplejwt.views import TokenObtainPairView  # Vue JWT standard
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer  # Serializer JWT standard
from django.conf import settings  # Accès aux paramètres du projet


@api_view(['POST'])  # Cette vue n'accepte que la méthode HTTP POST
def register_view(request):  # Inscription d'un nouvel utilisateur
     if request.method == 'POST':  # Vérifie la méthode
          serializers = RegisterSerializer(data = request.data)  # Hydrate le sérialiseur avec le payload
          data = {}  # Dictionnaire de réponse
          
          if serializers.is_valid(raise_exception=True):  # Valide et lève si invalide
               user = serializers.save()  # Crée l'utilisateur en base
               data['response'] = "Successfully Registered"  # Message de succès
               data['username'] = f'{user}'  # Représentation textuelle de l'utilisateur
               data['email'] = serializers.data['email']  # E-mail retourné par le sérialiseur
               data['user_id'] = user.id  # Identifiant de l'utilisateur
               data['user_type'] = serializers.data['user_type']  # Type d'utilisateur (client / car_owner)
          else:
               data = serializers.errors  # Retourne les erreurs de validation
          return Response(data)  # Réponse JSON
     
     
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):  # Personnalise la charge utile du token
    def validate(self, attrs):  # Valide les identifiants et enrichit la réponse

        data = super().validate(attrs)  # Données standard (access, refresh)
        refresh = self.get_token(self.user)  # Obtient un nouveau jeton de rafraîchissement
        data['refresh'] = str(refresh)  # Jeton de rafraîchissement
        data['access'] = str(refresh.access_token)  # Jeton d'accès
        data['type'] = 'Bearer'  # Schéma d'autorisation
        data['lifetime'] = str(settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].days) + ' days'  # Durée de vie
        
        # Informations supplémentaires sur l'utilisateur connecté
        data['user_id'] = self.user.id  # Id utilisateur
        data['user_email'] = self.user.email  # E-mail
        data['user_username'] = self.user.username  # Nom d'utilisateur
        data['user_type'] = self.user.user_type  # Type d'utilisateur
        
        return data  # Retourne la charge utile enrichie
        
 

class MyTokenObtainPairView(TokenObtainPairView):  # Vue JWT qui utilise le serializer personnalisé
     serializer_class = MyTokenObtainPairSerializer  # Branche le sérialiseur custom