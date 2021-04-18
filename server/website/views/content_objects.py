from utils.serializers import DBObjectSerializer
from django.core.cache import cache
from rest_framework import viewsets, mixins, serializers

from website.models import Menu
from website.models.content_objects import *
from website.selectors.content_objects import get_content_object_trees
from website.views.menus import MenuItemSerializer
from website.views.pages import PageSerializer


def serialize_item(item, context, get_children=True):
    """Recursive method used to rebuild content object tree as a dictionary."""
    serialized_item = ContentObjectBaseSerializer(item['object'], context=context).data #data or initial_data

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
        exclude = ['parent_page', 'collection', 'order', 'name']


class ImageSerializer(serializers.Serializer):
    image = serializers.ImageField()


class TextSerializer(serializers.Serializer):
    text = serializers.CharField(required=True, allow_blank=True)


class COMenuItemSerializer(MenuItemSerializer):
    """Serializer for rendering COMenuItem."""

    class Meta(MenuItemSerializer.Meta):
        inf_depth = False
        """model = Menu
        # fields = ['name', 'link', 'items', 'is_menu']
        depth = 3  # Godtyckligt vald
        extra_kwargs = {
            'detail_url': {
                'url_null_deciding_attribute': 'is_menu'
            }
        }
        nested_serialization = {
            'items': {
                'use_base_meta': True,
                'reuse_nested_serialization': True
            }
        }"""


class COMenuSerializer(DBObjectSerializer):
    """Serializer for rendering COMenu."""
    menu = COMenuItemSerializer()

    class Meta:
        model = ContentMenu
        fields = ['menu']
        # Fult att id är med två gånger


class COPageSerializer(DBObjectSerializer):
    """Serializer for rendering COPage."""
    page = PageSerializer

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

    class Meta:
        model = ContentObjectBase
        fields = ['name', 'db_type', 'component', 'parent_page',
                  'attributes', 'collection', 'order', 'value']
        nested_serialization = {
            'parent_page': {
                'fields': ['name']
            },
            'collection': {
                'fields': ['db_type']
            },
        }

    def get_value(self, obj):
        item = get_content_object_trees([obj])
        serialized_item = serialize_item(item=item[0], context=self.context)
        return serialized_item


class ContentObjectsViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """Simple viewset used for rendering content objects."""
    serializer_class = ContentObjectsSerializer
    queryset = ContentObjectBase.objects.all()

