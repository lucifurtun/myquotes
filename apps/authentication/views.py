from dj_rest_auth import views as rest_auth_views
from dj_rest_auth.registration import views as rest_auth_registration_views
from rest_framework.generics import RetrieveUpdateAPIView

from apps.authentication import serializers


class EmailLoginView(rest_auth_views.LoginView):
    authentication_classes = ()
    serializer_class = serializers.EmailLoginSerializer

    def get_response_serializer(self):
        return serializers.JWTSerializer


class EmailSignupView(rest_auth_registration_views.RegisterView):
    authentication_classes = ()
    serializer_class = serializers.EmailSignupSerializer


class CurrentUserView(RetrieveUpdateAPIView):
    serializer_class = serializers.UserDetailsSerializer

    def get_object(self):
        return self.request.user
