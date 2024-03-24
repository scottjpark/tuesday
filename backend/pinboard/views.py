from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView

from .models import Pin
from .serializers import PinSerializer

from django.conf import settings
from utils.filehelper import download_image_from_url

from nacl.signing import VerifyKey
from nacl.exceptions import BadSignatureError

import re
import requests

class PinnedResponsesView(ModelViewSet):
    serializer_class = PinSerializer
    queryset = Pin.objects.all()

    def create(self, request):
        pin_data = request.data
        name = pin_data.get('name')
        response = pin_data.get('response')
        image = None
        submitter = pin_data.get('submitter', 'Unknown')
        usage = pin_data.get('usage', 0)
        random = pin_data.get('random', True)

        # Check if response is an image file URL
        if response[:4] == 'http' and re.search(r'\.png|\.gif|\.jpg|\.jpeg', response):
            if requests.get(response).status_code == 200:
                image = download_image_from_url(response)
                response = None
            else:
                return Response({'error': 'invalid url'}, status=status.HTTP_400_BAD_REQUEST)
        
        if (response == '' and image == None):
            return Response({'error': 'needs either a response or an image'}, status=status.HTTP_400_BAD_REQUEST)
        
        check_pin = Pin.objects.filter(name=name)
        if len(check_pin) > 0: 
            return Response({'error': 'pin already exists'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            Pin.objects.create(
                name=name, response=response, image=image, submitter=submitter, usage=usage, random=random
            )
            return Response({'ok': 'pin saved'}, status=status.HTTP_200_OK)


class DiscordBotView(APIView):
    def post(self, request):
        # Verify the Signature
        verify_key = VerifyKey(bytes.fromhex(settings.DISCORD_PUBLIC_KEY))
        auth_sig = request.headers.get('x-signature-ed25519')
        auth_ts  = request.headers.get('x-signature-timestamp')
        body = request.body.decode('utf-8')

        if request.data.get('type') == 1:
            try:
                verify_key.verify(f'{auth_ts}{body}'.encode(), bytes.fromhex(auth_sig))
                return Response({ 'type': 1 }, status=status.HTTP_200_OK)
            except BadSignatureError as e:
                return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

        # Run Commands
        body = request.data
        data = body.get('data')
        command_name = data.get('name')

        if command_name == 'beep':
            return Response({ 'type': 4, 'data': { 'content': 'Boop' }}, status=status.HTTP_200_OK)

        if command_name in ['pin', 'pin_file']:
            pin_name = data['options'][0]['value']
            pin_value = data['options'][1]['value']

            name = pin_name
            response = pin_value
            image = None
            submitter = body["member"]["user"]["username"]
            
            if command_name == 'pin_file':
                attachment_id = data['options'][1]['value']
                pin_value = data['resolved']['attachments'][attachment_id]['url']

            if pin_value[:4] == 'http' and re.search(r'\.png|\.gif|\.jpg|\.jpeg', pin_value):
                if requests.get(pin_value).status_code == 200:
                    image = download_image_from_url(pin_value)
                    response = None
                else:
                    return Response({ 'type': 4, 'data': { 'content': 'error: invalid file url' }}, status=status.HTTP_400_BAD_REQUEST)
            
            if (response == '' and image == None):
                return Response({ 'type': 4, 'data': { 'content': 'error: need a response or a file' }}, status=status.HTTP_400_BAD_REQUEST)

            check_pin = Pin.objects.filter(name=name)
            if len(check_pin) > 0:
                return Response({ 'type': 4, 'data': { 'content': 'error: pin already exists' }}, status=status.HTTP_400_BAD_REQUEST)
            else:
                Pin.objects.create(
                    name=name, response=response, image=image, submitter=submitter, usage=0, random=True
                )
                return Response({ 'type': 4, 'data': { 'content': f'pin saved as {pin_name}' }}, status=status.HTTP_200_OK)

        if command_name in ['rt', 'pinner', 'usage']:
            pin_name = data['options'][0]['value']
            try:
                requested_pin = Pin.objects.get(name=pin_name)
                if command_name == 'rt':
                    if requested_pin.image:
                        requested_pin_response = requested_pin.image.url
                    else:
                        requested_pin_response = requested_pin.response
                elif command_name == 'pinner':
                    requested_pin_response = requested_pin.submitter
                elif command_name == 'pin_usage':
                    requested_pin_response = requested_pin.usage

                return Response({ 'type': 4, 'data': { 'content': f'{pin_name}: {requested_pin_response}' }}, status=status.HTTP_200_OK)
            except:
                return Response({ 'type': 4, 'data': { 'content': f'no such pin found: {pin_name}' }}, status=status.HTTP_200_OK)

        if command_name in ['sr', 'search']:
            pin_name = data['options'][0]['value']
            possible_pins = Pin.objects.filter(name__contains=pin_name)
            if len(possible_pins) > 0:
                if command_name == 'sr':
                    possible_pins.filter(random=True).order_by('?')
                    if possible_pins[0].image:
                        requested_pin_response = possible_pins[0].image.url
                    else:
                        requested_pin_response = possible_pins[0].response
                    return Response({ 'type': 4, 'data': { 'content': f'{possible_pins[0].name}: {requested_pin_response}' }}, status=status.HTTP_200_OK)
                elif command_name == 'search':
                    matching_pins = []
                    for pin in possible_pins:
                        matching_pins.append(pin.name)
                        requested_pin_response = ', ' .join(matching_pins)
                    return Response({ 'type': 4, 'data': { 'content': f'```{requested_pin_response}```' }}, status=status.HTTP_200_OK)
            else:
                return Response({ 'type': 4, 'data': { 'content': f'no pins were found' }}, status=status.HTTP_200_OK)

        if command_name == 'random':
            possible_pins = Pin.objects.filter(random=True).order_by('?')
            random_pin = possible_pins[0]
            if random_pin.image:
                requested_pin_response = random_pin.image.url
            else:
                requested_pin_response = random_pin.response
            return Response({ 'type': 4, 'data': { 'content': f'{random_pin.name}: {requested_pin_response}' }}, status=status.HTTP_200_OK)

        if command_name == 'delete_pin':
            pin_name = data['options'][0]['value']
            try:
                requested_pin = Pin.objects.get(name=pin_name)
                requested_pin.delete()
                return Response({ 'type': 4, 'data': { 'content': f'{pin_name} has been deleted' }}, status=status.HTTP_200_OK)
            except:
                return Response({ 'type': 4, 'data': { 'content': f'no such pin found: {pin_name}' }}, status=status.HTTP_200_OK)

        if command_name == 'update_random':
            pin_name = data['options'][0]['value']
            try:
                requested_pin = Pin.objects.get(name=pin_name)
                current = requested_pin.random
                requested_pin.random = not current
                requested_pin.save()
                return Response({ 'type': 4, 'data': { 'content': f'{pin_name} has been updated' }}, status=status.HTTP_200_OK)
            except:
                return Response({ 'type': 4, 'data': { 'content': f'no such pin found: {pin_name}' }}, status=status.HTTP_200_OK)

        # works
        if command_name == 't':
            url = data['options'][0]['value']
            if not re.search(r'x\.com|twitter\.com', url):
                return Response({ 'type': 4, 'data': { 'content': 'Not a x or twitter link' }}, status=status.HTTP_200_OK)
            return Response({ 'type': 4, 'data': {'content': re.sub(r'x\.com|twitter\.com', 'vxtwitter.com', url)}}, status=status.HTTP_200_OK)

    def get(self, request):
        pin_name = request.GET.get('name', '')
        if pin_name == '':
            return Response({'error': 'missing name params'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            requested_pin = Pin.objects.get(name=pin_name)
            pin_data = PinSerializer(requested_pin).data
            return Response({'ok': pin_data}, status=status.HTTP_200_OK)
            
        except:
            return Response({'error': 'no such pin found'}, status=status.HTTP_404_NOT_FOUND)