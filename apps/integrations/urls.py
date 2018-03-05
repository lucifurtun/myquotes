from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^kindle/$', views.Kindle.as_view(), name='kindle'),
]
