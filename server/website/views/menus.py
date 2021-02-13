from rest_framework import viewsets, mixins
from rest_framework.routers import DefaultRouter

from website.models.menus import Menu
from website.serializers import DBObjectSerializer


# TODO: Fix detail-url for all Menu objects nested.
class MenuSerializer(DBObjectSerializer):

    class Meta:
        model = Menu
        fields = ['name', 'link', 'items', 'is_menu']
        depth = 10
        nested_serialization = {
            'items': {
                'fields': ['name', 'link', 'items', 'is_menu'],
                'reuse_nested_serialization': True,
            }
        }


class MenuViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    A simple ViewSet for listing or retrieving Menus.
    """
    serializer_class = MenuSerializer
    queryset = Menu.objects.all()


menu_router = DefaultRouter()
menu_router.register(r'menus', MenuViewSet, basename='menu')
