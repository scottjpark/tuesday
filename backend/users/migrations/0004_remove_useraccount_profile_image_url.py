# Generated by Django 4.2 on 2023-08-09 21:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_useraccount_profile_image_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='profile_image_url',
        ),
    ]
