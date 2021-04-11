from django.forms import model_to_dict
from rest_framework import viewsets, mixins, serializers
from utils.serializers import DBObjectSerializer
from website.models.pages import Page
from website.selectors.content_objects import get_content_object_trees
from website.views import content_objects


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

    @staticmethod
    def get_content(obj):
        def serialize_item(item):
            serialized_item = {}
            print(type(item['object']))
            print(item['object'])
            for field in [a for a in dir(item['object']) if not a.startswith('__') and not callable(getattr(item['object'], a))]:  # här
                print(field)
                if field == 'items' and item['db_type'] in ['dict', 'list']:
                    serialized_item[field] = serialize_item(item['items'])
                else:
                    serialized_item[field] = item['object'].field.value
            return serialized_item

        if obj.content_sv:
            content = get_content_object_trees([obj.content_sv])
            serialized_content = []
            for items in content:
                serialized_items = serialize_item(items)
                print(1, serialized_items)
                serialized_content.append(serialized_items)
            return serialized_content
        else:
            print(2)
            return None


class PageViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """A simple ViewSet for listing and retrieving Pages."""
    serializer_class = PageSerializer
    queryset = Page.objects.all()
