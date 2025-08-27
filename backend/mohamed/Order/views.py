# Importation des raccourcis utiles de Django (render, get_object_or_404, redirect)
from django.shortcuts import render, get_object_or_404, redirect  

# Pour construire dynamiquement des URLs
from django.urls import reverse  

# Importation des classes génériques de DRF (ViewSet, permissions, generics)
from rest_framework import viewsets, permissions, generics  

# Vue de base DRF (bas niveau)
from rest_framework.views import APIView  

# Réponse JSON de DRF
from rest_framework.response import Response  

# Importation des modèles de l’application
from .models import *  

# Importation des sérialiseurs de l’application
from .serializers import *  

# Accès aux paramètres globaux du projet
from django.conf import settings  

# Importation du SDK SSLCommerz (paiement en ligne)
from pysslcmz.payment import SSLCSession  

# Gestion des nombres décimaux (pour les montants financiers)
from decimal import Decimal  

# Permet de désactiver la vérification CSRF (utile pour callback paiement)
from django.views.decorators.csrf import csrf_exempt  

# Codes de statut HTTP (200, 400, 401…)
from rest_framework import status  

# Réponses HTTP simples
from django.http import HttpResponse  

# Décorateur pour restreindre une vue aux utilisateurs connectés (pas utilisé ici)
from django.contrib.auth.decorators import login_required  

# Permet de transformer une chaîne de texte en dictionnaire Python
import ast  

# Outils pour manipuler du JSON
import json  


# ViewSet pour gérer les réservations (CRUD complet)
class BookingViewSet(viewsets.ModelViewSet):  
    # Ensemble de toutes les réservations
    queryset = Booking.objects.all()  

    # Sérialiseur associé
    serializer_class = BookingSerializer  

    # Réservations accessibles uniquement si connecté
    permission_classes = [permissions.IsAuthenticated]  
    
    # On limite la liste aux réservations du client connecté
    def get_queryset(self):  
         user = self.request.user 
         queryset = Booking.objects.filter(client__id=user.id)
         return queryset
    
    # Suppression d’une réservation
    def destroy(self, request, *args, **kwargs):
        # Récupère la réservation avant suppression
        booking = self.get_object()
        vehicle = booking.vehicle
        
        # Supprime la réservation
        response = super().destroy(request, *args, **kwargs)
        
        # Pas besoin de mettre à jour manuellement la disponibilité du véhicule
        # car elle est recalculée automatiquement par le serializer.
        
        return response


# Liste des réservations d’un client connecté
class BookingListAPIView(generics.ListAPIView):  
    queryset = Booking.objects.all()
    serializer_class = BookingModelSerializer  
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):  
         user = self.request.user 
         queryset = Booking.objects.filter(client__id=user.id)
         return queryset
        


# Liste des réservations pour un propriétaire de véhicules
class SeeBookingListAPIView(generics.ListAPIView):  
    queryset = Booking.objects.all()
    serializer_class = SeeBookingModelSerializer  
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):  
         user = self.request.user 
         queryset = Booking.objects.filter(vehicle__owner__id=user.id)
         return queryset
        

# Vue API pour démarrer un paiement
class BookingPaymentView(APIView):  
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, vehicle_id):  
        # On valide les données envoyées avec le serializer
        serializer = BookingSerializerPayment(data=request.data)  
        serializer.client = request.user  
        
        # Récupère le véhicule
        vehicle = Vehicle.objects.get(id=vehicle_id)  
        
        # Valeur par défaut
        cost = 0  

        # Si les données envoyées sont valides
        if serializer.is_valid():  
            start_date = serializer.validated_data['start_date']
            end_date = serializer.validated_data['end_date']

            # Durée de réservation
            duration = end_date - start_date

            # Calcul du prix total
            cost = duration.days * vehicle.price_per_day

        # Prépare la session de paiement
        store_id = settings.SSL_STORE_ID
        store_pass = settings.SSL_API_KEY
        sslc_session = SSLCSession(sslc_is_sandbox=True, sslc_store_id=store_id, sslc_store_pass=store_pass)
        
        # URL de retour après paiement
        status_url = request.build_absolute_uri(reverse("complete"))
        status_url_with_vehicle = f"{status_url}?vehicle_id={vehicle_id}&cost={cost}"

        # Données additionnelles envoyées avec la transaction
        sslc_session.set_additional_values(
            value_a=str(start_date),
            value_b=str(end_date),
            value_c=request.data['phone'],
            value_d=request.user.id,
        )
        
        # URLs de callback (success, fail, cancel, ipn)
        sslc_session.set_urls(
            success_url=status_url_with_vehicle,
            fail_url=status_url_with_vehicle, 
            cancel_url=status_url_with_vehicle, 
            ipn_url=status_url_with_vehicle
        )
        
        # Informations du produit
        sslc_session.set_product_integration(
            total_amount=cost,
            currency='BDT',
            product_category=vehicle.category.name,
            product_name=vehicle.make,
            num_of_item=1,
            shipping_method='NO',
            product_profile='non-physical-goods'
        )

        # Informations du client
        sslc_session.set_customer_info(
            name=request.user.username,
            email=request.user.email,
            address1='',
            address2='',
            city='',
            postcode='',
            country='Bangladesh',
            phone=request.data['phone']
        )

        # Lance le paiement et récupère l’URL de redirection
        response_data = sslc_session.init_payment()
        print(response_data)

        return Response(response_data)


# Callback de retour de la passerelle après paiement
@csrf_exempt
def complete(request):  
    if request.method == 'POST':
        # Données renvoyées par la passerelle
        payment_data = request.POST  
        vehicle_id = request.GET.get('vehicle_id')  
        cost = request.GET.get('cost')  
        status = payment_data.get('status')  
        start_date = payment_data.get('value_a')  
        end_date = payment_data.get('value_b')  
        phone = payment_data.get('value_c')  
        userId = payment_data.get('value_d')  
        val_id = payment_data.get('val_id')  
        tran_id = payment_data.get('tran_id')  

        # Prépare les données pour la suite
        data = {
            "start_date": start_date,
            "end_date": end_date,
            "phone": phone,
            "userId": userId,
            "vehicle_id": vehicle_id,
            "cost": cost,
            "val_id": val_id,
            "tran_id": tran_id,
        }

        # Vérifie le statut
        if status == 'VALID':  
            # Paiement réussi
            return redirect("purchase", payment_data, data)  
        elif status == 'FAILED':  
            # Paiement échoué
            return redirect(settings.FRONTEND_URL)
        else:  
            # Paiement annulé
            return redirect(settings.FRONTEND_URL)


# Création de la réservation après paiement réussi
def purchase(request, payment_data, data):  
    # Convertit la chaîne en dictionnaire
    data = ast.literal_eval(data)  

    # Récupère les champs
    start_date = data['start_date']
    end_date = data['end_date']
    phone = data['phone']
    userId = data['userId']
    vehicle_id = data['vehicle_id']
    cost = data['cost']
    val_id = data['val_id']
    tran_id = data['tran_id']

    # Enregistre la réservation en base
    booking = Booking.objects.create(
        client_id=userId,
        vehicle_id=vehicle_id,
        start_date=start_date,
        end_date=end_date,
        phone=phone,
        paymentId=tran_id,
        orderId=val_id,
        full_payment_data=str(payment_data),
        payment_status=True,
        cost=cost
    )

    # Redirection vers la page "mes réservations"
    return redirect(settings.FRONTEND_URL + "all-booked")
