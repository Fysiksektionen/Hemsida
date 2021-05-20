from rest_framework import viewsets, mixins, serializers, generics
from utils.serializers import DBObjectSerializer
from website.models.pages import Page, PageDraft
from website.models.content_objects import *
from website.selectors.content_objects import get_content_object_trees
from website.views.menus import MenuItemSerializer
from rest_framework import serializers
from rest_framework.fields import empty
from utils.serializers import DBObjectSerializer
from website.models.content_objects import *
from website.models.pages import Page
from website.models.menus import Menu
from website.models.media import Image
from django.utils.translation import gettext_lazy as _



class PageSerializer(DBObjectSerializer):
    """Serializer for rendering a page without content objects."""

    class Meta:
        model = Page
        fields = ['name', 'url', 'slug', 'page_type', 'parent', 'children', 'published',
                  'first_published_at', 'last_edited_at', 'publish_time', 'unpublish_time', 'page_draft']

        depth = 1
        nested_serialization = {
            'children': {
                'fields': ['name']
            },
            'parent': {
                'fields': ['name']
            },
            'page_draft': {
                'fields': ['page_type']
            }
        }


def serialize_item(item, context, get_children=True):
    """Recursive method used to rebuild content object tree as a dictionary."""
    if item['db_type'] not in ['dict', 'list']:
        serialized_item = content_object_value_serializers[item['db_type']](item['object'], context=context).data
    else:
        serialized_item = COBaseSerializer(item['object'], context=context).data

        if item['db_type'] == 'dict':
            if get_children:
                serialized_item['items'] = {}
                for child in item['items']:
                    serialized_item['items'][child['object'].name] = serialize_item(item=child, context=context)
        elif item['db_type'] == 'list':
            if get_children:
                serialized_item['items'] = []
                for child in item['items']:
                    serialized_item['items'].append(serialize_item(item=child, context=context))

    return serialized_item


class COBaseSerializer(DBObjectSerializer):
    """Serializer for rendering content objects without all the fields.
    Used when rendering content objects for a page."""
    class Meta:
        model = ContentObjectBase
        fields = ['db_type', 'attributes']


class COImageSerializer(DBObjectSerializer):
    """Serializer for rendering COImage."""
    image = serializers.ImageField()

    class Meta:
        model = ContentImage
        fields = ['db_type','attributes', 'image']


class COTextSerializer(DBObjectSerializer):
    """Serializer for rendering COText."""

    class Meta:
        model = ContentText
        fields = ['db_type', 'attributes', 'text']


class COMenuSerializer(DBObjectSerializer):
    """Serializer for rendering COMenu."""
    menu = MenuItemSerializer()

    class Meta:
        model = ContentMenu
        fields = ['db_type','attributes', 'menu']


class COPageSerializer(DBObjectSerializer):
    """Serializer for rendering COPage."""
    page = PageSerializer()

    class Meta:
        model = ContentPage
        fields = ['db_type', 'attributes', 'page']


content_object_value_serializers = {
    'text': COTextSerializer,
    'image': COImageSerializer,
    'menu': COMenuSerializer,
    'page': COPageSerializer,
}

class PageDraftSerializer(DBObjectSerializer):

    class Meta:
        model = PageDraft
        fields = ['page_type','content']



