from adminsortable.models import SortableMixin
# from django.core.exceptions import ValidationError, NON_FIELD_ERRORS
from django.db import models
from django.utils.translation import gettext_lazy as _
from jsonfield import JSONField

CONTENT_DB_TYPES = {
    'text': 'website.ContentText',
    'image': 'website.ContentImage',
    'menu': 'website.ContentMenu',
    'page': 'website.ContentPage',
    'list': 'website.ContentCollectionList',
    'dict': 'website.ContentCollection'
}


class ContentObjectBase(SortableMixin, models.Model):
    """
    Model for ContentObjects. Non-abstract since we want to query all objects on
    The objects can be related to each other in a tree structure.
    """
    # TODO: Should we really use SortableMixin? Maybe implement our own mixin for this. Would be nice.
    #       Issue is that stuff happen on save, which is generally not so nice.

    class Meta:
        verbose_name = _("base content object")
        verbose_name_plural = _("base content objects")
        ordering = ['order']

    name = models.CharField(verbose_name=_('name'), max_length=255, null=False, blank=True, default="")
    component = models.CharField(verbose_name=_('component'), max_length=255, null=False, blank=True, default="")

    db_type = models.CharField(
        verbose_name=_('database type'),
        choices=[(val, val) for val in CONTENT_DB_TYPES.keys()],
        max_length=max([len(val) for val in CONTENT_DB_TYPES.keys()]),
        null=False, blank=True
    )

    attributes = JSONField(
        verbose_name=_('attributes'),
        null=False, blank=True, default="{}"
    )

    collection = models.ForeignKey(
        'website.ContentCollection',
        verbose_name=_('collection'),
        related_name='items',
        on_delete=models.CASCADE,
        db_index=True,  # For slightly faster lookup.,
        null=True, blank=True
    )
    order = models.PositiveSmallIntegerField(
        verbose_name=_('order'),
        null=False, blank=True, default=0,
        db_index=True  # For slightly faster lookup.
    )

    def get_value(self):
        """Return some python representation of the value to be used as object value."""
        raise NotImplementedError(
            "%s.get_value() is not implemented. Please implement in subclass." % self.__class__
        )

    def clean(self):
        """Validation of state of values in item.

        :raises ValidationError if
            - uniqness of
        """

    def _get_unique_checks(self, exclude=None):
        """Add unique-checks depending on which collection type the item belongs to."""
        unique_checks, date_checks = super()._get_unique_checks(exclude)
        if exclude is None:
            exclude = []

        extra_unique_togethers = []
        if self.collection.is_ordered:
            extra_unique_togethers.append((ContentObjectBase, [('collection', 'order')]))
        else:
            extra_unique_togethers.append((ContentObjectBase, [('collection', 'name')]))

        for model_class, unique_together in extra_unique_togethers:
            for check in unique_together:
                if not any(name in exclude for name in check):
                    # Add the check if the field isn't excluded.
                    unique_checks.append((model_class, tuple(check)))

        return unique_checks, date_checks

    def __str__(self):
        return self.name


class ContentCollection(ContentObjectBase):
    """Model for ContentObject holding a group on content objects.
    Value is a QuerySet of all children.
    """

    class Meta:
        verbose_name = _("content collection")
        verbose_name_plural = _("content collections")

    # Should never be changed.
    is_ordered = models.BooleanField(verbose_name=_('is ordered'), null=False, blank=False, default=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.is_ordered = False
        if 'db_type' not in kwargs:
            self.db_type = 'dict'

    def get_value(self):
        return self.items.all()


class ContentCollectionList(ContentCollection):
    """Model for ContentObject holding an ordered set of content objects.
    Value is an ordered QuerySet of all children.
    """

    class Meta:
        verbose_name = _("content collection list")
        verbose_name_plural = _("content collection lists")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.is_ordered = True
        if 'db_type' not in kwargs:
            self.db_type = 'list'

    def get_value(self):
        return self.items.all().order_by('order')


class ContentText(ContentObjectBase):
    """Model for ContentObject with text value.
    Value is a string.
    """

    class Meta:
        verbose_name = _("text content object")
        verbose_name_plural = _("text content objects")

    text = models.TextField(verbose_name=_('text'), null=True, blank=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if 'db_type' not in kwargs:
            self.db_type = 'text'

    def get_value(self):
        return self.text


class ContentImage(ContentObjectBase):
    """Model for ContentObject with Image value.
    Value is the Image object.
    """

    class Meta:
        verbose_name = _("image content object")
        verbose_name_plural = _("image content objects")

    image = models.ForeignKey(
        'website.Image',
        verbose_name=_('image'),
        related_name='content_objects',
        on_delete=models.SET_NULL,
        null=True, blank=True
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if 'db_type' not in kwargs:
            self.db_type = 'image'

    def get_value(self):
        return self.image


class ContentMenu(ContentObjectBase):
    """Model for ContentObject with Menu value.
    Value is the Menu object.
    """

    class Meta:
        verbose_name = _("menu content object")
        verbose_name_plural = _("menu content objects")

    menu = models.ForeignKey(
        'website.Menu',
        verbose_name=_('menu'),
        related_name='content_objects',
        on_delete=models.SET_NULL,
        null=True, blank=True
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if 'db_type' not in kwargs:
            self.db_type = 'menu'

    def get_value(self):
        return self.menu


class ContentPage(ContentObjectBase):
    """Model for ContentObject with Page value.
    Value is the Page object.
    """

    class Meta:
        verbose_name = _("page content object")
        verbose_name_plural = _("page content objects")

    page = models.ForeignKey(
        'website.Page',
        verbose_name=_('page'),
        related_name='content_objects',
        on_delete=models.SET_NULL,
        null=True, blank=True
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if 'db_type' not in kwargs:
            self.db_type = 'page'

    def get_value(self):
        return self.page

