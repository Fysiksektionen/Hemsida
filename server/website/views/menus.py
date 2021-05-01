from rest_framework import viewsets, mixins, generics
from utils.serializers import DBObjectSerializer, OptionalHyperlinkedIdentityField
from website.models.menus import Menu


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


class MenusView(generics.ListCreateAPIView):
    """A simple view for listing and creating menus."""
    serializer_class = MenuItemSerializer
    queryset = Menu.objects.all()


class MenuView(generics.RetrieveUpdateDestroyAPIView):
    """A simple view for fetching, updating and deleting menus."""
    serializer_class = MenuItemSerializer
    queryset = Menu.objects.all()
