from authentication.models.users import User
from rest_framework import viewsets, mixins, serializers
from utils.serializers import DBObjectSerializer


class UserSerializer(DBObjectSerializer):
    """Serializer for rendering a User."""

    user_type = serializers.SerializerMethodField()

    class Meta:
        model = User
        exclude = ('password', 'user_permissions', 'is_superuser', 'is_staff')

    @staticmethod
    def get_user_type(obj):
        """Return human readable name instead of number for user_type"""
        if obj.user_type:
            return {key: val for key, val in User.UserType.choices}[obj.user_type]
        else:
            return None


class UserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """A simple ViewSet for listing and retrieving Users."""
    serializer_class = UserSerializer
    queryset = User.objects.all()
