import psycopg2
from GamePlanR.helper import execute_query_and_map_results

def api_user_select_slots(request, Games,date):
    Select_slots_results = api_select_slots(request, Games,date)
    
    return {
        "Select_slots_results": Select_slots_results
    }

def api_select_slots(request, Games,date):
    print('Category:', Games)
    print('date:',date)

    select_slots_query = """
         SELECT 
    v.id,
    v.venue_name,
    v.category,
    v.address,
    v.price,
    v.photo_url,
    v."name",
    v.googlemaps_urls,
    v.ph_no,
    sb.slot_id,
    sb.venue_id,
    sb.booking_date,
    sb.status ,
    sb.reserved_slots,
    TO_CHAR(sb.reserved_slots, 'HH12:MI AM') AS booking_time_am_pm
FROM 
    venue v
JOIN 
    schedule_bookings sb
ON 
    v.id = sb.venue_id where venue_name = %s and booking_date =%s order by id;
    """
    
    return list(execute_query_and_map_results(select_slots_query, (Games,date,)))

