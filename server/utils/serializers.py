""" Serializers used to parse data to and from JSON """
import copy
from collections import OrderedDict

from rest_framework import serializers
from rest_framework.fields import Field
from rest_framework.relations import HyperlinkedIdentityField
from rest_framework.settings import api_settings
from rest_framework.utils import model_meta
from rest_framework.utils.field_mapping import get_nested_relation_kwargs


class ExtendedModelSerializer(serializers.ModelSerializer):
    """Serializer extending ModelSerializer to define nested behaviour through Meta class.

    NestedSerializerParentClass [Serializer]: Serializer class for nested objects. (Default = self.__class__).

    Meta-class:
        - inf_depth [Bool]: If true no limit to depth (indep. of depth value). (Default = False).
        - nested_serialization [Dict]: Dictionary specifying meta-class attributes for related (nested) objects.
                                         May specify any of the attributes of the Meta-class (including
                                         'nested_serialization') ('depth', 'inf_depth' and 'model' are ignored if
                                         specified).

                                         If 'reuse_nested_serialization = True' for field the nested objects inherit
                                         parents 'nested_serialization'.

                                         If 'use_base_meta = True' the meta-class will copy the metaclass of its
                                         parent.
    """

    NestedSerializerParentClass = None

    def __init__(self, *args, **kwargs):
        if getattr(self.Meta, 'inf_depth', False):
            setattr(self.Meta, 'depth', 1)
        super().__init__(*args, **kwargs)
        if self.NestedSerializerParentClass is None:
            self.NestedSerializerParentClass = self.__class__

    def get_fields(self):
        """Exact copy of parent with constraint on depth removed."""

        if self.url_field_name is None:
            self.url_field_name = api_settings.URL_FIELD_NAME

        assert hasattr(self, 'Meta'), (
            'Class {serializer_class} missing "Meta" attribute'.format(
                serializer_class=self.__class__.__name__
            )
        )
        assert hasattr(self.Meta, 'model'), (
            'Class {serializer_class} missing "Meta.model" attribute'.format(
                serializer_class=self.__class__.__name__
            )
        )
        if model_meta.is_abstract_model(self.Meta.model):
            raise ValueError(
                'Cannot use ModelSerializer with Abstract Models.'
            )

        declared_fields = copy.deepcopy(self._declared_fields)
        model = getattr(self.Meta, 'model')
        depth = getattr(self.Meta, 'depth', 0)

        # Retrieve metadata about fields & relationships on the model class.
        info = model_meta.get_field_info(model)
        field_names = self.get_field_names(declared_fields, info)

        # Determine any extra field arguments and hidden fields that
        # should be included
        extra_kwargs = self.get_extra_kwargs()
        extra_kwargs, hidden_fields = self.get_uniqueness_extra_kwargs(
            field_names, declared_fields, extra_kwargs
        )

        # Determine the fields that should be included on the serializer.
        fields = OrderedDict()

        for field_name in field_names:
            # If the field is explicitly declared on the class then use that.
            if field_name in declared_fields:
                fields[field_name] = declared_fields[field_name]
                continue

            extra_field_kwargs = extra_kwargs.get(field_name, {})
            source = extra_field_kwargs.get('source', '*')
            if source == '*':
                source = field_name

            # Determine the serializer field class and keyword arguments.
            field_class, field_kwargs = self.build_field(
                source, info, model, depth
            )

            # Include any kwargs defined in `Meta.extra_kwargs`
            field_kwargs = self.include_extra_kwargs(
                field_kwargs, extra_field_kwargs
            )

            # Create the serializer field.
            fields[field_name] = field_class(**field_kwargs)

        # Add in any hidden fields.
        fields.update(hidden_fields)

        return fields

    def build_nested_field(self, field_name, relation_info, nested_depth):
        """
        Create nested fields for forward and reverse relationships.
        """
        # If there is custom serialization defined for som nested fields
        if field_name in getattr(self.Meta, 'nested_serialization', {}):
            Meta = self.Meta
            full_nested_ser = self.Meta.nested_serialization
            nested_ser = full_nested_ser[field_name]

            # If nested serialization is specified with a Field, use that field as field serialization
            if isinstance(nested_ser, type) and issubclass(nested_ser, Field):
                return nested_ser

            # If a dict was given
            elif isinstance(nested_ser, dict):

                # Class to be used as the Meta-class of the serializer for the nested field.
                class NestedMeta:
                    model = relation_info.related_model

                    # Decrease depth if not inf_depth
                    depth = nested_depth - 1 if not getattr(self.Meta, 'inf_depth', False) else nested_depth
                    inf_depth = getattr(self.Meta, 'inf_depth', False)

                    def __init__(self):
                        # If reuse_nested_serialization is True, use the same nested_serialization for serialization of
                        # nested field. Elif specified, use that.
                        if nested_ser.get('reuse_nested_serialization', False):
                            self.nested_serialization = full_nested_ser
                        elif 'nested_serialization' in nested_ser:
                            self.nested_serialization = nested_ser['nested_serialization']

                        # If use_base_meta is True, add all meta-attributes of the parent object, else use the
                        # attributes specified in dictionary for field.
                        if nested_ser.get('use_base_meta', False):
                            metaclass_values_dict = {
                                key: val
                                for key, val in Meta.__dict__.items()
                                if not (len(key) > 2 and key[:2] == "__")
                            }
                        else:
                            metaclass_values_dict = nested_ser

                        # Ignore the attributes already specified.
                        metaclass_values_dict = {
                            key: val
                            for key, val in metaclass_values_dict.items()
                            if key not in [
                                'model', 'depth', 'inf_depth', 'nested_serialization',
                                'use_base_meta', 'reuse_nested_serialization'
                            ]
                        }

                        for meta_field_name, value in metaclass_values_dict.items():
                            self.__setattr__(meta_field_name, value)
                        super().__init__()

                # Created the serializer class with the desired metaclass. Using an object as Metaclass to run __init__.
                class NestedSerializer(self.NestedSerializerParentClass):
                    Meta = NestedMeta()

                field_class = NestedSerializer
                field_kwargs = get_nested_relation_kwargs(relation_info)

                return field_class, field_kwargs
            else:
                raise TypeError("Incorrect type in 'nested_serialization'. Values can only be dict or derivation"
                                "of rest_framework Field.")
        else:
            return super().build_nested_field(field_name, relation_info, nested_depth)


