from rest_framework.serializers import ModelSerializer, BooleanField
from .models import CuratedImage, Artist, Tag, DisplayName
from users.serializers import UserSerializer


class ArtistSerializer(ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'


class NameSerializer(ModelSerializer):
    class Meta:
        model = DisplayName
        fields = '__all__'


class TagSerializer(ModelSerializer):
    tagged_by = UserSerializer(read_only=True)
    class Meta:
        model = Tag
        fields = ['id', 'tag_name', 'tagged_by']


class ImageSerializer(ModelSerializer):
    tags = TagSerializer(many=True)
    artist_names = ArtistSerializer(many=True)
    display_name = NameSerializer(many=True)
    privacy_status = BooleanField(source='private')
    user = UserSerializer(read_only=True)

    class Meta:
        model = CuratedImage
        fields = '__all__'
