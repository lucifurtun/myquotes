from django.db import models


class Book(models.Model):
    number = models.IntegerField()
    title = models.CharField(max_length=255)

    class Meta:
        ordering = ('number',)


class Chapter(models.Model):
    number = models.IntegerField()

    book = models.ForeignKey(Book)

    class Meta:
        ordering = ('number',)


class Verse(models.Model):
    number = models.IntegerField()
    text = models.TextField()

    chapter = models.ForeignKey(Chapter)

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
