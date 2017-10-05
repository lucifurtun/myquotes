from django.core.exceptions import NON_FIELD_ERRORS
from django import forms
from . import models


class QuoteForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user')
        super().__init__(*args, **kwargs)
        self.fields['author'].queryset = self.fields['author'].queryset.filter(user=user)
        self.fields['category'].queryset = self.fields['category'].queryset.filter(user=user)
        self.fields['tags'].queryset = self.fields['tags'].queryset.filter(user=user)

    class Meta:
        model = models.Quote
        fields = ('user', 'title', 'author', 'source', 'reference', 'category', 'tags', 'text')
        error_messages = {
            NON_FIELD_ERRORS: {
                'unique_together': "It looks like you already added this quote.",
            }
        }


class AngularQuoteForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user')
        super().__init__(*args, **kwargs)
        self.fields['author'].queryset = self.fields['author'].queryset.filter(users__in=[user.id])
        self.fields['category'].queryset = self.fields['category'].queryset.filter(user=user)
        self.fields['tags'].queryset = self.fields['tags'].queryset.filter(user=user)

        self.fields['title'].widget.attrs.update({'ng-model': 'quoteData.title'})
        self.fields['source'].widget.attrs.update({'ng-model': 'quoteData.source'})
        self.fields['reference'].widget.attrs.update({'ng-model': 'quoteData.reference'})
        self.fields['author'].widget.attrs.update({'ng-model': 'quoteData.author'})
        self.fields['category'].widget.attrs.update({'ng-model': 'quoteData.category'})
        self.fields['tags'].widget.attrs.update({'ng-model': 'quoteData.tags'})
        self.fields['text'].widget.attrs.update({'ng-model': 'quoteData.text'})

    class Meta:
        model = models.Quote
        fields = ('user', 'title', 'author', 'source', 'reference', 'category', 'tags', 'text')
