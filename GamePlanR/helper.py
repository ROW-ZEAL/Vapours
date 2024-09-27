from django.db import connection, connections

def execute_query(query_string, *query_args, database='default', cursor=None, **query_kwargs):
    if not cursor:
        cursor = connections[database].cursor()
    if query_kwargs:
        cursor.execute(query_string, query_kwargs)
    else:
        cursor.execute(query_string, query_args)
    return cursor

def execute_query_and_map_results(query_string, *query_args, database='default', cursor=None, **query_kwargs):
    """
    Executes a query and maps the results to a list of dictionaries.
    Each dictionary represents a row, with column names as keys.
    """
    print('Executing Query:', query_string)
    print('With Parameters:', query_args)

    if not cursor:
        cursor = connections[database].cursor()

    # Adjust the execution to unpack query_args correctly
    if query_kwargs:
        cursor.execute(query_string, query_kwargs)
    else:
        cursor.execute(query_string, query_args if len(query_args) > 1 else query_args[0])

    columns = [col[0] for col in cursor.description]
    
    # Fetch all results and map to dictionaries
    results = []
    for row in cursor.fetchall():
        results.append(dict(zip(columns, row)))

    return results

def execute_query_fetch_all(query_string, *query_args, database='default', cursor=None, **query_kwargs):
    if not cursor:
        cursor = connections[database].cursor()

    if query_kwargs:
        cursor.execute(query_string, query_kwargs)
    else:
        cursor.execute(query_string, query_args if len(query_args) > 1 else query_args[0])

    return cursor.fetchall()
