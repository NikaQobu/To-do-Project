from django.contrib import admin
from django.urls import path
from . import views  

urlpatterns = [
    path('change_password', views.change_password, name="change_password"),
    path('check_profile_info', views.check_profile_info, name="check_profile_info"),
    path('change_profile_info', views.change_profile_info, name="cchange_profile_info"),
    path('get_profile_image/<str:user>', views.get_profile_image, name="get_profile_image")
]