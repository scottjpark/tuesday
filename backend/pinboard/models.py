from django.db import models

class Pin(models.Model):
    name = models.CharField(max_length=255, unique=True, null=False)
    response = models.CharField(null=True)
    image = models.ImageField(
        upload_to=f'media/pinboard/', null=True
    )
    submitter = models.CharField(max_length=255, null=False, default='Unknown')
    usage = models.DecimalField(max_digits=6, decimal_places=0, default=0)
    random = models.BooleanField(null=False, default=True)