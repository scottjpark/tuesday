# Generated by Django 4.2 on 2023-08-16 18:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_alter_useraccount_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='profile_image',
            field=models.ImageField(null=True, upload_to='media/profile_image/'),
        ),
    ]
