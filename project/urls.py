from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^administration/', admin.site.urls),
    url(r'^api/', include('apps.api.urls')),
    url(r'', include('apps.authentication.urls')),
    url(r'', include(('apps.quotes.urls', 'quotes'), namespace='quotes')),
]
