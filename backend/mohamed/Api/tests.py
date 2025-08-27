"""
Ce fichier (tests.py) est utilisé pour écrire des tests unitaires 
dans l’application Django.

Les tests permettent de vérifier que les fonctionnalités de l’application 
fonctionnent correctement (modèles, vues, API, etc.).
"""

# -------------------- IMPORTS -------------------- #

from django.test import TestCase  
# Importation de la classe TestCase depuis django.test.
# TestCase est une classe de base fournie par Django pour créer des tests unitaires.
# Elle permet de :
# - Créer automatiquement une base de données de test temporaire
# - Fournir des méthodes utiles pour vérifier les résultats (assertEqual, assertTrue, etc.)
# - Nettoyer les données après chaque test
