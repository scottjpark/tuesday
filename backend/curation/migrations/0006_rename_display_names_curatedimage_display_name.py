# Generated by Django 4.2 on 2023-11-04 22:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('curation', '0005_rename_artistnickname_displayname_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='curatedimage',
            old_name='display_names',
            new_name='display_name',
        ),
    ]
