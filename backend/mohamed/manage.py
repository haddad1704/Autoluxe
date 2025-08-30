"""
Point d'entrée (manage.py) des commandes Django pour ce projet.

Permet d'exécuter les commandes `runserver`, `migrate`, etc.
"""

import os
import sys

def main():  # Point d'entrée des commandes Django
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "setting.settings")  # Module de configuration
    try:
        from django.core.management import execute_from_command_line  # Exécuteur de commandes
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and available on your PYTHONPATH environment variable? Did you forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)  # Passe les arguments à Django

if __name__ == "__main__":  # Exécution directe du script
    main()  # Lance le CLI Django
