# Generated by Django 4.2.7 on 2023-11-21 18:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AuthApp', '0009_users_is_logged_in'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='profile_picture',
            field=models.ImageField(default='default.jpg', upload_to='profile_pictures/'),
        ),
    ]
