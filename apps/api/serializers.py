from rest_framework import serializers

from apps.quotes import models


class QuoteSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault(), write_only=True)

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
