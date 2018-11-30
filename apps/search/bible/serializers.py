from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .indexes import Verse
from .models import Book, Chapter


class VerseSerializer(DocumentSerializer):
    text_highlight = serializers.SerializerMethodField()

    class Meta:
        document = Verse
        fields = ('id', 'number', 'text', 'chapter_number', 'book_title', 'highlight.text')

    def get_text_highlight(self, obj):
        if hasattr(obj.meta, 'highlight'):
            return obj.meta.highlight['text'][0]

        return None


class ChapterSerializer(ModelSerializer):
    class Meta:
        model = Chapter
        fields = ('id', 'number')


class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'number', 'title')
