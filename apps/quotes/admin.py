from django.contrib import admin

from apps.quotes import models

admin.site.register(models.Author)
admin.site.register(models.Category)
admin.site.register(models.Tag)
admin.site.register(models.Quote)
