from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from django.conf import settings
from django.http import HttpResponse
from django.core.files import File
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
            profile_image = form.cleaned_data['profile_image']
            user.profile_image.save(profile_image.name, File(profile_image))
            return Response(status=status.HTTP_202_ACCEPTED)
        else:
            errors = form.errors
            return Response(data=errors, status=status.HTTP_400_BAD_REQUEST)
