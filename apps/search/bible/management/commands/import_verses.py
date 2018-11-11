import xmltodict
from django.core.management.base import BaseCommand
from elasticsearch_dsl import connections

from apps.search.bible import models
from apps.search.bible.indexes import Verse

connections.create_connection(hosts=['localhost'], timeout=20)


class Command(BaseCommand):
    help = 'Imports books'

    def handle(self, *args, **options):
        Verse.init()

        with open('sample.xml') as f:
            xml_input = f.read()

        data = xmltodict.parse(xml_input)

        for book in data['XMLBIBLE']['BIBLEBOOK']:
            book_title = book['@bname']
            book_number = book['@bnumber']

            book_obj = models.Book.objects.create(number=book_number, title=book_title)

            for chapter in book['CHAPTER']:
                chapter_number = chapter['@cnumber']

                chapter_obj = models.Chapter.objects.create(number=chapter_number, book=book_obj)

                for verse in chapter['VERS']:
                    verse_number = verse['@vnumber']
                    text = verse['#text']
                    print(text)

                    verse_object = models.Verse.objects.create(number=verse_number, text=text, chapter=chapter_obj)

                    # verse = Verse(number=verse_number, chapter=chapter_number, book=book_title, content=text)
                    # verse.save()

                    # print(verse)
                    print(verse_object)

        self.stdout.write(self.style.SUCCESS('Import completed!'))
