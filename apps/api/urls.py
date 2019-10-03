from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework_jwt import views as jwt_views

from apps.search.bible import views as bible_views
from . import views
from . import views_auth

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

    url(r'^users/me/$', views_auth.CurrentUserView.as_view()),

    url(r'^auth/login/$', views_auth.EmailLoginView.as_view(), name='email-login'),
    url(r'^auth/signup/$', views_auth.EmailSignupView.as_view(), name='email-signup'),

    url(r'^verses/(?P<version>[\w]+)/$', bible_views.VerseView.as_view({'get': 'list'})),
    url(r'^books/(?P<version>[\w]+)/$', bible_views.BookView.as_view()),
    url(r'^chapters/(?P<version>[\w]+)/$', bible_views.ChapterView.as_view()),
]
