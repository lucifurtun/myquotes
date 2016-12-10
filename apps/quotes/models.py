from ckeditor.fields import RichTextField
from django.conf import settings
from django.db import models
from django.utils import timezone


class NameAsStrMixin(object):
    name = None

    def __str__(self, *args, **kwargs):
        return self.name


class UserTimeStampedModel(models.Model):
    created = models.DateTimeField(auto_now_add=True, editable=False)
    modified = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        return super(UserTimeStampedModel, self).save(*args, **kwargs)

    class Meta:
        get_latest_by = 'modified'
        ordering = ('-modified', '-created',)
        abstract = True


class Category(NameAsStrMixin, UserTimeStampedModel):
    name = models.CharField(max_length=300)

    class Meta:
        verbose_name_plural = 'Categories'


class Tag(NameAsStrMixin, UserTimeStampedModel):
    name = models.CharField(max_length=300)


class Author(NameAsStrMixin, UserTimeStampedModel):
    name = models.CharField(max_length=300)


class Quote(UserTimeStampedModel):
    title = models.CharField(max_length=400)
    author = models.ForeignKey('Author', null=True)
    category = models.ForeignKey('Category', null=True)
    tags = models.ManyToManyField('Tag', blank=True)
    text = RichTextField()

    class Meta:
        unique_together = (('user', 'title'), ('user', 'text'))

    def __str__(self):
        return '{title} - {author}'.format(title=self.title, author=self.author)
