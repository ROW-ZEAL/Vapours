import psycopg2
from GamePlanR.helper import execute_query_and_map_results

def api_user_select_category(request, Games):
    Select_category_results = api_select_category(request, Games)
    
    return {
        "Select_category_results": Select_category_results
    }

def api_select_category(request, Games):
    print('Category:', Games)

    select_category_query = """
          SELECT * FROM venue WHERE category = %s ORDER BY id;
    """
    
    return list(execute_query_and_map_results(select_category_query, (Games,)))

