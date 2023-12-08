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
        # Removes twitter downscaling
        split_url = url.split('&')
        new_url = []
        for url_part in split_url:
            if 'name=' in url_part:
                new_url.append('name=4096x4096')
            else:
                new_url.append(url_part)
        url = '&'.join(new_url)

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
                    tag_name=image_tag.lower(),
                    tagged_by=user
                )
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

        # return only needed image data
        offset = int(request.GET.get('offset', 0))
        offset_start = offset * 30
        offset_end = (offset * 30) + 30

        images = CuratedImage.objects.filter(
            user=user).order_by('-id')[offset_start:offset_end]
        serializer = ImageSerializer(images, many=True)
        response_data = serializer.data

        return Response(response_data, status=status.HTTP_200_OK)

class UpdateImageView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def patch(self, request):
        user = request.user
        data = request.data

        image_id = data['id']
        added_tags = data['tagAdd']
        nsfw = data['nsfw']
        private_image = data['privateImage']
        removed_tags = data['tagRemove']
        removed_tag_names = [_["tag_name"] for _ in removed_tags]

        image = CuratedImage.objects.get(id=image_id)

        tags_to_add = [_ for _ in added_tags if _ not in removed_tag_names]
        for tag_name in tags_to_add:
            new_tag, created = Tag.objects.get_or_create(tag_name=tag_name.lower(), tagged_by=user)
            image.tags.add(new_tag)
        
        tags_to_remove = [_ for _ in removed_tags if _["tag_name"] not in added_tags]
        for tag in tags_to_remove:
            old_tag = Tag.objects.get(id=tag["id"])
            image.tags.remove(old_tag)

        image.nsfw = nsfw
        image.private = private_image

        image.save()
        serializer = ImageSerializer(image)
        response_data = serializer.data

        return Response(response_data, status=status.HTTP_200_OK)