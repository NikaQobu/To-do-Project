from django.contrib import admin
from django.urls import path
from . import views  

urlpatterns = [
    path('add_task', views.add_task, name="add_task"),
    path('get_tasks/<str:user>/', views.get_tasks, name="get_tasks"),
    path('delete_task/<int:taskid>/', views.delete_task, name="delete_task"),
    path('change_task_status', views.change_task_status, name="change_task_status"),
]