# Generated by Django 4.2 on 2023-11-11 22:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('curation', '0006_rename_display_names_curatedimage_display_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='curatedimage',
            name='nsfw',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='curatedimage',
            name='private',
            field=models.BooleanField(default=True),
        ),
    ]
