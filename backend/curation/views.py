import requests
from io import BytesIO
from urllib.parse import urlparse, parse_qs
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CuratedImage, Tag, Artist, DisplayName
from .serializers import ImageSerializer

from django.core.files.base import ContentFile


def download_image_from_url(url):
    response = requests.get(url)
    if response.status_code == 200:
        url = url.replace('name=small', 'name=large')
        parsed_url = urlparse(url)
        query_params = parse_qs(parsed_url.query)
        format_value = query_params.get('format', ['jpg'])[0]
        filename = url.split('/')[-1].split('?')[0]
        image_data = response.content
        stream = BytesIO(image_data)
        img_content = ContentFile(
            stream.getvalue(), f'{filename}.{format_value}')
        return img_content
    return None


class SaveImageView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data

        user = request.user
        image_tags = data['tags']
        artist = data['name']
        artist_nickname = data['displayName']
        tweet_url = data['tweetURL']
        image_urls = data['urls']

        # Temporary assignments until the new extension release
        if 'nsfw' in data.keys():
            nsfw = data['nsfw']
        else:
            nsfw = True

        if 'private' in data.keys():
            private = data['private']
        else:
            private = True

        for image_url in image_urls:
            image_file = download_image_from_url(image_url)
            curated_image = CuratedImage.objects.create(
                image=image_file, user=user, tweet_url=tweet_url, nsfw=nsfw, private=private)

            for tag in image_tags:
                image_tag = tag.lower()
                if image_tag[0] == '#':
                    image_tag = image_tag[1:]
                image_tag, created = Tag.objects.get_or_create(
                    tag_name=image_tag.lower())
                curated_image.tags.add(image_tag)

            artist_handle = artist.lower()
            artist_handle, created = Artist.objects.get_or_create(
                artist_name=artist)
            curated_image.artist_names.add(artist_handle)

            display_name = artist_nickname.lower()
            display_name, created = DisplayName.objects.get_or_create(
                display_name=display_name)
            curated_image.display_name.add(display_name)

        return Response('Image saved successfully', status=status.HTTP_201_CREATED)


class CuratedImagesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        data = request.data

        nsfw = data.get('nsfw')
        search_keys = data.get('search')
        mine_only = data.get('mine_only')

        images = CuratedImage.objects.filter(user=user)
        response_data = images

        print(response_data)

        return Response(response_data, status=status.HTTP_200_OK)
