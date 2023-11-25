from django.db import models
from users.models import UserAccount


class Tag(models.Model):
    tag_name = models.CharField(max_length=255, null=True)
    tagged_by = models.ForeignKey(UserAccount, on_delete=models.SET_NULL, null=True, default=None)


class Artist(models.Model):
    artist_name = models.CharField(max_length=255, null=False, default='Unknown')


class DisplayName(models.Model):
    display_name = models.CharField(max_length=255, null=False, default='Unknown')


class CuratedImage(models.Model):
    image = models.ImageField(
        upload_to=f'media/curated_image/', null=False, default=None)
    tags = models.ManyToManyField(Tag)
    artist_names = models.ManyToManyField(Artist)
    display_name = models.ManyToManyField(DisplayName)
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=False)
    tweet_url = models.CharField(max_length=255, null=True, unique=False)
    private = models.BooleanField(default=True)
    nsfw = models.BooleanField(default=True)
