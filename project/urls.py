from django.conf.urls import url, include
from django.contrib import admin

from apps.quotes.views import schema_view

urlpatterns = [
    url(r'^api/docs/$', schema_view),
    url(r'^administration/', admin.site.urls),
    url(r'^api/', include('apps.authentication.urls')),
    url(r'^api/', include('apps.quotes.urls')),
    url(r'^api/', include('apps.search.bible.urls')),
]
