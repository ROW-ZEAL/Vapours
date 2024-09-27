import json
import psycopg2

def api_venue_details(data):
    # Extracting data from the request
    venue_name = data.get('venueName')
    category = data.get('category')
    location = data.get('location')
    price = data.get('price')
    selected_facility = json.loads(data.get('selectedFacilities', '[]'))
    selected_date = data.get('selectedDate')

    # Printing the data to the console (for debugging purposes)
    print('Venue Name:', venue_name)
    print('Category:', category)
    print('Location:', location)
    print('Price:', price)
    print('Selected Facility:', selected_facility)
    print('Selected Date:', selected_date)

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
        
        # SQL insert query
        members_insert_query = """
            INSERT INTO venue (
                venue_name,
                category,
                address,
                price,
                selected_facility,
                selected_date
            ) VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(members_insert_query, (
            venue_name,
            category,
            location,
            price,
            selected_facility,
            selected_date
        ))
        
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
    return {'message': 'Form data received successfully', 'context': context}