class FullPageSerializer(PageSerializer):
    """Serializer for rendering a Page. Shows id, detail_url and name of child/parent pages."""

    content = serializers.SerializerMethodField()


    class Meta:
        model = Page
        fields = ['name', 'url', 'slug', 'page_type', 'parent', 'children', 'published',
                  'first_published_at', 'last_edited_at', 'publish_time', 'unpublish_time',
                  'content', 'page_draft']
        depth = 1
        nested_serialization = {
            'children': {
                'fields': ['name']
            },
            'parent': {
                'fields': ['name']
            },
            'page_draft': {
                'fields': ['page_type', 'content']
            }
        }

    def __init__(self,instance=None, data=empty,**kwargs):
        if data is not empty:
            content = data.get("content",{"content_sv":{}, "content_en":{}})
            data_sv = content.get("content_sv",{})
            data_en = content.get("content_en",{})
            if data_sv != {}:
                self.post_serializer_sv = ContentObjectBaseSerializer(data=data_sv)
            if data_en != {}:
                self.post_serializer_en = ContentObjectBaseSerializer(data=content.get("content_en",{}))
        super().__init__(instance=instance,data=data,**kwargs)

    def is_valid(self, raise_exception=False):
        super().is_valid(raise_exception=raise_exception)
        if hasattr(self,"post_serializer_sv"):
            self.post_serializer_sv.is_valid()
            if not (len(self.post_serializer_sv.errors) == 1 and "containing_page" in self.post_serializer_sv.errors):
                self.post_serializer_sv.errors.pop("containing_page")
                self._errors = {**self.errors, **self.post_serializer_sv.errors}

        if hasattr(self, "post_serializer_en"):
            self.post_serializer_en.is_valid()
            if not (len(self.post_serializer_en.errors) == 1 and "containing_page" in self.post_serializer_en.errors):
                self.post_serializer_en.errors.pop("containing_page")
                self._errors = {**self.errors, **self.post_serializer_sv.errors, **self.post_serializer_en.errors}

        if len(self.errors) == 0:
            return True

        return False

    def save(self ,**kwargs):
        super().save()
        if hasattr(self,"post_serializer_sv"):
            data_sv = self.initial_data["content"]["content_sv"]
            data_sv["containing_page"] = self.instance.id
            ser_sv = ContentObjectBaseSerializer(data=data_sv)
            ser_sv.is_valid()
            ser_sv.save()
            self.instance.content_sv = ser_sv.instance
        if hasattr(self, "post_serializer_en"):
            data_en = self.initial_data["content"]["content_en"]
            data_en["containing_page"] = self.instance.id
            ser_en = ContentObjectBaseSerializer(data=data_en)
            ser_en.is_valid()
            ser_en.save()
            self.instance.content_en = ser_en.instance

        self.instance.save()



    def get_content(self, obj):
        serialized_content = {'content_sv': None, 'content_en': None}
        content = []
        language = []
        if obj.content_sv:
            content.append(obj.content_sv)
            language.append('content_sv')
        if obj.content_en:
            content.append(obj.content_en)
            language.append('content_en')
        content = get_content_object_trees(content)
        for lang, item in zip(language, content):
            serialized_items = serialize_item(item, self.context)
            serialized_content[lang] = serialized_items
        return serialized_content









class ContentTextSerializer(DBObjectSerializer):
    """
    Serializer for ContentText
    """

    collection = serializers.PrimaryKeyRelatedField(queryset=ContentCollection.objects.all(), default=None)
    containing_page = serializers.PrimaryKeyRelatedField(queryset=Page.objects.all())
    attributes = serializers.JSONField()

    class Meta:
        model = ContentText
        fields = "__all__"
        depth = 1

    def is_valid(self, raise_exception=False):
        if not hasattr(self, '_validated_data'):
            db_type = self.initial_data.get("db_type", None)
            super().is_valid(raise_exception)
            if db_type and db_type != "text":
                self._errors = {**self.errors, **{"db_type": _("Invalid db_type")}}

            if self._errors and raise_exception:
                raise ValidationError(self.errors)

        return not bool(self._errors)


class ContentImageSerializer(DBObjectSerializer):
    """
    Serializer for ContentImage
    """

    collection = serializers.PrimaryKeyRelatedField(queryset=ContentCollection.objects.all(), default=None)
    containing_page = serializers.PrimaryKeyRelatedField(queryset=Page.objects.all())
    image = serializers.PrimaryKeyRelatedField(queryset=Image.objects.all(), default=None)
    attributes = serializers.JSONField()

    class Meta:
        model = ContentImage
        fields = "__all__"
        depth = 1

    def __init__(self, instance=None, data=empty, *args, **kwargs):
        super().__init__(instance, data, *args, **kwargs)
        self.initial_data["image"] = data["image"]["id"]

    def is_valid(self, raise_exception=False):
        if not hasattr(self, '_validated_data'):
            db_type = self.initial_data.get("db_type", None)
            super().is_valid(raise_exception)
            if db_type and db_type != "image":
                self._errors = {**self.errors, **{"db_type": _("Invalid db_type")}}

        if self._errors and raise_exception:
            raise ValidationError(self.errors)

        return not bool(self._errors)


