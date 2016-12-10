from django.conf.urls import url, include
from django.contrib.auth.decorators import login_required

from . import views

urlpatterns = [
    url(r'^$', login_required(views.QuoteListView.as_view()), name='quotes_list'),
    url(r'^quote/$', login_required(views.QuoteView.as_view()), name='quotes_add'),
    url(r'^dashboard/$', login_required(views.Dashboard.as_view()), name='dashboard'),
]
