from django.contrib.auth.models import User
from django.urls import reverse_lazy
from django.views import generic

from . import forms
from . import models


class QuoteListView(generic.TemplateView):
    template_name = 'quotes/quote_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'My Quotes'
        return context


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


class UserQuoteListView(generic.DetailView):
    model = User
    slug_field = "username"
    template_name = 'quotes/quote_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = "{name}'s quotes".format(name=self.object.username)

        return context
