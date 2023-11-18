# Generated by Django 4.2.7 on 2023-11-16 20:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('AuthApp', '0009_users_is_logged_in'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tasks',
            fields=[
                ('taskid', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('deadline', models.DateField()),
                ('description', models.TextField()),
                ('priority', models.CharField(choices=[('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High')], max_length=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='AuthApp.users')),
            ],
        ),
    ]
