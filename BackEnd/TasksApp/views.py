from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import JsonResponse
from AuthApp.models import Users
from TasksApp.models import Tasks
import json


def add_task(request):
    if request.method == "POST":
        try:
            response = json.loads(request.body.decode("utf-8"))
            title = response.get("title")
            deadline = response.get("deadline")
            priority = response.get("priority")
            description = response.get("description")
            user = response.get("user")
            print(title,deadline,priority,description,user)
            registered_user = Users.objects.filter(user=user).first()

            if registered_user:
                Tasks.objects.create(
                    title=title,
                    deadline=deadline,
                    user=registered_user,
                    priority=priority,
                    description=description
                )
                data = {
                    "success": True,
                    "message": "Task added successfully",
                    "csrf_token": get_token(request),
                    "status": 200
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

