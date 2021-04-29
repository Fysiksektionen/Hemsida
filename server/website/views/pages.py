from rest_framework import viewsets, mixins, serializers
from utils.serializers import DBObjectSerializer
from website.models.pages import Page
from website.selectors.content_objects import get_content_object_trees
import website.views.content_objects as content_objects


class PageSerializer(DBObjectSerializer):
    """Serializer for rendering a page without content objects."""

    class Meta:
        model = Page
        fields = ['name', 'url', 'slug', 'page_type', 'parent', 'children', 'published',
                  'published_at', 'last_edited_at', 'page_draft']
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

    def __init__(self, *args, **kwargs):
        fields = kwargs.pop('fields', None)
        super(PageSerializer, self).__init__(*args, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class FullPageSerializer(PageSerializer):
    """Serializer for rendering a Page. Shows id, detail_url and name of child/parent pages."""

    content = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = ['name', 'url', 'slug', 'page_type', 'parent', 'children', 'published',
                  'published_at', 'last_edited_at', 'page_draft', 'content']
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
        for i, items in zip(language, content):
            serialized_items = content_objects.serialize_item(items, self.context)
            serialized_content[i] = serialized_items
        return serialized_content


class PageViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """A simple ViewSet for listing and retrieving Pages."""
    serializer_class = FullPageSerializer
    queryset = Page.objects.all()
