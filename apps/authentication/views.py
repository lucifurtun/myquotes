from allauth.account.views import LoginView as AllAuthLoginView
from allauth.account.views import LogoutView as AllAuthLogoutView
from allauth.account.views import SignupView as AllAuthSignupView
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from django.views import generic


class LoginView(AllAuthLoginView):
    template_name = 'authentication/login.html'


class LogoutView(AllAuthLogoutView):
    pass


class SignUpView(AllAuthSignupView):
    template_name = 'authentication/signup.html'


class Settings(generic.UpdateView):
    model = User
    success_url = reverse_lazy('account_settings')
    template_name = 'authentication/user_edit.html'
    fields = ('username', 'email', 'first_name', 'last_name')

    def get_object(self, queryset=None):
        return self.request.user


class Inactive(generic.TemplateView):
    template_name = 'authentication/inactive.html'
