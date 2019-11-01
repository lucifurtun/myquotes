from django.conf.urls import url
from rest_framework_jwt import views as jwt_views

from apps.authentication.views import CurrentUserView, EmailLoginView, EmailSignupView

urlpatterns = [
    url(r'^token/new/$', jwt_views.ObtainJSONWebToken.as_view()),
    url(r'^token/refresh/$', jwt_views.RefreshJSONWebToken.as_view()),
    url(r'^token/verify/$', jwt_views.VerifyJSONWebToken.as_view()),

    url(r'^users/me/$', CurrentUserView.as_view()),

    url(r'^auth/login/$', EmailLoginView.as_view(), name='email-login'),
    url(r'^auth/signup/$', EmailSignupView.as_view(), name='email-signup'),
]
