from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^administration/', admin.site.urls),
    url(r'^api/', include('apps.api.urls')),
]
