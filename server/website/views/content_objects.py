from utils.serializers import DBObjectSerializer, ExtendedModelSerializer
from django.core.cache import cache
from rest_framework import viewsets, mixins, serializers

from website.models import Menu
from website.models.content_objects import *
from website.selectors.content_objects import get_content_object_trees
from website.views.menus import MenuItemSerializer
import website.views.pages as pages


def serialize_item(item, context, fields=None, get_children=True):
    """Recursive method used to rebuild content object tree as a dictionary."""
    if fields:
        serialized_item = ContentObjectBaseSerializer(item['object'], context=context, fields=fields).data
    else:
        serialized_item = ContentObjectBaseSerializer(item['object'], context=context).data

    if item['db_type'] == 'dict':
        if get_children:
            serialized_item['items'] = {}
            for child in item['items']:
                serialized_item['items'][child['object'].name] = serialize_item(item=child, context=context)
    elif item['db_type'] == 'list':
        if get_children:
            serialized_item['items'] = []
            for child in item['items']:
                serialized_item['items'].append(serialize_item(item=child, context=context))
    else:
        serialized_item[item['db_type']] = content_object_value_serializers[item['db_type']](item['object'], context=context).data

    return serialized_item


class ContentObjectBaseSerializer(DBObjectSerializer):
    """Serializer for rendering content objects without all the fields.
    Used when rendering content objects for a page."""
    class Meta:
        model = ContentObjectBase
        fields = ['db_type', 'component', 'attributes']

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super(ContentObjectBaseSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class ImageSerializer(serializers.Serializer):
    image = serializers.ImageField()


class TextSerializer(serializers.Serializer):
    text = serializers.CharField(required=True, allow_blank=True)


class COMenuSerializer(ExtendedModelSerializer):
    """Serializer for rendering COMenu."""
    menu = MenuItemSerializer()

    class Meta:
        model = ContentMenu
        fields = ['menu']


class COPageSerializer(ExtendedModelSerializer):
    """Serializer for rendering COPage."""
    page = pages.PageSerializer()

    class Meta:
        model = ContentPage
        fields = ['page']


content_object_value_serializers = {
    'text': TextSerializer,
    'image': ImageSerializer,
    'menu': COMenuSerializer,
    'page': COPageSerializer,
}


class ContentObjectsSerializer(DBObjectSerializer):
    """Serializer for rendering content objects with complete information."""
    value = serializers.SerializerMethodField()
    parent_page = pages.PageSerializer(fields=['id', 'detail_url', 'name'])
    collection = ContentObjectBaseSerializer(fields=['id', 'detail_url', 'name'])

    class Meta:
        model = ContentObjectBase
        fields = ['name', 'db_type', 'component', 'parent_page', 'collection',
                  'attributes', 'collection', 'order', 'value']

    def get_value(self, obj):
        item = get_content_object_trees([obj])
        if obj.db_type in ['dict', 'list']:
            fields = ['items']
        else:
            fields = [obj.db_type]
        return serialize_item(item=item[0], context=self.context, fields=fields)


class ContentObjectsViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """Simple viewset used for rendering content objects."""
    serializer_class = ContentObjectsSerializer
    queryset = ContentObjectBase.objects.all()

