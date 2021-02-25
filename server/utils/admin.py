from django.contrib import auth
from django.contrib.auth import get_permission_codename
from guardian.admin import GuardedModelAdmin as OriginalGuardedModelAdmin


class GuardedModelAdmin(OriginalGuardedModelAdmin):
    def has_add_permission(self, request):
        codename = get_permission_codename('add', self.opts)
        return request.user.has_perm("%s.%s" % (self.opts.app_label, codename))

    def has_change_permission(self, request, obj=None):
        codename = get_permission_codename('change', self.opts)
        return (
            request.user.has_perm("%s.%s" % (self.opts.app_label, codename)) or
            request.user.has_perm("%s.%s" % (self.opts.app_label, codename), obj)
        )

    def has_delete_permission(self, request, obj=None):
        codename = get_permission_codename('delete', self.opts)
        return (
            request.user.has_perm("%s.%s" % (self.opts.app_label, codename)) or
            request.user.has_perm("%s.%s" % (self.opts.app_label, codename), obj)
        )

    def has_view_permission(self, request, obj=None):
        codename_view = get_permission_codename('view', self.opts)
        codename_change = get_permission_codename('change', self.opts)
        return (
            request.user.has_perm('%s.%s' % (self.opts.app_label, codename_view)) or
            request.user.has_perm('%s.%s' % (self.opts.app_label, codename_change)) or
            request.user.has_perm('%s.%s' % (self.opts.app_label, codename_view), obj) or
            request.user.has_perm('%s.%s' % (self.opts.app_label, codename_change), obj)
        )
