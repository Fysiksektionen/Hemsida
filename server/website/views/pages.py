from rest_framework import viewsets, mixins, serializers
from utils.serializers import DBObjectSerializer
from website.models import ContentObjectBase
from website.models.pages import Page
from website.selectors.content_objects import get_content_object_trees


class ContentObjectBaseSerializer(DBObjectSerializer):
    class Meta:
        model = ContentObjectBase
        exclude = ['parent_page', 'collection', 'order', 'name']

class TextSerializer(serializers.Serializer):
    text = serializers.CharField(required=True, allow_blank=True)

content_object_value_serializers = {
    'text': TextSerializer
}


class PageSerializer(DBObjectSerializer):
    """Serializer for rendering a Page. Shows id, detail_url and name of child/parent pages."""

    content = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = ['name', 'url', 'slug', 'page_type', 'parent', 'children', 'published',
                  'published_at', 'last_edited_at', 'content', 'page_draft']
        depth = 1
        nested_serialization = {
            'children': {
                'fields': ['name']
            },
            'parent': {
                'fields': ['name']
            },
            'page_draft': {
                'fields': ['page_type', 'content_sv', 'content_en']
            }
        }

    def get_content(self, obj):
        def serialize_item(item, get_children=True):
            serialized_item = ContentObjectBaseSerializer(item['object'], context=self.context).data

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

        if obj.content_sv:
            content = get_content_object_trees([obj.content_sv])
            serialized_content = []
            for items in content:
                serialized_items = serialize_item(items)
                serialized_content.append(serialized_items)
            return serialized_content
        else:
            return None


class PageViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """A simple ViewSet for listing and retrieving Pages."""
    serializer_class = PageSerializer
    queryset = Page.objects.all()
