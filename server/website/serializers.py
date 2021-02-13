""" Serializers used to parse data to and from JSON """
import copy
from collections import OrderedDict

from rest_framework.fields import Field
from rest_framework.serializers import ModelSerializer
from rest_framework.settings import api_settings
from rest_framework.utils import model_meta
from rest_framework.utils.field_mapping import get_nested_relation_kwargs


class ExtendedModelSerializer(ModelSerializer):
    NestedSerializerParentClass = None

    def __init__(self, *args, **kwargs):
        if getattr(self.Meta, 'inf_depth', False):
            setattr(self.Meta, 'depth', 1)
        super().__init__(*args, **kwargs)
        if self.NestedSerializerParentClass is None:
            self.NestedSerializerParentClass = self.__class__

    def get_fields(self):
        """
        (Exact copy of parent with constraint on depth removed.)

        Return the dict of field names -> field instances that should be
        used for `self.fields` when instantiating the serializer.
        """
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

        if field_name in getattr(self.Meta, 'nested_serialization', {}):
            full_nested_ser = self.Meta.nested_serialization
            nested_ser = full_nested_ser[field_name]

            if isinstance(nested_ser, type) and issubclass(nested_ser, Field):
                return nested_ser

            elif isinstance(nested_ser, dict):
                class NestedMeta:
                    model = relation_info.related_model
                    depth = nested_depth - 1 if not getattr(self.Meta, 'inf_depth', False) else nested_depth

                    def __init__(self):
                        if 'reuse_nested_serialization' in nested_ser and nested_ser['reuse_nested_serialization']:
                            self.nested_serialization = full_nested_ser
                        for meta_field_name, value in nested_ser.items():
                            if meta_field_name != 'reuse_nested_serialization':
                                self.__setattr__(meta_field_name, value)
                        super().__init__()

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
    """Serializer forcing id, detail_url,

    """
    url_field_name = 'detail_url'

    def get_field_names(self, declared_fields, info):
        field_names = list(super().get_field_names(declared_fields, info))
        exclude = getattr(self.Meta, 'exclude', None)

        if exclude is None or 'id' not in exclude:
            if 'id' not in field_names:
                field_names.insert(0, 'id')

        if hasattr(self.Meta.model, 'ObjectMeta') and hasattr(self.Meta.model.ObjectMeta, 'detail_view_name'):
            if exclude is None or self.url_field_name not in exclude:
                if self.url_field_name not in field_names:
                    field_names.insert(1, self.url_field_name)

        return field_names

    def build_url_field(self, field_name, model_class):
        """
        Create a field representing the object's own URL.
        """
        field_class = self.serializer_url_field
        if hasattr(self.Meta.model, 'ObjectMeta'):
            getattr(self.Meta.model.ObjectMeta, 'detail_view_name', "")
        field_kwargs = {
            'view_name': getattr(self.Meta.model.ObjectMeta, 'detail_view_name', "")
        }

        return field_class, field_kwargs

