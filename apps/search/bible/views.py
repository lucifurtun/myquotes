from django.db.models import Q
from django_elasticsearch_dsl_drf.filter_backends import FilteringFilterBackend, DefaultOrderingFilterBackend
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from rest_framework.exceptions import APIException
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from apps.common.paginators import CustomPageNumberPagination
from apps.search.bible.backends import SearchFilterBackend
from .indexes import Verse
from .models import Book, Chapter
from .serializers import VerseSerializer, BookSerializer, ChapterSerializer


class BookView(ListAPIView):
    pagination_class = CustomPageNumberPagination
    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def get_queryset(self):
        return super().get_queryset()


class ChapterView(ListAPIView):
    pagination_class = CustomPageNumberPagination
    serializer_class = ChapterSerializer
    queryset = Chapter.objects.all()

    def get_queryset(self):
        filters = Q()

        book_title = self.request.GET.get('book_title')
        if book_title is not None:
            filters &= Q(book__title=book_title)

        book_id = self.request.GET.get('book_id')
        if book_id is not None:
            filters &= Q(book_id=book_id)

        if (book_title is None) and (book_id is None):
            raise APIException('Chapters endpoints needs "book_id" or "book_title"', code=400)

        return super().get_queryset().filter(filters)

    def list(self, request, *args, **kwargs):
        try:
            return super().list(request, *args, **kwargs)
        except APIException as err:
            return Response(err.detail, status=400)


class VerseView(DocumentViewSet):
    pagination_class = CustomPageNumberPagination
    document = Verse
    serializer_class = VerseSerializer
    lookup_field = 'id'
    filter_backends = [
        FilteringFilterBackend,
        DefaultOrderingFilterBackend,
        SearchFilterBackend,
    ]

    search_fields = (
        'text',
    )

    filter_fields = {
        'book_title': 'book_title.raw',
        'chapter_number': 'chapter_number',
        'number': 'number',
    }

    ordering = ('book_number', 'chapter_number', 'number')
