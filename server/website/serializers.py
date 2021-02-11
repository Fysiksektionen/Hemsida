""" Serializers used to parse data to and from JSON """
from rest_framework.fields import Field
from rest_framework.serializers import ModelSerializer
from rest_framework.utils.field_mapping import get_nested_relation_kwargs


class ExtendedModelSerializer(ModelSerializer):
    # nested_serialization = {}
    # inf_depth = False

    NestedSerializerParentClass = None

    def __init__(self, *args, **kwargs):
        if getattr(self.Meta, 'inf_depth', False):
            setattr(self.Meta, 'depth', 1)
        super().__init__(*args, **kwargs)
        if self.NestedSerializerParentClass is None:
            self.NestedSerializerParentClass = self.__class__

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

        # TODO: Lägg bara till self.url_field_name om self.Meta.model.ObjectMeta finns.
        if exclude is None or self.url_field_name not in exclude:
            if self.url_field_name not in field_names:
                field_names.insert(0, self.url_field_name)

        if exclude is None or 'id' not in exclude:
            if 'id' not in field_names:
                field_names.insert(0, 'id')

    def build_url_field(self, field_name, model_class):
        # TODO: Skriv ny serializer_url_field som kan hantera flera fält och basera svaret på vad som finns
        #  i model_class.ObjectMeta.
        """
        Create a field representing the object's own URL.
        """
        field_class = self.serializer_url_field
        field_kwargs = {
            'view_name': None
        }

        return field_class, field_kwargs

