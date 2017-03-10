from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token

from . import views

router = DefaultRouter()
router.register(r'quotes', views.QuoteViewSet)
router.register(r'authors', views.AuthorViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'tags', views.TagViewSet)

urlpatterns = [
    url(r'^docs/$', views.schema_view),
    url(r'^', include(router.urls)),
    url(r'^token/', obtain_jwt_token),
    url(r'^filters/$', views.FiltersOptionsView.as_view()),
    url(r'^templates/(?P<page>[-\w]+.html)/$', views.AngularTemplateView.as_view()),
]
