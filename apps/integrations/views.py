from django.shortcuts import render
from .forms import KindleForm
from django.views.generic.edit import FormView
from apps.quotes.models import Quote
import itertools


class Kindle(FormView):
    template_name = 'integrations/kindle.html'
    form_class = KindleForm
    success_url = '/integrations/kindle'

    def form_valid(self, form):
        f = self.request.FILES['file'].read()

        for key, group in itertools.groupby(f, lambda line: line.startswith('==========')):
            if not key:
                group = list(group)
                source = group[0].replace('\n', '').replace('\ufeff', '')
                text = group[3].replace('\n', '')
                sources = source.split('\n')
                texts = text.split('\n')
                quote_dict = dict(zip(sources, texts))
                for s in quote_dict:
                    Quote.objects.create(source=s, text=quote_dict[s])
