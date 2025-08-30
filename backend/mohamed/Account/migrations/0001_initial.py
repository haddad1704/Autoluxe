"""
Ce fichier est une migration Django qui crée un modèle personnalisé d’utilisateur (User).
Il reprend les champs de base utilisés par Django pour l’authentification
(mot de passe, statut actif, super-utilisateur, groupes, permissions, etc.)
et ajoute des champs spécifiques comme :
- username (unique)
- email (unique)
- user_type (pour différencier « car_owner » et « client », avec « client » par défaut).
Cette migration permet donc d’intégrer ce nouveau modèle d’utilisateur
dans la base de données et de l’utiliser à la place du modèle utilisateur par défaut de Django.
"""

# Importation des modèles d’authentification intégrés de Django (UserManager, etc.)
import django.contrib.auth.models  

# Importation de l’utilitaire de gestion du temps et des dates de Django
import django.utils.timezone  

# Importation des classes nécessaires pour créer une migration et des champs de modèles
from django.db import migrations, models  


# Définition de la classe Migration qui contient les opérations à appliquer
class Migration(migrations.Migration):
    # Indique qu’il s’agit de la première migration (migration initiale)
    initial = True  

    # Dépendances : cette migration dépend d’une migration du module "auth"
    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    # Liste des opérations à effectuer dans cette migration
    operations = [
        # Création du modèle "User"
        migrations.CreateModel(
            name="User",  # Nom du modèle
            fields=[  # Définition des champs du modèle
                (
                    "id",
                    models.BigAutoField(  # Clé primaire auto-incrémentée
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("password", models.CharField(max_length=128, verbose_name="password")),  # Mot de passe
                (
                    "last_login",
                    models.DateTimeField(  # Date et heure de la dernière connexion
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                (
                    "is_superuser",
                    models.BooleanField(  # Indique si l’utilisateur a tous les droits (super-admin)
                        default=False,
                        help_text="Donne tous les droits à cet utilisateur sans les définir explicitement.",
                        verbose_name="superuser status",
                    ),
                ),
                (
                    "first_name",
                    models.CharField(  # Prénom de l’utilisateur
                        blank=True, max_length=150, verbose_name="first name"
                    ),
                ),
                (
                    "last_name",
                    models.CharField(  # Nom de famille de l’utilisateur
                        blank=True, max_length=150, verbose_name="last name"
                    ),
                ),
                (
                    "is_staff",
                    models.BooleanField(  # Indique si l’utilisateur peut accéder au site d’administration
                        default=False,
                        help_text="Permet de savoir si l’utilisateur peut se connecter à l’interface admin.",
                        verbose_name="staff status",
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(  # Indique si le compte est actif ou désactivé
                        default=True,
                        help_text="Définit si cet utilisateur doit être traité comme actif.",
                        verbose_name="active",
                    ),
                ),
                (
                    "date_joined",
                    models.DateTimeField(  # Date de création du compte utilisateur
                        default=django.utils.timezone.now, verbose_name="date joined"
                    ),
                ),
                (
                    "username",
                    models.CharField(  # Nom d’utilisateur (unique)
                        max_length=150, unique=True, verbose_name="Username"
                    ),
                ),
                (
                    "email",
                    models.EmailField(  # Adresse e-mail (unique)
                        max_length=254, unique=True, verbose_name="Email address"
                    ),
                ),
                (
                    "user_type",
                    models.CharField(  # Champ personnalisé pour différencier les types d’utilisateur
                        choices=[("car_owner", "Car Owner"), ("client", "Client")],
                        default="client",
                        max_length=20,
                        verbose_name="User Type",
                    ),
                ),
                (
                    "groups",
                    models.ManyToManyField(  # Relation avec les groupes d’autorisations
                        blank=True,
                        help_text="Groupes auxquels appartient cet utilisateur.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.group",
                        verbose_name="groups",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(  # Permissions spécifiques accordées à l’utilisateur
                        blank=True,
                        help_text="Permissions spécifiques pour cet utilisateur.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.permission",
                        verbose_name="user permissions",
                    ),
                ),
            ],
            options={
                "verbose_name": "user",  # Nom lisible du modèle
                "verbose_name_plural": "users",  # Nom au pluriel
                "abstract": False,  # Indique que ce modèle n’est pas abstrait (sera créé en base)
            },
            managers=[
                ("objects", django.contrib.auth.models.UserManager()),  # Gestionnaire par défaut
            ],
        ),
    ]
