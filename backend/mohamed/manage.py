#!/usr/bin/env python  
# Indique au système d’exploitation d’exécuter ce fichier avec l’interpréteur Python.
# (Shebang → permet de lancer ce script directement en ligne de commande).

"""Django's command-line utility for administrative tasks."""  
# Chaîne de documentation → explique que ce fichier sert aux tâches administratives Django.
# Exemple : lancer le serveur, appliquer les migrations, créer un superuser, etc.

import os  
# Module os : permet de gérer les variables d’environnement et interactions avec le système.

import sys  
# Module sys : permet d’accéder aux arguments passés en ligne de commande (ex: runserver, migrate...).


# -------------------- FONCTION PRINCIPALE -------------------- #

def main():
    """Run administrative tasks."""  
    # Fonction principale → lance les commandes administratives Django.

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "setting.settings")  
    # Définit la variable d’environnement DJANGO_SETTINGS_MODULE.
    # Cela indique à Django où trouver le fichier de configuration (settings.py).
    # Ici, on pointe vers "setting/settings.py".

    try:
        from django.core.management import execute_from_command_line  
        # Import de la fonction qui exécute les commandes Django
        # (par ex: python manage.py runserver, migrate, createsuperuser...).

    except ImportError as exc:  
        # Si Django n’est pas installé ou introuvable → erreur ImportError.

        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc  
        # Message explicite d’erreur : indique à l’utilisateur qu’il doit
        # vérifier que Django est bien installé et que son environnement virtuel est activé.

    execute_from_command_line(sys.argv)  
    # Exécute la commande Django demandée en ligne de commande (ex: runserver, makemigrations...).
    # sys.argv contient la liste des arguments (ex: ["manage.py", "runserver"]).


# -------------------- POINT D’ENTRÉE -------------------- #

if __name__ == "__main__":
    main()
