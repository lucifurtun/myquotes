from django.urls import reverse_lazy
from django.views import generic

from . import forms
from . import models


class QuoteListView(generic.ListView):
    model = models.Quote


class Dashboard(generic.TemplateView):
    template_name = 'quotes/dashboard.html'


class QuoteCreateView(generic.CreateView):
    template_name = 'quotes/quote_edit.html'
    model = models.Quote
    form_class = forms.QuoteForm
    success_url = reverse_lazy('quotes:quotes_list')


class QuoteEditView(generic.UpdateView):
    template_name = 'quotes/quote_edit.html'
    model = models.Quote
    form_class = forms.QuoteForm
    success_url = reverse_lazy('quotes:quotes_list')
