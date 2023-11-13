from rest_framework.serializers import ModelSerializer
from .models import CuratedImage, Artist, Tag, DisplayName


class ArtistSerializer(ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'


class NameSerializer(ModelSerializer):
    class Meta:
        model = DisplayName
        fields = '__all__'


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ImageSerializer(ModelSerializer):
    tags = TagSerializer(many=True)
    artist_names = ArtistSerializer(many=True)
    display_name = NameSerializer(many=True)

    class Meta:
        model = CuratedImage
        fields = '__all__'
