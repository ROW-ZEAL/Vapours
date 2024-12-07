import psycopg2
from rest_framework.response import Response
from rest_framework import status

def execute_query_and_map_results(query, params):
    connection = None
    cursor = None
    try:
        # Establish the database connection
        connection = psycopg2.connect(
            host="127.0.0.1",
            database="GamePlanR",
            user="postgres",
            password="jayhind",
            port="5432"
        )
        cursor = connection.cursor()
        cursor.execute(query, params)

        # For non-SELECT queries, commit and return success message
        if cursor.description is None:
            connection.commit()
            return {"message": "Update successful", "rows_affected": cursor.rowcount}
        
        # For SELECT queries, return results
        columns = [col[0] for col in cursor.description]
        results = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return results
    except Exception as e:
        print(f"Error executing query: {e}")
        raise
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
def api_user_select_slots_reserved(request, Games, date,slots):
    print('Category:', Games)
    print('Date:', date)
    print('slots:', slots)

    reserved_slots_query = """
         UPDATE schedule_bookings
SET status = 'reserved'
WHERE venue_name = %s 
  AND booking_date = %s 
  AND reserved_slots = %s;
 ;
    """
    
    result = execute_query_and_map_results(reserved_slots_query, (Games, date,slots))
    return result  # Will include a success message
