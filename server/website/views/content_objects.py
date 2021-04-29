from utils.serializers import DBObjectSerializer, DynamicFieldsMixin
from django.core.cache import cache
from rest_framework import viewsets, mixins, serializers

from website.models import Menu
from website.models.content_objects import *
from website.selectors.content_objects import get_content_object_trees
from website.views.menus import MenuItemSerializer
import website.views.pages as pages


def serialize_item(item, context, fields=None, get_children=True):
    """Recursive method used to rebuild content object tree as a dictionary."""
    if item['db_type'] not in ['dict', 'list']:
        serialized_item = content_object_value_serializers[item['db_type']](item['object'], context=context, fields=fields).data
    else:
        serialized_item = ContentObjectBaseSerializer(item['object'], context=context, fields=fields).data

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

    return serialized_item


class ContentObjectBaseSerializer(DynamicFieldsMixin, DBObjectSerializer):
    """Serializer for rendering content objects without all the fields.
    Used when rendering content objects for a page."""
    class Meta:
        model = ContentObjectBase
        fields = ['db_type', 'component', 'attributes']


class COImageSerializer(DynamicFieldsMixin, DBObjectSerializer):
    """Serializer for rendering COMenu."""
    image = serializers.ImageField()

    class Meta:
        model = ContentImage
        fields = ['db_type', 'component', 'attributes', 'image']


class COTextSerializer(DynamicFieldsMixin, DBObjectSerializer):
    """Serializer for rendering COMenu."""

    class Meta:
        model = ContentText
        fields = ['db_type', 'component', 'attributes', 'text']


class COMenuSerializer(DynamicFieldsMixin, DBObjectSerializer):
    """Serializer for rendering COMenu."""
    menu = MenuItemSerializer()

    class Meta:
        model = ContentMenu
        fields = ['db_type', 'component', 'attributes', 'menu']


class COPageSerializer(DynamicFieldsMixin, DBObjectSerializer):
    """Serializer for rendering COPage."""
    page = pages.PageSerializer()

    class Meta:
        model = ContentPage
        fields = ['db_type', 'component', 'attributes', 'page']


content_object_value_serializers = {
    'text': COTextSerializer,
    'image': COImageSerializer,
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

