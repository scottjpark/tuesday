from django.utils.crypto import get_random_string
from django.core.files.base import ContentFile

from urllib.parse import urlparse, parse_qs
from io import BytesIO
import requests

def download_image_from_url(url):
    response = requests.get(url)
    if response.status_code == 200:
        filename_randomizer = get_random_string(length=8)
        filename = url.split('/')[-1].split('?')[0] # This probably needs work
        image_data = response.content
        stream = BytesIO(image_data)
        img_content = ContentFile(
            stream.getvalue(), f'{filename_randomizer}-{filename}')
        return img_content
    return None