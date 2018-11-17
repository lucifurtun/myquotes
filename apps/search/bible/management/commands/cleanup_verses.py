from django.core.management.base import BaseCommand

from apps.search.bible.models import Book


class Command(BaseCommand):
    help = 'Imports books'

    def handle(self, *args, **options):
        books = Book.objects.all()

        for book in books:
            book.delete()

        self.stdout.write(self.style.SUCCESS('Cleanup completed!'))
