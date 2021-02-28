from rest_framework import viewsets, mixins
from utils.serializers import DBObjectSerializer
from website.models.pages import Page


class PageSerializer(DBObjectSerializer):
    """Serializer for rendering a Page. Shows id, detail_url and name of child/parent pages."""

    class Meta:
        model = Page
        fields = ['name', 'url', 'slug', 'page_type', 'parent', 'children', 'published',
                  'published_at', 'last_edited_at', 'content_sv', 'content_en', 'page_draft']
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


class PageViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """A simple ViewSet for listing and retrieving Pages."""
    serializer_class = PageSerializer
    queryset = Page.objects.all()

