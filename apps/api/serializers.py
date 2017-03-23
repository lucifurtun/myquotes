from rest_framework import serializers

from apps.quotes import models


class QuoteSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault(), write_only=True)
    tags_id = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Tag.objects.all(), required=False,
                                                 source='tags')
    author_id = serializers.PrimaryKeyRelatedField(queryset=models.Author.objects.all(), required=False,
                                                   source='author')
    category_id = serializers.PrimaryKeyRelatedField(queryset=models.Category.objects.all(), required=False,
                                                     source='category')

    class Meta:
        model = models.Quote
        depth = 1
        fields = '__all__'


class AuthorSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault(), write_only=True)
    quotes = serializers.IntegerField(source='quote__count', read_only=True)

    class Meta:
        model = models.Author
        fields = ('id', 'name', 'quotes', 'user')


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
