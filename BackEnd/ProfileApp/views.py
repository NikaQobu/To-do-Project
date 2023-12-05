from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.contrib.auth.hashers import check_password, make_password
from AuthApp.models import Users
from AuthApp.validations import Validations
from ProfileApp.models import UserProfile 
import json
import os


def upload_profile_img(request):
    if request.method == "POST":
        try:
            user = request.POST.get("user")
            uploaded_file = request.FILES.get("file")
            registered_user = Users.objects.filter(user=user).first()  # Assuming 'user' is the username

            if registered_user:
                user_profile = UserProfile.objects.filter(user_id=registered_user.userid).first()

                if user_profile and uploaded_file:
                    old_profile_picture = user_profile.profile_picture.path
                    if os.path.exists(old_profile_picture) and os.path.basename(old_profile_picture) != 'default.jpeg':
                        os.remove(old_profile_picture)

                    # Save the uploaded file to the 'media/profile_pictures' folder
                    file_path = f"{uploaded_file.name}"  # Adjust the path as needed
                    user_profile.profile_picture = file_path
                    user_profile.save()

                    with open(f"media/{file_path}", 'wb+') as destination:
                        for chunk in uploaded_file.chunks():
                            destination.write(chunk)

                    data = {
                        "success": True,
                        "message": "User image changed successfully",
                        "status": 200
                    }
                else:
                    data = {
                        "success": False,
                        "message": "Invalid file or user profile",
                        "status": 403
                    }
            else:
                data = {
                    "success": False,
                    "message": "User does not exist",
                    "status": 400
                }

            return JsonResponse(data, status=data.get("status"))
        except Exception as e:
            data = {
                "success": False,
                "message": str(e),
                "status": 409
            }
            return JsonResponse(data, status=data.get("status"))
    else:
        data = {
            "success": False,
            "message": "Invalid request method",
            "status": 400
        }
        return JsonResponse(data, status=data.get("status"))
    
    
def get_profile_image(request, user):
    if request.method == "GET":
            try:
                registered_user = Users.objects.filter(user=user).first()  # Assuming 'user' is the username

                if registered_user:
                    user_profile = UserProfile.objects.filter(user_id=registered_user.userid).first()
                    profile_image = user_profile.profile_picture.url if user_profile.profile_picture else None
                    if user_profile:
                        data = {
                            "success": True,
                            "userImage": profile_image,
                            "message": "User image got successfully",
                            "csrf_token": get_token(request),
                            "status": 200
                         }
                    else:
                        data = {
                            "success": False,
                            "message": "User profile is not correct",
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
                return JsonResponse(data, status=data.get("status"))
            except Exception as e:
                data = {
                    "success": False,
                    "message": str(e),
                    "status": 409
                }
                return JsonResponse(data, status=data.get("status"))
    else:
        data = {
            "success": False,
            "message": "Invalid request method",
            "status": 400
        }
        return JsonResponse(data, status=data.get("status")) 

def check_profile_info(request):
    if request.method == "POST":
        try:
            response = json.loads(request.body.decode("utf-8"))
            name = response.get("name")
            lastName = response.get("lastname")
            phone = response.get("phone")
            user = response.get("user")


            if Validations.is_valid_name(name) == False:
                data = {
                    "success": False,
                    "message": "name is invalid",
                    "csrf_token": get_token(request),
                    "status": 400
                } 
            elif Validations.is_valid_lastname(lastName) == False:
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
            else:
                data = {
                    "success": True,
                    "message": "New informations is valid",
                    "csrf_token": get_token(request),
                    "status": 200
                }
            return JsonResponse(data, status=data.get("status"))
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

def change_password(request):
    if request.method == "POST":
        try:
            response = json.loads(request.body.decode("utf-8"))
            current_password = response.get("currentPassword")
            new_password = response.get("newPassword")
            user = response.get("user")
            
            registered_user = Users.objects.filter(user=user).first()  # Assuming 'user' is the username

            if registered_user:
                if check_password(current_password, registered_user.password):  # Check current password
                    registered_user.password = make_password(new_password)  # Set new password
                    registered_user.save()  # Save the updated password
                    data = {
                        
                        "success": True,
                        "message": "Password changed successfully",
                        "csrf_token": get_token(request),
                        "status": 200
                    }
                else:
                    data = {
                        "success": False,
                        "message": "Current password is incorrect",
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
            return JsonResponse(data, status=data.get("status"))
            
        except Exception as e:
            data = {
                "success": False,
                "message": str(e),
                "status": 409
            }
            return JsonResponse(data, status=data.get("status"))

    else:
        data = {
            "success": False,
            "message": "Invalid request method",
            "status": 400
        }
        return JsonResponse(data, status=data.get("status"))    
    
def change_profile_info(request):
    if request.method == "POST":
            try:
                response = json.loads(request.body.decode("utf-8"))
                name = response.get("name")
                lastname = response.get("lastname")
                phone = response.get("phone")
                user = response.get("user")
                password = response.get("password")
                registered_user = Users.objects.filter(user=user).first()  # Assuming 'user' is the username

                if registered_user:
                    if check_password(password, registered_user.password):
                        if registered_user.name != name:
                            registered_user.name = name
                        if registered_user.phone != phone:
                            registered_user.phone = phone
                        if registered_user.lastname != lastname:
                            registered_user.lastname = lastname
                        registered_user.save()
                        data = {
                            "user_info": {
                            "user": registered_user.user,
                            "name": registered_user.name,
                            "lastname": registered_user.lastname,
                            "phone": registered_user.phone
                            },
                            "success": True,
                            "message": "User informations changed successfully",
                            "csrf_token": get_token(request),
                            "status": 200
                         }
                    else:
                        data = {
                            "success": False,
                            "message": "Password is incorrect",
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
                return JsonResponse(data, status=data.get("status"))
            except Exception as e:
                data = {
                    "success": False,
                    "message": str(e),
                    "status": 409
                }
                return JsonResponse(data, status=data.get("status"))
    else:
        data = {
            "success": False,
            "message": "Invalid request method",
            "status": 400
        }
        return JsonResponse(data, status=data.get("status"))   