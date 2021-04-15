from rest_framework import viewsets, mixins
from utils.serializers import DBObjectSerializer
from website.models.news import News


class NewsSerializer(DBObjectSerializer):
    """Serializer for rendering a News page. Shows id and detail_url of news pages."""

    class Meta:
        model = News
        fields = ['name', 'url', 'slug', 'page_type', 'published', 'author', 'views',
                  'first_published_at', 'last_edited_at', 'publish_time', 'unpublish_time',
                  'content_sv', 'content_en', 'news_draft']
        depth = 1
        nested_serialization = {
            'news_draft': {
                'fields': ['page_type', 'content_sv', 'content_en']
            }
        }


class NewsViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """A simple ViewSet for listing and retrieving News pages."""
    serializer_class = NewsSerializer
    queryset = News.objects.all()