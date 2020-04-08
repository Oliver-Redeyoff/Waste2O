from google.cloud import firestore
import json

def add_product(request):
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
        product_type = request_json.get("type", "")
        name = request_json.get("name", "")
        description = request_json.get("description", "")
        tags = request_json.get("tags", "")
        packaging = request_json.get("packaging", "")
        owner_added = request_json.get("ownerAdded", "")
        address = request_json.get("address", "")
        
        
        if product_type == "" or name == "" or description == "" or tags == "" or packaging == "" or owner_added == "" or address == "":
            return('invalid-request', 400, headers)
        
        db = firestore.Client()
        collection_name = "shops"
        
        doc = db.collection(collection_name).document(address).get()
        
        if not doc.exists:
            return('invalid-shop', 400, headers)
        
        dic = doc.to_dict()
        
        for prod in dic["products"]:
            if prod["name"] == name:
                return('product-exists', 400, headers)
        
        productDict = {"type": product_type, "name": name, "description": description, "tags": tags, "packaging": packaging, "rating": 0, "owner_added": owner_added}
        dic["products"].append(productDict)
        
        db.collection(collection_name).document(address).set(dic)
        return('success', 200, headers)
    except Exception as e:
        return(str(e), 400, headers)
        
