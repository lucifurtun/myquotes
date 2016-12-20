from django.core.exceptions import NON_FIELD_ERRORS
from django.forms import ModelForm
from . import models


class QuoteForm(ModelForm):
    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user')
        super().__init__(*args, **kwargs)
        self.fields['author'].queryset = self.fields['author'].queryset.filter(user=user)
        self.fields['category'].queryset = self.fields['category'].queryset.filter(user=user)
        self.fields['tags'].queryset = self.fields['tags'].queryset.filter(user=user)

        pass

    class Meta:
        model = models.Quote
        fields = ('user', 'title', 'author', 'source', 'reference', 'category', 'tags', 'text')
        error_messages = {
            NON_FIELD_ERRORS: {
                'unique_together': "It looks like you already added this quote.",
            }
        }
