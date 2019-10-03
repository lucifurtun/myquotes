from rest_auth import views as rest_auth_views
from rest_auth.registration import views as rest_auth_registration_views
from rest_framework.generics import RetrieveUpdateAPIView

from apps.api import serializers_auth as serializers
from apps.api.serializers_auth import JWTSerializer


class EmailLoginView(rest_auth_views.LoginView):
    authentication_classes = ()
    serializer_class = serializers.EmailLoginSerializer

    def get_response_serializer(self):
        return JWTSerializer


class EmailSignupView(rest_auth_registration_views.RegisterView):
    authentication_classes = ()
    serializer_class = serializers.EmailSignupSerializer


class CurrentUserView(RetrieveUpdateAPIView):
    serializer_class = serializers.UserDetailsSerializer

    def get_object(self):
        return self.request.user
