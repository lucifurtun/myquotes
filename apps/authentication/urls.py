from django.conf.urls import url

from apps.authentication.views import CurrentUserView, EmailLoginView, EmailSignupView

urlpatterns = [
    url(r'^users/me/$', CurrentUserView.as_view()),

    url(r'^auth/login/$', EmailLoginView.as_view(), name='email-login'),
    url(r'^auth/signup/$', EmailSignupView.as_view(), name='email-signup'),
]
