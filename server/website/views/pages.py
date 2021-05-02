from rest_framework import viewsets, mixins, serializers
from utils.serializers import DBObjectSerializer
from website.models.pages import Page
from website.models.content_objects import *
from website.selectors.content_objects import get_content_object_trees
from website.views.menus import MenuItemSerializer


class PageSerializer(DBObjectSerializer):
    """Serializer for rendering a page without content objects."""

    class Meta:
        model = Page
        fields = ['name', 'url', 'slug', 'page_type', 'parent', 'children', 'published',
                  'first_published_at', 'last_edited_at', 'publish_time', 'unpublish_time', 'page_draft']

        depth = 1
        nested_serialization = {
            'children': {
                'fields': ['name']
            },
            'parent': {
                'fields': ['name']
            },
            'page_draft': {
                'fields': ['page_type']
            }
        }


def serialize_item(item, context, get_children=True):
    """Recursive method used to rebuild content object tree as a dictionary."""
    if item['db_type'] not in ['dict', 'list']:
        serialized_item = content_object_value_serializers[item['db_type']](item['object'], context=context).data
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

    return serialized_item


class ContentObjectBaseSerializer(DBObjectSerializer):
    """Serializer for rendering content objects without all the fields.
    Used when rendering content objects for a page."""
    class Meta:
        model = ContentObjectBase
        fields = ['db_type', 'component', 'attributes']


class COImageSerializer(DBObjectSerializer):
    """Serializer for rendering COImage."""
    image = serializers.ImageField()

    class Meta:
        model = ContentImage
        fields = ['db_type', 'component', 'attributes', 'image']


class COTextSerializer(DBObjectSerializer):
    """Serializer for rendering COText."""

    class Meta:
        model = ContentText
        fields = ['db_type', 'component', 'attributes', 'text']


class COMenuSerializer(DBObjectSerializer):
    """Serializer for rendering COMenu."""
    menu = MenuItemSerializer()

    class Meta:
        model = ContentMenu
        fields = ['db_type', 'component', 'attributes', 'menu']


class COPageSerializer(DBObjectSerializer):
    """Serializer for rendering COPage."""
    page = PageSerializer()

    class Meta:
        model = ContentPage
        fields = ['db_type', 'component', 'attributes', 'page']


content_object_value_serializers = {
    'text': COTextSerializer,
    'image': COImageSerializer,
    'menu': COMenuSerializer,
    'page': COPageSerializer,
}


class FullPageSerializer(PageSerializer):
    """Serializer for rendering a Page. Shows id, detail_url and name of child/parent pages."""

    content = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = ['name', 'url', 'slug', 'page_type', 'parent', 'children', 'published',
                  'first_published_at', 'last_edited_at', 'publish_time', 'unpublish_time',
                  'content', 'page_draft']
        depth = 1
        nested_serialization = {
            'children': {
                'fields': ['name']
            },
            'parent': {
                'fields': ['name']
            },
            'page_draft': {
                'fields': ['page_type', 'content']
            }
        }

    def get_content(self, obj):
        serialized_content = {'content_sv': None, 'content_en': None}
        content = []
        language = []
        if obj.content_sv:
            content.append(obj.content_sv)
            language.append('content_sv')
        if obj.content_en:
            content.append(obj.content_en)
            language.append('content_en')
        content = get_content_object_trees(content)
        for lang, item in zip(language, content):
            serialized_items = serialize_item(item, self.context)
            serialized_content[lang] = serialized_items
        return serialized_content


class PageViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """A simple ViewSet for listing and retrieving Pages."""
    serializer_class = FullPageSerializer
    queryset = Page.objects.all()

