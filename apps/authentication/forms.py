from django import forms
from django.core.mail import send_mail


class SignupForm(forms.Form):
    def signup(self, request, user):
        user.is_active = False
        user.save()

        send_mail(
            'New user on MyQuotes',
            'There is one new user asking for access. ID: {id}, Email: {email}'.format(id=user.id, email=user.email),
            'MyQuotes<contact@myquotes.io>',
            ['lucianfurtun@gmail.com'],
            fail_silently=True,
        )
