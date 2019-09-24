from django import http
from django.contrib.auth.models import User
from django.urls import reverse
from django.views import generic


class QuoteListView(generic.TemplateView):
    template_name = 'quotes/all_quote_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'All Quotes'
        return context


class Dashboard(generic.TemplateView):
    template_name = 'quotes/dashboard.html'


class UserQuoteListView(generic.DetailView):
    model = User
    slug_field = "username"
    template_name = 'quotes/quote_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        full_name = self.object.get_full_name()
        name = full_name if full_name else self.object.username

        if self.object.id == self.request.user.id:
            title = "My Quotes"
        else:
            title = "{name}'s quotes".format(name=name)

        context['title'] = title

        return context


class HomePageView(generic.TemplateView):
    template_name = 'quotes/homepage.html'

    def dispatch(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            return http.HttpResponseRedirect(reverse('quotes:profile', args=[request.user.username]))

        return super().dispatch(request, *args, **kwargs)
