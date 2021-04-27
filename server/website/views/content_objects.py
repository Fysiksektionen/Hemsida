from django.apps import apps
from rest_framework import serializers, generics
from rest_framework.fields import empty

from utils.serializers import ExtendedListSerializer, DBObjectSerializer
from website.models.content_objects import *
from website.models.pages import Page
from website.models.menus import Menu
from website.models.media import Image


#TODO check if should pass db_type to save as to not be able to create text with image db_type
class ContentTextSerializer(DBObjectSerializer):

    collection = serializers.PrimaryKeyRelatedField(queryset= ContentCollection.objects.all(), default= None)
    containing_page = serializers.PrimaryKeyRelatedField(queryset= Page.objects.all())

    class Meta:
        model = ContentText
        fields = "__all__"
        depth = 1


class ContentImageSerializer(DBObjectSerializer):
    collection = serializers.PrimaryKeyRelatedField(queryset=ContentCollection.objects.all(), default=None)
    containing_page = serializers.PrimaryKeyRelatedField(queryset=Page.objects.all())
    image = serializers.PrimaryKeyRelatedField(queryset=Image.objects.all(), default=None)

    class Meta:
        model = ContentImage
        fields = "__all__"
        depth = 1

    def __init__(self, instance=None, data=empty, *args,**kwargs):
        super().__init__(instance,data,*args,**kwargs)
        if(type(data["image"]) is not int):
            self.initial_data["image"] = data["image"]["id"]


class ContentMenuSerializer(DBObjectSerializer):
    collection = serializers.PrimaryKeyRelatedField(queryset=ContentCollection.objects.all(), default=None)
    containing_page = serializers.PrimaryKeyRelatedField(queryset=Page.objects.all())
    menu = serializers.PrimaryKeyRelatedField(queryset=Menu.objects.all())

    class Meta:
        model = ContentMenu
        fields = "__all__"
        depth = 1

    def __init__(self, instance=None, data=empty, *args,**kwargs):
        super().__init__(instance,data,*args,**kwargs)
        if(type(data["menu"]) is not int):
            self.initial_data["menu"] = data["menu"]["id"]


class ContentPageSerializer(DBObjectSerializer):
    collection = serializers.PrimaryKeyRelatedField(queryset=ContentCollection.objects.all(), default=None)
    containing_page = serializers.PrimaryKeyRelatedField(queryset=Page.objects.all())
    page = serializers.PrimaryKeyRelatedField(queryset=Page.objects.all())

    class Meta:
        model = ContentPage
        fields = "__all__"
        depth = 1


    def __init__(self, instance=None, data=empty, *args,**kwargs):
        super().__init__(instance,data,*args,**kwargs)
        if(type(data["page"]) is not int):
            self.initial_data["page"] = data["page"]["id"]


class ContentCollectionSerializer(DBObjectSerializer):
    collection = serializers.PrimaryKeyRelatedField(queryset=ContentCollection.objects.all(), default=None)
    containing_page = serializers.PrimaryKeyRelatedField(queryset=Page.objects.all())


    class Meta:
        model = ContentCollection
        fields = "__all__"
        depth = 1

    def __init__(self, instance=None, data=empty, *args, **kwargs):
        items = kwargs.pop('items',{})
        super().__init__(instance, data, *args, **kwargs)
        if data is not empty:
            self.initial_data["items"] = items

    def is_valid(self, raise_exception=False):

        if not hasattr(self, '_validated_data'):
            super().is_valid()

            items = self.initial_data["items"]
            if hasattr(items, 'keys'):
                keys = list(items.keys())
                self._serlist = list()

                for i in range(len(items)):

                    if hasattr(self.validated_data.get("containing_page"),"id"):
                        items[keys[i]]["containing_page"] = self.validated_data.get("containing_page").id

                    items[keys[i]]["name"] = keys[i]
                    self._serlist.append(ContentObjectBaseSerializer(data=items[keys[i]]))
                    if not self._serlist[i].is_valid():
                        self._errors = {**self.errors, **(self._serlist[i].errors)}

            else:
                self._errors = {**self._errors, **{"items":"Has to be a dictionary or empty"}}

            if self._errors:
                self._validated_data = {}
                if hasattr(self,"_serlist"):
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
    collection = serializers.PrimaryKeyRelatedField(queryset=ContentCollection.objects.all(), default= None)
    containing_page = serializers.PrimaryKeyRelatedField(queryset=Page.objects.all())

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
                self._errors = {**self._errors, **{"items": "Has to be a list or empty"}}

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


