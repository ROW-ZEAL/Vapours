from django.shortcuts import render
from rest_framework.response import Response
from .api_venue_details import api_venue_details
from .api_selected_category import api_user_select_category
from rest_framework.decorators import api_view
from .api_location import api_user_select_category_with_address

@api_view(['POST'])
def api_venues(request):
    data = request.data
    result = api_venue_details(data)
    return Response(result)

@api_view(['GET'])
def api_category(request, categoryName):
    return Response(api_user_select_category(request=request,Games=categoryName, ))

@api_view(['GET'])
def api_category_with_address(request, categoryName, address):
    return Response(api_user_select_category_with_address(request=request, Games=categoryName, address=address))
