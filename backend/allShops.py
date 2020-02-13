from google.cloud import firestore
import json

def get_shops(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    request_json = request.get_json()
    headers = {
        'Access-Control-Allow-Origin': '*',
    }
    request_json = request.get_json()
    
    try:
        collection_path = "shops"
        db = firestore.Client()
        doc = db.collection(collection_path).stream()
        dic = []
        for i in doc:
            i = i.to_dict()
            thisDic = {"name": i["name"], "address": i["address"]}
            dic.append(thisDic)
        
    except Exception as e:
        return(str(e), 500, headers)
    return(json.dumps(dic), 200, headers)
