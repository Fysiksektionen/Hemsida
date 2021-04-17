from utils.serializers import DBObjectSerializer, ExtendedModelSerializer
from rest_framework import serializers, generics
from website.models.content_objects import *

import copy
from rest_framework.utils import model_meta




class ContentObjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = ContentObjectBase
        fields = ('db_type', 'attributes', 'id')

    def get_fields(self):
        fields = super().get_fields()
        db_type = self.initial_data.get("db_type", None)
        if db_type is not None and db_type in CONTENT_DB_TYPES.keys():

            if self.initial_data["db_type"] == "text":
                fields["text"] = serializers.CharField(required=True, allow_blank=True, allow_null=False)
                self.Meta.model = ContentText



        return fields







class ContentObject(generics.CreateAPIView):
    serializers = ContentObjectSerializer
    queryset = ContentObjectBase.objects.all()


