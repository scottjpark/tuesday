# Generated by Django 4.2 on 2023-11-07 22:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_useraccount_twitter_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='twitter_username',
        ),
    ]
