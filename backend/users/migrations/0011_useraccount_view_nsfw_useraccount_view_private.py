# Generated by Django 4.2 on 2023-12-10 02:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0010_remove_useraccount_twitter_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='view_nsfw',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='useraccount',
            name='view_private',
            field=models.BooleanField(default=True),
        ),
    ]
