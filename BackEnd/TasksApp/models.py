from django.db import models
from AuthApp.models import Users


class Tasks(models.Model):
    taskid = models.AutoField(primary_key=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    deadline = models.DateField()
    description = models.TextField()
    PRIORITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
    ]
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)

    def __str__(self):
        return self.title