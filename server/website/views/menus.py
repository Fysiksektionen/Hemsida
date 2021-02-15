from rest_framework import viewsets, mixins

from website.models.menus import Menu
from website.serializers import DBObjectSerializer, OptionalHyperlinkedIdentityField


class MenuItemSerializer(DBObjectSerializer):
    """Serializer for rendering MenuItem. Recursively renders menu.items with the same rendering as parent."""
    serializer_url_field = OptionalHyperlinkedIdentityField

    class Meta:
        model = Menu
        fields = ['name', 'link', 'items', 'is_menu']
        inf_depth = True
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
        }


class MenuViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """A simple ViewSet for listing and retrieving Menus."""
    serializer_class = MenuItemSerializer
    queryset = Menu.objects.all()
