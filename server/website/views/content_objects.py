from django.apps import apps
from rest_framework import serializers, generics
from rest_framework.fields import empty

from utils.serializers import ExtendedListSerializer
from website.models.content_objects import *


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



