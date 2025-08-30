"""
Vues (views.py) de l'application Order.

- BookingViewSet: CRUD des réservations restreint à l'utilisateur connecté.
- BookingListAPIView / SeeBookingListAPIView: listes filtrées pour client et propriétaire.
- BookingPaymentView: initialise un paiement via SSLC, calcule le coût.
- complete/purchase: callbacks de paiement pour finaliser la réservation.
"""

from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse
from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.conf import settings
from pysslcmz.payment import SSLCSession
from decimal import Decimal
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
import ast
import json

class BookingViewSet(viewsets.ModelViewSet):  # ViewSet CRUD réservé à l'utilisateur connecté
    queryset = Booking.objects.all()  # Base (filtrée ensuite)
    serializer_class = BookingSerializer  # Sérialiseur CRUD
    permission_classes = [permissions.IsAuthenticated]  # JWT requis
    
    def get_queryset(self):  # Restreint aux réservations de l'utilisateur connecté (client)
        user = self.request.user
        queryset = Booking.objects.filter(client__id=user.id)
        return queryset
    
    def destroy(self, request, *args, **kwargs):  # Suppression d'une réservation
        booking = self.get_object()  # Récupère l'objet ciblé
        vehicle = booking.vehicle  # Exemple d'accès au véhicule (non utilisé ici)
        response = super().destroy(request, *args, **kwargs)  # Appel parent
        return response  # Retourne la réponse


class BookingListAPIView(generics.ListAPIView):  # Liste des réservations de l'utilisateur
    queryset = Booking.objects.all()  # Base
    serializer_class = BookingModelSerializer  # Détail avec coût total
    permission_classes = [permissions.IsAuthenticated]  # JWT requis
    
    def get_queryset(self):  # Liste des réservations du client connecté
        user = self.request.user
        queryset = Booking.objects.filter(client__id=user.id)
        return queryset


class SeeBookingListAPIView(generics.ListAPIView):  # Liste pour propriétaire (ses véhicules)
    queryset = Booking.objects.all()  # Base
    serializer_class = SeeBookingModelSerializer  # Détail avec client et véhicule
    permission_classes = [permissions.IsAuthenticated]  # JWT requis
    
    def get_queryset(self):  # Liste des réservations des véhicules du propriétaire
        user = self.request.user
        queryset = Booking.objects.filter(vehicle__owner__id=user.id)
        return queryset


class BookingPaymentView(APIView):  # Initialise la session de paiement
    permission_classes = [permissions.IsAuthenticated]  # JWT requis

    def post(self, request, vehicle_id):  # Prépare la session de paiement et redirige vers la passerelle
        serializer = BookingSerializerPayment(data=request.data)
        serializer.client = request.user
        vehicle = Vehicle.objects.get(id=vehicle_id)
        cost = 0
        if serializer.is_valid():
            start_date = serializer.validated_data['start_date']
            end_date = serializer.validated_data['end_date']
            duration = end_date - start_date
            cost = duration.days * vehicle.price_per_day

        store_id = settings.SSL_STORE_ID
        store_pass = settings.SSL_API_KEY
        sslc_session = SSLCSession(sslc_is_sandbox=True, sslc_store_id=store_id, sslc_store_pass=store_pass)
        
        status_url = request.build_absolute_uri(reverse("complete"))
        status_url_with_vehicle = f"{status_url}?vehicle_id={vehicle_id}&cost={cost}"

        sslc_session.set_additional_values(
            value_a=str(start_date),
            value_b=str(end_date),
            value_c=request.data['phone'],
            value_d=request.user.id,
        )
        
        sslc_session.set_urls(
            success_url=status_url_with_vehicle,
            fail_url=status_url_with_vehicle,
            cancel_url=status_url_with_vehicle,
            ipn_url=status_url_with_vehicle
        )
        
        sslc_session.set_product_integration(
            total_amount=cost,
            currency='BDT',
            product_category=vehicle.category.name,
            product_name=vehicle.make,
            num_of_item=1,
            shipping_method='NO',
            product_profile='non-physical-goods'
        )

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

        response_data = sslc_session.init_payment()  # Lance la session auprès du PSP
        print(response_data)  # Journalisation simple (dev)

        return Response(response_data)


@csrf_exempt  # La passerelle ne fournit pas de CSRF token
def complete(request):  # Callback de la passerelle, redirige selon le statut
    if request.method == 'POST':
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
        if status == 'VALID':
            val_id = payment_data.get('val_id')
            tran_id = payment_data.get('tran_id')
            return redirect("purchase", payment_data, data)
        elif status == 'FAILED':
            return redirect(settings.FRONTEND_URL)
        else:
            return redirect(settings.FRONTEND_URL)


def purchase(request, payment_data, data):  # Création de la réservation après paiement valide
    data = ast.literal_eval(data)

    start_date = data['start_date']
    end_date = data['end_date']
    phone = data['phone']
    userId = data['userId']
    vehicle_id = data['vehicle_id']
    cost = data['cost']
    val_id = data['val_id']
    tran_id = data['tran_id']

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
    return redirect(settings.FRONTEND_URL + "all-booked")
