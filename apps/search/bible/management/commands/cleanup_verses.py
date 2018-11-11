from django.core.management.base import BaseCommand
from elasticsearch_dsl import connections

from apps.search.bible.indexes import Verse

connections.create_connection(hosts=['localhost'], timeout=20)


class Command(BaseCommand):
    help = 'Imports books'

    def handle(self, *args, **options):
        s = Verse.search()

        results = s.execute()

        for verse in results:
            print(verse)
            verse.delete()

        self.stdout.write(self.style.SUCCESS('Cleanup completed!'))
