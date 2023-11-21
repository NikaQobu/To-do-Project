
from django.db import models
from AuthApp.models import Users

class UserProfile(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures/', default='default.jpeg')
 
    def __str__(self):
        return self.user.username