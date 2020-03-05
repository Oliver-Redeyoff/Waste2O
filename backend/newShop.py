from google.cloud import firestore
import json

def add_shop(request):
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
        name = request_json.get("name", "")
        description = request_json.get("description", "")
        image = request_json.get("image", "")

        if address == "" or name == "" or description == "" or image == "":
            return('invalid-request', 400, headers)

        db = firestore.Client()
        collection_name = "shops"

        doc = db.collection(collection_name).document(address).get()

        if doc.exists:
            return('shop-exists', 400, headers)

        newShop = {"address": address, "name": name, "description": description, "image": image, "products": []}
        db.collection(collection_name).document(address).set(newShop)

        return('success', 200, headers)
    except Exception as e:
        return(str(e), 400, headers)
