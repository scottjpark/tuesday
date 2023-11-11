from rest_framework.serializers import ModelSerializer
from .models import CuratedImage


class ImageSerializer(ModelSerializer):
    class Meta:
        model = CuratedImage
        fields = ('image', 'tags', 'artist_names', 'display_name',
                  'user', 'tweet_url', 'private', 'nsfw')
