from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from apps.quotes.views import QuoteViewSet, AuthorViewSet, CategoryViewSet, TagViewSet, schema_view, FiltersOptionsView

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
