from rest_framework.serializers import ModelSerializer, as_serializer_error
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

User = get_user_model()

class UserCreateSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def validate(self, data):
        user = User(**data)
        password = data.get('password')
        try:
            validate_password(password, user)
        except ValidationError as e:
            serializer_errors = as_serializer_error(e)
            raise ValidationError({'password': serializer_errors['non_field_errors']})
        
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password']
        )

        return user
    
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')