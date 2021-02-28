from authentication.models.groups import Group
from rest_framework import viewsets, mixins, serializers
from utils.serializers import DBObjectSerializer


class GroupSerializer(DBObjectSerializer):
    """Serializer for rendering a Group."""

    group_type = serializers.SerializerMethodField()

    class Meta:
        model = Group
        fields = ('name', 'description', 'group_type', 'image', 'user_set')
        depth = 1

        nested_serialization = {
            'user_set': {
                'fields': ('username', 'first_name', 'last_name', 'image')
            }
        }

    @staticmethod
    def get_group_type(obj):
        """Return human readable name instead of number for user_type"""
        return {key: val for key, val in Group.GroupType.choices}[obj.group_type]


class GroupViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """A simple ViewSet for listing and retrieving Groups."""
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
