from django.db.models import Q
from django_elasticsearch_dsl_drf.filter_backends import FilteringFilterBackend, OrderingFilterBackend, \
    DefaultOrderingFilterBackend, SearchFilterBackend
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from rest_framework.generics import ListAPIView

from apps.common.paginators import CustomPageNumberPagination
from .indexes import Verse
from .models import Book, Chapter
from .serializers import VerseSerializer, BookSerializer, ChapterSerializer


class BookView(ListAPIView):
    serializer_class = BookSerializer
    queryset = Book.objects.all()

    def get_queryset(self):
        return super().get_queryset()


class ChapterView(ListAPIView):
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

        return super().get_queryset().filter(filters)


class VerseView(DocumentViewSet):
    pagination_class = CustomPageNumberPagination
    document = Verse
    serializer_class = VerseSerializer
    lookup_field = 'id'
    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
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
