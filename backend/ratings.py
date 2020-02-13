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
    request_json = request.get_json()
    
    try:
        address = request_json.get("address", "")
        product = request_json.get("product", "")
        rating = request_json.get("rating", "")
        
        if address == "" or product == "" or rating == "":
            return('no-product', 400)
        
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
                    return("invalid rating passed", 400)
                prod["rating"] = current_rating
                print("rating now is {} ".format(prod["rating"]))
                break
        print(dic)
        db.collection(collection_name).document(address).set(dic)
        return("it worked", 200)
    except Exception as e:
        return (str(e), 500)