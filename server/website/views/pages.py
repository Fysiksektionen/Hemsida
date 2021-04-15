from rest_framework import viewsets, mixins, serializers
from utils.serializers import DBObjectSerializer
from website.models.pages import Page
from website.selectors.content_objects import get_content_object_trees
from website.views.content_objects import serialize_item


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
        if obj.content_sv:
            content = get_content_object_trees([obj.content_sv])
            serialized_content = []
            for items in content:
                # TODO: Add context so detail_url is added
                serialized_items = serialize_item(items)
                serialized_content.append(serialized_items)
            return serialized_content
        else:
            return None


class PageViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """A simple ViewSet for listing and retrieving Pages."""
    serializer_class = PageSerializer
    queryset = Page.objects.all()
