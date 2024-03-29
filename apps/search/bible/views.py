from typing import Any

from django.db.models import Q
from django.http import Http404
from django.utils.decorators import classonlymethod
from django_elasticsearch_dsl_drf.filter_backends import FilteringFilterBackend, DefaultOrderingFilterBackend, \
    HighlightBackend
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from elasticsearch import TransportError
from django_filters import rest_framework as filters
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.generics import ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from apps.common.paginators import CustomPageNumberPagination
from apps.search.bible.backends import SpanSearchFilterBackend
from apps.search.bible.choices import Versions
from . import indexes
from .filters import ReferenceFilter
from .models import Book, Chapter, Reference
from .serializers import VerseSerializer, BookSerializer, ChapterSerializer, ReferenceSerializer


class BookView(ListAPIView):
    pagination_class = CustomPageNumberPagination
    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def get_queryset(self, *args, **kwargs):
        kwargs = self.request.resolver_match.kwargs
        version = kwargs.get('version')

        if version not in Versions:
            raise Http404

        return super().get_queryset().filter(version=version)


class ChapterView(ListAPIView):
    pagination_class = CustomPageNumberPagination
    serializer_class = ChapterSerializer
    queryset = Chapter.objects.all()

    def get_queryset(self):
        kwargs = self.request.resolver_match.kwargs
        version = kwargs.get('version')

        if version not in Versions:
            raise Http404

        filters = Q(book__version=version)

        book_title = self.request.GET.get('book_title')
        if book_title is not None:
            filters &= Q(book__title=book_title)

        book_id = self.request.GET.get('book_id')
        if book_id is not None:
            filters &= Q(book_id=book_id)

        book_number = self.request.GET.get('book_number')
        if book_number is not None:
            filters &= Q(book__number=book_number)

        if (book_title is None) and (book_id is None) and (book_number is None):
            raise APIException('Chapters endpoints needs "book_id", "book_title" or "book_number"', code=400)

        return super().get_queryset().filter(filters).distinct('number')

    def list(self, request, *args, **kwargs):
        try:
            return super().list(request, *args, **kwargs)
        except APIException as err:
            return Response(err.detail, status=400)


class VerseView(DocumentViewSet):
    pagination_class = CustomPageNumberPagination
    serializer_class = VerseSerializer
    lookup_field = 'id'
    filter_backends = [
        FilteringFilterBackend,
        DefaultOrderingFilterBackend,
        # SearchFilterBackend,
        SpanSearchFilterBackend,
        HighlightBackend
    ]

    search_fields = {
        'text': {
            # 'analyzer': 'standard'
        }
    }

    span_search_field = 'text'

    filter_fields = {
        'book_title': 'book_title.raw',
        'book_number': 'book_number',
        'chapter_number': 'chapter_number',
        'number': 'number',
    }

    highlight_fields = {
        'text': {
            'options': {
                'pre_tags': ["<b>"],
                'post_tags': ["</b>"],
                'number_of_fragments': 0,
                # 'boundary_scanner': 'chars',
                # 'type': 'fvh'
            },
            'enabled': True,
        },
    }

    ordering = ('book_number', 'chapter_number', 'number')
    document_mapping = {
        Versions.VDCC: indexes.VerseVDCC,
        Versions.ESV: indexes.VerseESV,
        Versions.NTR: indexes.VerseNTR,
        Versions.KJV: indexes.VerseKJV
    }

    def __init__(self, request, *args, **kwargs):
        self.document = self.get_document(request)
        super().__init__(*args, **kwargs)

    def list(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        try:
            return super().list(request, *args, **kwargs)
        except TransportError as err:
            if err.error == 'search_phase_execution_exception':
                return Response({'search': 'Invalid search query.'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'non_field_errors': str(err)}, status=status.HTTP_400_BAD_REQUEST)

    def get_document(self, request):
        kwargs = request.resolver_match.kwargs
        version = kwargs.get('version')

        if version not in self.document_mapping:
            raise Http404

        return self.document_mapping.get(version)

    @classonlymethod
    def as_view(cls, actions=None, **initkwargs):
        def view(request, *args, **kwargs):
            self = cls(request, **initkwargs)
            self.action_map = actions

            for method, action in actions.items():
                handler = getattr(self, action)
                setattr(self, method, handler)

            return self.dispatch(request, *args, **kwargs)

        # view = super().as_view(actions, **initkwargs)
        return view

    def detail(self, response):
        raise Http404


class ReferencesView(ListAPIView):
    pagination_class = CustomPageNumberPagination
    serializer_class = ReferenceSerializer
    queryset = Reference.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = ReferenceFilter
