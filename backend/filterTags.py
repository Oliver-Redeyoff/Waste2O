from google.cloud import firestore
import json

def filter_tags(request):
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
        tag = request_json.get("tag", "").lower()
        address = request_json.get("address", "")
        
        if tag == "" or address == "":
            return('invalid-request', 400, headers)
        
        collection_path = "shops"
        db = firestore.Client()
        
        doc = db.collection(collection_path).document(address).get()
        
        if not doc.exists:
            return("shop-doesn't-exist", 400, headers)

        dic = doc.to_dict()
        products = []
        for prod in dic["products"]:
            if tag in map(str.lower, prod["tags"]):
                products.append(prod)
        
        dic["products"] = products
                
            
    except Exception as e:
        return(str(e), 500, headers)
    
    return(json.dumps(dic), 200, headers)
