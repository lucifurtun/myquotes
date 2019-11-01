import django_filters
from django_filters import rest_framework as filters

from apps.quotes.models import Quote


class QuotesFilterSet(django_filters.FilterSet):
    user__username = filters.CharFilter(field_name='user__username')
    user__id = filters.NumberFilter(field_name='user_id')

    class Meta:
        model = Quote
        fields = ['user__username', 'user__id']
