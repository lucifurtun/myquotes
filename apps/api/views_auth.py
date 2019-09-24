from rest_auth import views as rest_auth_views
from rest_auth.registration import views as rest_auth_registration_views
from apps.api import serializers_auth as serializers


class EmailLoginView(rest_auth_views.LoginView):
    authentication_classes = ()
    serializer_class = serializers.EmailLoginSerializer


class EmailSignupView(rest_auth_registration_views.RegisterView):
    authentication_classes = ()
    serializer_class = serializers.EmailSignupSerializer
