import json
import psycopg2

def api_slots_insertion(data):
    
    user_name = data.get('ownerName')
    venue_name = data.get('venueName')
    time = data.get('slotTime')
    status = data.get('status')
    selected_date = data.get('bookingDate')


    print('username:', user_name)
    print('Venue Name:', venue_name)
    print('Category:', time)
    print('Status:', status)
    print('Selected Date:', selected_date)

    try:
        
        db_connection = psycopg2.connect(
            host='localhost',
            database="GamePlanR",
            user="postgres",
            password="jayhind",
            port="5432"
        )

        cursor = db_connection.cursor()

        cursor.execute("SELECT * FROM venue WHERE venue_name=%s", (venue_name,))
        Venue_id = cursor.fetchone()[0]

        print(Venue_id)

        cursor.execute("SELECT MAX(slot_id) + 1 AS slot_id FROM schedule_bookings;")
        slot_id = cursor.fetchone()[0]
        print(slot_id)

        
        members_insert_query = """
            INSERT INTO schedule_bookings(slot_id, venue_id, booking_date, reserved_slots, status, venue_name)
            VALUES (%s, %s, %s, %s, %s, %s)
        """

        
        cursor.execute(members_insert_query, (
            slot_id,
            Venue_id,
            selected_date,
            time,
            status,
            venue_name,
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

    
    return {'message': 'Form data received successfully', 'context': context}

