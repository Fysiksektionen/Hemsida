from rest_framework.decorators import api_view
from rest_framework.response import Response
from website.models.menus import Menu
from website.serializers import DBObjectSerializer


class MenuSerializer(DBObjectSerializer):
    class Meta:
        model = Menu
        fields = ['name', 'link', 'items']
        depth = 10
        nested_serialization = {
            'items': {
                'fields': ['name', 'link', 'items'],
                'reuse_nested_serialization': True
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
