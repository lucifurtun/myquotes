from allauth.account.views import LoginView as AllAuthLoginView
from allauth.account.views import LogoutView as AllAuthLogoutView
from allauth.account.views import SignupView as AllAuthSignupView


class LoginView(AllAuthLoginView):
    template_name = 'authentication/login.html'


class LogoutView(AllAuthLogoutView):
    pass


class SignUpView(AllAuthSignupView):
    template_name = 'authentication/signup.html'
