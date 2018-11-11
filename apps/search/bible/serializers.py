from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from rest_framework.serializers import ModelSerializer

from .indexes import Verse
from .models import Book, Chapter


class VerseSerializer(DocumentSerializer):
    class Meta:
        document = Verse
        fields = ('id', 'number', 'text', 'chapter', 'book')


class ChapterSerializer(ModelSerializer):
    class Meta:
        model = Chapter
        fields = ('id', 'number')


class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'number', 'title')
