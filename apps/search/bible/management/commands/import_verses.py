import xmltodict
from django.core.management.base import BaseCommand
from elasticsearch_dsl import connections

from apps.search.bible import models

connections.create_connection(hosts=['localhost'], timeout=20)


class Command(BaseCommand):
    help = 'Imports bible data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--path',
            dest='path',
            required=True
        )

        parser.add_argument(
            '--language',
            dest='language',
            required=True
        )

        parser.add_argument(
            '--translation',
            dest='version',
            required=True
        )

    def handle(self, *args, **options):
        path = options.get('path')
        version = options.get('version')
        language = options.get('language')

        with open(path) as f:
            xml_input = f.read()

        data = xmltodict.parse(xml_input)

        for book in data['XMLBIBLE']['BIBLEBOOK']:
            book_title = book['@bname']
            book_number = int(book['@bnumber'])
            is_nt = book_number > 39

            book_obj = models.Book.objects.create(
                number=book_number,
                title=book_title,
                is_nt=is_nt,
                language=language,
                version=version
            )

            if isinstance(book['CHAPTER'], list):
                chapters = book['CHAPTER']
            else:
                chapters = [book['CHAPTER']]

            for chapter in chapters:
                chapter_number = int(chapter['@cnumber'])

                chapter_obj = models.Chapter.objects.create(number=chapter_number, book=book_obj)

                for verse in chapter['VERS']:
                    verse_number = int(verse['@vnumber'])
                    try:
                        text = verse['#text']
                    except KeyError:
                        self.stdout.write(
                            self.style.WARNING('Missing {} {}:{}'.format(book_title, chapter_number, verse_number))
                        )

                    verse_object = models.Verse.objects.create(number=verse_number, text=text, chapter=chapter_obj)

                self.stdout.write(self.style.SUCCESS('Imported "{}:{}"'.format(book_title, chapter_number)))
