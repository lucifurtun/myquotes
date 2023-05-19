from django_elasticsearch_dsl import Index, fields
from django_elasticsearch_dsl.documents import Document
from django_elasticsearch_dsl.registries import registry
from elasticsearch_dsl import analyzer, token_filter

from apps.search.bible import choices
from .models import Verse as VerseModel

edge_ngram_completion_filter = token_filter("edge_ngram_completion_filter", type="edge_ngram", min_gram=1, max_gram=20)

diacritics = analyzer(
    "diacritics",
    tokenizer="standard",
    filter=[
        "lowercase",
        "asciifolding"
        # edge_ngram_completion_filter
    ],
)

html_strip = analyzer(
    "html_strip", tokenizer="standard", filter=["lowercase", "stop", "snowball"], char_filter=["html_strip"]
)


@registry.register_document
class Verse(Document):
    is_nt = fields.BooleanField("chapter.book.is_nt")
    book_title = fields.TextField(
        analyzer=html_strip,
        fields={
            "raw": fields.TextField(analyzer="keyword"),
        },
    )
    book_number = fields.IntegerField()
    chapter_number = fields.IntegerField()
    # number = fields.LongField()
    text = fields.TextField(
        # term_vector='with_positions_offsets',
        analyzer=diacritics
    )

    class Django:
        model = VerseModel
        ignore_signals = True
        fields = [
            "number",
        ]


index_vdcc = Index("verses_vdcc")
index_vdcc.settings(number_of_shards=1, number_of_replicas=0)


@index_vdcc.doc_type
class VerseVDCC(Verse):
    class Django:
        model = VerseModel
        ignore_signals = True  # True is used because there are some issues.

    def get_queryset(self):
        return VerseModel.objects.filter(chapter__book__version=choices.Versions.VDCC)


index_ntr = Index("verses_ntr")
index_ntr.settings(number_of_shards=1, number_of_replicas=0)


@index_ntr.doc_type
class VerseNTR(Verse):
    class Django:
        model = VerseModel
        ignore_signals = True  # True is used because there are some issues.

    def get_queryset(self):
        return VerseModel.objects.filter(chapter__book__version=choices.Versions.NTR)


index_esv = Index("verses_esv")
index_esv.settings(number_of_shards=1, number_of_replicas=0)


@index_esv.doc_type
class VerseESV(Verse):
    class Django:
        model = VerseModel
        ignore_signals = True  # True is used because there are some issues.

    def get_queryset(self):
        return VerseModel.objects.filter(chapter__book__version=choices.Versions.ESV)


index_kjv = Index("verses_kjv")
index_kjv.settings(number_of_shards=1, number_of_replicas=0)


@index_kjv.doc_type
class VerseKJV(Verse):
    class Django:
        model = VerseModel
        ignore_signals = True  # True is used because there are some issues.

    def get_queryset(self):
        return VerseModel.objects.filter(chapter__book__version=choices.Versions.KJV)
