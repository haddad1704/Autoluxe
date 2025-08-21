from django.shortcuts import render,get_object_or_404,redirect  # Raccourcis Django
from django.urls import reverse  # Pour construire des URLs
from rest_framework import viewsets ,permissions,generics  # Vues DRF
from rest_framework.views import APIView  # Vue API bas niveau
from rest_framework.response import Response  # Réponse JSON DRF
from .models import *  # Modèles du module
from .serializers import *  # Sérialiseurs du module
from django.conf import settings  # Accès aux paramètres
from pysslcmz.payment import SSLCSession  # SDK SSLCommerz (paiement)
from decimal import Decimal  # Décimaux pour les montants
from django.views.decorators.csrf import csrf_exempt  # Désactiver CSRF pour endpoint retour
from rest_framework import status  # Codes HTTP
from django.http import HttpResponse  # Réponses HTTP simples
from django.contrib.auth.decorators import login_required  # Décorateur login (non utilisé ici)
import ast  # Parser chaînes -> structures Python
import json  # JSON utilitaires

class BookingViewSet(viewsets.ModelViewSet):  # CRUD standard pour les réservations
    queryset = Booking.objects.all()  # Base queryset
    serializer_class = BookingSerializer  # Sérialiseur CRUD

    permission_classes = [permissions.IsAuthenticated]  # Auth requise
    
    def get_queryset(self):  # Limite aux réservations du client connecté
         user = self.request.user 
         queryset = Booking.objects.filter(client__id = user.id)
         return queryset
    
    def destroy(self, request, *args, **kwargs):
        # Get the booking before deletion
        booking = self.get_object()
        vehicle = booking.vehicle
        
        # Delete the booking
        response = super().destroy(request, *args, **kwargs)
        
        # The check_booked field is calculated dynamically by the serializer
        # based on active paid bookings, so no need to manually update it
        # The next time the vehicle data is fetched, it will automatically
        # show the correct availability status
        
        return response


class BookingListAPIView(generics.ListAPIView):  # Liste des réservations du client
    queryset = Booking.objects.all()
    serializer_class = BookingModelSerializer  # Sérialiseur avec total_cost
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):  # Filtre par client connecté
         user = self.request.user 
         queryset = Booking.objects.filter(client__id = user.id)
         return queryset
        


class SeeBookingListAPIView(generics.ListAPIView):  # Liste réservations pour propriétaire
    queryset = Booking.objects.all()
    serializer_class = SeeBookingModelSerializer  # Inclut infos client et véhicule
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):  # Filtre par propriétaire
         user = self.request.user 
         queryset = Booking.objects.filter(vehicle__owner__id = user.id)
         return queryset
        
 
    
class BookingPaymentView(APIView):  # Démarre le paiement externe
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, vehicle_id):  # Reçoit les infos de réservation
        serializer = BookingSerializerPayment(data=request.data)  # Valide les champs
        serializer.client = request.user  # Associe le client
        vehicle = Vehicle.objects.get(id=vehicle_id)  # Récupère le véhicule
        cost = 0  # Montant par défaut
        if serializer.is_valid():  # Si les données sont valides
            # Récupère dates
            start_date = serializer.validated_data['start_date']
            end_date = serializer.validated_data['end_date']

            # Durée en jours
            duration = end_date - start_date

            # Calcule le coût
            cost = duration.days * vehicle.price_per_day

        # Initialise la session de paiement
        store_id = settings.SSL_STORE_ID
        store_pass = settings.SSL_API_KEY
        sslc_session = SSLCSession(sslc_is_sandbox=True, sslc_store_id=store_id, sslc_store_pass=store_pass)
        
        # Construit l'URL de retour (success/fail/cancel/ipn)
        status_url = request.build_absolute_uri(reverse("complete"))
        status_url_with_vehicle = f"{status_url}?vehicle_id={vehicle_id}&cost={cost}"

        # Champs additionnels envoyés et renvoyés par la passerelle
        sslc_session.set_additional_values(
            value_a=str(start_date),  # start_date
            value_b=str(end_date),  # end_date
            value_c=request.data['phone'],  # téléphone
            value_d= request.user.id,  # id utilisateur
        )
        
        # URLs de callback
        sslc_session.set_urls(
            success_url=status_url_with_vehicle,
            fail_url=status_url_with_vehicle, 
            cancel_url=status_url_with_vehicle, 
            ipn_url=status_url_with_vehicle
        )
        
        # Détails produit / transaction
        sslc_session.set_product_integration(
            total_amount=cost,
            currency='BDT',
            product_category=vehicle.category.name,
            product_name=vehicle.make,
            num_of_item=1,
            shipping_method='NO',
            product_profile='non-physical-goods'
        )
        # Infos client
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

        # Lance le paiement et récupère l'URL de redirection
        response_data = sslc_session.init_payment()
        print(response_data)

        return Response(response_data)


@csrf_exempt
def complete(request):  # Endpoint de retour de la passerelle
    if request.method == 'POST':
        payment_data = request.POST  # Données POST envoyées par la passerelle
        vehicle_id = request.GET.get('vehicle_id')  # Véhicule concerné
        cost = request.GET.get('cost')  # Coût calculé
        status = payment_data.get('status')  # Statut du paiement
        start_date = payment_data.get('value_a')  # Renvoyé (start)
        end_date = payment_data.get('value_b')  # Renvoyé (end)
        phone = payment_data.get('value_c')  # Renvoyé (phone)
        userId = payment_data.get('value_d')  # Renvoyé (user)
        val_id = payment_data.get('val_id')  # ID commande
        tran_id = payment_data.get('tran_id')  # ID transaction
        data = {
            "start_date":start_date,
            "end_date":end_date,
            "phone":phone,
            "userId":userId,
            "vehicle_id":vehicle_id,
            "cost":cost,
            "val_id":val_id,
            "tran_id":tran_id,
        }
        # Redirige selon le statut
        if status == 'VALID':  # Paiement réussi
            val_id = payment_data.get('val_id')
            tran_id = payment_data.get('tran_id')
            return redirect("purchase",  payment_data,data)  # Continue vers création booking
        elif status == 'FAILED':  # Échec
            return redirect(settings.FRONTEND_URL)
        else:  # Annulé
            return redirect(settings.FRONTEND_URL)


# @login_required
def purchase(request, payment_data,data):  # Crée la réservation après paiement validé
    data = ast.literal_eval(data)  # Convertit la chaîne en dict

    # Récupère les champs
    start_date=data['start_date']
    end_date=data['end_date']
    phone=data['phone']
    userId=data['userId']
    vehicle_id=data['vehicle_id']
    cost=data['cost']
    val_id=data['val_id']
    tran_id=data['tran_id']

    # Crée la réservation en base
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
    # Redirige vers la page "Toutes les réservations" après succès
    return redirect(settings.FRONTEND_URL + "all-booked")




