from rest_framework.decorators import api_view
from rest_framework.response import Response
from website.models.menus import Menu, MenuItemBase
from website.serializers import DBObjectSerializer, ExtendedModelSerializer


class MenuSerializer(DBObjectSerializer):
    NestedSerializerParentClass = ExtendedModelSerializer

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


@api_view(['GET'])
def menus_list(request):
    data = MenuSerializer(
        Menu.objects.all(), many=True,
        context={'request': request}
    ).data
    return Response(data)


@api_view(['GET'])
def menu_object(request, pk):
    data = MenuSerializer(
        Menu.objects.get(pk=pk),
        context={'request': request}
    ).data
    return Response(data)


class MenuItemSerializer(DBObjectSerializer):
    class Meta:
        model = MenuItemBase
        fields = ['id', 'name', 'link', 'is_menu', 'order']


@api_view(['GET'])
def menu_items_list(request):
    data = MenuItemSerializer(
        MenuItemBase.objects.all(), many=True,
        context={'request': request}
    ).data
    return Response(data)


@api_view(['GET'])
def menu_items_object(request, pk):
    data = MenuItemSerializer(
        MenuItemBase.objects.get(pk=pk),
        context={'request': request}
    ).data
    return Response(data)
