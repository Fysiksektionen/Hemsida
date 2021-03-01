from rest_framework import viewsets, mixins
from utils.serializers import DBObjectSerializer
from website.models import Redirect


class RedirectSerializer(DBObjectSerializer):
    """Serializer for rendering Redirects."""

    class Meta:
        model = Redirect
        fields = ['from_path', 'link', 'url', 'page']
        depth = 1
        nested_serialization = {
            'page': {
                'fields': ['name']
            }
        }


class RedirectViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """A simple ViewSet for listing and retrieving Menus."""
    serializer_class = RedirectSerializer
    queryset = Redirect.objects.all().select_related('page')
