from django.core.exceptions import ObjectDoesNotExist
from django.utils.encoding import smart_text
from rest_framework import serializers


class CreatableSlugRelatedField(serializers.SlugRelatedField):
    def to_internal_value(self, data):
        try:
            filters = {self.slug_field: data, 'user': self.context['request'].user}
            return self.get_queryset().get_or_create(**filters)[0]
        except ObjectDoesNotExist:
            self.fail('does_not_exist', slug_name=self.slug_field, value=smart_text(data))
        except (TypeError, ValueError):
            self.fail('invalid')


class AuthorCreatableSlugRelatedField(serializers.SlugRelatedField):
    def to_internal_value(self, data):
        user = self.context['request'].user
        filters = {self.slug_field: data}

        try:
            author = self.get_queryset().get(**filters)
        except ObjectDoesNotExist:

            author = self.get_queryset().create(name=data, user=user)

        author.users.add(user)

        return author
