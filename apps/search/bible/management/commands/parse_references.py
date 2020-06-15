import json
from collections import defaultdict

from django.core.management.base import BaseCommand

from apps.search.bible import models

MAPPING = {
    "Gen": 1,
    "Exod": 2,
    "Lev": 3,
    "Num": 4,
    "Deut": 5,
    "Josh": 6,
    "Judg": 7,
    "Ruth": 8,
    "1Sam": 9,
    "2Sam": 10,
    "1Kgs": 11,
    "2Kgs": 12,
    "1Chr": 13,
    "2Chr": 14,
    "Ezra": 15,
    "Neh": 16,
    "Esth": 17,
    "Job": 18,
    "Ps": 19,
    "Prov": 20,
    "Eccl": 21,
    "Song": 22,
    "Isa": 23,
    "Jer": 24,
    "Lam": 25,
    "Ezek": 26,
    "Dan": 27,
    "Hos": 28,
    "Joel": 29,
    "Amos": 30,
    "Obad": 31,
    "Jonah": 32,
    "Mic": 33,
    "Nah": 34,
    "Hab": 35,
    "Zeph": 36,
    "Hag": 37,
    "Zech": 38,
    "Mal": 39,
    "Matt": 40,
    "Mark": 41,
    "Luke": 42,
    "John": 43,
    "Acts": 44,
    "Rom": 45,
    "1Cor": 46,
    "2Cor": 47,
    "Gal": 48,
    "Eph": 49,
    "Phil": 50,
    "Col": 51,
    "1Thess": 52,
    "2Thess": 53,
    "1Tim": 54,
    "2Tim": 55,
    "Titus": 56,
    "Phlm": 57,
    "Heb": 58,
    "Jas": 59,
    "1Pet": 60,
    "2Pet": 61,
    "1John": 62,
    "2John": 63,
    "3John": 64,
    "Jude": 65,
    "Rev": 66
}
latest_book = 'first'
mapping_data = {}
count = 1


class Command(BaseCommand):
    help = 'Imports cross references'

    def handle(self, *args, **options):
        reference_data = defaultdict(list)

        with open('cross_references.txt') as f:
            for line in f:
                splitted = line.split()
                origin = splitted[0]
                rest = splitted[1]

                rest_splitted = rest.split('	')
                reference = rest_splitted[0]

                print(f'{origin} --->>> {reference}')

                reference_data[origin].append(reference)

        with open('references.json', 'w') as outfile:
            json.dump(reference_data, outfile)
