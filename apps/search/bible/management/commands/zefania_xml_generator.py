import json
from itertools import groupby

import xmltodict
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Generates zefania xml from different formats'

    def handle(self, *args, **options):
        with open('NTR.json') as f:
            data = json.load(f)

        grouped_books = groupby(data, lambda item: item['book_number'])
        books_list = []

        for book_grouper, chapters in grouped_books:
            chapters_list = []
            grouped_chapters = groupby(chapters, lambda item: item['chapter'])
            for chapter_grouper, verses in grouped_chapters:
                chapters_list.append({
                    'number': chapter_grouper,
                    'items': list(verses)
                })

            books_list.append({
                'title': chapters_list[0]['items'][0]['long_name'],
                'number': int(book_grouper / 10),
                'items': chapters_list
            })

        with open('NTR.xml', 'w+') as f:
            d = {
                'XMLBIBLE': {
                    'BIBLEBOOK': [
                        {
                            '@bnumber': book['number'],
                            '@bname': book['title'],
                            'CHAPTER': [
                                {
                                    '@cnumber': chapter['number'],
                                    'VERS': [
                                        {
                                            '@vnumber': verse['verse'],
                                            '#text': verse['text']
                                        } for verse in chapter['items']
                                    ]
                                } for chapter in book['items']
                            ]

                        } for book in books_list
                    ]
                }
            }

            f.write(xmltodict.unparse(d, pretty=True))

        self.stdout.write(self.style.SUCCESS('Imported!'))
