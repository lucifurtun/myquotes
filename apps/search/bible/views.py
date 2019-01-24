from django.db.models import Q
from django.http import Http404
from django.utils.decorators import classonlymethod
from django_elasticsearch_dsl_drf.filter_backends import FilteringFilterBackend, DefaultOrderingFilterBackend, \
    HighlightBackend
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from rest_framework.exceptions import APIException
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from apps.common.paginators import CustomPageNumberPagination
from apps.search.bible.backends import SearchFilterBackend
from apps.search.bible.choices import Versions
from . import indexes
from .models import Book, Chapter
from .serializers import VerseSerializer, BookSerializer, ChapterSerializer


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
        SearchFilterBackend,
        HighlightBackend
    ]

    search_fields = {
        'text': {
            # 'analyzer': 'standard'
        }
    }

    filter_fields = {
        'book_title': 'book_title.raw',
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
        Versions.ESV: indexes.VerseESV
    }

    def __init__(self, request, *args, **kwargs):
        self.document = self.get_document(request)
        super().__init__(*args, **kwargs)

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