class ContentMenuSerializer(DBObjectSerializer):
    """
    Serializer for ContentMenu
    """
    collection = serializers.PrimaryKeyRelatedField(queryset=ContentCollection.objects.all(), default=None)
    containing_page = serializers.PrimaryKeyRelatedField(queryset=Page.objects.all())
    menu = serializers.PrimaryKeyRelatedField(queryset=Menu.objects.all())
    attributes = serializers.JSONField()

    class Meta:
        model = ContentMenu
        fields = "__all__"
        depth = 1

    def is_valid(self, raise_exception=False):
        if not hasattr(self, '_validated_data'):
            db_type = self.initial_data.get("db_type", None)
            super().is_valid(raise_exception)
            if db_type and db_type != "menu":
                self._errors = {**self.errors, **{"db_type": _("Invalid db_type")}}

        if self._errors and raise_exception:
            raise ValidationError(self.errors)

        return not bool(self._errors)


class ContentPageSerializer(DBObjectSerializer):
    """
    Serializer for ContentPage
    """
    collection = serializers.PrimaryKeyRelatedField(queryset=ContentCollection.objects.all(), default=None)
    containing_page = serializers.PrimaryKeyRelatedField(queryset=Page.objects.all())
    page = serializers.PrimaryKeyRelatedField(queryset=Page.objects.all())
    attributes = serializers.JSONField()

    class Meta:
        model = ContentPage
        fields = "__all__"
        depth = 1


    def is_valid(self, raise_exception=False):
        if not hasattr(self, '_validated_data'):
            db_type = self.initial_data.get("db_type", None)
            super().is_valid(raise_exception)

            if db_type and db_type != "page":
                self._errors = {**self.errors, **{"db_type": _("Invalid db_type")}}

        if self._errors and raise_exception:
            raise ValidationError(self.errors)

        return not bool(self._errors)


class ContentCollectionSerializer(DBObjectSerializer):
    """
    Serializer for saving ContentCollection
    """
    collection = serializers.PrimaryKeyRelatedField(queryset=ContentCollection.objects.all(), default=None)
    containing_page = serializers.PrimaryKeyRelatedField(queryset=Page.objects.all())
    attributes = serializers.JSONField()

    class Meta:
        model = ContentCollection
        fields = "__all__"
        depth = 1

    def __init__(self, instance=None, data=empty, *args, **kwargs):
        items = kwargs.pop('items', {})
        super().__init__(instance, data, *args, **kwargs)
        if data is not empty:
            self.initial_data["items"] = items

    def is_valid(self, raise_exception=False):

        if not hasattr(self, '_validated_data'):
            super().is_valid()

            items = self.initial_data["items"]

            db_type = self.initial_data.get("db_type", None)
            if db_type and db_type != "dict":
                self._errors = {**self.errors, **{"db_type": _("Invalid db_type")}}

            if hasattr(items, 'keys'):
                keys = list(items.keys())
                self._serlist = list()  # Serializer list for the items

                for i in range(len(items)):

                    if hasattr(self.validated_data.get("containing_page"), "id"):
                        items[keys[i]]["containing_page"] = self.validated_data.get("containing_page").id

                    items[keys[i]]["name"] = keys[i]
                    self._serlist.append(ContentObjectBaseSerializer(data=items[keys[i]]))

                    if not self._serlist[i].is_valid():
                        self._errors = {**self.errors, **(self._serlist[i].errors)}

            else:
                self._errors = {**self._errors, **{"items": _("Has to be a dictionary")}}

            if self._errors:
                self._validated_data = {}
                if hasattr(self, "_serlist"):
                    self._serlist.clear()

        if self._errors and raise_exception:
            raise ValidationError(self.errors)

        return not bool(self._errors)

    def save(self, **kwargs):
        super().save(**kwargs)
        for ser in self._serlist:
            ser.save(collection=self.instance)
        return self.instance


