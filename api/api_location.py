from GamePlanR.helper import execute_query_and_map_results

def api_user_select_category_with_address(request, Games, address):
    Select_category_results_with_address = api_select_category_with_address(request, Games, address)
    
    return {
        "Select_category_results_with_address": Select_category_results_with_address
    }


def api_select_category_with_address(request, Games, address):
    select_category_address_query = """
        SELECT * FROM venue 
        WHERE address = %s AND category= %s
        ORDER BY id;
    """
    
    print('SQL Query:', select_category_address_query)
    print('Games (category):', Games.strip())
    print('Address:', address.strip())
    return list(execute_query_and_map_results(select_category_address_query, (address, Games)))
