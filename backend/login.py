from google.cloud import firestore
import json
import hashlib

def login(request):
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
        email = request_json.get("email", "")
        password = request_json.get("password", "")
        
        if email == "" or password == "":
            return("invalid-request", 400, header)
        
        collection_name = "users"
        db = firestore.Client()
        
        doc = db.collection(collection_name).document(email).get()
        dic = doc.to_dict()
        
        if not doc.exists:
            return("email-doesn't-exist", 400, headers)
        print(dic)
        print(password)
        
        hashedPassword = hashlib.pbkdf2_hmac('sha256',password.encode('utf-8'), dic["salt"], 100000)
        print(hashedPassword)
        
        
        if hashedPassword == dic["password"]:
            return('success', 200, headers)
        else:
            return('wrong-password', 400, headers)
    except Exception as e:
        return(str(e), 400, headers)
