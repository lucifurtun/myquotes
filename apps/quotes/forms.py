from django.core.exceptions import NON_FIELD_ERRORS
from django.forms import ModelForm
from . import models


class QuoteForm(ModelForm):
    class Meta:
        model = models.Quote
        fields = ('user', 'title', 'author', 'source', 'reference', 'category', 'tags', 'text')
        error_messages = {
            NON_FIELD_ERRORS: {
                'unique_together': "It looks like you already added this quote.",
            }
        }
