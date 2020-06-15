import django_filters

from apps.search.bible.models import Reference


class ReferenceFilter(django_filters.FilterSet):
    book_number = django_filters.NumberFilter(field_name='verse__book_number', required=True)
    chapter_number = django_filters.NumberFilter(field_name='verse__chapter_number', required=True)
    verse_number = django_filters.NumberFilter(field_name='verse__verse_number', required=True)

    class Meta:
        model = Reference
        fields = ['book_number', 'chapter_number', 'verse_number']
