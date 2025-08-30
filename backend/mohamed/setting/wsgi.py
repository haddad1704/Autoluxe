"""
Configuration WSGI (wsgi.py) du projet.

Expose l'application WSGI pour les serveurs web compatibles (déploiement synchrone).
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "setting.settings")

application = get_wsgi_application()  # Objet WSGI exposé
