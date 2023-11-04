from django.db import models
from users.models import UserAccount


class Tag(models.Model):
    tag_name = models.CharField(max_length=255, null=True)


class Artist(models.Model):
    artist_name = models.CharField(max_length=255, null=True)


class DisplayName(models.Model):
    display_name = models.CharField(max_length=255, null=True)


class CuratedImage(models.Model):
    image = models.ImageField(
        upload_to=f'media/curated_image/', null=False, default=None)
    tags = models.ManyToManyField(Tag)
    artist_names = models.ManyToManyField(Artist)
    display_name = models.ManyToManyField(DisplayName)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=False)
    tweet_url = models.CharField(max_length=255, null=True, unique=False)
