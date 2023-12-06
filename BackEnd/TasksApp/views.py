from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import JsonResponse
from AuthApp.models import Users
from TasksApp.models import Tasks
from django.utils import timezone
import json

def edit_task(request):
    if request.method == "POST":
        try:
            response = json.loads(request.body.decode("utf-8"))
            title = response.get("title")
            deadline = response.get("deadline")
            priority = response.get("priority")
            description = response.get("description")
            task_id = response.get("taskId")
            task = Tasks.objects.filter(taskid=task_id).first()
            

            if task:
                task.title = title
                task.deadline = deadline
                task.priority = priority
                task.description = description
                task.save()
                data = {
                    "success": True,
                    "message": "Task information updated successfully",
                    "csrf_token": get_token(request),
                    "status": 200
                }
            else:
                data = {
                    "success": False,
                    "message": "Task does not exist",
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



def get_task(request,taskid):
    if request.method == "GET":
        try:
            task = Tasks.objects.filter(taskid=taskid).first()
            if task:
                data = {
                    "success": True,
                    "taskInfo": {
                        "title" : task.title,
                        "deadline": task.deadline,
                        "description": task.description,
                        "priority": task.priority,
                        "userId": task.user_id,
                        "status": task.status
                    },
                    
                    "message": "Tasks got successfully",
                    "csrf_token": get_token(request),
                    "status": 200
                    }
            else:
                data = {
                    "success": False,
                    "message": "Task does not exist",
                    "csrf_token": get_token(request),
                    "status": 403
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

def get_tasks(request,user):
    if request.method == "GET":
        try:
            registered_user = Users.objects.filter(user=user).first()
            tasks = Tasks.objects.filter(user_id=registered_user.userid)
            current_date = timezone.now().date() 
            active_tasks = []
            complated_tasks = []
            notification_tasks = []
            for task in tasks:
                info = {
                    "taskID": task.taskid,
                    "title": task.title,
                    "deadline": task.deadline,
                    "description": task.description,
                    "priority": task.priority,
                    "status": task.status
                }
                if task.status == "active":
                    active_tasks.append(info)
                    if task.deadline <= current_date: 
                        notification_tasks.append(info)
                else:
                    complated_tasks.append(info)
                    
                    
                
                
            data = {
                "success": True,
                "active_tasks": active_tasks,
                "complated_tasks": complated_tasks,
                "notification_tasks": notification_tasks,
                "message": "Tasks got successfully",
                "csrf_token": get_token(request),
                "status": 200
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
     
def add_task(request):
    if request.method == "POST":
        try:
            response = json.loads(request.body.decode("utf-8"))
            title = response.get("title")
            deadline = response.get("deadline")
            priority = response.get("priority")
            description = response.get("description")
            user = response.get("user")
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

def delete_task(request,taskid):
    if request.method == "GET":
        try:
            task = Tasks.objects.filter(taskid=taskid).first()
            if task:
                task.delete()
                data = {
                    "success": True,
                    "message": "Tasks deleted successfully",
                    "csrf_token": get_token(request),
                    "status": 200
                    }
            else:
                data = {
                    "success": False,
                    "message": "Task does not exist",
                    "csrf_token": get_token(request),
                    "status": 403
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

def change_task_status(request):
    if request.method == "POST":
        try:
            response = json.loads(request.body.decode("utf-8"))
            taskid= response.get("taskid")
            status = response.get("status")
            task = Tasks.objects.filter(taskid=taskid).first()
            if task:
                task.status = status
                task.save()
                data = {
                    "success": True,
                    "message": "Task status changed successfully",
                    "csrf_token": get_token(request),
                    "status": 200
                    }
            else:
                data = {
                    "success": False,
                    "message": "Task does not exist",
                    "csrf_token": get_token(request),
                    "status": 403
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
