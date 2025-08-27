"""
WSGI (Web Server Gateway Interface) est une norme qui définit comment un serveur web
(Gunicorn, uWSGI, Apache, Nginx, etc.) communique avec une application Python (ici Django).
Ce fichier wsgi.py agit comme point d’entrée en production : il crée une application WSGI
que le serveur utilisera pour transmettre les requêtes HTTP à Django et renvoyer les réponses
au client. En résumé, il sert de pont entre le serveur web et le framework Django.
"""

import os  # Module système pour gérer les variables d'environnement et chemins

from django.core.wsgi import get_wsgi_application  # Fonction qui génère une application WSGI pour Django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "setting.settings")  
# Définit la variable d'environnement DJANGO_SETTINGS_MODULE 
# → indique à Django où trouver le fichier sett
