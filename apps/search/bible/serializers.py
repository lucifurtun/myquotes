from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .indexes import Verse
from .models import Book, Chapter


class VerseSerializer(DocumentSerializer):
    text_highlight = serializers.SerializerMethodField()
    identifier = serializers.SerializerMethodField()

    class Meta:
        document = Verse
        fields = ('id', 'number', 'text', 'book_title', 'book_number', 'chapter_number', 'highlight.text')

    def get_text_highlight(self, obj):
        if hasattr(obj.meta, 'highlight'):
            return obj.meta.highlight['text'][0]

        return None

    def get_identifier(self, obj):
        return f'{obj.book_number}_{obj.chapter_number}_{obj.number}'


class ChapterSerializer(ModelSerializer):
    class Meta:
        model = Chapter
        fields = ('id', 'number')


class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = ('id', 'number', 'title')
