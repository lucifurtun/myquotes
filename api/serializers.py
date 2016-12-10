from rest_framework import serializers

from quotes import models


class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Quote
        fields = '__all__'


class AuthorSerializer(serializers.ModelSerializer):
    quotes = serializers.IntegerField(source='quote__count')

    class Meta:
        model = models.Author
        fields = ('id', 'name', 'quotes')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tag
        fields = '__all__'
