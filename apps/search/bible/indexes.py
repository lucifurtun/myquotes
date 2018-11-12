from django_elasticsearch_dsl import DocType, Index, fields
from elasticsearch_dsl import analyzer, connections

from .models import Verse as VerseModel

connections.create_connection(hosts=['localhost'])

diacritics = analyzer(
    'diacritics',
    tokenizer="standard",
    filter=["standard", "lowercase", "asciifolding"]
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

    class Meta(object):
        """Meta options."""

        model = VerseModel
        # fields = ('number', 'text',)
