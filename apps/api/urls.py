from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework_jwt import views as jwt_views

from apps.search.bible.views import VerseView, BookView, ChapterView
from . import views

router = DefaultRouter()
router.register(r'quotes', views.QuoteViewSet)
router.register(r'authors', views.AuthorViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'tags', views.TagViewSet)

urlpatterns = [
    url(r'^docs/$', views.schema_view),
    url(r'^', include(router.urls)),
    url(r'^token/new/$', jwt_views.ObtainJSONWebToken.as_view()),
    url(r'^token/refresh/$', jwt_views.RefreshJSONWebToken.as_view()),
    url(r'^token/verify/$', jwt_views.VerifyJSONWebToken.as_view()),
    url(r'^filters/$', views.FiltersOptionsView.as_view()),
    url(r'^templates/(?P<page>[-\w]+.html)/$', views.AngularTemplateView.as_view()),

    url(r'^verses/$', VerseView.as_view({'get': 'list'})),
    url(r'^books/$', BookView.as_view()),
    url(r'^chapters/$', ChapterView.as_view()),
]
