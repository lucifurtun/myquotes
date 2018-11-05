from django.shortcuts import render
from django.views import generic
from .forms import KindleForm
from django.views.generic.edit import FormView


class Kindle(FormView):
    template_name = 'integrations/kindle.html'
    form_class = KindleForm
    success_url = 'integrations/kindle.html'

    def post(self, request, *args, **kwargs):
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        file = request.FILES['file'].read()
        if form.is_valid():
            print(file)

            return self.form_valid(form)
        else:
            return self.form_invalid(form)
