"""
ASGI (Asynchronous Server Gateway Interface) est le point d’entrée asynchrone de Django.
Il permet de déployer l’application non seulement pour gérer les requêtes HTTP classiques,
mais aussi pour des connexions persistantes comme WebSockets, chat en temps réel ou notifications.
Ce fichier configure l’environnement Django et expose une application ASGI que les serveurs
compatibles (Uvicorn, Daphne, Hypercorn, etc.) utiliseront pour exécuter le projet.
"""
import os
from django.core.asgi import get_asgi_application

# Tell Django which settings module to use
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "setting.settings")

# Create the ASGI application object
application = get_asgi_application()
