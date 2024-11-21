from django.shortcuts import render
from rest_framework.response import Response
from .api_venue_details import api_venue_details
from .api_selected_category import api_user_select_category
from rest_framework.decorators import api_view
from .api_location import api_user_select_category_with_address
from .booking_history import api_booking_data,api_user_booking
from .api_edit_profile import api_edit_user_profile

@api_view(['POST'])
def api_venues(request):
    data = request.data
    result = api_venue_details(data)
    return Response(result)
@api_view(['POST'])
def api_booking_history(request):
    data = request.data
    result = api_booking_data(data)
    return Response(result)

@api_view(['GET'])
def api_user_booking_history(request, name):
    return Response(api_user_booking(request=request,name=name, ))

@api_view(['POST'])  
def api_editing_profile(request, name,names, email, number):
    if request.method == "POST":
        return Response(api_edit_user_profile(request=request, name=name,names=names, email=email, number=number))
    else:
        return Response({"error": "Method not allowed"}, status=405)
    
@api_view(['GET'])
def api_category(request, categoryName):
    return Response(api_user_select_category(request=request,Games=categoryName, ))

@api_view(['GET'])
def api_category_with_address(request, categoryName, address):
    return Response(api_user_select_category_with_address(request=request, Games=categoryName, address=address))
