from django.shortcuts import render
from rest_framework.response import Response
from .api_venue_details import api_venue_details
from .api_selected_category import api_user_select_category
from rest_framework.decorators import api_view
from .api_location import api_user_select_category_with_address
from .booking_history import api_booking_data,api_user_booking
from .api_edit_profile import api_edit_user_profile
from .api_ML import api_recommend

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
def api_recommend_ml(request, user_id):
    return api_recommend(request, user_id)

@api_view(['GET'])
def api_category_with_address(request, categoryName, address):
    return Response(api_user_select_category_with_address(request=request, Games=categoryName, address=address))






from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from sklearn.cluster import KMeans
import pandas as pd
import psycopg2

class VenueRecommendationView(APIView):
    def get(self, request, user_id):
        try:
            # Connect to the PostgreSQL database
            db_connection = psycopg2.connect(
                host='localhost',
                database="GamePlanR",
                user="postgres",
                password="jayhind",
                port="5432"
            )

            cursor = db_connection.cursor()

            # Execute query to fetch data from 'locations' table
            query_locations = "SELECT * FROM locations;"
            cursor.execute(query_locations)
            locations_data = cursor.fetchall()
            locations_columns = [desc[0] for desc in cursor.description]
            venue_df = pd.DataFrame(locations_data, columns=locations_columns)

            # Execute query to fetch data from 'venue_ratings' table
            query_ratings = "SELECT * FROM venue_ratings;"
            cursor.execute(query_ratings)
            ratings_data = cursor.fetchall()
            ratings_columns = [desc[0] for desc in cursor.description]
            ratings_df = pd.DataFrame(ratings_data, columns=ratings_columns)

            # Merge locations and ratings data on 'venue_id'
            venue_df = venue_df.merge(ratings_df[['venue_id', 'avg_rating']], on='venue_id', how='left')

            # Clustering with KMeans
            coords = venue_df[['latitude', 'longitude']]
            kmeans = KMeans(n_clusters=5, init='k-means++', max_iter=300, n_init=10, random_state=0)
            kmeans.fit(coords)
            venue_df['cluster'] = kmeans.predict(coords)

            # Execute query to fetch data from 'users' table
            query_users = "SELECT * FROM users;"
            cursor.execute(query_users)
            users_data = cursor.fetchall()
            users_columns = [desc[0] for desc in cursor.description]
            user_df = pd.DataFrame(users_data, columns=users_columns)

            # Get the user data
            user_data = user_df[user_df['user_id'] == int(user_id)].iloc[0]
            lat = user_data['latitude']
            long = user_data['longitude']
            location = user_data['location']
            interested_category = user_data['interested_category']

            # Predict cluster for the user's location
            user_location = pd.DataFrame({'latitude': [lat], 'longitude': [long]})
            cluster = kmeans.predict(user_location)[0]

            # Filter by cluster and interested category
            recommended_venues = venue_df[(venue_df['cluster'] == cluster) & (venue_df['category'] == interested_category)].iloc[0:5][
                ['venue_name', 'location', 'latitude', 'longitude', 'category']]

            # Manually format the response data as a list of dictionaries
            recommended_venues_list = recommended_venues.to_dict(orient='records')

            # Return the recommendations in JSON format
            return Response({
                'user_location': {
                    'location': location,
                    'latitude': lat,
                    'longitude': long
                },
                'interested_category': interested_category,
                'recommended_venues': recommended_venues_list
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            if 'db_connection' in locals() and db_connection:
                db_connection.close()
