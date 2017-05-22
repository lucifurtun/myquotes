from django import http
from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from django.urls import reverse_lazy, reverse
from django.views import generic

from . import forms
from . import models


class QuoteListView(generic.TemplateView):
    template_name = 'quotes/all_quote_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'All Quotes'
        return context


class Dashboard(generic.TemplateView):
    template_name = 'quotes/dashboard.html'


class QuoteCreateView(generic.CreateView):
    template_name = 'quotes/quote_edit.html'
    model = models.Quote
    form_class = forms.QuoteForm
    success_url = reverse_lazy('quotes:quotes_list')

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs['user'] = self.request.user
        return kwargs


class QuoteEditView(generic.UpdateView):
    template_name = 'quotes/quote_edit.html'
    model = models.Quote
    form_class = forms.QuoteForm
    success_url = reverse_lazy('quotes:quotes_list')

    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)

        if self.request.user.id != self.object.user.id:
            raise PermissionDenied

        return response

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs['user'] = self.request.user
        return kwargs


class UserQuoteListView(generic.DetailView):
    model = User
    slug_field = "username"
    template_name = 'quotes/quote_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        full_name = self.object.get_full_name()
        name = full_name if full_name else self.object.username

        title = "My Quotes" if self.request.user.is_authenticated() else "{name}'s quotes".format(name=name)
        context['title'] = title

        if self.request.user.is_authenticated():
            context['form'] = forms.AngularQuoteForm(user=self.request.user)

        return context


class HomePageView(generic.TemplateView):
    template_name = 'quotes/homepage.html'

    def dispatch(self, request, *args, **kwargs):
        if self.request.user.is_authenticated():
            return http.HttpResponseRedirect(reverse('quotes:profile', args=[request.user.username]))

        return super().dispatch(request, *args, **kwargs)
