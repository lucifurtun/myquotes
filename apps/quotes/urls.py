from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework_jwt import views as jwt_views

from apps.quotes.views import QuoteViewSet, AuthorViewSet, CategoryViewSet, TagViewSet, schema_view, FiltersOptionsView
from apps.authentication.views import CurrentUserView, EmailLoginView, EmailSignupView
from apps.search.bible import views as bible_views

router = DefaultRouter()
router.register(r'quotes', QuoteViewSet)
router.register(r'authors', AuthorViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'tags', TagViewSet)

urlpatterns = [
    url(r'^docs/$', schema_view),
    url(r'^', include(router.urls)),
    url(r'^filters/$', FiltersOptionsView.as_view()),
]
