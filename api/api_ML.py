from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
from sklearn.cluster import KMeans
import psycopg2

@api_view(['GET'])
def api_recommend(request, user_id):
    try:
        
        db_connection = psycopg2.connect(
            host='localhost',
            database="GamePlanR",
            user="postgres",
            password="jayhind",
            port="5432"
        )

        cursor = db_connection.cursor()

        
        cursor.execute("SELECT * FROM locations;")
        locations_data = cursor.fetchall()
        locations_columns = [desc[0] for desc in cursor.description]
        venue_df = pd.DataFrame(locations_data, columns=locations_columns)

        cursor.execute("SELECT * FROM venue_ratings;")
        ratings_data = cursor.fetchall()
        ratings_columns = [desc[0] for desc in cursor.description]
        ratings_df = pd.DataFrame(ratings_data, columns=ratings_columns)

        
        venue_df = venue_df.merge(ratings_df[['venue_id', 'avg_rating']], on='venue_id', how='left')

        
        coords = venue_df[['latitude', 'longitude']]
        kmeans = KMeans(n_clusters=5, init='k-means++', max_iter=300, n_init=10, random_state=0)
        kmeans.fit(coords)
        venue_df['cluster'] = kmeans.predict(coords)

        
        cursor.execute("SELECT * FROM users WHERE user_id = %s;", (user_id,))
        user_data = cursor.fetchone()

        if not user_data:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        lat = user_data[3]  
        long = user_data[4]  
        location = user_data[2]  
        interested_category = user_data[5] 

        
        user_location = pd.DataFrame({'latitude': [lat], 'longitude': [long]})
        cluster = kmeans.predict(user_location)[0]

        
        recommended_venues = venue_df[(venue_df['cluster'] == cluster) & (venue_df['category'] == interested_category)].iloc[0:5]
        venues_list = recommended_venues[['venue_name', 'location', 'latitude', 'longitude', 'category']].to_dict(orient='records')

        return Response({
            "user_location": {
                "location": location,
                "latitude": lat,
                "longitude": long
            },
            "interested_category": interested_category,
            "recommended_venues": venues_list
        })

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    finally:
        if 'db_connection' in locals() and db_connection:
            db_connection.close()
