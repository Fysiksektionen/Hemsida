from utils.serializers import DBObjectSerializer
from django.core.cache import cache
from rest_framework import viewsets, mixins, serializers
from website.models.content_objects import *


class ContentImageSerializer(DBObjectSerializer):
    fields = '__all__'

    class Meta:
        model = ContentImage


class ContentTextSerializer(DBObjectSerializer):
    fields = '__all__'

    class Meta:
        model = ContentText


class ContentCollectionSerializer(DBObjectSerializer):

    items = serializers.SerializerMethodField()
    fields = ['name', 'is_ordered', 'order', 'component', 'db_type', 'attributes', 'items']

    class Meta:
        model = ContentCollection

    @staticmethod
    def get_items(obj):
        serialized_items = {}
        for item in obj:
            print(5, item)
            serialized_item = CONTENT_SERIALIZERS[item['db_type']](item['object'])
            print(6, serialized_item)
            serialized_items[item['object'].id] = serialized_item
        return serialized_items


CONTENT_SERIALIZERS = {
    'text': ContentTextSerializer,
    'image': ContentImageSerializer,
    'menu': 'MenuItemSerializer',
    'page': 'PageSerializer',
    'list': ContentCollectionSerializer,
    'dict': ContentCollectionSerializer
}

