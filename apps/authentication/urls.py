from django.conf.urls import url
from django.contrib.auth.decorators import login_required

from . import views

urlpatterns = [
    url(r'^login/$', views.LoginView.as_view(), name='account_login'),
    url(r'^signup/$', views.SignUpView.as_view(), name='account_signup'),
    url(r'^logout/$', login_required(views.LogoutView.as_view()), name='account_logout'),
    url(r'^settings/$', login_required(views.Settings.as_view()), name='account_settings'),
    url(r'^inactive/$', views.Inactive.as_view(), name='account_inactive'),
]
