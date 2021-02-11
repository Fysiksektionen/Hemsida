from django.core.exceptions import ValidationError, NON_FIELD_ERRORS
from django.db import models
from django.utils.translation import gettext_lazy as _


# TODO: Fix locale-values for field names and field names in ValidationErrors.

class MenuItemBase(models.Model):
    """
    Model for item in a menu structure.
    The item can link to a url or dynamically to a Page.
    The objects can be related to each other in a tree structure.
    """

    class Meta:
        verbose_name = _("base menu item")
        verbose_name_plural = _("base menu items")
        unique_together = [('menu', 'order'), ('menu', 'name')]

    name = models.CharField(verbose_name=_('name'), max_length=255)

    # Url and page are validated in clean method to ensure non-ambiguity.
    url = models.URLField(verbose_name=_('url'), blank=True, null=True, default=None)
    page = models.ForeignKey('Page', verbose_name=_('page'), blank=True, null=True, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(
        verbose_name=_('order'), null=True, blank=True
    )
    menu = models.ForeignKey(
        'Menu', related_name='items', verbose_name=_('menu'), null=True, blank=True, on_delete=models.SET_NULL
    )
    # Should never be changed.
    _is_menu = models.BooleanField(verbose_name=_('is menu'), null=False, blank=False)

    @property
    def link(self):
        """Url value of MenuItem.
        :raises RuntimeError if link is ambiguous.
        :return Url of MenuItem based of url of page or url specified. Empty string if both Page and Url is None.
        """
        if self.page is not None and self.url is not None:
            raise RuntimeError("Link is ambiguous, both 'page' and 'url' is set.")
        return self.page.url if self.page is not None else (self.url if self.url is not None else "")

    def clean(self):
        """Validation of state of values in item.

        :raises ValidationError if
            - link-value is ambiguous (i.e. when both 'self.page' and 'self.url' is not None) or
            - menu relation is to itself or
            - meun relation is to a non-menu item.
        """
        errors = {}

        # Link ambiguity
        if self.page is not None and self.url is not None:
            errors.update({
                NON_FIELD_ERRORS: ValidationError(
                    _("Link is ambiguous. Set either %(page_field_name)s "
                      "or %(url_field_name)s, not both."),
                    params={
                        'page_field_name': _('page'),
                        'url_field_name': _('url')
                    }
                )
            })

        if self.menu:
            # Menu relating to a non menu item
            if not self.menu.is_menu:
                errors.update({
                    'menu': ValidationError(
                        _('%(menu_field_name)s field must relate to a %(menu_model_name)s object.'),
                        params={
                            'menu_field_name': _('menu'),
                            'menu_model_name': _('menu')
                        }
                    )
                })

            # Menu relating to itself
            elif (self.menu.pk is not None and self.menu.pk == self.pk) or self is self.menu:
                errors.update({
                    'menu': ValidationError(
                        _('%(menu_model_name)s relates to itself.'),
                        params={
                            'menu_model_name': _('menu')
                        }
                    )
                })

        if errors:
            raise ValidationError(errors)

    def cast_to_proxy_model(self, proxy_model):
        """Casts object to a proxy model.
        :param proxy_model: Model to be casted to.
        :return: self object with type proxy_model.
        """

        kwargs = {}
        for field in self._meta.fields:
            kwargs[field.attname] = getattr(self, field.attname)

        return proxy_model(**kwargs)

    def cast_to_true_model(self):
        """Casts object to a proxy model based on the value of self._is_menu.
        :return: self object with type Menu or MenuItem.
        """

        kwargs = {}
        for field in self._meta.fields:
            kwargs[field.attname] = getattr(self, field.attname)

        if self._is_menu:
            return Menu(**kwargs)
        else:
            return MenuItem(**kwargs)

    @classmethod
    def cast_query_to_true_model(cls, query):
        """Casts query of objects to a proxy model based on the value of self._is_menu on each object.
        :param query: Query of objects to be cast.
        :return: List of object of type Menu or MenuItem.
        """
        if not isinstance(query, models.query.QuerySet):
            raise TypeError("'query' needs to be a django query object (django.db.models.QuerySet).")

        return [Menu(**vals) if vals['_is_menu'] else MenuItem(**vals)
                for vals in query.values(*[field.attname for field in cls._meta.fields])]

    def __str__(self):
        return self.name

    @property
    def is_menu(self):
        return self._is_menu


class MenuItem(MenuItemBase):
    """Model for item in menu."""

    class Meta:
        verbose_name = _("menu item")
        verbose_name_plural = _("menu items")
        proxy = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._is_menu = False

    def clean(self):
        """Validation method for fields

        :raises Validation error if
            - link is ambiguous,
            - menu is None,
            - order is None
        """
        errors = {}

        # Link is ambiguous
        try:
            super(MenuItem, self).clean()
        except ValidationError as e:
            errors = e.update_error_dict(errors)

        # Menu is None
        if self.menu is None:
            errors.update(
                {'menu': ValidationError(self._meta.get_field('menu').error_messages['blank'], code='blank')}
            )

        # Order is None
        if self.order is None:
            errors.update(
                {'order': ValidationError(self._meta.get_field('order').error_messages['blank'], code='blank')}
            )

        if errors:
            raise ValidationError(errors)


class Menu(MenuItemBase):
    """Model for ordered collection of MenuItems."""

    class Meta:
        verbose_name = _("menu")
        verbose_name_plural = _("menus")
        proxy = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._is_menu = True

    def clean(self):
        """Validation method for fields

        :raises Validation error if
            - link is ambiguous,
            - menu is not None and order is None
        """
        errors = {}

        # Link is ambiguous
        try:
            super(Menu, self).clean()
        except ValidationError as e:
            errors = e.update_error_dict(errors)

        # Menu is not None and order is None
        if self.menu is not None and self.order is None:
            errors.update(
                {'order': ValidationError(self._meta.get_field('order').error_messages['blank'], code='blank')}
            )

        if errors:
            raise ValidationError(errors)
