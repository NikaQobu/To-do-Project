# Generated by Django 4.2.7 on 2023-11-13 19:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AuthApp', '0004_remove_users_id_alter_users_userid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='userid',
            field=models.AutoField(primary_key=True, serialize=False, unique=True),
        ),
    ]
