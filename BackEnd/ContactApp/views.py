from django.http import JsonResponse
from django.middleware.csrf import get_token
from ContactApp.validations import Validations
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
import json

@csrf_exempt
def send_email(request):
    if request.method == "POST":
        try:
            response = json.loads(request.body)
            name = response.get("name")
            message = response.get("message")
            email = response.get("email")
            from_email = "nikakobuladze7@gmail.com"
            #print(name, message, email)  
            
            if Validations.is_valid_name(name) == False:
                    data = {
                        "success": False,
                        "message": "name is invalid",
                        "csrf_token": get_token(request),
                        "status": 400
                    } 
            elif Validations.is_valid_message(message) == False:
                data = {
                        "success": False,
                        "message": "message is invalid",
                        "csrf_token": get_token(request),
                        "status": 400
                    } 
            elif Validations.is_valid_email(email) == False:
                data = {
                        "success": False,
                        "message": "email is invalid",
                        "csrf_token": get_token(request),
                        "status": 400
                    } 
            else:
                send_mail(name, message, from_email, email)
                data = {
                        "success": True,
                        "message": "Email received successfully",
                        "csrf_token": get_token(request),
                        "status": 200
                    }
            return JsonResponse(data, status = data.get("status"))
            
            
            
            
        except Exception as e:
            data = {
                "success": False,
                "message": str(e),
                "status": 409
            }
            return JsonResponse(data, status = data.get("status"))
        
    data = {
    "success": False,
    "message": "Invalid request method",
    "status": 400
    }
    return JsonResponse(data, status = data.get("status"))