# Generated by Django 4.2 on 2023-08-16 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_useraccount_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='profile_image',
            field=models.ImageField(default='https://dmcfse5dawjc0.cloudfront.net/media/default.webp', upload_to='media/profile_image/'),
        ),
    ]
