from django.conf.urls import url

from apps.search.bible import views as bible_views

urlpatterns = [
    url(r'^verses/(?P<version>[\w]+)/$', bible_views.VerseView.as_view({'get': 'list'})),
    url(r'^books/(?P<version>[\w]+)/$', bible_views.BookView.as_view()),
    url(r'^chapters/(?P<version>[\w]+)/$', bible_views.ChapterView.as_view()),

    url(r'^references/$', bible_views.ReferencesView.as_view()),
]
