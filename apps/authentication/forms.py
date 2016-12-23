from django import forms


class SignupForm(forms.Form):
    def signup(self, request, user):
        user.is_active = False
        user.save()
