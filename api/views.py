from django.shortcuts import render
from rest_framework.response import Response
from .api_venue_details import api_venue_details
from .api_selected_category import api_user_select_category
from rest_framework.decorators import api_view
from .api_location import api_user_select_category_with_address
from .booking_history import api_booking_data,api_user_booking
from .api_edit_profile import api_edit_user_profile
from .api_ML import api_recommend
from .api_venue_slots import api_user_select_slots
from .api_reserved_slots import api_user_select_slots_reserved

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
def api_venue_slots_select(request, venue_name,date):
    return Response(api_user_select_slots(request=request, Games=venue_name,date=date))


@api_view(['POST'])
def api_venue_slots_select_reserved(request, futsal_name,booking_date,formattedSlot):
    return Response(api_user_select_slots_reserved(request=request, Games=futsal_name,date=booking_date,slots=formattedSlot))
@api_view(['GET'])
def api_recommend_ml(request, user_id):
    return api_recommend(request, user_id)

@api_view(['GET'])
def api_category_with_address(request, categoryName, address):
    return Response(api_user_select_category_with_address(request=request, Games=categoryName, address=address))






from rest_framework.views import APIView
from rest_framework.response import Response
import psycopg2
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut

class VenueRecommendationView(APIView):
    def get_lat_long_from_location(self, location_name):
        geolocator = Nominatim(user_agent="venue_recommender")
        try:
            location = geolocator.geocode(location_name, timeout=10)
            if location:
                return location.latitude, location.longitude
            else:
                return None, None
        except GeocoderTimedOut:
            return None, None

    def recommend_venue_with_category(self, df, lat, long, interested_category, kmeans):
        cluster = kmeans.predict(np.array([lat, long]).reshape(1, -1))[0]
        recommended_venues = df[(df['cluster'] == cluster) & 
                                (df['category'] == interested_category)].iloc[0:5][
            ['venue_name', 'location', 'latitude', 'longitude', 'category']
        ]
        return recommended_venues

    def get(self, request, location, category):
        try:
            db_connection = psycopg2.connect(
                host='localhost',
                database="GamePlanR",
                user="postgres",
                password="jayhind",
                port="5432"
            )
            cursor = db_connection.cursor()

            venue_query = "SELECT * FROM venue_ratings;"
            cursor.execute(venue_query)
            venue_data = cursor.fetchall()
            venue_columns = [desc[0] for desc in cursor.description]
            venue_df = pd.DataFrame(venue_data, columns=venue_columns)

            if 'latitude' in venue_df.columns and 'longitude' in venue_df.columns:
                coords = venue_df[['latitude', 'longitude']]

                kmeans = KMeans(n_clusters=5, init='k-means++', max_iter=300, n_init=10, random_state=0)
                kmeans.fit(coords)
                venue_df['cluster'] = kmeans.predict(coords)

                top_venue = venue_df.sort_values(by='avg_rating', ascending=False)

                lat, long = self.get_lat_long_from_location(location)
                if lat is not None and long is not None:
                    recommendations = self.recommend_venue_with_category(top_venue, lat, long, category, kmeans)

                    recommendations_data = recommendations.to_dict(orient='records')

                    response_data = {
                        'User Location': location,
                        'Interested Category': category,
                        'Recommended Venues': recommendations_data
                    }

                    return Response(response_data)

                else:
                    return Response({'error': 'Invalid location'}, status=400)

            else:
                return Response({'error': 'Latitude and Longitude columns are missing in the data.'}, status=400)

        except Exception as e:
            return Response({'error': str(e)}, status=500)

        finally:
            if 'cursor' in locals():
                cursor.close()
            if 'db_connection' in locals():
                db_connection.close()
