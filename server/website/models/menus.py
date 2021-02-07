from django.core.exceptions import ValidationError, NON_FIELD_ERRORS
from django.db import models
from django.utils.translation import gettext_lazy as _


class MenuItemBase(models.Model):
    """
    Model for item in a menu structure.
    The item can link to a url or dynamically to a Page.
    The objects can be related to each other in a tree structure.
    """

    class Meta:
        unique_together = [('menu', 'order'), ('menu', 'name')]

    name = models.CharField(verbose_name=_('Name'), max_length=255)

    # Url and page are validated in clean method to ensure non-ambiguity.
    url = models.URLField(verbose_name=_('Url'), blank=True, null=True, default=None)
    page = models.ForeignKey('Page', verbose_name=_('Page'), blank=True, null=True, on_delete=models.CASCADE)
    order = models.PositiveIntegerField(
        verbose_name=_('Order'), null=True, blank=True,
        validators=[]
    )
    menu = models.ForeignKey(
        'Menu', related_name='items', verbose_name=_('Menu'), null=True, blank=True, on_delete=models.SET_NULL
    )
    _is_menu = models.BooleanField(verbose_name=_('Is menu'), null=False, blank=False)

    @property
    def link(self):
        """Url value of MenuItem.
        :raises RuntimeError if link is ambiguous.
        :return Url of MenuItem based of url of page or url specified. Empty string if both Page and Url is None.
        """
        if self.page is not None and self.url is not None:
            raise RuntimeError(_("Url is ambiguous, both Page and Url is set."))
        return self.page.url if self.page is not None else (self.url if self.url is not None else "")

    def clean(self):
        """Validation of state of values in item.
        :raises ValidationError with all errors.
        """
        errors = {}
        errors_all_list = []

        if self.page is not None and self.url is not None:
            errors_all_list.append(
                ValidationError(_('Url is ambiguous. Set either Page or Url on the MenuItem, not both.'))
            )

        if self.order is None and self.menu is not None:
            errors_all_list.append(
                ValidationError(_('Item can not have a parent menu but not have an order number.'))
            )
        elif self.order is not None and self.menu is None:
            errors_all_list.append(
                ValidationError(_('Item can not have an order number but not have a parent menu.'))
            )

        if not self.is_menu and self.menu is None:
            errors['menu'] = ValidationError(self._meta.get_field('menu').error_messages['blank'], code='blank')

        if errors_all_list:
            errors[NON_FIELD_ERRORS] = errors_all_list

        if errors:
            raise ValidationError(errors)

    def __str__(self):
        return self.name

    @property
    def is_menu(self):
        return self._is_menu


class MenuItem(MenuItemBase):
    """Model for item in menu."""

    class Meta:
        proxy = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._is_menu = False


class Menu(MenuItemBase):
    """Model for ordered collection of MenuItems."""

    class Meta:
        proxy = True

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._is_menu = True
