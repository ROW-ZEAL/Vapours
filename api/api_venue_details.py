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

        cursor = db_connection.cursor()

        # Query to get the next available ID
        cursor.execute("SELECT COALESCE(MAX(id) + 1, 1) AS next_id FROM venue")
        next_id = cursor.fetchone()[0]

        # SQL insert query
        members_insert_query = """
            INSERT INTO venue (
                id, venue_name,
                category,
                address,
                price,
                selected_facility,
                selected_date
            ) VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        
        # Execute the insert query with the data
        cursor.execute(members_insert_query, (
            next_id,  # Use the next ID for the venue
            venue_name,
            category,
            location,
            price,
            json.dumps(selected_facility),  # Store selected_facility as JSON in the database
            selected_date
        ))

        # Commit the transaction
        db_connection.commit()

        # Close the cursor and connection
        cursor.close()
        db_connection.close()

        # Return a success response
        context = {
            'status': 'success',
        }

    except (Exception, psycopg2.DatabaseError) as error:
        print('Database error:', error)
        context = {
            'status': 'fail',
        }

    # Return the response
    return {'message': 'Form data received successfully', 'context': context}