class ContentCollectionListSerializer(DBObjectSerializer):
    """
   Serializer for saving ContentCollectionList
   """
    collection = serializers.PrimaryKeyRelatedField(queryset=ContentCollection.objects.all(), default=None)
    containing_page = serializers.PrimaryKeyRelatedField(queryset=Page.objects.all())
    attributes = serializers.JSONField()

    class Meta:
        model = ContentCollectionList
        fields = "__all__"
        depth = 1

    def __init__(self, instance=None, data=empty, *args, **kwargs):
        items = kwargs.pop('items', [])
        super().__init__(instance, data, *args, **kwargs)
        self.initial_data["items"] = items

    def is_valid(self, raise_exception=False):

        if not hasattr(self, '_validated_data'):
            super().is_valid()

            items = self.initial_data["items"]

            db_type = self.initial_data.get("db_type", None)
            if db_type and db_type != "list":
                self._errors = {**self.errors, **{"db_type": _("Invalid db_type")}}

            if isinstance(items, list):

                self._serlist = list()

                for i in range(len(items)):

                    if hasattr(self.validated_data.get("containing_page"), "id"):
                        items[i]["containing_page"] = self.validated_data.get("containing_page").id
                    items[i]["order"] = i
                    self._serlist.append(ContentObjectBaseSerializer(data=items[i]))
                    if not self._serlist[i].is_valid():
                        self._errors = {**self.errors, **(self._serlist[i].errors)}

            else:
                self._errors = {**self.errors, **{"items": _("Has to be a list")}}

            if self._errors:
                self._validated_data = {}
                if hasattr(self, "_serlist"):
                    self._serlist.clear()

        if self._errors and raise_exception:
            raise ValidationError(self.errors)

        return not bool(self._errors)

    def save(self, **kwargs):
        super().save(**kwargs)

        for ser in self._serlist:
            ser.save(collection=self.instance)
        return self.instance


class ContentObjectBaseSerializer(serializers.ModelSerializer):
    """
   Serializer for saving all types of ContentObjects
   """

    class Meta:
        model = ContentObjectBase
        fields = ("db_type",)
        depth = 1

    def __init__(self, instance=None, data=empty, **kwargs):
        self.instance = instance
        if data is not empty:
            self.initial_data = {**data, **kwargs}
            db_type = self.initial_data.get("db_type", "")
            # Initializes a serializer of appropriate type
            ser_dict = {}
            ser_dict["text"] = ContentTextSerializer
            ser_dict["image"] = ContentImageSerializer
            ser_dict["menu"] = ContentMenuSerializer
            ser_dict["page"] = ContentPageSerializer
            ser_dict["list"] = ContentCollectionListSerializer
            ser_dict["dict"] = ContentCollectionSerializer

            if db_type in ser_dict.keys():
                if db_type == "list" or db_type == "dict":
                    items = self.initial_data.pop("items")
                    self.ser = ser_dict[db_type](data=self.initial_data, items=items)
                else:
                    self.ser = ser_dict[db_type](data=self.initial_data)

    def is_valid(self, raise_exception=False):
        """Checks if the data of the serializer is valid"""
        assert hasattr(self, 'initial_data'), (
            'Cannot call `.is_valid()` as no `data=` keyword argument was '
            'passed when instantiating the serializer instance.'
        )
        if not hasattr(self, '_validated_data'):
            if hasattr(self, 'ser'):
                if self.ser.is_valid():
                    self._validated_data = self.initial_data
                    self._errors = {}

                else:
                    self._errors = self.ser.errors
            else:
                self._errors = {"db_type": _("Invalid db_type")}

        if self._errors and raise_exception:
            raise ValidationError(self.errors)

        return not bool(self._errors)

    def save(self, **kwargs):
        """
        If the data is valid, saves the ContentObject to the database
        """
        assert hasattr(self, '_errors'), (
            'You must call `.is_valid()` before calling `.save()`.'
        )

        assert not self.errors, (
            'You cannot call `.save()` on a serializer with invalid data.'
        )

        # Guard against incorrect use of `serializer.save(commit=False)`
        assert 'commit' not in kwargs, (
            "'commit' is not a valid keyword argument to the 'save()' method. "
            "If you need to access data before committing to the database then "
            "inspect 'serializer.validated_data' instead. "
            "You can also pass additional keyword arguments to 'save()' if you "
            "need to set extra attributes on the saved model instance. "
            "For example: 'serializer.save(owner=request.user)'.'"
        )

        assert not hasattr(self, '_data'), (
            "You cannot call `.save()` after accessing `serializer.data`."
            "If you need to access data before committing to the database then "
            "inspect 'serializer.validated_data' instead. "
        )

        self.instance = self.ser.save(**kwargs)
        return self.instance


class PagesView(generics.ListCreateAPIView):
    """A simple view for listing and creating Pages."""
    serializer_class = FullPageSerializer
    queryset = Page.objects.all()

class PageView(generics.RetrieveUpdateDestroyAPIView):
    """A simple view for fetching, updating and deleting Pages."""
    serializer_class = FullPageSerializer
    queryset = Page.objects.all()


