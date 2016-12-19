import os

from django.db.models import Q, Count
from django.views import generic
from rest_framework import schemas, viewsets
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework_swagger.renderers import OpenAPIRenderer, SwaggerUIRenderer

from apps.api.paginators import QuotesResultsSetPagination
from apps.quotes import models
from . import serializers


@api_view()
@renderer_classes([OpenAPIRenderer, SwaggerUIRenderer])
def schema_view(request):
    generator = schemas.SchemaGenerator(title='MyQuotes API')
    return Response(generator.get_schema(request=request))


class CurrentUserFilterMixin(object):
    def get_queryset(self):
        user_id = self.request.GET.get('user_id', self.request.user.id)
        filters = Q(user_id=user_id)
        queryset = super().get_queryset()
        return queryset.filter(filters)


class QuoteViewSet(CurrentUserFilterMixin, viewsets.ModelViewSet):
    serializer_class = serializers.QuoteSerializer
    queryset = models.Quote.objects.all()
    pagination_class = QuotesResultsSetPagination

    def get_queryset(self):
        filters = Q()
        for field in dict(self.request.GET).keys():
            if hasattr(models.Quote, field):
                values = self.request.GET.getlist(field)
                params = {'{field}__in'.format(field=field): [int(value) for value in values if int(value)]}
                filters &= Q(**params)

        queryset = super().get_queryset()
        return queryset.filter(filters)


class AuthorViewSet(CurrentUserFilterMixin, viewsets.ModelViewSet):
    serializer_class = serializers.AuthorSerializer
    queryset = models.Author.objects.all().annotate(Count('quote'))


class CategoryViewSet(CurrentUserFilterMixin, viewsets.ModelViewSet):
    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()


class TagViewSet(CurrentUserFilterMixin, viewsets.ModelViewSet):
    serializer_class = serializers.TagSerializer
    queryset = models.Tag.objects.all()


class AngularTemplateView(generic.TemplateView):
    template_name = ''

    def get(self, request, *args, **kwargs):
        html_file_name = kwargs.get('page')
        self.template_name = os.path.join('angular', html_file_name)

        return super().get(request, *args, **kwargs)
