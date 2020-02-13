from google.cloud import firestore
import json

def ratings(request):
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
    
    try:
        address = request_json.get("address", "")
        product = request_json.get("product", "")
        rating = request_json.get("rating", "")
        
        if address == "" or product == "" or rating == "":
            return('invalid-request', 400, headers)
        
        db = firestore.Client()
        
        collection_name = "shops"
        
        doc = db.collection(collection_name).document(address).get()
        
        if not doc.exists:
            return("shop-doesn't-exist", 400, headers)
        
        dic = doc.to_dict()
        
        print(dic["products"])
        print(len(dic["products"]))
        
        for prod in dic["products"]:
            print(prod["name"])
            print(product)
            if prod["name"] == product:
                current_rating = prod["rating"]
                print(type(current_rating))
                if rating == "up":
                    current_rating += 1
                elif rating == "down":
                    current_rating -= 1
                else:
                    return("invalid rating passed", 400, headers)
                prod["rating"] = current_rating
                db.collection(collection_name).document(address).set(dic)
                return("success", 200, headers)
        return("item-doesn't-exist", 400, headers)
        
    except Exception as e:
        return (str(e), 500)