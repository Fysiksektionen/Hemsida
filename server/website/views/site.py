from rest_framework import generics
from utils.serializers import DBObjectSerializer
from website.models import SiteModel


class SiteSerializer(DBObjectSerializer):
    """Serializer for rendering Site."""

    class Meta:
        model = SiteModel
        fields = ['root_url', 'api_root_url', 'root_page', 'banner_content', 'footer_content']
        depth = 1
        nested_serialization = {
            'root_page': {
                'fields': []
            }
        }


class SiteView(generics.RetrieveAPIView):
    """A simple View retrieving Site object."""
    serializer_class = SiteSerializer

    def get_object(self):
        return SiteModel.instance()
