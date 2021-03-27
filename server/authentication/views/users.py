from authentication.models import Group, User
from authentication.views.groups import GroupSerializer
from rest_framework import viewsets, mixins, serializers
from utils.serializers import DBObjectSerializer


class UserSerializer(DBObjectSerializer):
    """Serializer for rendering a User."""

    user_type = serializers.SerializerMethodField()
    groups = serializers.SerializerMethodField()

    class Meta:
        model = User
        exclude = ('password', 'user_permissions', 'is_superuser', 'is_staff')
        depth = 1

    def get_groups(self, obj):
        """Return human readable name instead of number for user_type"""
        return [
            GroupSerializer(instance=group.group, context=self.context, with_users=False).data
            for group in obj.groups.all()
        ]

    @staticmethod
    def get_user_type(obj):
        """Return human readable name instead of number for user_type"""
        return {key: val for key, val in User.UserType.choices}[obj.user_type]

    @staticmethod
    def get_group_type(obj):
        """Return human readable name instead of number for group_type"""
        return {key: val for key, val in Group.GroupType.choices}[obj.group_type]

    def build_standard_field(self, field_name, model_field):
        """Special behaviour for the nested field 'group_type' to show text and not int."""
        field_class, field_kwargs = super(UserSerializer, self).build_standard_field(field_name, model_field)
        if field_name == 'group_type':
            field_class = serializers.SerializerMethodField  # Change field type

            # Remove invalid arguments for SerializerMethodField if they are present in field_kwargs.
            field_kwargs.pop('choices', None)
            field_kwargs.pop('allow_blank', None)

        return field_class, field_kwargs


class UserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """A simple ViewSet for listing and retrieving Users."""
    serializer_class = UserSerializer
    queryset = User.objects.all()
