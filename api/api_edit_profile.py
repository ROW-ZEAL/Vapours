import psycopg2
from rest_framework.response import Response
from rest_framework import status

def api_edit_user_profile(request, name, names, email, number):
    print('User name:', name)
    print('Updated name:', names)
    print('Email:', email)
    print('Phone number:', number)

    try:
        db_connection = psycopg2.connect(
            host="127.0.0.1",
            database="GamePlanR",
            user="postgres",
            password="jayhind",
            port="5432"
        )
        cursor = db_connection.cursor()

        
        edit_user_details_query = """
        UPDATE "Account_user"
        SET
            "name" = %s,
            "email" = %s,
            "phone_number" = %s
        WHERE "name" = %s;
        """
        
        
        cursor.execute(edit_user_details_query, (names, email, number, name))

        
        db_connection.commit()

        
        rows_affected = cursor.rowcount
        print(f"Rows affected: {rows_affected}")
        
        
        cursor.close()
        db_connection.close()

        
        if rows_affected > 0:
            return Response(
                {"message": "Profile updated successfully."}, 
                status=status.HTTP_200_OK
            )
        else:
            
            return Response(
                {"error": "No user found with the given name."}, 
                status=status.HTTP_404_NOT_FOUND
            )

    except (Exception, psycopg2.DatabaseError) as error:
        
        print(f"Error: {error}")
        return Response(
            {"error": "Failed to update profile."}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
