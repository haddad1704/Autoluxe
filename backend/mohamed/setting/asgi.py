"""
Configuration ASGI (asgi.py) du projet.

Expose l'application ASGI pour le déploiement asynchrone.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "setting.settings")

application = get_asgi_application()  # Objet ASGI exposé
