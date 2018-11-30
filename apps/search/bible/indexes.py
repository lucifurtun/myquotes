from django_elasticsearch_dsl import DocType, Index, fields
from elasticsearch_dsl import analyzer, connections, token_filter

from .models import Verse as VerseModel

connections.create_connection(hosts=['localhost'])

edge_ngram_completion_filter = token_filter(
    'edge_ngram_completion_filter',
    type="edge_ngram",
    min_gram=1,
    max_gram=20
)

diacritics = analyzer(
    'diacritics',
    tokenizer="standard",
    filter=[
        "standard",
        "lowercase",
        "asciifolding"
        # edge_ngram_completion_filter
    ]
)

html_strip = analyzer(
    'html_strip',
    tokenizer="standard",
    filter=["standard", "lowercase", "stop", "snowball"],
    char_filter=["html_strip"]
)

verses_index = Index('verses')
verses_index.settings(
    number_of_shards=1,
    number_of_replicas=0
)


@verses_index.doc_type
class Verse(DocType):
    book_title = fields.StringField(
        analyzer=html_strip,
        fields={
            'raw': fields.StringField(analyzer='keyword'),
        }
    )
    book_number = fields.IntegerField()
    chapter_number = fields.IntegerField()

    number = fields.LongField()
    text = fields.TextField(analyzer=diacritics)
    is_nt = fields.BooleanField('chapter.book.is_nt')

    class Meta(object):
        model = VerseModel
        # ignore_signals = True
