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
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        self.modified = timezone.now()
        super(UserTimeStampedModel, self).save(*args, **kwargs)

    class Meta:
        get_latest_by = 'modified'
        ordering = ('-modified', '-created',)
        abstract = True


class Category(NameAsStrMixin, UserTimeStampedModel):
    name = models.CharField(max_length=300)

    class Meta:
        verbose_name_plural = 'Categories'
        unique_together = ('user', 'name')


class Tag(NameAsStrMixin, UserTimeStampedModel):
    name = models.CharField(max_length=300)

    class Meta:
        unique_together = ('user', 'name')


class Author(NameAsStrMixin, UserTimeStampedModel):
    name = models.CharField(max_length=300, unique=True)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='authors')


class Quote(UserTimeStampedModel):
    title = models.CharField(max_length=400)
    author = models.ForeignKey('Author', blank=True, null=True, on_delete=models.SET_NULL)
    category = models.ForeignKey('Category', blank=True, null=True, on_delete=models.SET_NULL)
    source = models.CharField(max_length=200, blank=True, null=True)
    reference = models.CharField(max_length=100, blank=True, null=True)
    tags = models.ManyToManyField('Tag', blank=True)
    text = models.TextField()
    private = models.BooleanField(default="False")

    class Meta:
        unique_together = (('user', 'title'), ('user', 'text'))

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.author and not self.author.users.filter(id=self.user.id).exists():
            self.author.users.add(self.user)

    def __str__(self):
        return '{title} - {author}'.format(title=self.title, author=self.author)
