from django.core.mail import send_mail
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

    def custom_signup(self, request, user):
        user.is_active = False
        user.save()

        send_mail(
            'New user on MyQuotes',
            'There is one new user asking for access. ID: {id}, Email: {email}'.format(id=user.id, email=user.email),
            'MyQuotes<contact@myquotes.io>',
            ['lucianfurtun@gmail.com'],
            fail_silently=True,
        )