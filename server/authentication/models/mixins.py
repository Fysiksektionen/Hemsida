from django.contrib.auth.models import Permission


class ModelPermissionCacheMixin:
    """Model mixin to allow deletion of permission caches for the standard ModelBackend."""

    permission_attr_name = 'user_permissions'

    def add_model_perm(self, codename, app_label, model, clear_cache=False, save=True):
        """Adds a permission to the user.

        :param str codename: The codename of the permission to add as defined in the models Meta class.
        :param str app_label: App label of the app of the permission.
        :param str model: Model of the permission.
        :param bool clear_cache: If the cache should be cleared.
        :param bool save: If the user should be saved when permission is added.

        :raises Permission.DoesNotExist: If the permission specified does not exist.
        """
        try:
            perm = Permission.objects.get_by_natural_key(codename, app_label, model)
        except Permission.DoesNotExist as error:
            raise error
        self.__getattribute__(self.permission_attr_name).add(perm)

        if save:
            self.save()

        if clear_cache:
            self.evict_user_perms_cache()

    def add_model_perms(self, codenames, app_label, model, clear_cache=False, save=True):
        """Adds multiple permissions to the user.

        :param list codenames: List of codenames of the permissions to add as defined in the models Meta class.
        :param app_label: App label of the app of the permissions. May be list or string.
        If list it must be of equal length to codenames. If string the same app is assumed for all codenames.
        :param model: Model of the permissions. May be list or string. If list it must be of equal length to codenames.
        If string the same model is assumed for all codenames.
        :param bool clear_cache: If the cache should be cleared.
        :param bool save: If the user should be saved when permission is added.

        :raises TypeError: If the types and lengths of the arguments codename, app_label or model do not match.
        :raises Permission.DoesNotExist: If any of the permissions specified do not exist.
        """

        # Typecheck and make list of app_label
        if isinstance(app_label, list):
            if len(app_label) != len(codenames):
                raise TypeError("'app_label' and 'codenames' do not have the same length.")
        else:
            app_label = [app_label] * len(codenames)

        # Typecheck and make list of model
        if isinstance(model, list):
            if len(model) != len(codenames):
                raise TypeError("'model' and 'codenames' do not have the same length.")
        else:
            model = [model] * len(codenames)

        perms = []
        for codename, app_name, model_name in zip(codenames, app_label, model):
            try:
                perms.append(Permission.objects.get_by_natural_key(codename, app_label, model))
            except Permission.DoesNotExist as error:
                raise error

        self.__getattribute__(self.permission_attr_name).add(*perms)

        if save:
            self.save()

        if clear_cache:
            self.evict_user_perms_cache()

    def remove_model_perm(self, codename, app_label, model, clear_cache=False, save=True):
        """Removes a permission from the user.

        :param str codename: The codename of the permission to remove as defined in the models Meta class.
        :param str app_label: App label of the app of the permission.
        :param str model: Model of the permission.
        :param bool clear_cache: If the cache should be cleared.
        :param bool save: If the user should be saved when permission is added.

        :raises Permission.DoesNotExist: If the permission specified does not exist.
        """
        try:
            perm = Permission.objects.get_by_natural_key(codename, app_label, model)
        except Permission.DoesNotExist as error:
            raise error
        self.__getattribute__(self.permission_attr_name).remove(perm)

        if save:
            self.save()

        if clear_cache:
            self.evict_user_perms_cache()

    def remove_model_perms(self, codenames, app_label, model, clear_cache=False, save=True):
        """Removes multiple permissions to the user.

        :param list codenames: List of codenames of the permissions to remove as defined in the models Meta class.
        :param app_label: App label of the app of the permissions. May be list or string.
        If list it must be of equal length to codenames. If string the same app is assumed for all codenames.
        :param model: Model of the permissions. May be list or string. If list it must be of equal length to codenames.
        If string the same model is assumed for all codenames.
        :param bool clear_cache: If the cache should be cleared.
        :param bool save: If the user should be saved when permission is added.

        :raises TypeError: If the types and lengths of the arguments codename, app_label or model do not match.
        :raises Permission.DoesNotExist: If any of the permissions specified do not exist.
        """

        # Typecheck and make list of app_label
        if isinstance(app_label, list):
            if len(app_label) != len(codenames):
                raise TypeError("'app_label' and 'codenames' do not have the same length.")
        else:
            app_label = [app_label] * len(codenames)

        # Typecheck and make list of model
        if isinstance(model, list):
            if len(model) != len(codenames):
                raise TypeError("'model' and 'codenames' do not have the same length.")
        else:
            model = [model] * len(codenames)

        perms = []
        for codename, app_name, model_name in zip(codenames, app_label, model):
            try:
                perms.append(Permission.objects.get_by_natural_key(codename, app_label, model))
            except Permission.DoesNotExist as error:
                raise error

        self.__getattribute__(self.permission_attr_name).remove(*perms)

        if save:
            self.save()

        if clear_cache:
            self.evict_user_perms_cache()

    def evict_perms_cache(self):
        """Remove the cache of the both user_permissions and calculated group permissions."""
        self._evict_perms_cache('user')
        self._evict_perms_cache('group')

    def evict_user_perms_cache(self):
        """Remove the cache of the user_permissions."""
        self._evict_perms_cache('user')

    def evict_group_perms_cache(self):
        """Remove the cache of the calculated group permissions."""
        self._evict_perms_cache('group')

    def _evict_perms_cache(self, from_name):
        """Removes user permission cache."""
        # Remove general permission cache
        if hasattr(self, '_perm_cache'):
            delattr(self, '_perm_cache')

        # Remove specific permission cache
        if hasattr(self, '_%s_perm_cache' % from_name):
            delattr(self, '_%s_perm_cache' % from_name)
