from rest_framework.serializers import ModelSerializer
from .models import Pin

class PinSerializer(ModelSerializer):
    class Meta:
        model = Pin
        fields = '__all__'