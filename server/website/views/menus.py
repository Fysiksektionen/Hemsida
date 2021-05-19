from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.fields import empty
from rest_framework.relations import PrimaryKeyRelatedField
from django.utils.translation import gettext_lazy as _

from utils.serializers import DBObjectSerializer, OptionalHyperlinkedIdentityField
from website.models.pages import Page
from website.models.menus import MenuItem, Menu


class MenuGetSerializer(DBObjectSerializer):
    """Serializer for rendering MenuItem. Recursively renders menu.items with the same rendering as parent."""
    serializer_url_field = OptionalHyperlinkedIdentityField

    class Meta:
        model = MenuItem
        fields = ['name', 'link', 'page', 'url', 'is_menu', 'items']
        inf_depth = True
        extra_kwargs = {
            'detail_url': {
                'url_null_deciding_attribute': 'is_menu'
            }
        }
        nested_serialization = {
            'page': {
                'fields': ['name']
            },
            'items': {
                'use_base_meta': True,
                'reuse_nested_serialization': True
            }
        }


class MenuPostSerializer(DBObjectSerializer):
    """Serializer for posting MenuItem."""
    page = PrimaryKeyRelatedField(queryset=Page.objects.all(), allow_null=True)

    class Meta:
        model = Menu
        fields = ['name', 'url', 'page', 'items']
        inf_depth = True
        nested_serialization = {
            'items': {
                'use_base_meta': True,
                'reuse_nested_serialization': True
            }
        }

    def __init__(self, instance=None, data=empty, *args, **kwargs):
        if data is not empty:
            data['is_menu'] = True if 'items' in data else False
            items = data.pop('items', [])
            if 'page' not in data:
                data['page'] = None

        super().__init__(instance, data, *args, **kwargs)

        if data is not empty:
            self.initial_data['items'] = items

    def is_valid(self, raise_exception=False):
        if not hasattr(self, '_validated_data'):
            super().is_valid()
            if self.initial_data['is_menu']:
                items = self.initial_data["items"]
                if isinstance(items, list):
                    self._serlist = list()
                    for i in range(len(items)):
                        items[i]["order"] = i
                        self._serlist.append(MenuPostSerializer(data=items[i]))
                        if not self._serlist[i].is_valid():
                            self._errors = {**self.errors, **self._serlist[i].errors}
                else:
                    self._errors = {**self.errors, **{"items": _("Has to be a list or empty")}}
            if self._errors:
                self._validated_data = {}
                if hasattr(self, "_serlist"):
                    self._serlist.clear()
        if self._errors and raise_exception:
            raise ValidationError(self.errors)

        return not bool(self._errors)

    def save(self, **kwargs):
        super().save(**kwargs)
        if hasattr(self, '_serlist'):
            for ser in self._serlist:
                ser.save(menu=self.instance)
        return self.instance


class MenusView(generics.ListCreateAPIView):
    """A simple view for listing and creating menus."""
    queryset = Menu.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return MenuGetSerializer
        return MenuPostSerializer


class MenuView(generics.RetrieveUpdateDestroyAPIView):
    """A simple view for fetching, updating and deleting menus."""
    queryset = Menu.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return MenuGetSerializer
        return MenuPostSerializer
