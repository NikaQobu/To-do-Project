# Generated by Django 4.2.7 on 2023-11-21 18:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('AuthApp', '0010_users_profile_picture'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='users',
            name='profile_picture',
        ),
    ]