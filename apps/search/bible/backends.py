from django_elasticsearch_dsl_drf.constants import MATCHING_OPTION_MUST
from django_elasticsearch_dsl_drf.filter_backends import BaseSearchFilterBackend
from django_elasticsearch_dsl_drf.filter_backends.search.query_backends import MatchPhraseQueryBackend, \
    BaseSearchQueryBackend
from elasticsearch_dsl import Q
from rest_framework.exceptions import ValidationError


class SpanQueryBackend(BaseSearchQueryBackend):
    """Span query string query backend."""

    query_type = 'span_near'
    query_param = 'search'

    @classmethod
    def construct_search(cls, request, view, search_backend):
        __queries = []

        phrase = request.query_params.get(cls.query_param)
        clauses = []

        if not phrase:
            return __queries

        if not hasattr(view, 'span_search_field') or not view.span_search_field:
            return __queries

        for word in phrase.strip().split(' '):
            text_to_search = word.lower()

            if '*' in text_to_search or '?' in text_to_search:
                if len(text_to_search) < 3:
                    raise ValidationError({view.span_search_field: 'When using "*" or "?" the word needs to contain at least 3 characters.'})

                clause = {'span_multi': {"match": {"wildcard": {view.span_search_field: text_to_search}}}}
            else:
                clause = {"span_term": {view.span_search_field: text_to_search}}

            clauses.append(clause)

        q = Q(
            cls.query_type,
            clauses=clauses,
            slop=0,
            in_order=True
        )

        __queries.append(q)

        return __queries


class SearchFilterBackend(BaseSearchFilterBackend):
    query_backends = [
        MatchPhraseQueryBackend
    ]


class SpanSearchFilterBackend(BaseSearchFilterBackend):
    """Simple query string search filter backend."""

    search_param = 'search_simple_query_string'

    matching = MATCHING_OPTION_MUST

    query_backends = [
        SpanQueryBackend,
    ]
