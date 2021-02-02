from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext_lazy as _


class MenuItem(models.Model):
    """Model for item in a menu.
    The item can link to a url or dynamically to a Page.
    The objects can be related to each other in a tree structure using Menu and MenuThroughRel.
    """

    name = models.CharField(verbose_name='Name', max_length=255)
    _url = models.URLField(verbose_name='Url', blank=True, null=True, default=None)
    _page = models.ForeignKey('Page', verbose_name='Page', blank=True, null=True, on_delete=models.CASCADE)

    @property
    def url(self):
        """Url value of MenuItem.
        :raises RuntimeError if link is ambiguous.
        :return Url of MenuItem based of url of page or url specified. Empty string if both Page and Url is None.
        """
        if self._page is not None and self._url is not None:
            raise RuntimeError("Url is ambiguous, both Page and Url is set.")
        return self._page.url if self._page is not None else (self._url if self._url is not None else "")

    def clean(self):
        """Validation of url values.
        :raises ValidationError if both Page and Url are not None.
        """
        if self._page is not None and self._url is not None:
            raise ValidationError(_('Url is ambiguous. Set either Page or Url on the MenuItem, not both.'))


class Menu(MenuItem):
    """Model for ordered collection of MenuItems. Relationship through MenuThroughRel."""

    items = models.ManyToManyField(
        'MenuItem',
        through='MenuThroughRel',
        through_fields=('menu', 'item'),
        related_name='menus'
    )


class MenuThroughRel(models.Model):
    """Model for ordered tree relations between Menus and MenuItems."""

    class Meta:
        unique_together = [('order_num', 'menu'), ('item', 'menu')]

    order_num = models.PositiveIntegerField(verbose_name='Order')
    menu = models.ForeignKey('Menu', related_name='item_relation', on_delete=models.CASCADE)
    item = models.ForeignKey('MenuItem', related_name='menu_relation', on_delete=models.CASCADE)

    def clean(self):
        """Validation of menu and item relation
        :raises ValidationError if menu contains itself or menu-item already belongs to a menu.
        """
        if self.menu == self.item:
            raise ValidationError(_("A menu can not be an item inside itself."))

        if not Menu.objects.filter(pk=self.item.pk).exists() and \
                self.__class__.objects.filter(item__pk=self.item.pk).exclude(pk=self.pk).exists():
            raise ValidationError(_("A non-menu MenuItem can not be a child of multiple different menus."))
