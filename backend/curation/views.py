import requests
from io import BytesIO
from functools import reduce

from urllib.parse import urlparse, parse_qs
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.files.base import ContentFile
from django.db.models import Q
from django.utils.crypto import get_random_string

from .models import CuratedImage, Tag, Artist, DisplayName
from .serializers import ImageSerializer

def download_image_from_url(url):
    # Removes twitter downscaling
    split_url = url.split('&')
    new_url = []
    for url_part in split_url:
        if 'name=' in url_part:
            new_url.append('name=4096x4096')
        else:
            new_url.append(url_part)
    url = '&'.join(new_url)

    response = requests.get(url)
    if response.status_code == 200:
        parsed_url = urlparse(url)
        query_params = parse_qs(parsed_url.query)
        filename_randomizer = get_random_string(length=8)
        format_value = query_params.get('format', ['jpg'])[0]
        filename = url.split('/')[-1].split('?')[0]
        image_data = response.content
        stream = BytesIO(image_data)
        img_content = ContentFile(
            stream.getvalue(), f'{filename}{filename_randomizer}.{format_value}')
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

        view_nsfw = user.view_nsfw
        view_private = user.view_private

        load_count = int(request.GET.get('loadCount', 50))

        # Filter by search keys if exists
        search_keys = request.GET.get('searchKeys')
        if search_keys is not None:
            search_keys = search_keys.split(",")
            search_keys = [_.strip() for _ in search_keys]
        else:
            search_keys = []
        def _get_search_query_filter():
            return (
                reduce(lambda x, y: x | y, [
                    Q(tags__tag_name__contains=word) |
                    Q(artist_names__artist_name__contains=word) |
                    Q(display_name__display_name__contains=word) for word in search_keys
                ])
            )

        # Filter out already loaded images by ID
        loaded_ids = request.GET.get('loadedImageIds')
        if loaded_ids:
            loaded_ids = loaded_ids.split('|')
        else:
            loaded_ids = []

        # Filter by user conditions
        def _get_user_query_filter():
            if view_nsfw and view_private:                  # only want to see my images, regardless of NSFW
                return Q(user=user)
            elif not view_nsfw and view_private:            # only want to see my images, SFW only
                return Q(nsfw=False, user=user)
            elif view_nsfw and not view_private:            # I want to see all public images, as well as my own private images, regardless of NSFW, 
                return (Q(private=False) | Q(user=user))
            elif not view_nsfw and not view_private:        # I want to see all public images, as well as my own private images, SFW only
                return (Q(nsfw=False, private=False) | Q(nsfw=False, user=user))

        filtered_images = CuratedImage.objects.filter(
            _get_search_query_filter(),
            _get_user_query_filter()
        ).exclude(id__in=loaded_ids).distinct()

        filtered_image_ids = list(filtered_images.values_list('pk', flat=True))

        # Randomize Image Order
        random_order = request.GET.get('randomOrder')
        if random_order == 'true':
            finalized_images = CuratedImage.objects.filter(id__in=filtered_image_ids).order_by('?')
        else:
            finalized_images = CuratedImage.objects.filter(id__in=filtered_image_ids).order_by('-pk')

        has_more_data = finalized_images.count() > load_count
        finalized_images = finalized_images[:load_count]

        serializer = ImageSerializer(finalized_images, many=True)
        response_data = serializer.data

        return Response({'images': response_data, 'more': has_more_data}, status=status.HTTP_200_OK)

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
    
class DeleteImageView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def delete(self, request, image_id):
        user = request.user
        image = CuratedImage.objects.get(id=image_id)
        if user == image.user:
            image.delete()
            return Response({'deleted_image_id': {image_id}, 'msg': 'Image Deleted'}, status=status.HTTP_200_OK)
        else:
            return Response('Invalid User', status=status.HTTP_403_FORBIDDEN)