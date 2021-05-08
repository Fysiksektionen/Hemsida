from django.apps import apps
from rest_framework import serializers, generics
from rest_framework.fields import empty
from utils.serializers import DBObjectSerializer
from website.models.content_objects import *
from website.models.pages import Page
from website.models.menus import Menu
from website.models.media import Image
from rest_framework.response import Response
from rest_framework import status
from django.utils.translation import gettext_lazy as _


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

        return self.ser.save(**kwargs)