#TODO: Remove BaseSerializer inheritance or fix all the base serializer functions
class ContentObjectBaseSerializer(serializers.BaseSerializer):

    def __init__(self, instance = None, data = empty, **kwargs):
        self.initial_data = data
        if (self.initial_data["db_type"] == "text"):
            self.ser = ContentTextSerializer(data=self.initial_data)

        elif (self.initial_data["db_type"] == "image"):
            self.ser = ContentImageSerializer(data=self.initial_data)

        elif (self.initial_data["db_type"] == "menu"):
            self.ser = ContentMenuSerializer(data=self.initial_data)

        elif (self.initial_data["db_type"] == "page"):
            self.ser = ContentPageSerializer(data=self.initial_data)

        elif (self.initial_data["db_type"] == "list"):
            items = self.initial_data.pop("items")
            self.ser = ContentCollectionListSerializer(data=self.initial_data, items=items)

        elif (self.initial_data["db_type"] == "dict"):
            items = self.initial_data.pop("items")
            self.ser = ContentCollectionSerializer(data=self.initial_data, items=items)
        else:
            raise ValueError("Invalid db_type") #Should this not raise error instead att to self.errors?

    def is_valid(self, raise_exception=False):
        assert hasattr(self, 'initial_data'), (
            'Cannot call `.is_valid()` as no `data=` keyword argument was '
            'passed when instantiating the serializer instance.'
        )
        if not hasattr(self, '_validated_data'):
            if self.ser.is_valid():
                self._validated_data = self.initial_data
                self._errors = {}

            else:
                self._errors = self.ser.errors

        if self._errors and raise_exception:
            raise ValidationError(self.errors)

        return not bool(self._errors)

    def save(self, **kwargs):
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

        #TODO implement instance check by implementing create and update?
        return self.ser.save(**kwargs)















class ContentObjectListSerializer(ExtendedListSerializer):
    collection = None

    def prep_child_from_dict(self, index, item_data):
        ret = super(ContentObjectListSerializer, self).prep_child_from_dict(index, item_data)
        if 'db_type' in item_data:
            self.child.model = apps.get_model(CONTENT_DB_TYPES[item_data['db_type']])

        if self.collection is not None and ret['collection'] is None:
            ret['collection'] = self.collection

        return ret

    def prep_child_from_instances(self, index, instance):
        ret = super(ContentObjectListSerializer, self).prep_child_from_dict(index, instance)
        self.child.collection = self.collection
        self.child.model = type(instance)

        if self.collection is not None and ret.collection is None:
            ret.collection = self.collection

        return ret



class ContentObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContentObjectBase
        fields = ('db_type', 'attributes', 'id')
        list_serializer_class = ContentObjectListSerializer

    def __init__(self, instance=None, data=empty, **kwargs):
        self.order = kwargs.pop('order', 0)
        self.name = kwargs.pop('name', '')
        self.collection = kwargs.pop('collection', None)
        self.model = None

        containing_page = kwargs.pop('containing_page', None)
        if instance is None and containing_page is None:
            raise AssertionError('You must provide a `containing_page`.')
        self.containing_page = containing_page if containing_page is not None else instance.containing_page

        super(ContentObjectSerializer, self).__init__(instance=instance, data=data, **kwargs)

    def get_fields(self, db_type=None):
        fields = super().get_fields()

        if hasattr(self, 'initial_data'):   # If data was passed
            db_type = self.initial_data.get("db_type", None)
        elif self.instance is not None:     # If instance was passed
            db_type = self.instance.db_type

        if db_type is not None and db_type in CONTENT_DB_TYPES.keys():
            if db_type == "text":
                fields["text"] = serializers.CharField(required=True, allow_blank=True, allow_null=False)
                self.model = ContentText
            if db_type == "list":
                fields["items"] = ContentObjectSerializer(many=True, containing_page=self.containing_page)
                self.model = ContentCollectionList

        return fields

    @property
    def validated_data(self):
        _validated_data = super(ContentObjectSerializer, self).validated_data

        # Add information not in the serialization
        for field_name in ['order', 'name', 'collection', 'containing_page']:
            _validated_data[field_name] = self.__getattribute__(field_name)

        return _validated_data

    def create(self, validated_data):
        self.Meta.model = self.model
        items = validated_data.pop('items', None)

        parent = super(ContentObjectSerializer, self).create(validated_data)

        if items is not None:
            self.fields['items'].collection = parent
            self.fields['items'].create(items)

        return parent


class ContentObject(generics.CreateAPIView):
    serializers = ContentObjectSerializer
    queryset = ContentObjectBase.objects.all()



