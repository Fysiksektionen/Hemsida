from utils.serializers import DBObjectSerializer, ExtendedModelSerializer
from django.core.cache import cache
from rest_framework import viewsets, mixins, serializers
from website.models.content_objects import *
from website.views.menus import MenuItemSerializer


def serialize_item(item, get_children=True):
    """Recursive method used to rebuild content object tree as a dictionary."""
    serialized_item = ContentObjectBaseSerializer(item['object']).data

    if item['db_type'] == 'dict':
        if get_children:
            serialized_item['items'] = {}
            for child in item['items']:
                serialized_item['items'][child['object'].name] = serialize_item(child)
    elif item['db_type'] == 'list':
        if get_children:
            serialized_item['items'] = []
            for child in item['items']:
                serialized_item['items'].append(serialize_item(child))
    else:
        serialized_item[item['db_type']] = content_object_value_serializers[item['db_type']](item['object']).data

    return serialized_item


class ContentObjectBaseSerializer(DBObjectSerializer):
    class Meta:
        model = ContentObjectBase
        exclude = ['parent_page', 'collection', 'order', 'name']


class ImageSerializer(serializers.Serializer):
    image = serializers.ImageField


class TextSerializer(serializers.Serializer):
    text = serializers.CharField(required=True, allow_blank=True)


class COMenuSerializer(ExtendedModelSerializer):
    menu = MenuItemSerializer

    class Meta:
        model = ContentMenu
        fields = ['menu']


class COPageSerializer(ExtendedModelSerializer):
    pass
    """page = något

    class Meta:
        model = ContentPage
        fields = ['page']"""


content_object_value_serializers = {
    'text': TextSerializer,
    'image': ImageSerializer,
    'menu': COMenuSerializer,
    'page': COPageSerializer,
}

