
from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'', include('authentication.urls')),
    # url(r'^accounts/', include('allauth.urls')),
    url(r'^api/', include('api.urls')),
    url(r'^', include('quotes.urls', namespace='quotes')),
]
