from django.conf.urls import url
from django.contrib.auth.decorators import login_required

from . import views

urlpatterns = [
    url(r'^$', login_required(views.HomePageView.as_view()), name='homepage'),
    url(r'^all/$', views.QuoteListView.as_view(), name='quotes_list'),
    url(r'^dashboard/$', login_required(views.Dashboard.as_view()), name='dashboard'),
    url(r'^(?P<slug>[\w.@+-]+)/$', views.UserQuoteListView.as_view(), name='profile'),
]
