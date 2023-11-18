# models.py
from django.db import models
class Users(models.Model):
    userid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    user = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    is_logged_in = models.BooleanField(default=False)
    
    
    def __str__(self):
        return self.userid
