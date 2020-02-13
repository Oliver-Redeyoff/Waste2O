import hashlib
import os
from google.cloud import firestore
import json

def create_account(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    # Set CORS headers for the preflight request
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
        email = request_json.get("email", "")
        password = request_json.get("password", "")
        account_type = request_json.get("type", "")
        
        if email == "" or password == "" or account_type == "":
            return("invalid-request", 400, headers)
        
        collection_path = "users"
        
        db = firestore.Client()
        
        doc = db.collection(collection_path).document(email).get()
        
        if doc.exists:
            return("account-exists", 400, headers)
        
        salt = os.urandom(32)
        key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
        
        dic = {"email": email, "password": key, "salt": salt, "type": account_type}
        db.collection(collection_path).document(email).set(dic)
        return("it worked", 200, headers)
    except Exception as e:
        return(str(e), 500, headers)
