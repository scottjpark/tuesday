# Generated by Django 4.2 on 2023-10-28 22:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_alter_useraccount_profile_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='twitter_username',
            field=models.CharField(default='', max_length=255, unique=True),
        ),
    ]
