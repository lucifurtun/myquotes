import os

from django.db.models import Q, Count
from django.views import generic
from rest_framework import permissions, mixins, status
from rest_framework import schemas, viewsets
from rest_framework import views
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework_swagger.renderers import OpenAPIRenderer, SwaggerUIRenderer

from .paginators import QuotesResultsSetPagination
from . import serializers
from apps.quotes import models


@api_view()
@renderer_classes([OpenAPIRenderer, SwaggerUIRenderer])
def schema_view(request):
    generator = schemas.SchemaGenerator(title='MyQuotes API')
    return Response(generator.get_schema(request=request))


class ReadNestedWriteFlatMixin(object):
    def get_serializer_class(self, *args, **kwargs):
        serializer_class = super(ReadNestedWriteFlatMixin, self).get_serializer_class(*args, **kwargs)
        if self.request.method in ['PATCH', 'POST', 'PUT']:
            serializer_class.Meta.depth = 0
        else:
            serializer_class.Meta.depth = 1

        return serializer_class


class CurrentUserFilterMixin(object):
    def get_queryset(self):
        user_id = self.request.GET.get('user_id', self.request.user.id)
        filters = Q(user_id=user_id)
        queryset = super().get_queryset()

        if user_id:
            return queryset.filter(filters)
        else:
            return queryset


class QuoteViewSet(CurrentUserFilterMixin, ReadNestedWriteFlatMixin, viewsets.ModelViewSet):
    serializer_class = serializers.QuoteSerializer
    queryset = models.Quote.objects.all()
    pagination_class = QuotesResultsSetPagination

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

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
                    title_q = Q(title__unaccent__icontains=value)
                    text_q = Q(text__unaccent__icontains=value)
                    filters &= Q(title_q | text_q)

        queryset = super().get_queryset().order_by('-created')
        return queryset.filter(filters).distinct()


class AuthorViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.ListModelMixin,
                    mixins.DestroyModelMixin, GenericViewSet):

    def get_queryset(self):
        queryset = super().get_queryset()
        user_id = self.request.GET.get('user_id', self.request.user.id)
        filters = Q(users__in=[user_id])

        name = self.request.GET.get('name')

        if name:
            filters &= Q(name__icontains=name)

            exists = queryset.filter(filters).exists()
            if not exists:
                filters = Q(name__icontains=name)

        return queryset.filter(filters)

    def create(self, request, *args, **kwargs):
        request.data['users'] = [request.user.id]

        serializer = self.get_serializer(data=request.data)

        is_valid = serializer.is_valid(raise_exception=False)

        if is_valid:
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            name = serializer.data.get('name')
            if name:
                try:
                    author = models.Author.objects.get(name=name)
                except models.Author.DoesNotExist:
                    raise ValidationError(serializer.errors)

                author.users.add(request.user)

                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_200_OK, headers=headers)

    def destroy(self, request, *args, **kwargs):
        quotes_exists = models.Quote.objects.filter(author_id=kwargs['pk']).exists()

        author = self.get_object()

        if quotes_exists:
            author.users.remove(request.user)
            return Response(status=status.HTTP_200_OK)

        self.perform_destroy(author)
        return Response(status=status.HTTP_204_NO_CONTENT)

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
