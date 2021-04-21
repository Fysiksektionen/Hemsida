from django.apps import apps
from rest_framework import serializers, generics
from rest_framework.fields import empty

from utils.serializers import ExtendedListSerializer, DBObjectSerializer
from website.models.content_objects import *
from website.models.pages import Page
from website.models.menus import Menu
from website.models.media import Image


#TODO Make saving not take 100 queries
#TODO Check that the copy pasted Menu and Page classes work
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
        items = kwargs.pop('items')
        super().__init__(instance, data, *args, **kwargs)
        self.initial_data["items"] = items

    def is_valid(self, raise_exception=False):

        if not super().is_valid():
            return False

        items = self.initial_data["items"]

        keys = list(items.keys())
        self.serlist = list()
        for i in range(len(items)):
            items[keys[i]]["containing_page"] = self.validated_data.get("containing_page").id
            items[keys[i]]["order"] = i
            items[keys[i]]["name"]=keys[i]
            self.serlist.append(ContentObjectBaseSerializer(data=items[keys[i]]))
            if not self.serlist[i].is_valid():
                # TODO Check if more cleaning has to be done here
                self.serlist.clear()
                return False
        return True

    def save(self, **kwargs):
        instance = super().save()
        for ser in self.serlist:
            ser.save(collection=instance.id)
        return instance


class ContentCollectionListSerializer(DBObjectSerializer):
    collection = serializers.PrimaryKeyRelatedField(queryset=ContentCollection.objects.all(), default= None)
    containing_page = serializers.PrimaryKeyRelatedField(queryset=Page.objects.all())

    class Meta:
        model = ContentCollectionList
        fields = "__all__"
        depth = 1

    def __init__(self, instance = None, data = empty,*args, **kwargs):
        items = kwargs.pop('items')
        super().__init__(instance,data,*args, **kwargs)
        self.initial_data["items"] = items

    def is_valid(self, raise_exception=False):

        if not super().is_valid():
            return False

        items = self.initial_data["items"]
        self.serlist = list()
        for i in range(len(items)):
            items[i]["containing_page"] = self.validated_data.get("containing_page").id
            items[i]["order"] = i
            self.serlist.append(ContentObjectBaseSerializer(data=items[i]))
            if not self.serlist[i].is_valid():
                #TODO Check if more cleaning has to be done here
                self.serlist.clear()

                return False

        return True

    def save(self, **kwargs):
        instance = super().save()
        for ser in self.serlist:
            ser.save(collection=instance.id)
        return instance


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
            raise ValueError("Wrong db_type")

    def is_valid(self, raise_exception=False):
        if self.ser.is_valid():
            self._validated_data = self.initial_data
            self._errors = {}
            return True
        else:
            self._errors = self.ser.errors()
            return False

    #TODO steal assertions from Baseserializer
    def save(self,collection = None, **kwargs):

        if collection:
            self.validated_data["collection"] = collection
        if(self.validated_data["db_type"] == "text"):
            ser = ContentTextSerializer(data= self.validated_data)

        elif (self.validated_data["db_type"] == "image"):
            ser = ContentImageSerializer(data=self.validated_data)

        elif (self.validated_data["db_type"] == "menu"):
            ser = ContentMenuSerializer(data=self.validated_data)

        elif (self.validated_data["db_type"] == "page"):
            ser = ContentPageSerializer(data=self.validated_data)

        elif (self.validated_data["db_type"] == "list"):
            items = self.validated_data.pop("items")
            ser = ContentCollectionListSerializer(data=self.validated_data, items = items)
        elif (self.validated_data["db_type"] == "dict"):
            items = self.validated_data.pop("items")
            ser = ContentCollectionSerializer(data=self.validated_data, items = items)

        if ser.is_valid():
            ser.save()















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



