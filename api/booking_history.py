import json
import psycopg2
from GamePlanR.helper import execute_query_and_map_results
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
import json

def api_booking_data(data):
    # Extracting data from the request
    futsal_name = data.get('futsal_name')
    selected_slot = data.get('selected_slot')
    booking_date = data.get('booking_date')
    contact_person = data.get('contact_person')
    contact_number = data.get('contact_number')
    address = data.get('address')
    token=data.get('booking_token')
    user_name = data.get('user_name')
    user_email = data.get('user_email')
    user_phone_number = data.get('user_phone')

    # Printing the data to the console (for debugging purposes)
    print('futsal_name:', futsal_name)
    print('selected_slot:', selected_slot)
    print('booking_date:', booking_date)
    print('contact_person:', contact_person)
    print('contact_number:', contact_number)
    print('address:', address)
    print('token:', token)
    print('user_name:', user_name)
    print('user_email:', user_email)
    print('user_phone_number:', user_phone_number)

    try:
        # Connect to the PostgreSQL database
        db_connection = psycopg2.connect(
            host='localhost',
            database="GamePlanR",
            user="postgres",
            password="jayhind",
            port="5432"
        )
        db_connection.autocommit = True
        cursor = db_connection.cursor()
        
        # Corrected SQL insert query
        booking_insert_query = """
            INSERT INTO booking_history (
                futsal_name,
                selected_slot,
                booking_date,
                contact_person,
                contact_number,
                address,
                user_name,
                user_email,
                user_number,
                token

            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s,%s)
        """
        
        cursor.execute(booking_insert_query, (
            futsal_name,
            selected_slot,
            booking_date,
            contact_person,
            contact_number,
            address,
            user_name,
            user_email,
            user_phone_number,
            token

        ))

        # Commit the transaction
        db_connection.commit()
        cursor.close()
        db_connection.close()

        context = {
            'status': 'success',
        }

    except (Exception, psycopg2.DatabaseError) as error:
        print('Database error:', error)
        context = {
            'status': 'fail',
        }
    
    # Responding with a success message
    return {'message': 'Booking data inserted successfully', 'context': context}



def api_user_booking(request, name):
    print('user name:', name)

    select_category_query = """
          select * from booking_history WHERE user_name = %s ORDER BY id;
    """
    
    return list(execute_query_and_map_results(select_category_query, (name,)))