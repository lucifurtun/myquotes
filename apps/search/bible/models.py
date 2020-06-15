from django.db import models


class Book(models.Model):
    number = models.IntegerField(db_index=True)
    title = models.CharField(max_length=255, db_index=True)
    version = models.CharField(max_length=10, db_index=True)
    language = models.CharField(max_length=10)

    is_nt = models.BooleanField()

    class Meta:
        ordering = ('number',)
        unique_together = ('title', 'version')

    def save(self, *args, **kwargs):
        self.language = self.language.lower()
        self.version = self.version.lower()
        super().save(*args, **kwargs)


class Chapter(models.Model):
    number = models.IntegerField()

    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    class Meta:
        ordering = ('number',)

    def __str__(self):
        return '{} {}'.format(self.book.title, self.number)


class Verse(models.Model):
    number = models.IntegerField()
    text = models.TextField()

    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)

    class Meta:
        ordering = ('number',)

    def __str__(self):
        return '{} {}:{}'.format(self.chapter.book.title, self.chapter.number, self.number)

    @property
    def book_title(self):
        return self.chapter.book.title

    @property
    def book_number(self):
        return self.chapter.book.number

    @property
    def chapter_number(self):
        return self.chapter.number


class ReferenceVerse(models.Model):
    verse_number = models.PositiveIntegerField()
    chapter_number = models.PositiveIntegerField()
    book_number = models.PositiveIntegerField()

    class Meta:
        unique_together = ('verse_number', 'chapter_number', 'book_number')

    def __str__(self):
        return f'{self.book_number} - {self.chapter_number} - {self.verse_number}'


class Reference(models.Model):
    verse = models.ForeignKey(ReferenceVerse, on_delete=models.CASCADE, related_name='references')

    reference_from = models.ForeignKey(ReferenceVerse, on_delete=models.CASCADE, related_name='references_from')
    reference_to = models.ForeignKey(ReferenceVerse, on_delete=models.CASCADE, related_name='references_to')

    def __str__(self):
        return f'{self.verse} ->> {self.reference_from} - {self.reference_to}'

    class Meta:
        unique_together = ('verse', 'reference_from', 'reference_to')
