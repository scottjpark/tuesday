from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.files import File
from django.http import HttpResponse
from .forms import ProfileImageForm
from .serializers import UserCreateSerializer, UserSerializer

class RegisterView(APIView):
    def post(self, request):
        data = request.data

        serializer = UserCreateSerializer(data=data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_201_CREATED)

class RetrieveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_200_OK)
    
class ResetUserView(APIView):
    def post(self, request):
        response = HttpResponse('Logged out')
        response.delete_cookie(key='refresh')
        response.delete_cookie(key='access')
        return response

class UserAvatarView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        user = request.user
        form = ProfileImageForm(request.POST, request.FILES)
        if form.is_valid():
            user.profile_image.delete()
            profile_image = form.cleaned_data['profile_image']
            user.profile_image.save(profile_image.name, File(profile_image))
            user = UserSerializer(user)
            return Response(data=user.data, status=status.HTTP_202_ACCEPTED)
        else:
            errors = form.errors
            return Response(data=errors, status=status.HTTP_400_BAD_REQUEST)

    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        user = UserSerializer(user)
        return Response(data=user.data, status=status.HTTP_200_OK)