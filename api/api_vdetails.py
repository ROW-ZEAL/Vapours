import json
import psycopg2
def get_vdetails(name):
    print(name)
    try:
        db_connection = psycopg2.connect(
            host='localhost',
            database="GamePlanR",
            user="postgres",
            password="jayhind",
            port="5432"
        )

        cursor = db_connection.cursor()

        cursor.execute("""select * from "Account_user" au where name=%s""",(name,))
        user_id = cursor.fetchone()[0]

        print(user_id)
        query = "SELECT * FROM venue WHERE user_id = %s"
        cursor.execute(query, (user_id,))
        venues = cursor.fetchall()

        venue_names = [v[1] for v in venues]  

        cursor.close()
        db_connection.close()

        return venue_names  

    except (Exception, psycopg2.DatabaseError) as error:
        print('Database error:', error)
        return None
