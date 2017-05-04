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
    # tags_id = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Tag.objects.all(),
    #                                              required=False, allow_null=True, source='tags')
    author_id = serializers.PrimaryKeyRelatedField(queryset=models.Author.objects.all(),
                                                   required=False, allow_null=True, source='author')
    category_id = serializers.PrimaryKeyRelatedField(queryset=models.Category.objects.all(),
                                                     required=False, allow_null=True, source='category')

    def create(self, validated_data):
        # tags_name = validated_data.pop('tags')
        # if tags_name:
        #     tags_id = []
        #     tag_objects = models.Tag.objects.filter(name__in=tags_name)
        #     # ids_by_names = dict(tag_objects.values_list('name', 'id'))
        #     ids_by_names = {tag.name: tag for tag in tag_objects}
        #
        #     for tag in tags_name:
        #         tag_object = ids_by_names.get(tag)
        #         if tag_object:
        #             tags_id.append(tag_object)
        #         else:
        #             tags_id.append(models.Tag.objects.create(name=tag))
        #
        #     validated_data['tags'] = tags_id

        return super().create(validated_data)

    class Meta:
        model = models.Quote
        depth = 1
        fields = '__all__'
