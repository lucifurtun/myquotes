from django import forms


class KindleForm(forms.Form):
    file = forms.FileField()