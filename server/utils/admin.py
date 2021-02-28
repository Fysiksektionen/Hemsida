from django.contrib.auth import get_permission_codename
from guardian.admin import GuardedModelAdmin as OriginalGuardedModelAdmin


class GuardedModelAdmin(OriginalGuardedModelAdmin):
    """Extending the GuardedModelAdmin from django-guardian package.

    Adds functionality to allow certain users view, add, change or remove
    stuff based on both model and object permissions.
    """

    def has_change_permission(self, request, obj=None):
        """
        Return True if the given request has permission to change the given
        Django model instance. Checks if user has either general permissions
        or object specific permissions.
        """

        codename = get_permission_codename('change', self.opts)
        return (
            request.user.has_perm("%s.%s" % (self.opts.app_label, codename)) or
            request.user.has_perm("%s.%s" % (self.opts.app_label, codename), obj)
        )

    def has_delete_permission(self, request, obj=None):
        """
        Return True if the given request has permission to delete the given
        Django model instance. Checks if user has either general permissions
        or object specific permissions.
        """

        codename = get_permission_codename('delete', self.opts)
        return (
            request.user.has_perm("%s.%s" % (self.opts.app_label, codename)) or
            request.user.has_perm("%s.%s" % (self.opts.app_label, codename), obj)
        )

    def has_view_permission(self, request, obj=None):
        """
        Return True if the given request has permission to view the given
        Django model instance. Checks if user has either general permissions
        or object specific permissions.

        If a user has change permissions the view permission is granted.
        """
        codename_view = get_permission_codename('view', self.opts)
        codename_change = get_permission_codename('change', self.opts)
        return (
            request.user.has_perm('%s.%s' % (self.opts.app_label, codename_view)) or
            request.user.has_perm('%s.%s' % (self.opts.app_label, codename_change)) or
            request.user.has_perm('%s.%s' % (self.opts.app_label, codename_view), obj) or
            request.user.has_perm('%s.%s' % (self.opts.app_label, codename_change), obj)
        )
