from django.contrib import admin

from apps.search.bible import models


class VerseAdmin(admin.ModelAdmin):
    search_fields = ('chapter__book__name',)
    autocomplete_fields = ('chapter',)
    list_display = ('__str__', 'text')


class ChapterAdmin(admin.ModelAdmin):
    search_fields = ('book__name',)
    autocomplete_fields = ('book',)


class BookAdmin(admin.ModelAdmin):
    search_fields = ('name',)


class ReferenceVerseAdmin(admin.ModelAdmin):
    search_fields = ('number',)


class ReferenceAdmin(admin.ModelAdmin):
    search_fields = ('verse__chapter__book__name',)
    autocomplete_fields = ('verse', 'reference_from', 'reference_to')


admin.site.register(models.Verse, VerseAdmin)
admin.site.register(models.Chapter, ChapterAdmin)
admin.site.register(models.Book, BookAdmin)
admin.site.register(models.ReferenceVerse, ReferenceVerseAdmin)
admin.site.register(models.Reference, ReferenceAdmin)
