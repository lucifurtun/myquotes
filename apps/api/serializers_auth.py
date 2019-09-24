from rest_auth.serializers import LoginSerializer as RestLoginSerializer
from rest_auth.registration.serializers import RegisterSerializer as RestRegisterSerializer
from rest_framework import serializers


class EmailLoginSerializer(RestLoginSerializer):
    email = serializers.EmailField(required=True, allow_blank=False)
    username = None


class EmailSignupSerializer(RestRegisterSerializer):
    username = None

    def get_cleaned_data(self):
        return self.validated_data
