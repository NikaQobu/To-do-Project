from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password,check_password
import json
from .models import Users
from ProfileApp.models import UserProfile
from AuthApp.validations import Validations



#def test(request,id):
#    print(id)
#    return JsonResponse({"gvgv":"dxdxxf", "ასლკდნასკლდას":"ასდასდასდ", "id":id}, status="200", json_dumps_params={'ensure_ascii': False})

@csrf_exempt  # NOTE: This is used to exempt this view from CSRF protection for simplicity. In a production environment, you should handle CSRF properly.
def register(request):
    if request.method == "POST":
        try:
            response = json.loads(request.body.decode("utf-8"))
            name = response.get("name")
            lastName = response.get("lastName")
            phone = response.get("phone")
            user = response.get("user")
            password = response.get("password")
            
            
            if Validations.is_valid_name(name) == False:
                data = {
                    "success": False,
                    "message": "name is invalid",
                    "csrf_token": get_token(request),
                    "status": 400
                } 
            elif Validations.is_valid_name(lastName) == False:
                data = {
                    "success": False,
                    "message": "lastname is invalid",
                    "csrf_token": get_token(request),
                    "status": 400
                } 
            elif Validations.is_valid_user(user) == False:
                data = {
                    "success": False,
                    "message": "user is invalid",
                    "csrf_token": get_token(request),
                    "status": 400
                } 
            elif Validations.is_valid_phone(phone) == False:
                data = {
                    "success": False,
                    "message": "phone is invalid",
                    "csrf_token": get_token(request),
                    "status": 400
                }
            elif Validations.is_valid_password(password) == False:
                data = {
                    "success": False,
                    "message": "password is invalid",
                    "csrf_token": get_token(request),
                    "status": 400
                } 
            else:
                hashed_password = make_password(password) 
                #Users.objects.create(name=name, lastname=lastName, phone=phone, user=user, password=hashed_password)
                
                new_user = Users(name=name, lastname=lastName, phone=phone, user=user, password=hashed_password)
                new_user.save()
                
                user_profile = UserProfile(user=new_user)
                user_profile.save()

                data = {
                    "success": True,
                    "message": "User registered successfully",
                    "message_ge": "დარეგისტრირდა წარმატებით",
                    "csrf_token": get_token(request),
                    "status": 200
                }

            #return JsonResponse(json.dumps(data,ensure_ascii=False), status = data.get("status"), content_type="application/json; charset=utf-8", safe=False)
            return JsonResponse(data, status = data.get("status"))

        except Exception as e:
            data = {
                "success": False,
                "message": str(e),
                "status": 409
            }
            
            user_exists = Users.objects.filter(user=user)
            
            if(user_exists):
                return JsonResponse(data, status = data.get("status"))
            else:
                return JsonResponse(data, status = data.get("status"))

    # Handle GET requests or other methods
    data = {
        "success": False,
        "message": "Invalid request method",
        "status": 400
    }
    return JsonResponse(data, status = data.get("status"))


def login(request):
    if request.method == "POST":
        try:
            response = json.loads(request.body.decode("utf-8"))
            user = response.get("user")
            password = response.get("password")
            
            # Check if user exists
            registered_user = Users.objects.filter(user=user).first()
                
                
            if registered_user:
                
                # Compare hashed passwords
                if check_password(password, registered_user.password):
                    registered_user.is_logged_in = True
                    registered_user.save()
                    data = {
                        "user_info": {
                            "user": registered_user.user,
                            "name": registered_user.name,
                            "lastname": registered_user.lastname,
                            "phone": registered_user.phone
                        },
                        "success": True,
                        "message": "User logged in successfully",
                        "csrf_token": get_token(request),
                        "status": 200
                    }
                else:
                    data = {
                        "success": False,
                        "message": "Username or password is incorrect",
                        "csrf_token": get_token(request),
                        "status": 403
                    }
            else:
                data = {
                    "success": False,
                    "message": "User does not exist",
                    "csrf_token": get_token(request),
                    "status": 400
                }
            return JsonResponse(data, status = data.get("status"))
        
        except Exception as e:
            data = {
                "success": False,
                "message": str(e),
                "status": 500
            }
            return JsonResponse(data,status = data.get("status"))
    data = {
        "success": False,
        "message": "Invalid request method",
        "status": 400
    }
    return JsonResponse(data, status = data.get("status"))

def logout(request):
    if request.method =="POST":
        try:
            response = json.loads(request.body.decode("utf-8"))
            user = response.get("user")
            registered_user = Users.objects.filter(user=user).first()
            if registered_user:
                registered_user.is_logged_in = False
                registered_user.save()
                data = {
                    "success": True,
                    "message": "User logged out successfully",
                    "csrf_token": get_token(request),
                    "status": 200
                }
                return JsonResponse(data, status = data.get("status"))
            else:
                data = {
                    "success": False,
                    "message": "User does not exist",
                    "csrf_token": get_token(request),
                    "status": 400
                }
            return JsonResponse(data, status = data.get("status"))
                
        except Exception as e:
            data = {
                "success": False,
                "message": str(e),
                "status": 500
            }
            return JsonResponse(data,status = data.get("status"))
    data = {
    "success": False,
    "message": "Invalid request method",
    "status": 400
    }
    return JsonResponse(data, status = data.get("status"))

