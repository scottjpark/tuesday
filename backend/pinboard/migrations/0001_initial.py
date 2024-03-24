# Generated by Django 4.2 on 2024-03-22 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Pin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('response', models.CharField(max_length=255, null=True, unique=True)),
                ('image', models.ImageField(null=True, upload_to='media/pinboard/')),
                ('submitter', models.CharField(default='Unknown', max_length=255)),
                ('usage', models.DecimalField(decimal_places=0, default=0, max_digits=6)),
                ('random', models.BooleanField(default=True)),
            ],
        ),
    ]
