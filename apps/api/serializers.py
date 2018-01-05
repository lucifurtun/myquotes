from rest_framework import serializers

from . import fields
from apps.quotes import models


class AuthorSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault(), write_only=True)

    quotes = serializers.IntegerField(source='quote__count', read_only=True)

    class Meta:
        model = models.Author
        fields = ('id', 'name', 'quotes', 'user', 'users')


class CategorySerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault(), write_only=True)

    class Meta:
        model = models.Category
        fields = ('id', 'name', 'user')


class TagSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault(), write_only=True)

    class Meta:
        model = models.Tag
        fields = ('id', 'name', 'user')


class QuoteSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault(), write_only=True)
    tags_name = fields.CreatableSlugRelatedField(required=False, queryset=models.Tag.objects.all(), many=True,
                                                 allow_null=True, slug_field='name', source='tags')
    author_name = fields.AuthorCreatableSlugRelatedField(required=False, queryset=models.Author.objects.all(),
                                                         allow_null=True, slug_field='name', source='author')
    category_name = fields.CreatableSlugRelatedField(required=False, queryset=models.Category.objects.all(),
                                                     allow_null=True, slug_field='name', source='category')

    class Meta:
        model = models.Quote
        depth = 1
        fields = '__all__'
