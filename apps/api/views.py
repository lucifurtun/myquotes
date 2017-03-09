import os

from django.db.models import Q, Count
from django.views import generic
from rest_framework import permissions
from rest_framework import schemas, viewsets
from rest_framework import views
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework_swagger.renderers import OpenAPIRenderer, SwaggerUIRenderer

from .paginators import QuotesResultsSetPagination
from . import serializers
from apps.quotes import models


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

        if user_id:
            return queryset.filter(filters)
        else:
            return queryset


class QuoteViewSet(CurrentUserFilterMixin, viewsets.ModelViewSet):
    serializer_class = serializers.QuoteSerializer
    queryset = models.Quote.objects.all()
    pagination_class = QuotesResultsSetPagination

    def retrieve(self, request, *args, **kwargs):

        return super().retrieve(request, *args, **kwargs)

    def get_queryset(self):
        filters = Q()
        fields = dict(self.request.GET).keys()

        for field in fields:
            if hasattr(models.Quote, field):
                values = self.request.GET.getlist(field)
                params = {'{field}__in'.format(field=field): [int(value) for value in values if int(value)]}
                filters &= Q(**params)

            elif field == 'search':
                value = self.request.GET.get('search')
                if value:
                    title_q = Q(title__icontains=value)
                    text_q = Q(text__icontains=value)
                    filters &= Q(title_q | text_q)

        queryset = super().get_queryset().order_by('-created')
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


class FiltersOptionsView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        return Response('Please use OPTIONS request!')

    def options(self, request, *args, **kwargs):
        data = {
            'results': {
                'authors': self._get_options(models.Author),
                'categories': self._get_options(models.Category),
                'tags': self._get_options(models.Tag),
            }
        }

        return Response(data)

    def _get_options(self, model):
        mapping = {
            'Author': serializers.AuthorSerializer,
            'Category': serializers.CategorySerializer,
            'Tag': serializers.TagSerializer
        }

        serializer = mapping.get(model.__name__)
        data = serializer(model.objects.filter(user=self.request.user), many=True)

        return data.data


class AngularTemplateView(generic.TemplateView):
    template_name = ''

    def get(self, request, *args, **kwargs):
        html_file_name = kwargs.get('page')
        self.template_name = os.path.join('angular', html_file_name)

        return super().get(request, *args, **kwargs)
