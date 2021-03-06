from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPageNumberPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'page_size': self.get_page_size(self.request),
            'page': self.page.number,
            'has_more': self.page.has_next(),
            'results': data,
        })


class QuotesResultsSetPagination(PageNumberPagination):
    page_size = 25
    page_size_query_param = 'page_size'
    max_page_size = 10000

    def get_paginated_response(self, data):
        return Response({
            'pages': {
                'next': self.page.next_page_number() if self.page.has_next() else None,
                'previous': self.page.previous_page_number() if self.page.has_previous() else None
            },
            'count': self.page.paginator.count,
            'page': self.page.number,
            'has_more': self.page.has_next(),
            'results': data
        })