class DBObjectSerializer(ExtendedModelSerializer):
    """Serializer forcing id as field and adding 'url_field_name' (default: 'detail_url') if objects model
    has 'ObjectMeta'-class with 'detail_view_name' to view taking 'pk'.
    """
    url_field_name = 'detail_url'

    def get_field_names(self, declared_fields, info):
        """Adds fields 'id' and self.url_field_name if not explicitly said otherwise in exclude of metaclass."""
        field_names = list(super().get_field_names(declared_fields, info))
        exclude = getattr(self.Meta, 'exclude', None)

        # If not explicitly excluded, add 'id' to fields.
        if exclude is None or 'id' not in exclude:
            if 'id' not in field_names:
                field_names.insert(0, 'id')

        # If not explicitly excluded and if the Model specifies detail_view_name in ObjectMeta,
        # add url_field_name to fields.
        if hasattr(self.Meta.model, 'ObjectMeta') and hasattr(self.Meta.model.ObjectMeta, 'detail_view_name'):
            if exclude is None or self.url_field_name not in exclude:
                if self.url_field_name not in field_names:
                    field_names.insert(1, self.url_field_name)

        return field_names

    def build_url_field(self, field_name, model_class):
        """
        Create a field representing the object's own URL. Uses objects
        """
        field_class = self.serializer_url_field
        if hasattr(self.Meta.model, 'ObjectMeta') and hasattr(self.Meta.model.ObjectMeta, 'detail_view_name'):
            field_kwargs = {
                'view_name': self.Meta.model.ObjectMeta.detail_view_name
            }
        else:
            raise TypeError(
                "Class to serialize with url-field (%s) does not have detail_view_name specified in ObjectMeta class."
            )

        return field_class, field_kwargs


class OptionalHyperlinkedIdentityField(HyperlinkedIdentityField):
    """Field allowing to give null url based on boolean evaluation
    of url_null_deciding_attribute specified in extra_kwargs.
    """

    def __init__(self, view_name=None, url_null_deciding_attribute=None, **kwargs):
        self.url_null_deciding_attribute = url_null_deciding_attribute or ""
        super().__init__(view_name, **kwargs)

    def get_url(self, obj, view_name, request, format):
        """Get url or None depending on evaluation of attribute null_deciding_attribute on object."""

        if hasattr(obj, self.url_null_deciding_attribute):
            if getattr(obj, self.url_null_deciding_attribute):
                return super().get_url(obj, view_name, request, format)
            else:
                return None
        else:
            return super().get_url(obj, view_name, request, format)


class ErrorSerializer(serializers.Serializer):
    """Serializer for generic error. Neither error_code or message is required."""

    # Error code for identification of error origin
    error_code = serializers.IntegerField(allow_null=True, min_value=0, required=False)
    # Message for explanation of error. Usually a translated string.
    message = serializers.CharField(allow_null=True, allow_blank=True, required=False)
